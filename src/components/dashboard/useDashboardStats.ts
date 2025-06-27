import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useDashboardStats = () => {
  return useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: async () => {
      console.log("Fetching dashboard stats...");
      
      // Compter les utilisateurs seniors
      const { data: seniorsData, error: seniorsError } = await supabase
        .from("Seniors")
        .select("IDSeniors", { count: "exact" });
      
      if (seniorsError) {
        console.error("Error fetching seniors:", seniorsError);
        throw seniorsError;
      }

      // Compter les aidants
      const { data: aidantsData, error: aidantsError } = await supabase
        .from("Aidant")
        .select("IDAidant", { count: "exact" });
      
      if (aidantsError) {
        console.error("Error fetching aidants:", aidantsError);
        throw aidantsError;
      }

      // Compter les prestations
      const { data: prestationsData, error: prestationsError } = await supabase
        .from("prestations_dashboard_view")
        .select("id", { count: "exact" });
      
      if (prestationsError) {
        console.error("Error fetching prestations:", prestationsError);
        throw prestationsError;
      }

      const stats = {
        totalSeniors: seniorsData?.length || 0,
        totalAidants: aidantsData?.length || 0,
        totalPrestations: prestationsData?.length || 0,
        totalRevenu: 0, // Placeholder pour maintenant
      };

      console.log("Dashboard stats:", stats);
      return stats;
    },
  });
};
