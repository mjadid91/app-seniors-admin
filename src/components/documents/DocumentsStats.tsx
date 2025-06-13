
import { Document } from "./useDocuments";

interface DocumentsStatsProps {
  documents: Document[];
}

const DocumentsStats = ({ documents }: DocumentsStatsProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <h3 className="text-lg font-semibold text-slate-800 mb-4">Statistiques</h3>
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-slate-600">Total documents:</span>
          <span className="font-medium">{documents.length}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-600">Publiés:</span>
          <span className="font-medium text-green-600">{documents.filter(d => d.status === 'Publié').length}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-600">Brouillons:</span>
          <span className="font-medium text-yellow-600">{documents.filter(d => d.status === 'Brouillon').length}</span>
        </div>
      </div>
    </div>
  );
};

export default DocumentsStats;
