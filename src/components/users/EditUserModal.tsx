
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { User } from "../../stores/authStore";
import { AlertCircle } from "lucide-react";

interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  onEditUser: (userId: string, userData: Partial<User>) => void;
}

const EditUserModal = ({ isOpen, onClose, user, onEditUser }: EditUserModalProps) => {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    role: "visualisateur" as User['role'],
    status: "actif"
  });
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [isEmailChecking, setIsEmailChecking] = useState(false);
  const { toast } = useToast();

  // Mock existing users for email validation (excluding current user)
  const existingEmails = [
    'admin@appseniors.fr',
    'support@appseniors.fr',
    'moderateur@appseniors.fr',
    'viewer@appseniors.fr',
    'admin2@appseniors.fr',
    'support2@appseniors.fr',
    'moderateur2@appseniors.fr'
  ];

  // Pré-remplir le formulaire avec les données de l'utilisateur
  useEffect(() => {
    if (user) {
      setFormData({
        nom: user.nom,
        prenom: user.prenom,
        email: user.email,
        role: user.role,
        status: "actif" // Par défaut actif
      });
    }
  }, [user]);

  // Vérification en temps réel de l'email
  useEffect(() => {
    if (formData.email && formData.email.includes('@') && user) {
      setIsEmailChecking(true);
      const checkEmail = setTimeout(() => {
        if (existingEmails.includes(formData.email.toLowerCase()) && formData.email !== user.email) {
          setEmailError("Cette adresse email est déjà utilisée");
        } else {
          setEmailError("");
        }
        setIsEmailChecking(false);
      }, 500);

      return () => clearTimeout(checkEmail);
    } else {
      setEmailError("");
      setIsEmailChecking(false);
    }
  }, [formData.email, user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;
    
    if (emailError) {
      toast({
        title: "Erreur",
        description: "Veuillez corriger les erreurs avant de continuer.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      const updatedData: Partial<User> = {
        nom: formData.nom,
        prenom: formData.prenom,
        email: formData.email,
        role: formData.role
      };

      onEditUser(user.id, updatedData);
      
      toast({
        title: "Utilisateur modifié avec succès",
        description: `Les informations de ${formData.prenom} ${formData.nom} ont été mises à jour.`,
      });

      onClose();
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de modifier l'utilisateur.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setEmailError("");
    onClose();
  };

  if (!user) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Titre</DialogTitle>
          <DialogDescription>Modifier les informations de l'utilisateur.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="prenom">Prénom *</Label>
              <Input
                id="prenom"
                value={formData.prenom}
                onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nom">Nom *</Label>
              <Input
                id="nom"
                value={formData.nom}
                onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Adresse email *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className={emailError ? "border-red-500" : ""}
            />
            {isEmailChecking && (
              <p className="text-sm text-blue-600 flex items-center gap-1">
                <div className="w-3 h-3 border border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                Vérification de l'email...
              </p>
            )}
            {emailError && (
              <p className="text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {emailError}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Rôle *</Label>
            <Select value={formData.role} onValueChange={(value: User['role']) => setFormData({ ...formData, role: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="administrateur">Administrateur</SelectItem>
                <SelectItem value="moderateur">Modérateur</SelectItem>
                <SelectItem value="support">Support</SelectItem>
                <SelectItem value="visualisateur">Visualisateur</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Statut</Label>
            <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="actif">Actif</SelectItem>
                <SelectItem value="inactif">Inactif</SelectItem>
                <SelectItem value="suspendu">Suspendu</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg">
            <p className="text-sm text-blue-700">
              <strong>Information :</strong> Les modifications seront appliquées immédiatement après validation.
            </p>
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={handleClose}>
              Annuler
            </Button>
            <Button 
              type="submit" 
              disabled={isLoading || !!emailError || isEmailChecking}
            >
              {isLoading ? "Enregistrement..." : "Enregistrer les modifications"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditUserModal;
