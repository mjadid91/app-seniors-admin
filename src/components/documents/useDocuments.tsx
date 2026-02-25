import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface Document {
    id: number;
    name: string;
    type: string;
    category: string;
    status: string;
    uploadDate: string;
    size?: number;
    utilisateurNom?: string;
    url?: string;
}

export const useDocuments = () => {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    // 1. Chargement avec cache et auto-refresh
    const { data: documents = [], isLoading, refetch } = useQuery({
        queryKey: ["admin-documents"],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("Document")
                .select(`
          IDDocument, Titre, TypeFichier, URLFichier, DateUpload, TailleFichier, Statut,
          CategorieDocument!inner(NomCategorie),
          Utilisateurs(Nom, Prenom)
        `)
                .order('DateUpload', { ascending: false });

            if (error) throw error;

            return data.map((doc: any) => ({
                id: doc.IDDocument,
                name: doc.Titre,
                type: doc.TypeFichier,
                category: doc.CategorieDocument?.NomCategorie || "Sans catégorie",
                status: doc.Statut,
                uploadDate: doc.DateUpload,
                size: doc.TailleFichier,
                utilisateurNom: doc.Utilisateurs ? `${doc.Utilisateurs.Prenom} ${doc.Utilisateurs.Nom}` : "Non assigné",
                url: doc.URLFichier
            }));
        },
    });

    // 2. Extraction des catégories uniques pour le filtre
    // On crée un tableau des catégories sans doublons
    const categories = Array.from(new Set(documents.map((doc) => doc.category))).filter(Boolean);

    // 3. Mutation pour la suppression (Mise à jour instantanée de l'UI)
    const deleteMutation = useMutation({
        mutationFn: async (id: number) => {
            const { error } = await supabase.from("Document").delete().eq("IDDocument", id);
            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-documents"] });
            toast({ title: "Supprimé", description: "Le document a été supprimé." });
        }
    });

    // 4. (Optionnel) Fonction temporaire pour l'édition pour éviter un crash
    const handleEditDocument = async (id: number, updates: any) => {
        console.log("Édition à implémenter :", id, updates);
        toast({ title: "Info", description: "La modification arrive bientôt." });
    };

    return {
        documents,
        categories,
        isLoading,
        handleDeleteDocument: deleteMutation.mutate,
        handleEditDocument,
        fetchDocuments: refetch
    };
};