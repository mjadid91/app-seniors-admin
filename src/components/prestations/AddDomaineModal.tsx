import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

interface AddDomaineModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

const AddDomaineModal = ({ isOpen, onClose, onSuccess }: AddDomaineModalProps) => {
    const { toast } = useToast();
    const [newDomaine, setNewDomaine] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Récupérer tous les domaines existants
    const { data: domaines = [], refetch } = useQuery({
        queryKey: ["domaines"],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("Domaine")
                .select("IDDomaine, DomaineTitre")
                .order("DomaineTitre");

            if (error) throw error;
            return data;
        },
    });

    const handleAddDomaine = async (e: React.FormEvent) => {
        e.preventDefault();
        const nom = newDomaine.trim();

        if (!nom) return;

        const domaineExiste = domaines.some(
            (d) => d.DomaineTitre.toLowerCase() === nom.toLowerCase()
        );

        if (domaineExiste) {
            toast({
                title: "Domaine existant",
                description: "Ce domaine existe déjà.",
                variant: "destructive",
            });
            return;
        }

        setIsSubmitting(true);

        try {
            const { error } = await supabase
                .from("Domaine")
                .insert({ DomaineTitre: nom });

            if (error) throw error;

            toast({
                title: "Domaine ajouté",
                description: `Le domaine "${nom}" a été ajouté avec succès.`,
            });

            setNewDomaine("");
            refetch(); // Recharge la liste
            onSuccess();
        } catch (error) {
            console.error("Erreur ajout domaine:", error);
            toast({
                title: "Erreur",
                description: "Impossible d'ajouter ce domaine.",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Ajouter un domaine</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleAddDomaine} className="space-y-4">
                    <Input
                        placeholder="Nom du domaine (ex : Bien-être)"
                        value={newDomaine}
                        onChange={(e) => setNewDomaine(e.target.value)}
                        required
                    />
                    <div className="flex justify-end">
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Ajout..." : "Ajouter"}
                        </Button>
                    </div>
                </form>

                <div className="mt-6">
                    <p className="text-sm text-slate-600 mb-2 font-medium">Domaines existants :</p>
                    <ul className="text-sm text-slate-700 list-disc list-inside space-y-1 max-h-40 overflow-y-auto border p-2 rounded-md bg-slate-50">
                        {domaines.map((d) => (
                            <li key={d.IDDomaine}>{d.DomaineTitre}</li>
                        ))}
                    </ul>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default AddDomaineModal;
