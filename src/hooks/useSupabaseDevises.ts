// src/hooks/useSupabaseDevises.ts
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const useSupabaseDevises = () => {
    const [devises, setDevises] = useState<{ IDDevise: number; Titre: string }[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDevises = async () => {
            const { data, error } = await supabase.from("Devise").select("*").order("IDDevise");
            if (!error) setDevises(data || []);
            setLoading(false);
        };
        fetchDevises();
    }, []);

    return { devises, loading };
};
