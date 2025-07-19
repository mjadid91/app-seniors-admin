
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DocumentsHeaderProps {
  onAddDocument: () => void;
}

const DocumentsHeader = ({ onAddDocument }: DocumentsHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-3xl font-bold text-slate-800">Gestion des Documents</h1>
      <Button 
        className="bg-blue-600 hover:bg-blue-700"
        onClick={onAddDocument}
      >
        <Plus className="h-4 w-4 mr-2" />
        Nouveau document
      </Button>
    </div>
  );
};

export default DocumentsHeader;
