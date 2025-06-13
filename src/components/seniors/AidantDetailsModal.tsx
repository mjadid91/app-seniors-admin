
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { UserCheck } from "lucide-react";
import { Aidant } from "../../types/seniors";
import AidantPersonalInfo from "./AidantPersonalInfo";
import AidantProfessionalInfo from "./AidantProfessionalInfo";
import AidantAvailability from "./AidantAvailability";
import AidantEvaluations from "./AidantEvaluations";
import AidantSystemInfo from "./AidantSystemInfo";

interface AidantDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  aidant: Aidant | null;
}

const AidantDetailsModal = ({ isOpen, onClose, aidant }: AidantDetailsModalProps) => {
  if (!aidant) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserCheck className="h-5 w-5 text-blue-600" />
            Détails de l'aidant {aidant.prenom} {aidant.nom}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <AidantPersonalInfo aidant={aidant} />
          <AidantProfessionalInfo aidant={aidant} />
          <AidantAvailability aidant={aidant} />
          <AidantEvaluations aidant={aidant} />
          <AidantSystemInfo aidant={aidant} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AidantDetailsModal;
