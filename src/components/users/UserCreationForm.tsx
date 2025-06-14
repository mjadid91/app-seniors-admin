
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { useUserCategories } from "../../hooks/useUserCategories";
import { useEmailValidation } from "./useEmailValidation";
import PasswordGenerator from "./PasswordGenerator";
import { CreateUserData } from "./userTypes";

interface UserFormData {
  nom: string;
  prenom: string;
  email: string;
  categoryId: number;
  languePreferee: string;
  devise: string;
}

interface UserCreationFormProps {
  formData: UserFormData;
  setFormData: (data: UserFormData) => void;
  password: string;
  setPassword: (password: string) => void;
  isLoading: boolean;
  onSubmit: (data: CreateUserData, password: string) => void;
  onCancel: () => void;
}

const UserCreationForm = ({
  formData,
  setFormData,
  password,
  setPassword,
  isLoading,
  onSubmit,
  onCancel
}: UserCreationFormProps) => {
  const { categories, loading: categoriesLoading } = useUserCategories();
  const { emailError, isEmailChecking } = useEmailValidation(formData.email);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (emailError || !password.trim() || formData.categoryId === 0) {
      return;
    }

    const newUser: CreateUserData = {
      nom: formData.nom,
      prenom: formData.prenom,
      email: formData.email,
      categoryId: formData.categoryId,
      dateInscription: new Date().toISOString().split('T')[0]
    };

    onSubmit(newUser, password);
  };

  return (
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
        {categoriesLoading ? (
          <div className="flex items-center gap-2 p-2 border rounded">
            <div className="w-4 h-4 border border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-sm text-gray-600">Chargement des rôles...</span>
          </div>
        ) : (
          <Select 
            value={formData.categoryId.toString()} 
            onValueChange={(value) => setFormData({ ...formData, categoryId: parseInt(value) })}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner un rôle" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem 
                  key={category.IDCatUtilisateurs} 
                  value={category.IDCatUtilisateurs.toString()}
                >
                  {category.LibelleCategorie}
                  {category.EstAdministrateur && " (Accès complet)"}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
        <p className="text-xs text-muted-foreground">
          Les rôles sont basés sur les attributs de la table CatUtilisateurs : Administrateur, Modérateur, Support, Visualisateur
        </p>
      </div>

      <PasswordGenerator 
        password={password}
        onPasswordChange={setPassword}
      />

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
        <Button type="button" variant="outline" onClick={onCancel}>
          Annuler
        </Button>
        <Button 
          type="submit" 
          disabled={isLoading || !!emailError || isEmailChecking || categoriesLoading}
        >
          {isLoading ? "Création..." : "Créer l'utilisateur"}
        </Button>
      </div>
    </form>
  );
};

export default UserCreationForm;
