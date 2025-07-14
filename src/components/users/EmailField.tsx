
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle } from "lucide-react";
import { useEmailValidation } from "./useEmailValidation";
import { UserFormData } from "../../hooks/useUserFormData";

interface EmailFieldProps {
  formData: UserFormData;
  setFormData: (data: UserFormData) => void;
}

const EmailField = ({ formData, setFormData }: EmailFieldProps) => {
  const { emailError, isEmailChecking } = useEmailValidation(formData.email);

  return (
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
  );
};

export default EmailField;
export { useEmailValidation };
