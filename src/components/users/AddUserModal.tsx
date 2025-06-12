
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { User, useAuthStore } from "../../stores/authStore";
import { AlertCircle, Eye, EyeOff, RefreshCw } from "lucide-react";

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddUser: (user: Omit<User, 'id'>) => void;
}

const AddUserModal = ({ isOpen, onClose, onAddUser }: AddUserModalProps) => {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    role: "visualisateur" as User['role'],
    languePreferee: "",
    devise: ""
  });
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [showCreatedPassword, setShowCreatedPassword] = useState(false);
  const [createdPassword, setCreatedPassword] = useState("");
  const [showPasswordField, setShowPasswordField] = useState(false);
  const [isEmailChecking, setIsEmailChecking] = useState(false);
  const { toast } = useToast();

  // Mock existing users for email validation
  const existingEmails = [
    'admin@appseniors.fr',
    'support@appseniors.fr',
    'moderateur@appseniors.fr',
    'viewer@appseniors.fr',
    'admin2@appseniors.fr',
    'support2@appseniors.fr',
    'moderateur2@appseniors.fr'
  ];

  // Vérification en temps réel de l'email
  useEffect(() => {
    if (formData.email && formData.email.includes('@')) {
      setIsEmailChecking(true);
      const checkEmail = setTimeout(() => {
        if (existingEmails.includes(formData.email.toLowerCase())) {
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
  }, [formData.email]);

  // Génération d'un mot de passe temporaire
  const generatePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let newPassword = '';
    for (let i = 0; i < 12; i++) {
      newPassword += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(newPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (emailError) {
      toast({
        title: "Erreur",
        description: "Veuillez corriger les erreurs avant de continuer.",
        variant: "destructive"
      });
      return;
    }

    if (!password.trim()) {
      toast({
        title: "Erreur",
        description: "Veuillez saisir ou générer un mot de passe.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      const newUser: Omit<User, 'id'> = {
        nom: formData.nom,
        prenom: formData.prenom,
        email: formData.email,
        role: formData.role,
        dateInscription: new Date().toISOString().split('T')[0]
      };

      onAddUser(newUser);
      setCreatedPassword(password);
      setShowCreatedPassword(true);
      
      toast({
        title: "Utilisateur créé avec succès",
        description: `${formData.prenom} ${formData.nom} a été ajouté avec un mot de passe temporaire.`,
      });

      // Réinitialiser le formulaire
      setFormData({
        nom: "",
        prenom: "",
        email: "",
        role: "visualisateur",
        languePreferee: "",
        devise: ""
      });
      setPassword("");
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de créer l'utilisateur.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setShowCreatedPassword(false);
    setCreatedPassword("");
    setPassword("");
    setFormData({
      nom: "",
      prenom: "",
      email: "",
      role: "visualisateur",
      languePreferee: "",
      devise: ""
    });
    onClose();
  };

  const copyPassword = () => {
    navigator.clipboard.writeText(createdPassword);
    toast({
      title: "Copié",
      description: "Le mot de passe a été copié dans le presse-papier.",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Ajouter un utilisateur</DialogTitle>
          <DialogDescription>
            Créez un nouveau compte utilisateur pour l'administration.
          </DialogDescription>
        </DialogHeader>

        {showCreatedPassword ? (
          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
              <h3 className="font-medium text-green-800 mb-3">✅ Utilisateur créé avec succès</h3>
              <div className="space-y-3">
                <div>
                  <Label className="text-sm font-medium text-green-700">Mot de passe temporaire :</Label>
                  <div className="flex items-center gap-2 bg-white p-3 rounded border mt-1">
                    <code className="flex-1 font-mono text-sm break-all">{createdPassword}</code>
                    <Button size="sm" variant="outline" onClick={copyPassword}>
                      Copier
                    </Button>
                  </div>
                </div>
                <div className="bg-amber-50 border border-amber-200 p-3 rounded">
                  <p className="text-sm text-amber-800">
                    <strong>Important :</strong> Communiquez ce mot de passe à l'utilisateur par email ou messagerie sécurisée. Il pourra le modifier à sa première connexion.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <Button onClick={handleClose}>
                Fermer
              </Button>
            </div>
          </div>
        ) : (
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
              <Label>Mot de passe temporaire *</Label>
              <div className="flex gap-2">
                <div className="flex-1">
                  <div className="relative">
                    <Input
                      type={showPasswordField ? "text" : "password"}
                      placeholder="Saisir ou générer automatiquement"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowPasswordField(!showPasswordField)}
                    >
                      {showPasswordField ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={generatePassword}
                  className="px-3"
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Cliquez sur l'icône de rechargement pour générer un mot de passe automatiquement
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="langue">Langue préférée</Label>
                <Select value={formData.languePreferee} onValueChange={(value) => setFormData({ ...formData, languePreferee: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fr">Français</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                    <SelectItem value="de">Deutsch</SelectItem>
                    <SelectItem value="it">Italiano</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="devise">Devise</Label>
                <Select value={formData.devise} onValueChange={(value) => setFormData({ ...formData, devise: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="EUR">Euro (€)</SelectItem>
                    <SelectItem value="USD">Dollar US ($)</SelectItem>
                    <SelectItem value="GBP">Livre Sterling (£)</SelectItem>
                    <SelectItem value="CHF">Franc Suisse (CHF)</SelectItem>
                    <SelectItem value="CAD">Dollar Canadien (CAD)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg">
              <p className="text-sm text-blue-700">
                <strong>Information :</strong> Le mot de passe sera affiché une seule fois après la création du compte. L'utilisateur devra le modifier lors de sa première connexion.
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
                {isLoading ? "Création..." : "Créer l'utilisateur"}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AddUserModal;
