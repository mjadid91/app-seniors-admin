
import { Plus, FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const DocumentsQuickActions = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <h3 className="text-lg font-semibold text-slate-800 mb-4">Actions rapides</h3>
      <div className="space-y-2">
        <Button variant="outline" className="w-full justify-start">
          <Plus className="h-4 w-4 mr-2" />
          Nouveau template
        </Button>
        <Button variant="outline" className="w-full justify-start">
          <FileText className="h-4 w-4 mr-2" />
          Importer en lot
        </Button>
        <Button variant="outline" className="w-full justify-start">
          <Download className="h-4 w-4 mr-2" />
          Exporter la liste
        </Button>
      </div>
    </div>
  );
};

export default DocumentsQuickActions;
