
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Document } from "./useDocuments";

interface EditDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  document: Document | null;
  onEditDocument: (id: number, updatedDoc: Partial<Document>) => void;
  categories: string[];
}

const EditDocumentModal = ({ isOpen, onClose, document, onEditDocument, categories }: EditDocumentModalProps) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const { toast } = useToast();

  // Initialize form when document changes
  useState(() => {
    if (document) {
      setName(document.name);
      setCategory(document.category);
      setStatus(document.status);
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!document) return;

    onEditDocument(document.id, {
      name: name.trim(),
      category,
      status
    });

    toast({
      title: "Document modifié",
      description: `Le document "${name}" a été modifié avec succès.`
    });

    onClose();
  };

  if (!document) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Modifier le document</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="edit-name">Nom du document</Label>
            <Input
              id="edit-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nom du document"
              required
            />
          </div>

          <div>
            <Label htmlFor="edit-category">Catégorie</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner une catégorie" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="edit-status">Statut</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Brouillon">Brouillon</SelectItem>
                <SelectItem value="Publié">Publié</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit">
              Modifier
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditDocumentModal;
