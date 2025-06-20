
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import DocumentFormFields from "./DocumentFormFields";
import { useDocumentForm } from "./useDocumentForm";

interface Document {
  id: number;
  name: string;
  type: string;
  size: string;
  uploadDate: string;
  category: string;
  status: string;
  utilisateurId: number;
}

interface AddDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddDocument: (doc: Omit<Document, 'id'>) => void;
}

const AddDocumentModal = ({ isOpen, onClose, onAddDocument }: AddDocumentModalProps) => {
  const {
    formData,
    setFormData,
    file,
    setFile,
    isLoading,
    setIsLoading,
    categories,
    users,
    resetForm,
    validateForm,
    toast
  } = useDocumentForm(isOpen);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Créer l'objet document pour le callback (pas d'insertion directe ici)
      const newDocument: Omit<Document, 'id'> = {
        name: formData.name,
        type: file ? file.name.split('.').pop()?.toUpperCase() || 'PDF' : 'PDF',
        size: file ? `${(file.size / 1024 / 1024).toFixed(1)} MB` : '0.0 MB',
        uploadDate: new Date().toISOString().split('T')[0],
        category: formData.category,
        status: formData.status,
        utilisateurId: parseInt(formData.utilisateurId)
      };

      // Appeler le callback qui se charge de l'insertion via useDocuments
      await onAddDocument(newDocument);

      // Réinitialiser le formulaire
      resetForm();
      onClose();
    } catch (error) {
      console.error('Erreur lors de l\'ajout du document:', error);
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
          <DocumentFormFields
            formData={formData}
            categories={categories}
            users={users}
            onFormDataChange={setFormData}
            onFileChange={setFile}
          />
          
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
