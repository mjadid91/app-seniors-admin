
import { Button } from "@/components/ui/button";

interface ProfileSaveActionsProps {
  onSave: () => void;
  isSaving: boolean;
}

const ProfileSaveActions = ({ onSave, isSaving }: ProfileSaveActionsProps) => {
  return (
    <div className="pt-4 border-t border-slate-200">
      <Button 
        onClick={onSave} 
        disabled={isSaving}
        className="w-full md:w-auto"
      >
        {isSaving ? "Enregistrement..." : "Enregistrer les modifications"}
      </Button>
    </div>
  );
};

export default ProfileSaveActions;
