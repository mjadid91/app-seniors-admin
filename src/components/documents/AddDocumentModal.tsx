
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface Document {
  id: number;
  name: string;
  type: string;
  size: string;
  uploadDate: string;
  category: string;
  status: string;
}

interface AddDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddDocument: (doc: Omit<Document, 'id'>) => void;
}

const AddDocumentModal = ({ isOpen, onClose, onAddDocument }: AddDocumentModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    status: "Brouillon",
    description: ""
  });
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const categories = ["Légal", "Documentation", "Qualité", "Formation", "Procédures"];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const newDocument: Omit<Document, 'id'> = {
        name: formData.name,
        type: file ? file.name.split('.').pop()?.toUpperCase() || 'PDF' : 'PDF',
        size: file ? `${(file.size / 1024 / 1024).toFixed(1)} MB` : '0.0 MB',
        uploadDate: new Date().toISOString().split('T')[0],
        category: formData.category,
        status: formData.status
      };

      onAddDocument(newDocument);
      
      toast({
        title: "Document ajouté",
        description: `${formData.name} a été ajouté avec succès.`,
      });

      setFormData({
        name: "",
        category: "",
        status: "Brouillon",
        description: ""
      });
      setFile(null);
      onClose();
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter le document.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Nouveau document</DialogTitle>
          <DialogDescription>
            Ajoutez un nouveau document à la bibliothèque.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nom du document</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Catégorie</Label>
            <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner une catégorie" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Statut</Label>
            <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Brouillon">Brouillon</SelectItem>
                <SelectItem value="Publié">Publié</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="file">Fichier</Label>
            <Input
              id="file"
              type="file"
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx,.txt"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description (optionnel)</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Ajout..." : "Ajouter"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddDocumentModal;
