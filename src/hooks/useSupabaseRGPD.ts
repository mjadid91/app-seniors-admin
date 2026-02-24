import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

// Types
export interface DemandeRGPD {
    IDDemandeRGPD: number;
    IDUtilisateurs: number;
    TypeDemande: string;
    Statut: string;
    DateDemande: string;
    DateEcheance: string | null;
    TraitePar: number | null;
    DateTraitement: string | null;
    user_nom?: string;
    user_prenom?: string;
    user_email?: string;
}

export interface ConsentementCookies {
    IDConsentement: number;
    IDUtilisateurs: number;
    TypeCookie: string;
    Statut: boolean;
    DateConsentement: string;
    user_nom?: string;
    user_prenom?: string;
    user_email?: string;
    user_telephone?: string;
}

export interface DocumentRGPD {
    IDDocumentRGPD: number;
    Titre: string;
    TypeDoc: string;
    URLFichier: string;
    DateMiseAJour: string;
}

// ==========================================
// LECTURE (FETCH) - AVEC JOINTURES STRICTES
// ==========================================

export const useDemandesRGPD = () => {
    return useQuery({
        queryKey: ["demandes-rgpd"],
        queryFn: async () => {
            // Jointure simple. Si elle échoue, l'erreur est jetée directement pour être vue par les développeurs.
            const { data, error } = await supabase
                .from("DemandeRGPD")
                .select(`
          *,
          Utilisateurs:IDUtilisateurs (
            Nom,
            Prenom,
            Email
          )
        `)
                .order("DateDemande", { ascending: false });

            if (error) throw new Error(`Erreur jointure DemandeRGPD: ${error.message}`);

            return data.map((demande: any) => ({
                ...demande,
                user_nom: demande.Utilisateurs?.Nom || `Utilisateur ${demande.IDUtilisateurs}`,
                user_prenom: demande.Utilisateurs?.Prenom || "",
                user_email: demande.Utilisateurs?.Email || "Email non disponible"
            })) as DemandeRGPD[];
        },
    });
};

export const useConsentementsCookies = () => {
    return useQuery({
        queryKey: ["consentements-cookies"],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("ConsentementCookies")
                .select(`
          *,
          Utilisateurs:IDUtilisateurs (
            Nom,
            Prenom,
            Email,
            Telephone
          )
        `)
                .order("DateConsentement", { ascending: false });

            if (error) throw new Error(`Erreur jointure ConsentementCookies: ${error.message}`);

            return data.map((consent: any) => ({
                ...consent,
                user_nom: consent.Utilisateurs?.Nom || "",
                user_prenom: consent.Utilisateurs?.Prenom || "",
                user_email: consent.Utilisateurs?.Email || "Email non disponible",
                user_telephone: consent.Utilisateurs?.Telephone || "Non disponible"
            })) as ConsentementCookies[];
        },
    });
};

export const useDocumentsRGPD = () => {
    return useQuery({
        queryKey: ["documents-rgpd"],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("DocumentRGPD")
                .select("*")
                .order("DateMiseAJour", { ascending: false });

            if (error) throw new Error(error.message);
            return data as DocumentRGPD[];
        },
    });
};

// ==========================================
// ACTIONS (MUTATIONS) - CONFIANCE DANS LA BDD
// ==========================================

export const useTraiterDemandeRGPD = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ demandeId, statut, traitePar }: { demandeId: number; statut: string; traitePar: number }) => {
            // On fait confiance aux contraintes PostgreSQL pour rejeter un "traitePar" invalide.
            const { error } = await supabase
                .from("DemandeRGPD")
                .update({
                    Statut: statut,
                    TraitePar: traitePar,
                    DateTraitement: new Date().toISOString().split('T')[0]
                })
                .eq("IDDemandeRGPD", demandeId);

            if (error) throw new Error(error.message);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["demandes-rgpd"] });
        },
    });
};

export const useCreerDemandeRGPD = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ idUtilisateur, typeDemande }: { idUtilisateur: number; typeDemande: string }) => {
            const dateEcheance = new Date();
            dateEcheance.setDate(dateEcheance.getDate() + 30);

            const { error } = await supabase
                .from("DemandeRGPD")
                .insert({
                    IDUtilisateurs: idUtilisateur,
                    TypeDemande: typeDemande,
                    DateEcheance: dateEcheance.toISOString().split('T')[0]
                });

            if (error) throw new Error(error.message);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["demandes-rgpd"] });
        },
    });
};

export const useMettreAJourConsentement = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ idUtilisateur, typeCookie, statut }: { idUtilisateur: number; typeCookie: string; statut: boolean }) => {
            // Pour une logique "Upsert" (Update si existe, sinon Insert), Supabase propose la fonction native `.upsert()` !
            const { error } = await supabase
                .from("ConsentementCookies")
                .upsert({
                    IDUtilisateurs: idUtilisateur,
                    TypeCookie: typeCookie,
                    Statut: statut,
                    DateConsentement: new Date().toISOString().split('T')[0]
                }, { onConflict: 'IDUtilisateurs, TypeCookie' }); // Assure-toi d'avoir une contrainte d'unicité en BDD

            if (error) {
                // Fallback manuel si pas de contrainte d'unicité configurée en base :
                console.warn("L'upsert natif nécessite une contrainte d'unicité. On utilise la double requête en attendant.");

                const { data: existing } = await supabase.from("ConsentementCookies").select("IDConsentement").eq("IDUtilisateurs", idUtilisateur).eq("TypeCookie", typeCookie).single();

                if (existing) {
                    await supabase.from("ConsentementCookies").update({ Statut: statut, DateConsentement: new Date().toISOString().split('T')[0] }).eq("IDConsentement", existing.IDConsentement);
                } else {
                    await supabase.from("ConsentementCookies").insert({ IDUtilisateurs: idUtilisateur, TypeCookie: typeCookie, Statut: statut });
                }
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["consentements-cookies"] });
        },
    });
};

export const useSupprimerDemandeRGPD = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (demandeId: number) => {
            const { error } = await supabase.from("DemandeRGPD").delete().eq("IDDemandeRGPD", demandeId);
            if (error) throw new Error(error.message);
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["demandes-rgpd"] }),
    });
};

export const useSupprimerConsentement = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (consentementId: number) => {
            const { error } = await supabase.from("ConsentementCookies").delete().eq("IDConsentement", consentementId);
            if (error) throw new Error(error.message);
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["consentements-cookies"] }),
    });
};

export const useSupprimerDocumentRGPD = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (documentId: number) => {
            const { error } = await supabase.from("DocumentRGPD").delete().eq("IDDocumentRGPD", documentId);
            if (error) throw new Error(error.message);
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["documents-rgpd"] }),
    });
};