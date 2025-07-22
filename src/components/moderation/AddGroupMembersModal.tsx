import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { X, Plus, Search } from "lucide-react";

interface AddGroupMembersModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

interface User {
  IDUtilisateurs: number;
  Nom: string;
  Prenom: string;
  Email: string;
}

const AddGroupMembersModal = ({ isOpen, onClose, onSuccess }: AddGroupMembersModalProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedGroupId, setSelectedGroupId] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Récupérer les groupes
  const { data: groupes = [] } = useQuery({
    queryKey: ['groupes'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('Groupe')
        .select('IDGroupe, Titre')
        .order('Titre');
      
      if (error) throw error;
      return data;
    }
  });

  // Fonction pour rechercher des utilisateurs
  const searchUsers = async (searchTerm: string) => {
    if (!searchTerm.trim() || !selectedGroupId) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      // D'abord, récupérer les membres actuels du groupe
      const { data: currentMembers, error: membersError } = await supabase
        .from('Utilisateurs_Groupe')
        .select('IDUtilisateurs')
        .eq('IDGroupe', parseInt(selectedGroupId));

      if (membersError) throw membersError;

      const memberIds = currentMembers?.map(m => m.IDUtilisateurs) || [];

      // Rechercher les utilisateurs par email ou nom
      const { data: users, error: usersError } = await supabase
        .from('Utilisateurs')
        .select('IDUtilisateurs, Nom, Prenom, Email')
        .or(`Email.ilike.%${searchTerm}%,Nom.ilike.%${searchTerm}%,Prenom.ilike.%${searchTerm}%`)
        .not('IDUtilisateurs', 'in', `(${memberIds.length > 0 ? memberIds.join(',') : '0'})`)
        .limit(10);

      if (usersError) throw usersError;

      // Filtrer les utilisateurs déjà sélectionnés
      const filteredUsers = users?.filter(user => 
        !selectedUsers.some(selected => selected.IDUtilisateurs === user.IDUtilisateurs)
      ) || [];

      setSearchResults(filteredUsers);
    } catch (error) {
      console.error('Erreur lors de la recherche:', error);
      toast({
        title: "Erreur",
        description: "Impossible de rechercher les utilisateurs",
        variant: "destructive"
      });
    } finally {
      setIsSearching(false);
    }
  };

  // Ajouter un utilisateur à la sélection
  const addUserToSelection = (user: User) => {
    setSelectedUsers(prev => [...prev, user]);
    setSearchResults(prev => prev.filter(u => u.IDUtilisateurs !== user.IDUtilisateurs));
    setSearchEmail("");
  };

  // Retirer un utilisateur de la sélection
  const removeUserFromSelection = (userId: number) => {
    setSelectedUsers(prev => prev.filter(u => u.IDUtilisateurs !== userId));
  };

  // Gérer le changement de groupe
  const handleGroupChange = (value: string) => {
    setSelectedGroupId(value);
    setSearchResults([]);
    setSelectedUsers([]);
    setSearchEmail("");
  };

  // Gérer la recherche
  const handleSearchChange = (value: string) => {
    setSearchEmail(value);
    if (value.length >= 2) {
      searchUsers(value);
    } else {
      setSearchResults([]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedGroupId || selectedUsers.length === 0) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner un groupe et au moins un utilisateur",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Insérer chaque utilisateur dans le groupe
      const insertPromises = selectedUsers.map(user => 
        supabase
          .from('Utilisateurs_Groupe')
          .insert({
            IDGroupe: parseInt(selectedGroupId),
            IDUtilisateurs: user.IDUtilisateurs
          })
      );

      const results = await Promise.allSettled(insertPromises);
      
      // Vérifier s'il y a eu des erreurs
      const errors = results.filter(result => result.status === 'rejected');
      
      // Invalider les queries liées aux groupes et membres
      queryClient.invalidateQueries({ queryKey: ['groups-list'] });
      queryClient.invalidateQueries({ queryKey: ['group-members'] });
      queryClient.invalidateQueries({ queryKey: ['group-stats'] });
      
      if (errors.length > 0) {
        console.error('Erreurs lors de l\'ajout des membres:', errors);
        toast({
          title: "Erreur partielle",
          description: `${selectedUsers.length - errors.length}/${selectedUsers.length} membres ajoutés avec succès`,
          variant: "destructive"
        });
      } else {
        toast({
          title: "Membres ajoutés",
          description: `${selectedUsers.length} membre(s) ajouté(s) au groupe avec succès`
        });
      }

      onSuccess();
      onClose();
      
      // Réinitialiser le formulaire
      setSelectedGroupId("");
      setSelectedUsers([]);
      setSearchEmail("");
      setSearchResults([]);
    } catch (error) {
      console.error('Erreur lors de l\'ajout des membres:', error);
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter les membres au groupe",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Ajouter des membres au groupe</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1">Groupe</label>
            <Select value={selectedGroupId} onValueChange={handleGroupChange}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un groupe" />
              </SelectTrigger>
              <SelectContent>
                {groupes.map((groupe) => (
                  <SelectItem key={groupe.IDGroupe} value={groupe.IDGroupe.toString()}>
                    {groupe.Titre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Rechercher des utilisateurs</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher par email ou nom..."
                value={searchEmail}
                onChange={(e) => handleSearchChange(e.target.value)}
                disabled={!selectedGroupId}
                className="pl-10"
              />
              {isSearching && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full"></div>
                </div>
              )}
            </div>

            {/* Résultats de recherche */}
            {searchResults.length > 0 && (
              <div className="mt-2 border rounded-md max-h-32 overflow-y-auto">
                {searchResults.map((user) => (
                  <div
                    key={user.IDUtilisateurs}
                    className="flex items-center justify-between p-2 hover:bg-gray-50 cursor-pointer"
                    onClick={() => addUserToSelection(user)}
                  >
                    <div>
                      <div className="font-medium">{user.Prenom} {user.Nom}</div>
                      <div className="text-sm text-gray-500">{user.Email}</div>
                    </div>
                    <Plus className="h-4 w-4 text-green-600" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Utilisateurs sélectionnés */}
          {selectedUsers.length > 0 && (
            <div>
              <label className="block text-sm font-medium mb-2">
                Utilisateurs sélectionnés ({selectedUsers.length})
              </label>
              <div className="space-y-2 max-h-32 overflow-y-auto border rounded-md p-2">
                {selectedUsers.map((user) => (
                  <div
                    key={user.IDUtilisateurs}
                    className="flex items-center justify-between bg-blue-50 p-2 rounded"
                  >
                    <div>
                      <div className="font-medium">{user.Prenom} {user.Nom}</div>
                      <div className="text-sm text-gray-500">{user.Email}</div>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeUserFromSelection(user.IDUtilisateurs)}
                      className="h-6 w-6 p-0"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting || !selectedGroupId || selectedUsers.length === 0}
            >
              {isSubmitting ? "Ajout..." : `Ajouter ${selectedUsers.length} membre(s)`}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddGroupMembersModal;
