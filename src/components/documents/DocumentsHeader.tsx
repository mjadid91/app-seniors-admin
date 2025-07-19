
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

interface DocumentsHeaderProps {
  onAddDocument: () => void;
}

const DocumentsHeader = ({ onAddDocument }: DocumentsHeaderProps) => {
  const isMobile = useIsMobile();

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
        Gestion des Documents
      </h1>
      <Button 
        className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto"
        onClick={onAddDocument}
      >
        <Plus className="h-4 w-4 mr-2" />
        {isMobile ? "Nouveau" : "Nouveau document"}
      </Button>
    </div>
  );
};

export default DocumentsHeader;
