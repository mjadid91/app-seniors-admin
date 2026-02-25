import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Shield, Calendar, Download, Eye } from "lucide-react";

// ✅ CORRECTION 1 : Importer l'interface PatrimonialDocument depuis ton hook
import { PatrimonialDocument } from "./usePatrimonialDocuments";

interface ViewPatrimonialDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  // ✅ CORRECTION 2 : Remplacer 'any' par 'PatrimonialDocument | null'
  document: PatrimonialDocument | null;
}

const ViewPatrimonialDocumentModal = ({ isOpen, onClose, document }: ViewPatrimonialDocumentModalProps) => {
  if (!document) return null;

  return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-red-600" />
              Détails du document patrimonial
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {/* Avertissement de confidentialité */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-red-600" />
                <span className="text-sm font-medium text-red-800">Document confidentiel</span>
              </div>
            </div>

            {/* Informations du document */}
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-slate-600">Type de document</label>
                <p className="text-slate-800">{document.TypeDocument}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-slate-600">Date d'ajout</label>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-slate-500" />
                  <p className="text-slate-800">
                    {document.dateCreation
                        ? new Date(document.dateCreation).toLocaleDateString('fr-FR')
                        : 'Date non disponible'
                    }
                  </p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-slate-600">Statut de confidentialité</label>
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4 text-red-600" />
                  <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">
                  Hautement confidentiel
                </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-between items-center pt-4 border-t">
              <Button variant="outline" onClick={onClose}>
                Fermer
              </Button>

              <Button className="bg-red-600 hover:bg-red-700">
                <Download className="h-4 w-4 mr-2" />
                Télécharger
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
  );
};

export default ViewPatrimonialDocumentModal;