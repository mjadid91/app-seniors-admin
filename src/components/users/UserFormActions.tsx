
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface UserFormActionsProps {
  isLoading: boolean;
  hasErrors: boolean;
  onCancel: () => void;
}

const UserFormActions = ({ isLoading, hasErrors, onCancel }: UserFormActionsProps) => {
  return (
    <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
      <Button 
        type="button" 
        variant="outline" 
        onClick={onCancel}
        disabled={isLoading}
        className="min-w-[100px]"
      >
        Annuler
      </Button>
      <Button 
        type="submit" 
        disabled={isLoading || hasErrors}
        className="min-w-[150px]"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Création...
          </>
        ) : (
          "Créer l'utilisateur"
        )}
      </Button>
    </div>
  );
};

export default UserFormActions;
