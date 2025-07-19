
import { useState, useEffect } from "react";
import { ResponsiveDialog, ResponsiveDialogContent, ResponsiveDialogHeader, ResponsiveDialogTitle } from "@/components/ui/responsive-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useDocumentForm } from "./useDocumentForm";
import { Document } from "./useDocuments";
import { useIsMobile } from "@/hooks/use-mobile";

interface EditDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  document: Document | null;
  onEditDocument: (id: number, updatedDoc: Partial<Document>) => void;
  categories: string[];
}

const EditDocumentModal = ({ isOpen, onClose, document, onEditDocument, categories }: EditDocumentModalProps) => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const {
    formData,
    setFormData,
    users
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
    <ResponsiveDialog open={isOpen} onOpenChange={onClose}>
      <ResponsiveDialogContent className={isMobile ? "max-w-[95vw]" : "max-w-md"}>
        <ResponsiveDialogHeader>
          <ResponsiveDialogTitle>Modifier le document</ResponsiveDialogTitle>
        </ResponsiveDialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="edit-name">Nom du document *</Label>
            <Input
              id="edit-name"
              value={formData.name}
              onChange={(e) => handleFieldChange('name', e.target.value)}
              placeholder="Nom du document"
              required
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-utilisateur">Utilisateur concerné *</Label>
            <Select value={formData.utilisateurId} onValueChange={(value) => handleFieldChange('utilisateurId', value)}>
              <SelectTrigger className="w-full">
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

          <div className="space-y-2">
            <Label htmlFor="edit-category">Catégorie *</Label>
            <Select value={formData.category} onValueChange={(value) => handleFieldChange('category', value)}>
              <SelectTrigger className="w-full">
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

          <div className="space-y-2">
            <Label htmlFor="edit-status">Statut</Label>
            <Select value={formData.status} onValueChange={(value) => handleFieldChange('status', value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Sélectionner un statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Brouillon">Brouillon</SelectItem>
                <SelectItem value="Publié">Publié</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className={`flex gap-3 pt-4 ${isMobile ? 'flex-col-reverse' : 'justify-end'}`}>
            <Button type="button" variant="outline" onClick={onClose} className={isMobile ? 'w-full' : ''}>
              Annuler
            </Button>
            <Button type="submit" className={isMobile ? 'w-full' : ''}>
              Modifier
            </Button>
          </div>
        </form>
      </ResponsiveDialogContent>
    </ResponsiveDialog>
  );
};

export default EditDocumentModal;
