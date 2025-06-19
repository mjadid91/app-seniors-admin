
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface AddServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onServiceAdded: () => void;
}

const AddServiceModal = ({ isOpen, onClose, onServiceAdded }: AddServiceModalProps) => {
  const [serviceName, setServiceName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!serviceName.trim()) {
      toast({
        title: "Erreur",
        description: "Le nom du service est requis.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase
        .from('ServicePartenaire')
        .insert({
          NomService: serviceName.trim()
        });

      if (error) {
        console.error('Erreur lors de la création du service:', error);
        throw error;
      }

      toast({
        title: "Service créé",
        description: `Le service "${serviceName}" a été créé avec succès.`,
      });

      setServiceName("");
      onServiceAdded();
      onClose();

    } catch (error: any) {
      console.error('Erreur lors de la création du service:', error);
      toast({
        title: "Erreur",
        description: "Impossible de créer le service. " + (error.message || ''),
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Ajouter un nouveau service</DialogTitle>
          <DialogDescription>
            Créer un nouveau service qui pourra être associé aux partenaires.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="serviceName">Nom du service</Label>
            <Input
              id="serviceName"
              value={serviceName}
              onChange={(e) => setServiceName(e.target.value)}
              placeholder="Ex: Jardinage, Ménage, Aide informatique..."
              required
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button 
              type="submit" 
              disabled={isLoading || !serviceName.trim()}
            >
              {isLoading ? "Création..." : "Ajouter le service"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddServiceModal;
