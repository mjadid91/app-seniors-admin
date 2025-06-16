// src/hooks/useSupabaseLangues.ts
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const useSupabaseLangues = () => {
    const [langues, setLangues] = useState<{ IDLangue: number; Titre: string }[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLangues = async () => {
            const { data, error } = await supabase.from("Langue").select("*").order("IDLangue");
            if (!error) setLangues(data || []);
            setLoading(false);
        };
        fetchLangues();
    }, []);

    return { langues, loading };
};
