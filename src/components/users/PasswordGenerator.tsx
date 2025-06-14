
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, RefreshCw } from "lucide-react";

interface PasswordGeneratorProps {
  password: string;
  onPasswordChange: (password: string) => void;
}

const PasswordGenerator = ({ password, onPasswordChange }: PasswordGeneratorProps) => {
  const [showPasswordField, setShowPasswordField] = useState(false);

  const generatePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let newPassword = '';
    for (let i = 0; i < 12; i++) {
      newPassword += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    onPasswordChange(newPassword);
  };

  return (
    <div className="space-y-2">
      <Label>Mot de passe temporaire *</Label>
      <div className="flex gap-2">
        <div className="flex-1">
          <div className="relative">
            <Input
              type={showPasswordField ? "text" : "password"}
              placeholder="Saisir ou générer automatiquement"
              value={password}
              onChange={(e) => onPasswordChange(e.target.value)}
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
  );
};

export default PasswordGenerator;
