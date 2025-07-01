
import { Upload, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

const DocumentsUpload = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <div className="flex items-center gap-3 mb-4">
        <Upload className="h-6 w-6 text-blue-600" />
        <h3 className="text-lg font-semibold text-slate-800">Upload rapide</h3>
      </div>
      <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center">
        <FileText className="h-8 w-8 text-slate-400 mx-auto mb-2" />
        <p className="text-slate-600 mb-2">Glissez vos fichiers ici</p>
        <Button variant="outline" size="sm">
          Parcourir les fichiers
        </Button>
      </div>
    </div>
  );
};

export default DocumentsUpload;
