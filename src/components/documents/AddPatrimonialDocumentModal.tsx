
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuthStore } from "@/stores/authStore";
import { useSupabaseSeniors } from "@/hooks/useSupabaseSeniors";
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
  const [selectedSeniorId, setSelectedSeniorId] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuthStore();
  const { seniors } = useSupabaseSeniors();

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
      const allowedTypes = [
        'application/pdf', 
        'image/jpeg', 
        'image/jpg',
        'image/png', 
        'application/msword', 
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ];
      
      if (!allowedTypes.includes(selectedFile.type)) {
        toast({
          title: "Type de fichier non autorisé",
          description: "Seuls les fichiers PDF, Word et images (JPEG, PNG) sont autorisés.",
          variant: "destructive",
        });
        return;
      }

      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!documentType || !file || !user || !selectedSeniorId) {
      toast({
        title: "Champs requis",
        description: "Veuillez sélectionner un type de document, un senior et un fichier.",
        variant: "destructive",
      });
      return;
    }

    console.log('Début de l\'upload pour le senior:', selectedSeniorId, 'par l\'utilisateur:', user.id);
    setUploading(true);

    try {
      // Utiliser directement l'ID du senior sélectionné
      const seniorId = parseInt(selectedSeniorId);
      
      if (isNaN(seniorId)) {
        throw new Error('ID Senior invalide');
      }

      console.log('Senior ID sélectionné:', seniorId);

      // Upload du fichier vers Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${seniorId}/${Date.now()}.${fileExt}`;
      
      console.log('Upload du fichier:', fileName);
      const { error: uploadError, data: uploadData } = await supabase.storage
        .from('documents')
        .upload(`patrimonial/${fileName}`, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        console.error('Erreur upload:', uploadError);
        throw new Error(`Erreur d'upload: ${uploadError.message}`);
      }

      console.log('Fichier uploadé avec succès:', uploadData);

      // Obtenir l'URL publique du fichier
      const { data: { publicUrl } } = supabase.storage
        .from('documents')
        .getPublicUrl(`patrimonial/${fileName}`);

      console.log('URL publique générée:', publicUrl);

      // Insertion dans DocumentPatrimonial avec l'IDSeniors sélectionné
      console.log('Insertion dans DocumentPatrimonial avec:', {
        TypeDocument: documentType,
        URLDocument: publicUrl,
        IDSeniors: seniorId
      });

      const { error: insertError, data: insertData } = await supabase
        .from('DocumentPatrimonial')
        .insert({
          TypeDocument: documentType,
          URLDocument: publicUrl,
          IDSeniors: seniorId
        })
        .select();

      if (insertError) {
        console.error('Erreur insertion BD:', insertError);
        // En cas d'erreur d'insertion, supprimer le fichier uploadé
        await supabase.storage
          .from('documents')
          .remove([`patrimonial/${fileName}`]);
        
        throw new Error(`Erreur d'insertion: ${insertError.message}`);
      }

      console.log('Document inséré avec succès:', insertData);

      toast({
        title: "Document ajouté avec succès",
        description: `Le document ${documentType} a été ajouté aux documents patrimoniaux.`,
      });

      // Appeler la fonction de rechargement ET fermer le modal
      onUploadSuccess();
      onClose();
      resetForm();
      
    } catch (error: any) {
      console.error('Erreur lors de l\'ajout du document:', error);
      toast({
        title: "Erreur",
        description: error.message || "Impossible d'ajouter le document. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const resetForm = () => {
    setDocumentType("");
    setSelectedSeniorId("");
    setFile(null);
  };

  const handleClose = () => {
    if (!uploading) {
      resetForm();
      onClose();
    }
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
            <Label htmlFor="senior">Senior associé *</Label>
            <Select value={selectedSeniorId} onValueChange={setSelectedSeniorId} disabled={uploading}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner le senior" />
              </SelectTrigger>
              <SelectContent>
                {seniors.map((senior) => (
                  <SelectItem key={senior.id} value={senior.id}>
                    {senior.prenom} {senior.nom}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="documentType">Type de document *</Label>
            <Select value={documentType} onValueChange={setDocumentType} disabled={uploading}>
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
                disabled={uploading}
              />
              {file && (
                <div className="mt-2 flex items-center gap-2 text-sm text-slate-600">
                  <Upload className="h-4 w-4" />
                  <span>{file.name}</span>
                  {!uploading && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setFile(null)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              )}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Formats autorisés : PDF, Word, JPEG, PNG (max 10 MB)
            </p>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleClose}
              disabled={uploading}
            >
              Annuler
            </Button>
            <Button
              type="submit"
              disabled={uploading || !documentType || !file || !selectedSeniorId}
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
