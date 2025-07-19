
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useDocumentForm } from "./useDocumentForm";
import { Document } from "./useDocuments";

interface EditDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  document: Document | null;
  onEditDocument: (id: number, updatedDoc: Partial<Document>) => void;
  categories: string[];
}

const EditDocumentModal = ({ isOpen, onClose, document, onEditDocument, categories }: EditDocumentModalProps) => {
  const { toast } = useToast();
  const {
    formData,
    setFormData,
    users,
    loadCategories,
    loadUsers
  } = useDocumentForm(isOpen);

  // Initialiser le formulaire quand le document change
  useEffect(() => {
    if (document && isOpen) {
      setFormData({
        name: document.name || "",
        category: document.category || "",
        status: document.status || "Brouillon",
        description: document.description || "",
        utilisateurId: document.utilisateurId ? document.utilisateurId.toString() : ""
      });
    }
  }, [document, isOpen, setFormData]);

  const handleFieldChange = (field: keyof typeof formData, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!document) return;

    // Validation
    if (!formData.name.trim() || !formData.category || !formData.utilisateurId) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive"
      });
      return;
    }

    onEditDocument(document.id, {
      name: formData.name.trim(),
      category: formData.category,
      status: formData.status,
      utilisateurId: parseInt(formData.utilisateurId)
    });

    toast({
      title: "Document modifié",
      description: `Le document "${formData.name}" a été modifié avec succès.`
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
            <Label htmlFor="edit-name">Nom du document *</Label>
            <Input
              id="edit-name"
              value={formData.name}
              onChange={(e) => handleFieldChange('name', e.target.value)}
              placeholder="Nom du document"
              required
            />
          </div>

          <div>
            <Label htmlFor="edit-utilisateur">Utilisateur concerné *</Label>
            <Select value={formData.utilisateurId} onValueChange={(value) => handleFieldChange('utilisateurId', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Choisir un utilisateur" />
              </SelectTrigger>
              <SelectContent>
                {users.map(user => (
                  <SelectItem key={user.id} value={user.id.toString()}>
                    {user.fullName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="edit-category">Catégorie *</Label>
            <Select value={formData.category} onValueChange={(value) => handleFieldChange('category', value)}>
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
            <Select value={formData.status} onValueChange={(value) => handleFieldChange('status', value)}>
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
