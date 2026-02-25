import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

// Types UI
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

// ✅ CORRECTION 1 : Interfaces pour les données brutes venant de Supabase
interface RawDemandeRGPD extends Omit<DemandeRGPD, 'user_nom' | 'user_prenom' | 'user_email'> {
    Utilisateurs: {
        Nom: string;
        Prenom: string;
        Email: string;
    } | null;
}

interface RawConsentementCookies extends Omit<ConsentementCookies, 'user_nom' | 'user_prenom' | 'user_email' | 'user_telephone'> {
    Utilisateurs: {
        Nom: string;
        Prenom: string;
        Email: string;
        Telephone: string;
    } | null;
}

// ==========================================
// LECTURE (FETCH)
// ==========================================

export const useDemandesRGPD = () => {
    return useQuery({
        queryKey: ["demandes-rgpd"],
        queryFn: async () => {
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

            // ✅ CORRECTION 2 : Mapping avec typage strict
            const rawData = data as unknown as RawDemandeRGPD[];

            return rawData.map((demande): DemandeRGPD => ({
                ...demande,
                user_nom: demande.Utilisateurs?.Nom || `Utilisateur ${demande.IDUtilisateurs}`,
                user_prenom: demande.Utilisateurs?.Prenom || "",
                user_email: demande.Utilisateurs?.Email || "Email non disponible"
            }));
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

            // ✅ CORRECTION 3 : Mapping avec typage strict
            const rawData = data as unknown as RawConsentementCookies[];

            return rawData.map((consent): ConsentementCookies => ({
                ...consent,
                user_nom: consent.Utilisateurs?.Nom || "",
                user_prenom: consent.Utilisateurs?.Prenom || "",
                user_email: consent.Utilisateurs?.Email || "Email non disponible",
                user_telephone: consent.Utilisateurs?.Telephone || "Non disponible"
            }));
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
// ACTIONS (MUTATIONS)
// ==========================================

export const useTraiterDemandeRGPD = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ demandeId, statut, traitePar }: { demandeId: number; statut: string; traitePar: number }) => {
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
            const { error } = await supabase
                .from("ConsentementCookies")
                .upsert({
                    IDUtilisateurs: idUtilisateur,
                    TypeCookie: typeCookie,
                    Statut: statut,
                    DateConsentement: new Date().toISOString().split('T')[0]
                }, { onConflict: 'IDUtilisateurs, TypeCookie' });

            if (error) {
                // Fallback manuel
                const { data: existing } = await supabase
                    .from("ConsentementCookies")
                    .select("IDConsentement")
                    .eq("IDUtilisateurs", idUtilisateur)
                    .eq("TypeCookie", typeCookie)
                    .single();

                if (existing) {
                    await supabase
                        .from("ConsentementCookies")
                        .update({ Statut: statut, DateConsentement: new Date().toISOString().split('T')[0] })
                        .eq("IDConsentement", existing.IDConsentement);
                } else {
                    await supabase
                        .from("ConsentementCookies")
                        .insert({ IDUtilisateurs: idUtilisateur, TypeCookie: typeCookie, Statut: statut });
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