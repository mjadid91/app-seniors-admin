
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
  const { loading: categoriesLoading } = useUserCategories();
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

  const hasErrors = !!emailError || isEmailChecking || categoriesLoading;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <UserBasicInfoFields formData={formData} setFormData={setFormData} />
      
      <EmailField formData={formData} setFormData={setFormData} />

      <RoleSelector formData={formData} setFormData={setFormData} />

      <PasswordGenerator 
        password={password}
        onPasswordChange={setPassword}
      />

      <PreferencesFields formData={formData} setFormData={setFormData} />

      <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg">
        <p className="text-sm text-blue-700">
          <strong>Information :</strong> Le mot de passe sera affiché une seule fois après la création du compte. L'utilisateur devra le modifier lors de sa première connexion.
        </p>
      </div>

      <UserFormActions 
        isLoading={isLoading}
        hasErrors={hasErrors}
        onCancel={onCancel}
      />
    </form>
  );
};

export default UserCreationForm;
