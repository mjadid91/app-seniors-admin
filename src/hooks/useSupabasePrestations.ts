
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface PrestationDB {
  id: number;
  type_prestation: string;
  date_creation: string;
  tarif: number;
  statut: "en_attente" | "en_cours" | "terminee" | "refusee" | "annulee";
  IDSeniors: number | null;
  senior_nom: string;
  IDAidant: number | null;
  aidant_nom: string;
  evaluation?: number | null;
  evaluation_commentaire?: string | null;
  IDDomaine?: number | null;
  domaine_nom?: string | null;
}

export const useSupabasePrestations = () => {
  return useQuery({
    queryKey: ["prestations"],
    queryFn: async () => {
      console.log("Fetching prestations with domain information...");
      
      // D'abord, récupérer les prestations depuis la vue
      const { data: prestationsData, error: prestationsError } = await supabase
        .from("prestations_dashboard_view")
        .select("*");
      
      if (prestationsError) {
        console.error("Error fetching prestations:", prestationsError);
        throw new Error(prestationsError.message);
      }

      console.log("Prestations data from view:", prestationsData);

      // Ensuite, récupérer les informations de domaine pour chaque prestation
      const prestationsWithDomains = await Promise.all(
        prestationsData.map(async (prestation) => {
          let domaine_nom = null;
          let domaineId = null;
          
          // Récupérer l'IDDomaine depuis la table Prestation directement
          const { data: prestationDetail, error: prestationError } = await supabase
            .from("Prestation")
            .select("IDDomaine")
            .eq("IDPrestation", prestation.id)
            .single();
          
          if (!prestationError && prestationDetail) {
            domaineId = prestationDetail.IDDomaine;
          }
          
          // Si on a un IDDomaine, récupérer le nom du domaine
          if (domaineId) {
            const { data: domaineData, error: domaineError } = await supabase
              .from("Domaine")
              .select("DomaineTitre")
              .eq("IDDomaine", domaineId)
              .single();
            
            if (!domaineError && domaineData) {
              domaine_nom = domaineData.DomaineTitre;
              console.log(`Domain found for prestation ${prestation.id}:`, domaine_nom);
            } else {
              console.log(`No domain found for IDDomaine ${domaineId}:`, domaineError);
            }
          }
          
          return {
            ...prestation,
            domaine_nom,
            IDDomaine: domaineId
          };
        })
      );

      console.log("Final prestations data with domains:", prestationsWithDomains);
      return prestationsWithDomains as PrestationDB[];
    },
  });
};
