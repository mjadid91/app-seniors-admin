
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useDashboardStats = () => {
  return useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: async () => {
      console.log("Fetching dashboard stats...");
      
      // Compter les utilisateurs seniors
      const { count: seniorsCount, error: seniorsError } = await supabase
        .from("Seniors")
        .select("IDSeniors", { count: "exact", head: true });
      
      if (seniorsError) {
        console.error("Error fetching seniors:", seniorsError);
        throw seniorsError;
      }

      // Compter les aidants
      const { count: aidantsCount, error: aidantsError } = await supabase
        .from("Aidant")
        .select("IDAidant", { count: "exact", head: true });
      
      if (aidantsError) {
        console.error("Error fetching aidants:", aidantsError);
        throw aidantsError;
      }

      // Compter les prestations
      const { count: prestationsCount, error: prestationsError } = await supabase
        .from("prestations_dashboard_view")
        .select("id", { count: "exact", head: true });
      
      if (prestationsError) {
        console.error("Error fetching prestations:", prestationsError);
        throw prestationsError;
      }

      const totalSeniors = seniorsCount || 0;
      const totalAidants = aidantsCount || 0;
      const totalUtilisateurs = totalSeniors + totalAidants;

      const stats = {
        totalSeniors: totalSeniors,
        totalAidants: totalAidants,
        totalUtilisateurs: totalUtilisateurs,
        totalPrestations: prestationsCount || 0,
        totalRevenu: 0, // Placeholder pour maintenant
      };

      console.log("Dashboard stats:", stats);
      return stats;
    },
  });
};
