
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

// Type générique d'une activité récente depuis la vue
export interface RecentActivity {
  id: number;
  type: string;
  title: string;
  subtitle: string;
  datetime: string;
}

export function useRecentActivities() {
  const [activities, setActivities] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    supabase
      .from("v_activitesrecentes")
      .select("*")
      .order("datetime", { ascending: false })
      .limit(20)
      .then(({ data, error }) => {
        if (!isMounted) return;
        if (error) {
          setError("Impossible de charger les activités récentes.");
          setActivities([]);
        } else {
          setActivities((data as RecentActivity[]) || []);
        }
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return { activities, loading, error };
}
