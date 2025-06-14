
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface PasswordConfirmationProps {
  password: string;
  onClose: () => void;
}

const PasswordConfirmation = ({ password, onClose }: PasswordConfirmationProps) => {
  const { toast } = useToast();

  const copyPassword = () => {
    navigator.clipboard.writeText(password);
    toast({
      title: "Copié",
      description: "Le mot de passe a été copié dans le presse-papier.",
    });
  };

  return (
    <div className="space-y-4">
      <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
        <h3 className="font-medium text-green-800 mb-3">✅ Utilisateur créé avec succès</h3>
        <div className="space-y-3">
          <div>
            <Label className="text-sm font-medium text-green-700">Mot de passe temporaire :</Label>
            <div className="flex items-center gap-2 bg-white p-3 rounded border mt-1">
              <code className="flex-1 font-mono text-sm break-all">{password}</code>
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
        <Button onClick={onClose}>
          Fermer
        </Button>
      </div>
    </div>
  );
};

export default PasswordConfirmation;
