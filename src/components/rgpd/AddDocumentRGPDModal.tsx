
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";

interface AddDocumentRGPDModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const AddDocumentRGPDModal = ({ isOpen, onClose, onSuccess }: AddDocumentRGPDModalProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    titre: "",
    typeDoc: "Politique de confidentialité",
    urlFichier: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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

      setFormData({
        titre: "",
        typeDoc: "Politique de confidentialité",
        urlFichier: ""
      });
      onSuccess();
      onClose();
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
            <label className="block text-sm font-medium mb-1">URL du fichier</label>
            <Textarea
              value={formData.urlFichier}
              onChange={(e) => setFormData(prev => ({ ...prev, urlFichier: e.target.value }))}
              placeholder="https://exemple.com/document.pdf"
              required
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit">
              Ajouter
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddDocumentRGPDModal;
