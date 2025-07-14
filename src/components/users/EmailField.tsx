
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle } from "lucide-react";
import { UserFormData } from "../../hooks/useUserFormData";

interface EmailFieldProps {
  formData: UserFormData;
  setFormData: (data: UserFormData) => void;
  error?: string | null;
  isChecking?: boolean;
}

const EmailField = ({ formData, setFormData, error, isChecking }: EmailFieldProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="email">Adresse email *</Label>
      <Input
        id="email"
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
        className={error ? "border-red-500" : ""}
      />
      {isChecking && (
        <p className="text-sm text-blue-600 flex items-center gap-1">
          <div className="w-3 h-3 border border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          Vérification de l'email...
        </p>
      )}
      {error && (
        <p className="text-sm text-red-600 flex items-center gap-1">
          <AlertCircle className="w-4 h-4" />
          {error}
        </p>
      )}
    </div>
  );
};

export default EmailField;
