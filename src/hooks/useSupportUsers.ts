import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface SupportUser {
    id: number;
    nom: string;
    prenom: string;
    email: string;
    disponible: boolean;
    specialite?: string;
}

export const useSupportUsers = () => {
    return useQuery({
        queryKey: ["support-users"],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("Utilisateurs")
                .select("IDUtilisateurs, Nom, Prenom, Email")
                .eq("IDCatUtilisateurs", 8);

            if (error) throw new Error(error.message);

            return data.map((u) => ({
                id: u.IDUtilisateurs,
                nom: u.Nom,
                prenom: u.Prenom,
                email: u.Email,
                disponible: true,
                specialite: "Support général"
            }));
        },
    });
};
