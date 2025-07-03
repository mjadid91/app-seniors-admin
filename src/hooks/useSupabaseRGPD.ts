
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

// Types pour les demandes RGPD
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

// Types pour les consentements cookies
export interface ConsentementCookies {
  IDConsentement: number;
  IDUtilisateurs: number;
  TypeCookie: string;
  Statut: boolean;
  DateConsentement: string;
}

// Types pour les documents RGPD
export interface DocumentRGPD {
  IDDocumentRGPD: number;
  Titre: string;
  TypeDoc: string;
  URLFichier: string;
  DateMiseAJour: string;
}

// Hook pour récupérer les demandes RGPD
export const useDemandesRGPD = () => {
  return useQuery({
    queryKey: ["demandes-rgpd"],
    queryFn: async () => {
      console.log("Fetching demandes RGPD...");
      
      // Première tentative avec jointure
      const { data: dataWithJoin, error: errorWithJoin } = await supabase
        .from("DemandeRGPD")
        .select(`
          *,
          Utilisateurs!DemandeRGPD_IDUtilisateurs_fkey (
            Nom,
            Prenom,
            Email
          )
        `)
        .order("DateDemande", { ascending: false });
      
      console.log("Query with join result:", { dataWithJoin, errorWithJoin });
      
      if (errorWithJoin) {
        console.log("Join query failed, trying without join:");
        // Si la jointure échoue, essayons sans jointure
        const { data: dataWithoutJoin, error: errorWithoutJoin } = await supabase
          .from("DemandeRGPD")
          .select("*")
          .order("DateDemande", { ascending: false });
        
        console.log("Query without join result:", { dataWithoutJoin, errorWithoutJoin });
        
        if (errorWithoutJoin) {
          throw new Error(errorWithoutJoin.message);
        }
        
        // Retourner les données sans les informations utilisateur
        return dataWithoutJoin?.map((demande: any) => ({
          ...demande,
          user_nom: `Utilisateur ${demande.IDUtilisateurs}`,
          user_prenom: "",
          user_email: "Email non disponible"
        })) as DemandeRGPD[];
      }
      
      // Transformer les données pour inclure les noms, prénoms et emails
      return dataWithJoin?.map((demande: any) => ({
        ...demande,
        user_nom: demande.Utilisateurs?.Nom || `Utilisateur ${demande.IDUtilisateurs}`,
        user_prenom: demande.Utilisateurs?.Prenom || "",
        user_email: demande.Utilisateurs?.Email || "Email non disponible"
      })) as DemandeRGPD[];
    },
  });
};

// Hook pour récupérer les consentements cookies
export const useConsentementsCookies = () => {
  return useQuery({
    queryKey: ["consentements-cookies"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("ConsentementCookies")
        .select("*")
        .order("DateConsentement", { ascending: false });
      
      if (error) throw new Error(error.message);
      return data as ConsentementCookies[];
    },
  });
};

// Hook pour récupérer les documents RGPD
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

// Hook pour traiter une demande RGPD
export const useTraiterDemandeRGPD = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ 
      demandeId, 
      statut, 
      traitePar 
    }: { 
      demandeId: number; 
      statut: string; 
      traitePar: number 
    }) => {
      const currentDate = new Date().toISOString().split('T')[0]; // Format ISO date
      
      const { error } = await supabase
        .from("DemandeRGPD")
        .update({
          Statut: statut,
          TraitePar: traitePar,
          DateTraitement: currentDate
        })
        .eq("IDDemandeRGPD", demandeId);
      
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["demandes-rgpd"] });
    },
  });
};

// Hook pour créer une demande RGPD
export const useCreerDemandeRGPD = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ 
      idUtilisateur, 
      typeDemande 
    }: { 
      idUtilisateur: number; 
      typeDemande: string 
    }) => {
      // Calculer la date d'échéance (30 jours après la demande)
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

// Hook pour mettre à jour les consentements cookies
export const useMettreAJourConsentement = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ 
      idUtilisateur, 
      typeCookie, 
      statut 
    }: { 
      idUtilisateur: number; 
      typeCookie: string; 
      statut: boolean 
    }) => {
      // Vérifier si un consentement existe déjà
      const { data: existingConsent } = await supabase
        .from("ConsentementCookies")
        .select("*")
        .eq("IDUtilisateurs", idUtilisateur)
        .eq("TypeCookie", typeCookie)
        .single();
      
      if (existingConsent) {
        // Mettre à jour le consentement existant
        const { error } = await supabase
          .from("ConsentementCookies")
          .update({
            Statut: statut,
            DateConsentement: new Date().toISOString().split('T')[0]
          })
          .eq("IDConsentement", existingConsent.IDConsentement);
        
        if (error) throw new Error(error.message);
      } else {
        // Créer un nouveau consentement
        const { error } = await supabase
          .from("ConsentementCookies")
          .insert({
            IDUtilisateurs: idUtilisateur,
            TypeCookie: typeCookie,
            Statut: statut
          });
        
        if (error) throw new Error(error.message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["consentements-cookies"] });
    },
  });
};

// Hook pour supprimer une demande RGPD
export const useSupprimerDemandeRGPD = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (demandeId: number) => {
      const { error } = await supabase
        .from("DemandeRGPD")
        .delete()
        .eq("IDDemandeRGPD", demandeId);
      
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["demandes-rgpd"] });
    },
  });
};

// Hook pour supprimer un consentement
export const useSupprimerConsentement = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (consentementId: number) => {
      const { error } = await supabase
        .from("ConsentementCookies")
        .delete()
        .eq("IDConsentement", consentementId);
      
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["consentements-cookies"] });
    },
  });
};

// Hook pour supprimer un document RGPD
export const useSupprimerDocumentRGPD = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (documentId: number) => {
      const { error } = await supabase
        .from("DocumentRGPD")
        .delete()
        .eq("IDDocumentRGPD", documentId);
      
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["documents-rgpd"] });
    },
  });
};
