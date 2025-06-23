
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

interface AddGroupMessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const AddGroupMessageModal = ({ isOpen, onClose, onSuccess }: AddGroupMessageModalProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    contenu: "",
    auteurId: "",
    groupeId: ""
  });

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

  // Récupérer les membres du groupe sélectionné
  const { data: membresGroupe = [] } = useQuery({
    queryKey: ['membres-groupe', formData.groupeId],
    queryFn: async () => {
      if (!formData.groupeId) return [];
      
      const { data, error } = await supabase
        .from('Utilisateurs_Groupe')
        .select(`
          IDUtilisateurs,
          Utilisateurs!inner(IDUtilisateurs, Nom, Prenom)
        `)
        .eq('IDGroupe', parseInt(formData.groupeId));
      
      if (error) throw error;
      return data.map(item => ({
        IDUtilisateurs: item.Utilisateurs.IDUtilisateurs,
        Nom: item.Utilisateurs.Nom,
        Prenom: item.Utilisateurs.Prenom
      }));
    },
    enabled: !!formData.groupeId
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Vérifier que l'auteur est bien membre du groupe
      const { data: isMember } = await supabase
        .from('Utilisateurs_Groupe')
        .select('IDUtilisateurs')
        .eq('IDGroupe', parseInt(formData.groupeId))
        .eq('IDUtilisateurs', parseInt(formData.auteurId))
        .single();

      if (!isMember) {
        toast({
          title: "Erreur",
          description: "L'auteur doit être membre du groupe",
          variant: "destructive"
        });
        setIsSubmitting(false);
        return;
      }

      // Get the next available ID to avoid conflicts
      const { data: maxIdData, error: maxIdError } = await supabase
        .from('MessageGroupe')
        .select('IDMessageGroupe')
        .order('IDMessageGroupe', { ascending: false })
        .limit(1);

      if (maxIdError) {
        console.error('Error getting max ID:', maxIdError);
      }

      const nextId = maxIdData && maxIdData.length > 0 ? maxIdData[0].IDMessageGroupe + 1 : 1;

      const { error } = await supabase
        .from('MessageGroupe')
        .insert({
          IDMessageGroupe: nextId,
          Contenu: formData.contenu,
          IDUtilisateurs: parseInt(formData.auteurId),
          IDGroupe: parseInt(formData.groupeId),
          DateEnvoi: new Date().toISOString().split('T')[0]
        });

      if (error) throw error;

      toast({
        title: "Message ajouté",
        description: "Le message a été ajouté au groupe avec succès"
      });

      onSuccess();
      onClose();
      setFormData({
        contenu: "",
        auteurId: "",
        groupeId: ""
      });
    } catch (error) {
      console.error('Erreur lors de l\'ajout du message:', error);
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter le message",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Réinitialiser l'auteur quand le groupe change
  const handleGroupeChange = (value: string) => {
    setFormData(prev => ({ 
      ...prev, 
      groupeId: value,
      auteurId: "" // Réinitialiser l'auteur
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Ajouter un message dans un groupe</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Groupe</label>
            <Select value={formData.groupeId} onValueChange={handleGroupeChange}>
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
            <label className="block text-sm font-medium mb-1">Auteur (membres du groupe uniquement)</label>
            <Select 
              value={formData.auteurId} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, auteurId: value }))}
              disabled={!formData.groupeId}
            >
              <SelectTrigger>
                <SelectValue placeholder={formData.groupeId ? "Sélectionner un auteur" : "Sélectionner d'abord un groupe"} />
              </SelectTrigger>
              <SelectContent>
                {membresGroupe.map((membre) => (
                  <SelectItem key={membre.IDUtilisateurs} value={membre.IDUtilisateurs.toString()}>
                    {membre.Prenom} {membre.Nom}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Contenu du message</label>
            <Textarea
              value={formData.contenu}
              onChange={(e) => setFormData(prev => ({ ...prev, contenu: e.target.value }))}
              rows={4}
              required
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit" disabled={isSubmitting || !formData.groupeId || !formData.auteurId}>
              {isSubmitting ? "Ajout..." : "Ajouter"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddGroupMessageModal;
