
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useSupabaseSeniors } from "@/hooks/useSupabaseSeniors";
import { Upload, X, Shield } from "lucide-react";

interface AddPatrimonialDocumentTestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
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

const AddPatrimonialDocumentTestModal = ({ isOpen, onClose, onSuccess }: AddPatrimonialDocumentTestModalProps) => {
  const [selectedSeniorId, setSelectedSeniorId] = useState("");
  const [documentType, setDocumentType] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();
  const { seniors, loading: loadingSeniors } = useSupabaseSeniors();

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

    if (!selectedSeniorId || !documentType || !file) {
      toast({
        title: "Champs requis",
        description: "Veuillez sélectionner un senior, un type de document et un fichier.",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);

    try {
      // Simulation d'upload pour test
      await new Promise(resolve => setTimeout(resolve, 2000));

      toast({
        title: "Document ajouté (test)",
        description: `Document ${documentType} pour le senior ${selectedSeniorId} ajouté avec succès (simulation).`,
      });

      onSuccess();
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
    setSelectedSeniorId("");
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
            Ajouter un document patrimonial (Test)
          </DialogTitle>
        </DialogHeader>

        {/* Avertissement de test */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
          <div className="flex items-start gap-2">
            <Shield className="h-4 w-4 text-yellow-600 mt-0.5" />
            <div>
              <p className="text-sm text-yellow-800 font-medium">Mode test</p>
              <p className="text-xs text-yellow-700 mt-1">
                Cette fonctionnalité est en mode test et ne sauvegarde pas réellement les documents.
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="senior">Senior *</Label>
            <Select value={selectedSeniorId} onValueChange={setSelectedSeniorId}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un senior" />
              </SelectTrigger>
              <SelectContent>
                {loadingSeniors ? (
                  <SelectItem value="loading" disabled>Chargement...</SelectItem>
                ) : (
                  seniors.map((senior) => (
                    <SelectItem key={senior.id} value={senior.id}>
                      {senior.nom} {senior.prenom} ({senior.email})
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>

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
              disabled={uploading || !selectedSeniorId || !documentType || !file}
              className="bg-red-600 hover:bg-red-700"
            >
              {uploading ? "Ajout en cours..." : "Ajouter le document (Test)"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddPatrimonialDocumentTestModal;
