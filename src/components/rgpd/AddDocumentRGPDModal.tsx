
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";

interface AddDocumentRGPDModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddDocumentRGPDModal = ({ isOpen, onClose }: AddDocumentRGPDModalProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    titre: "",
    typeDoc: "Politique de confidentialité",
    urlFichier: ""
  });
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (file: File) => {
    try {
      setIsUploading(true);

      // Vérification du type
      if (file.type !== "application/pdf") {
        toast({
          title: "Fichier invalide",
          description: "Seuls les fichiers PDF sont autorisés.",
          variant: "destructive",
        });
        return;
      }

      // Vérification de taille (max 10 Mo)
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "Fichier trop volumineux",
          description: "La taille ne doit pas dépasser 10 Mo.",
          variant: "destructive",
        });
        return;
      }

      const sanitizedFileName = file.name
        .normalize("NFD") // enlève les accents
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, "-")           // espaces → tirets
        .replace(/[^\w.-]/g, "");       // caractères spéciaux supprimés

      const fileName = `${Date.now()}-${sanitizedFileName}`;

      const { data, error } = await supabase.storage
        .from("documents-rgpd")
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: true,
        });

      if (error) {
        console.error("Erreur d'upload Supabase:", error);
        toast({
          title: "Erreur upload",
          description: error.message || "Impossible d'envoyer le fichier",
          variant: "destructive",
        });
        return;
      }

      const { data: publicData } = supabase.storage
        .from("documents-rgpd")
        .getPublicUrl(fileName);

      if (!publicData?.publicUrl) {
        toast({
          title: "Erreur",
          description: "Le lien public n'a pas pu être généré.",
          variant: "destructive",
        });
        return;
      }

      setFormData((prev) => ({
        ...prev,
        urlFichier: publicData.publicUrl,
      }));

      toast({
        title: "Fichier prêt",
        description: `PDF "${file.name}" enregistré avec succès.`,
      });

    } catch (error) {
      console.error("Erreur lors de l'upload:", error);
      toast({
        title: "Erreur",
        description: "Une erreur inattendue s'est produite.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.urlFichier) {
      toast({
        title: "Fichier requis",
        description: "Veuillez sélectionner un fichier PDF.",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from("DocumentRGPD")
        .insert({
          Titre: formData.titre,
          TypeDoc: formData.typeDoc,
          URLFichier: formData.urlFichier
        });

      if (error) throw error;

      queryClient.invalidateQueries({ queryKey: ["documents-rgpd"] });

      toast({
        title: "Document ajouté",
        description: "Le document RGPD a été ajouté avec succès"
      });

      onClose();
      setFormData({
        titre: "",
        typeDoc: "Politique de confidentialité",
        urlFichier: ""
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter le document",
        variant: "destructive"
      });
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
            <label className="block text-sm font-medium mb-1">Fichier PDF</label>
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  handleFileUpload(file);
                }
              }}
              className="border border-slate-300 rounded px-3 py-2 w-full"
              required={!formData.urlFichier}
              disabled={isUploading}
            />

            {formData.urlFichier && (
              <p className="text-xs text-green-600 mt-2">
                ✅ Fichier prêt :{" "}
                <a
                  href={formData.urlFichier}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  Voir le PDF
                </a>
              </p>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit" disabled={isUploading}>
              {isUploading ? "Upload..." : "Ajouter"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddDocumentRGPDModal;
