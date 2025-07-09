
import { useState, useEffect } from "react";
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

interface Senior {
  IDSeniors: number;
  IDUtilisateurSenior: number;
  Utilisateurs: {
    Nom: string;
    Prenom: string;
  };
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
  const [seniors, setSeniors] = useState<Senior[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [loadingSeniors, setLoadingSeniors] = useState(false);
  const { toast } = useToast();
  const { user } = useAuthStore();

  // Charger la liste des seniors
  useEffect(() => {
    if (isOpen && user?.role !== 'support') {
      fetchSeniors();
    }
  }, [isOpen, user]);

  const fetchSeniors = async () => {
    try {
      setLoadingSeniors(true);
      const { data, error } = await supabase
        .from('Seniors')
        .select(`
          IDSeniors,
          IDUtilisateurSenior,
          Utilisateurs (
            Nom,
            Prenom
          )
        `)
        .order('IDSeniors', { ascending: true });

      if (error) {
        console.error('Erreur lors de la récupération des seniors:', error);
        toast({
          title: "Erreur",
          description: "Impossible de charger la liste des seniors.",
          variant: "destructive",
        });
        return;
      }

      setSeniors(data || []);
    } catch (error) {
      console.error('Erreur lors de la récupération des seniors:', error);
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors du chargement des seniors.",
        variant: "destructive",
      });
    } finally {
      setLoadingSeniors(false);
    }
  };

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

    // Déterminer l'ID du senior
    let targetSeniorId: number;
    if (user.role === 'support') {
      // Pour les seniors, utiliser leur propre ID
      targetSeniorId = parseInt(user.id);
    } else {
      // Pour les autres rôles, vérifier qu'un senior a été sélectionné
      if (!selectedSeniorId) {
        toast({
          title: "Senior requis",
          description: "Veuillez sélectionner le senior concerné.",
          variant: "destructive",
        });
        return;
      }
      targetSeniorId = parseInt(selectedSeniorId);
    }

    console.log('Début de l\'upload pour le senior:', targetSeniorId, 'par l\'utilisateur:', user.id, 'avec le rôle:', user.role);
    setUploading(true);

    try {
      // 1. Upload du fichier vers Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${targetSeniorId}/${Date.now()}.${fileExt}`;
      
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

      // 3. Insertion dans DocumentPatrimonial
      console.log('Insertion dans DocumentPatrimonial avec:', {
        TypeDocument: documentType,
        URLDocument: publicUrl,
        IDSeniors: targetSeniorId
      });

      const { error: insertError, data: insertData } = await supabase
        .from('DocumentPatrimonial')
        .insert({
          TypeDocument: documentType,
          URLDocument: publicUrl,
          IDSeniors: targetSeniorId
        })
        .select();

      if (insertError) {
        console.error('Erreur insertion BD:', insertError);
        throw insertError;
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
    setSelectedSeniorId("");
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
          {/* Sélection du senior (seulement pour les non-seniors) */}
          {user?.role !== 'support' && (
            <div>
              <Label htmlFor="senior">Senior concerné *</Label>
              <Select value={selectedSeniorId} onValueChange={setSelectedSeniorId}>
                <SelectTrigger>
                  <SelectValue placeholder={loadingSeniors ? "Chargement..." : "Sélectionner le senior"} />
                </SelectTrigger>
                <SelectContent>
                  {seniors.map((senior) => (
                    <SelectItem key={senior.IDSeniors} value={senior.IDSeniors.toString()}>
                      {senior.Utilisateurs?.Nom} {senior.Utilisateurs?.Prenom} (ID: {senior.IDSeniors})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

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
              disabled={uploading || !documentType || !file || (user?.role !== 'support' && !selectedSeniorId)}
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
