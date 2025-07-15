
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DocumentsHeaderProps {
  onAddDocument: () => void;
}

const DocumentsHeader = ({ onAddDocument }: DocumentsHeaderProps) => {
  return (
    <div className="page-header">
      <div>
        <h1 className="page-title">Gestion des Documents</h1>
        <p className="page-description">
          Gérez et organisez tous les documents de la plateforme
        </p>
      </div>
      <Button 
        className="bg-primary hover:bg-primary/90"
        onClick={onAddDocument}
      >
        <Plus className="h-4 w-4 mr-2" />
        Nouveau document
      </Button>
    </div>
  );
};

export default DocumentsHeader;
