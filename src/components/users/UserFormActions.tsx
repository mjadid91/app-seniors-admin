
import { Button } from "@/components/ui/button";

interface UserFormActionsProps {
  isLoading: boolean;
  hasErrors: boolean;
  onCancel: () => void;
}

const UserFormActions = ({ isLoading, hasErrors, onCancel }: UserFormActionsProps) => {
  return (
    <div className="flex justify-end space-x-2">
      <Button type="button" variant="outline" onClick={onCancel}>
        Annuler
      </Button>
      <Button 
        type="submit" 
        disabled={isLoading || hasErrors}
      >
        {isLoading ? "Création..." : "Créer l'utilisateur"}
      </Button>
    </div>
  );
};

export default UserFormActions;
