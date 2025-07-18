
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import DocumentFormFields from "./DocumentFormFields";
import { useDocumentForm } from "./useDocumentForm";
import { useFileOperations } from "@/hooks/useFileOperations";

interface AddDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadSuccess: () => void;
}

const AddDocumentModal = ({ isOpen, onClose, onUploadSuccess }: AddDocumentModalProps) => {
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
    toast,
    catNameToId
  } = useDocumentForm(isOpen);

  const { uploadFile, uploading } = useFileOperations();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) { return;}
    if (!file) {toast({
        title: "Erreur",
        description: "Veuillez sélectionner un fichier à uploader.",
        variant: "destructive"
      }); return;}

    const categoryId = catNameToId[formData.category];
    if (!categoryId) { toast({
        title: "Erreur",
        description: "Catégorie non trouvée.",
        variant: "destructive"
      }); return;
    }
    setIsLoading(true);
    try {
      await uploadFile(file, categoryId, () => { onUploadSuccess();resetForm();onClose();
      });
    } catch (error) {
      console.error('Erreur lors de l\'upload du document:', error);
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
            Sélectionnez un fichier et remplissez les informations pour l'ajouter à la bibliothèque.
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
            <Button type="submit" disabled={isLoading || uploading}>
              {(isLoading || uploading) ? "Upload en cours..." : "Ajouter"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddDocumentModal;
