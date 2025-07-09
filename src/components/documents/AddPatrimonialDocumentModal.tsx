
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuthStore } from "@/stores/authStore";
import { Upload, X, Shield } from "lucide-react";

interface AddPatrimonialDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadSuccess: () => void;
}

const documentTypes = [
  "Testament",
  "Acte de propriété",
  "Contrat d'assurance-vie",
  "Titre de propriété",
  "Acte notarié",
  "Document bancaire",
  "Procuration",
  "Autre document patrimonial"
];

const AddPatrimonialDocumentModal = ({ isOpen, onClose, onUploadSuccess }: AddPatrimonialDocumentModalProps) => {
  const [documentType, setDocumentType] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuthStore();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      // Vérification de la taille du fichier (max 10MB pour documents sensibles)
      if (selectedFile.size > 10 * 1024 * 1024) {
        toast({
          title: "Fichier trop volumineux",
          description: "La taille maximale autorisée est de 10 MB.",
          variant: "destructive",
        });
        return;
      }

      // Vérification du type de fichier
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(selectedFile.type)) {
        toast({
          title: "Type de fichier non autorisé",
          description: "Seuls les fichiers PDF, Word et images sont autorisés.",
          variant: "destructive",
        });
        return;
      }

      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!documentType || !file) {
      toast({
        title: "Champs requis",
        description: "Veuillez sélectionner un type de document et un fichier.",
        variant: "destructive",
      });
      return;
    }

    if (user?.role !== 'support') {
      toast({
        title: "Accès refusé",
        description: "Seuls les seniors peuvent ajouter des documents patrimoniaux.",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);

    try {
      // Upload du fichier vers Supabase Storage (bucket sécurisé)
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('documents-patrimoniaux')
        .upload(fileName, file);

      if (uploadError) {
        throw uploadError;
      }

      // Insertion des métadonnées dans la base de données
      const { error: insertError } = await supabase
        .from('DocumentPatrimonial')
        .insert({
          TypeDocument: documentType,
          URLDocument: fileName,
          IDSeniors: parseInt(user.id),
        });

      if (insertError) {
        throw insertError;
      }

      toast({
        title: "Document ajouté",
        description: "Votre document patrimonial a été ajouté avec succès.",
      });

      onUploadSuccess();
      onClose();
      resetForm();
    } catch (error) {
      console.error('Erreur lors de l\'ajout du document:', error);
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter le document. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const resetForm = () => {
    setDocumentType("");
    setFile(null);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-red-600" />
            Ajouter un document patrimonial
          </DialogTitle>
        </DialogHeader>

        {/* Avertissement de confidentialité */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
          <div className="flex items-start gap-2">
            <Shield className="h-4 w-4 text-red-600 mt-0.5" />
            <div>
              <p className="text-sm text-red-800 font-medium">Document hautement confidentiel</p>
              <p className="text-xs text-red-700 mt-1">
                Ce document sera stocké de manière sécurisée et ne sera accessible qu'à vous-même.
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="documentType">Type de document *</Label>
            <Select value={documentType} onValueChange={setDocumentType}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner le type de document" />
              </SelectTrigger>
              <SelectContent>
                {documentTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="file">Fichier *</Label>
            <div className="mt-2">
              <Input
                id="file"
                type="file"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                className="cursor-pointer"
              />
              {file && (
                <div className="mt-2 flex items-center gap-2 text-sm text-slate-600">
                  <Upload className="h-4 w-4" />
                  <span>{file.name}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setFile(null)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              )}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Formats autorisés : PDF, Word, JPEG, PNG (max 10 MB)
            </p>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={handleClose}>
              Annuler
            </Button>
            <Button
              type="submit"
              disabled={uploading || !documentType || !file}
              className="bg-red-600 hover:bg-red-700"
            >
              {uploading ? "Ajout en cours..." : "Ajouter le document"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddPatrimonialDocumentModal;
