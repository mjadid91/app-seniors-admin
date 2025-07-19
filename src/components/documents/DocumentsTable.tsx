
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Edit, Download, Trash2, MoreHorizontal } from "lucide-react";
import { Document } from "./useDocuments";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DocumentsTableProps {
  documents: Document[];
  onView: (doc: Document) => void;
  onEdit: (doc: Document) => void;
  onDownload: (doc: Document) => void;
  onDelete: (doc: Document) => void;
}

const DocumentsTable = ({ documents, onView, onEdit, onDownload, onDelete }: DocumentsTableProps) => {
  const isMobile = useIsMobile();

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return "N/A";
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  if (isMobile) {
    // Version mobile avec cartes
    return (
      <div className="space-y-4">
        {documents.map((doc) => (
          <div key={doc.id} className="bg-white border border-slate-200 rounded-lg p-4 space-y-3">
            <div className="flex justify-between items-start">
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-slate-800 truncate">{doc.name}</h3>
                <p className="text-sm text-slate-600 truncate">{doc.utilisateurNom || "Non assigné"}</p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                  <DropdownMenuItem onClick={() => onView(doc)}>
                    <Eye className="h-4 w-4 mr-2" />
                    Voir
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onEdit(doc)}>
                    <Edit className="h-4 w-4 mr-2" />
                    Modifier
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onDownload(doc)}>
                    <Download className="h-4 w-4 mr-2" />
                    Télécharger
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => onDelete(doc)}
                    className="text-red-600 focus:text-red-600"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Supprimer
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="text-xs">{doc.category}</Badge>
              <Badge variant={doc.status === 'Publié' ? 'default' : 'outline'} className="text-xs">
                {doc.status}
              </Badge>
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
              <div>
                <span className="font-medium">Date:</span> {formatDate(doc.uploadDate)}
              </div>
              <div>
                <span className="font-medium">Taille:</span> {formatFileSize(doc.size)}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Version desktop avec tableau
  return (
    <div className="min-w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="min-w-48">Nom</TableHead>
            <TableHead className="hidden lg:table-cell">Utilisateur concerné</TableHead>
            <TableHead>Catégorie</TableHead>
            <TableHead className="hidden md:table-cell">Statut</TableHead>
            <TableHead className="hidden lg:table-cell">Date d'upload</TableHead>
            <TableHead className="hidden lg:table-cell">Taille</TableHead>
            <TableHead className="text-right w-32">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {documents.map((doc) => (
            <TableRow key={doc.id}>
              <TableCell className="font-medium">
                <div className="min-w-0">
                  <div className="truncate">{doc.name}</div>
                  <div className="lg:hidden text-sm text-slate-600 truncate">
                    {doc.utilisateurNom || "Non assigné"}
                  </div>
                </div>
              </TableCell>
              <TableCell className="hidden lg:table-cell">{doc.utilisateurNom || "Non assigné"}</TableCell>
              <TableCell>
                <Badge variant="secondary" className="text-xs">{doc.category}</Badge>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <Badge variant={doc.status === 'Publié' ? 'default' : 'outline'} className="text-xs">
                  {doc.status}
                </Badge>
              </TableCell>
              <TableCell className="hidden lg:table-cell text-sm">{formatDate(doc.uploadDate)}</TableCell>
              <TableCell className="hidden lg:table-cell text-sm">{formatFileSize(doc.size)}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onView(doc)}
                    className="h-8 w-8 p-0"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEdit(doc)}
                    className="h-8 w-8 p-0"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDownload(doc)}
                    className="h-8 w-8 p-0 hidden sm:inline-flex"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(doc)}
                    className="h-8 w-8 p-0 text-red-600 hover:text-red-800 hidden sm:inline-flex"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DocumentsTable;
