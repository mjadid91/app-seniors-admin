
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
      const { data, error } = await supabase
        .from("DemandeRGPD")
        .select(`
          *,
          Utilisateurs!IDUtilisateurs (
            Nom,
            Email
          )
        `)
        .order("DateDemande", { ascending: false });
      
      if (error) throw new Error(error.message);
      
      // Transformer les données pour inclure les noms et emails
      return data?.map((demande: any) => ({
        ...demande,
        user_nom: demande.Utilisateurs?.Nom || "Utilisateur inconnu",
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
