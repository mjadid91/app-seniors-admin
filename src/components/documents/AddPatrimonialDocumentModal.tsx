
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuthStore } from "@/stores/authStore";
import { Upload, X } from "lucide-react";

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
      // Vérification de la taille du fichier (max 10MB)
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

    if (!documentType || !file || !user) {
      toast({
        title: "Champs requis",
        description: "Veuillez sélectionner un type de document et un fichier.",
        variant: "destructive",
      });
      return;
    }

    // Vérifier que l'utilisateur est bien un senior (support)
    if (user.role !== 'support') {
      toast({
        title: "Accès refusé",
        description: "Seuls les seniors peuvent ajouter des documents patrimoniaux.",
        variant: "destructive",
      });
      return;
    }

    console.log('Début de l\'upload pour l\'utilisateur:', user.id, 'avec le rôle:', user.role);
    setUploading(true);

    try {
      // 1. Upload du fichier vers Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;
      
      console.log('Upload du fichier:', fileName);
      const { error: uploadError, data: uploadData } = await supabase.storage
        .from('documents')
        .upload(`patrimonial/${fileName}`, file);

      if (uploadError) {
        console.error('Erreur upload:', uploadError);
        throw uploadError;
      }

      console.log('Fichier uploadé avec succès:', uploadData);

      // 2. Obtenir l'URL publique du fichier
      const { data: { publicUrl } } = supabase.storage
        .from('documents')
        .getPublicUrl(`patrimonial/${fileName}`);

      console.log('URL publique générée:', publicUrl);

      // 3. Insertion dans DocumentPatrimonial avec l'ID converti en nombre
      const userIdAsNumber = parseInt(user.id);
      console.log('Insertion dans DocumentPatrimonial avec:', {
        TypeDocument: documentType,
        URLDocument: publicUrl,
        IDSeniors: userIdAsNumber
      });

      const { error: insertError, data: insertData } = await supabase
        .from('DocumentPatrimonial')
        .insert({
          TypeDocument: documentType,
          URLDocument: publicUrl,
          IDSeniors: userIdAsNumber
        })
        .select();

      if (insertError) {
        console.error('Erreur insertion BD:', insertError);
        throw insertError;
      }

      console.log('Document inséré avec succès:', insertData);

      toast({
        title: "Document ajouté avec succès",
        description: `Le document ${documentType} a été ajouté à vos documents patrimoniaux.`,
      });

      // Appeler la fonction de rechargement ET fermer le modal
      onUploadSuccess();
      onClose();
      resetForm();
    } catch (error) {
      console.error('Erreur lors de l\'ajout du document:', error);
      toast({
        title: "Erreur",
        description: `Impossible d'ajouter le document: ${error}`,
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
          <DialogTitle className="flex items-center gap-2 text-red-700">
            <Upload className="h-5 w-5" />
            Ajouter un document patrimonial
          </DialogTitle>
        </DialogHeader>

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
