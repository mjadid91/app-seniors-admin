
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { useFileOperationsRGPD } from "@/hooks/useFileOperationsRGPD";
import { Upload, X, File } from "lucide-react";

interface AddDocumentRGPDModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const AddDocumentRGPDModal = ({ isOpen, onClose, onSuccess }: AddDocumentRGPDModalProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { uploadDocumentRGPD, uploading } = useFileOperationsRGPD();
  const [formData, setFormData] = useState({
    titre: "",
    typeDoc: "Politique de confidentialité"
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Vérifier la taille du fichier (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "Erreur",
          description: "Le fichier est trop volumineux. Taille maximale : 10MB",
          variant: "destructive"
        });
        return;
      }
      setSelectedFile(file);
      // Auto-remplir le titre avec le nom du fichier si vide
      if (!formData.titre) {
        setFormData(prev => ({ ...prev, titre: file.name.replace(/\.[^/.]+$/, "") }));
      }
    }
  };

  const removeSelectedFile = () => {
    setSelectedFile(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.titre) {
      toast({
        title: "Erreur",
        description: "Veuillez saisir un titre pour le document",
        variant: "destructive"
      });
      return;
    }

    if (!selectedFile) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner un fichier à uploader",
        variant: "destructive"
      });
      return;
    }

    try {
      await uploadDocumentRGPD(
        selectedFile,
        formData.titre,
        formData.typeDoc,
        () => {
          queryClient.invalidateQueries({ queryKey: ["documents-rgpd"] });
          setFormData({
            titre: "",
            typeDoc: "Politique de confidentialité"
          });
          setSelectedFile(null);
          onSuccess();
          onClose();
        }
      );
    } catch (error) {
      console.error('Erreur lors de l\'upload du document RGPD:', error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Ajouter un document RGPD</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Titre du document</label>
            <Input
              value={formData.titre}
              onChange={(e) => setFormData(prev => ({ ...prev, titre: e.target.value }))}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Type de document</label>
            <Select value={formData.typeDoc} onValueChange={(value) => setFormData(prev => ({ ...prev, typeDoc: value }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Politique de confidentialité">Politique de confidentialité</SelectItem>
                <SelectItem value="Conditions d'utilisation">Conditions d'utilisation</SelectItem>
                <SelectItem value="Politique de cookies">Politique de cookies</SelectItem>
                <SelectItem value="Mentions légales">Mentions légales</SelectItem>
                <SelectItem value="Registre de traitement">Registre de traitement</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Sélectionner un fichier</label>
            <Input
              type="file"
              onChange={handleFileSelect}
              accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.gif"
              disabled={uploading}
              className="cursor-pointer"
            />
            <p className="text-xs text-slate-500 mt-1">
              Formats acceptés : PDF, DOC, DOCX, TXT, JPG, PNG, GIF (max 10MB)
            </p>
          </div>

          {selectedFile && (
            <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-lg border">
              <File className="h-4 w-4 text-blue-600" />
              <span className="text-sm flex-1">{selectedFile.name}</span>
              <span className="text-xs text-slate-500">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={removeSelectedFile}
                disabled={uploading}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit" disabled={uploading}>
              {uploading ? "Upload en cours..." : "Ajouter"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddDocumentRGPDModal;
