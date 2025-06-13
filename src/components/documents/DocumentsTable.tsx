
import { FileText, Eye, Edit, Download, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Document } from "./useDocuments";

interface DocumentsTableProps {
  documents: Document[];
  onView: (doc: Document) => void;
  onEdit: (doc: Document) => void;
  onDownload: (doc: Document) => void;
  onDelete: (docId: number) => void;
}

const DocumentsTable = ({ 
  documents, 
  onView, 
  onEdit, 
  onDownload, 
  onDelete 
}: DocumentsTableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-200">
            <th className="text-left py-3 px-4 font-medium text-slate-600">Document</th>
            <th className="text-left py-3 px-4 font-medium text-slate-600">Catégorie</th>
            <th className="text-left py-3 px-4 font-medium text-slate-600">Taille</th>
            <th className="text-left py-3 px-4 font-medium text-slate-600">Date d'upload</th>
            <th className="text-left py-3 px-4 font-medium text-slate-600">Statut</th>
            <th className="text-left py-3 px-4 font-medium text-slate-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          {documents.map((doc) => (
            <tr key={doc.id} className="border-b border-slate-100 hover:bg-slate-50">
              <td className="py-4 px-4">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-slate-800">{doc.name}</p>
                    <p className="text-sm text-slate-500">{doc.type}</p>
                  </div>
                </div>
              </td>
              <td className="py-4 px-4">
                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                  {doc.category}
                </span>
              </td>
              <td className="py-4 px-4 text-slate-600">{doc.size}</td>
              <td className="py-4 px-4 text-slate-600">{new Date(doc.uploadDate).toLocaleDateString('fr-FR')}</td>
              <td className="py-4 px-4">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  doc.status === 'Publié' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {doc.status}
                </span>
              </td>
              <td className="py-4 px-4">
                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => onView(doc)}
                    title="Visualiser"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => onEdit(doc)}
                    title="Modifier"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => onDownload(doc)}
                    title="Télécharger"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-red-600 hover:text-red-700"
                    onClick={() => onDelete(doc.id)}
                    title="Supprimer"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DocumentsTable;
