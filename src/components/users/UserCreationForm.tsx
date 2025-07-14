
import { useUserFormData } from "../../hooks/useUserFormData";
import { useUserCategories } from "../../hooks/useUserCategories";
import { useEmailValidation } from "./useEmailValidation";
import { useFormValidation } from "../../hooks/useFormValidation";
import PasswordGenerator from "./PasswordGenerator";
import { CreateUserData } from "./userTypes";
import UserBasicInfoFields from "./UserBasicInfoFields";
import EmailField from "./EmailField";
import RoleSelector from "./RoleSelector";
import PreferencesFields from "./PreferencesFields";
import UserFormActions from "./UserFormActions";
import { useToast } from '@/hooks/use-toast';
import { useCallback, useMemo } from 'react';

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
  const { toast } = useToast();

  // Règles de validation
  const validationRules = useMemo(() => ({
    nom: {
      required: true,
      minLength: 2,
      maxLength: 50,
      pattern: /^[a-zA-ZÀ-ÿ\s-']+$/,
    },
    prenom: {
      required: true,
      minLength: 2,
      maxLength: 50,
      pattern: /^[a-zA-ZÀ-ÿ\s-']+$/,
    },
    email: {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    categoryId: {
      required: true,
      custom: (value: number) => {
        if (!value || value === 0) return 'Veuillez sélectionner un rôle';
        return null;
      },
    },
    languePreferee: {
      required: true,
    },
    devise: {
      required: true,
    },
  }), []);

  const { errors, validateForm, validateSingleField, hasErrors } = useFormValidation(validationRules);

  // Validation du mot de passe
  const validatePassword = useCallback((password: string): string | null => {
    if (!password?.trim()) {
      return 'Le mot de passe est requis';
    }
    if (password.length < 8) {
      return 'Le mot de passe doit contenir au moins 8 caractères';
    }
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      return 'Le mot de passe doit contenir au moins une minuscule, une majuscule et un chiffre';
    }
    return null;
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Validation des données du formulaire
      const isFormValid = await validateForm(formData);
      
      // Validation de l'email (erreurs existantes)
      if (emailError) {
        toast({
          title: "Erreur de validation",
          description: "Veuillez corriger l'email avant de continuer",
          variant: "destructive",
        });
        return;
      }

      // Validation du mot de passe
      const passwordError = validatePassword(password);
      if (passwordError) {
        toast({
          title: "Erreur de mot de passe",
          description: passwordError,
          variant: "destructive",
        });
        return;
      }

      // Vérification des champs en cours de validation
      if (isEmailChecking || categoriesLoading) {
        toast({
          title: "Validation en cours",
          description: "Veuillez attendre la fin de la validation",
          variant: "default",
        });
        return;
      }

      // Si toutes les validations passent
      if (!isFormValid || hasErrors) {
        toast({
          title: "Erreurs de validation",
          description: "Veuillez corriger les erreurs avant de soumettre le formulaire",
          variant: "destructive",
        });
        return;
      }

      const newUser: CreateUserData = {
        nom: formData.nom.trim(),
        prenom: formData.prenom.trim(),
        email: formData.email.trim().toLowerCase(),
        categoryId: formData.categoryId,
        dateInscription: new Date().toISOString().split('T')[0],
        languePreferee: formData.languePreferee,
        devise: formData.devise
      };

      console.log('UserCreationForm: Submitting validated user data:', newUser);
      onSubmit(newUser, password);
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: "Erreur",
        description: "Une erreur inattendue s'est produite lors de la soumission",
        variant: "destructive",
      });
    }
  }, [
    formData,
    password,
    emailError,
    isEmailChecking,
    categoriesLoading,
    validateForm,
    validatePassword,
    hasErrors,
    onSubmit,
    toast
  ]);

  // Gestion des changements de champs avec validation
  const handleFieldChange = useCallback((field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Validation immédiate du champ modifié
    setTimeout(() => validateSingleField(field, value), 100);
  }, [setFormData, validateSingleField]);

  const hasFormErrors = hasErrors || !!emailError || isEmailChecking || categoriesLoading;

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <UserBasicInfoFields 
        formData={formData} 
        setFormData={handleFieldChange}
        errors={errors}
      />
      
      <EmailField 
        formData={formData} 
        setFormData={handleFieldChange}
        error={emailError}
        isChecking={isEmailChecking}
      />

      <RoleSelector 
        formData={formData} 
        setFormData={handleFieldChange}
        error={errors.categoryId}
      />

      <PasswordGenerator 
        password={password}
        onPasswordChange={setPassword}
        error={validatePassword(password)}
      />

      <PreferencesFields 
        formData={formData} 
        setFormData={handleFieldChange}
        errors={{
          languePreferee: errors.languePreferee,
          devise: errors.devise
        }}
      />

      <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg">
        <p className="text-sm text-blue-700">
          <strong>Information :</strong> Le mot de passe sera affiché une seule fois après la création du compte. L'utilisateur devra le modifier lors de sa première connexion.
        </p>
      </div>

      <UserFormActions 
        isLoading={isLoading}
        hasErrors={hasFormErrors}
        onCancel={onCancel}
      />
    </form>
  );
};

export default UserCreationForm;
