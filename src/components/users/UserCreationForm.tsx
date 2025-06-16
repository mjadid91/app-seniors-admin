
import { useUserFormData } from "../../hooks/useUserFormData";
import { useUserCategories } from "../../hooks/useUserCategories";
import { useEmailValidation } from "./useEmailValidation";
import PasswordGenerator from "./PasswordGenerator";
import { CreateUserData } from "./userTypes";
import UserBasicInfoFields from "./UserBasicInfoFields";
import EmailField from "./EmailField";
import RoleSelector from "./RoleSelector";
import PreferencesFields from "./PreferencesFields";
import UserFormActions from "./UserFormActions";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";

interface UserCreationFormProps {
  password: string;
  setPassword: (password: string) => void;
  isLoading: boolean;
  onSubmit: (data: CreateUserData, password: string) => void;
  onCancel: () => void;
}

const UserCreationForm = ({
  password,
  setPassword,
  isLoading,
  onSubmit,
  onCancel
}: UserCreationFormProps) => {
  const { formData, setFormData } = useUserFormData();
  const { categories, loading: categoriesLoading } = useUserCategories();
  const { emailError, isEmailChecking } = useEmailValidation(formData.email);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (emailError || !password.trim() || formData.categoryId === 0) {
      return;
    }

    // Validation des champs obligatoires
    if (!formData.nom.trim() || !formData.prenom.trim() || !formData.email.trim()) {
      return;
    }

    const newUser: CreateUserData = {
      nom: formData.nom.trim(),
      prenom: formData.prenom.trim(),
      email: formData.email.trim().toLowerCase(),
      categoryId: formData.categoryId,
      dateInscription: new Date().toISOString().split('T')[0],
      languePreferee: formData.languePreferee || 'fr',
      devise: formData.devise || 'EUR'
    };

    onSubmit(newUser, password);
  };

  // Vérifier si c'est une catégorie qui aura un profil spécialisé
  const selectedCategory = categories.find(cat => cat.IDCatUtilisateurs === formData.categoryId);
  const willCreateSpecializedProfile = selectedCategory && (selectedCategory.EstSenior || selectedCategory.EstAidant);

  const hasErrors = !!emailError || isEmailChecking || categoriesLoading || 
                   !formData.nom.trim() || !formData.prenom.trim() || 
                   !formData.email.trim() || !password.trim() || formData.categoryId === 0;

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Section informations personnelles */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Informations personnelles</h3>
          <div className="bg-gray-50 p-4 rounded-lg space-y-4">
            <UserBasicInfoFields formData={formData} setFormData={setFormData} />
            <EmailField formData={formData} setFormData={setFormData} />
          </div>
        </div>

        {/* Section catégorie et rôle */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Catégorie et accès</h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <RoleSelector formData={formData} setFormData={setFormData} />
          </div>
        </div>

        {/* Section mot de passe */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Sécurité</h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <PasswordGenerator 
              password={password}
              onPasswordChange={setPassword}
            />
          </div>
        </div>

        {/* Section préférences (optionnel) */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Préférences (optionnel)</h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <PreferencesFields formData={formData} setFormData={setFormData} />
          </div>
        </div>

        {/* Alertes et informations */}
        <div className="space-y-3">
          {willCreateSpecializedProfile && (
            <Alert className="border-blue-200 bg-blue-50">
              <InfoIcon className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-blue-800">
                <strong>Information :</strong> Un profil spécialisé sera automatiquement créé pour cette catégorie 
                ({selectedCategory.EstSenior ? 'Senior' : 'Aidant professionnel'}).
              </AlertDescription>
            </Alert>
          )}

          <Alert className="border-amber-200 bg-amber-50">
            <InfoIcon className="h-4 w-4 text-amber-600" />
            <AlertDescription className="text-amber-800">
              <strong>Important :</strong> Le mot de passe sera affiché une seule fois après la création. 
              L'utilisateur devra le modifier lors de sa première connexion.
            </AlertDescription>
          </Alert>
        </div>

        <UserFormActions 
          isLoading={isLoading}
          hasErrors={hasErrors}
          onCancel={onCancel}
        />
      </form>
    </div>
  );
};

export default UserCreationForm;
