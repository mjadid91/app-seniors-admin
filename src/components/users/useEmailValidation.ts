import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export const useEmailValidation = (email: string) => {
  const [emailError, setEmailError] = useState("");
  const [isEmailChecking, setIsEmailChecking] = useState(false);

  useEffect(() => {
    // 1. Si le champ est vide, on réinitialise tout
    if (!email) {
      setEmailError("");
      setIsEmailChecking(false);
      return;
    }

    // 2. Vérification du format (Regex) avant même de consulter la base
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Format d'email invalide");
      return;
    }

    setIsEmailChecking(true);

    // 3. Debounce de 500ms pour éviter les requêtes trop fréquentes
    const checkEmailUnique = setTimeout(async () => {
      try {
        // On cherche dans la table Utilisateurs si cet email existe
        const { data, error } = await supabase
            .from("Utilisateurs")
            .select("Email")
            .eq("Email", email.toLowerCase())
            .maybeSingle(); // Renvoie null si aucune correspondance n'est trouvée

        if (error) throw error;

        if (data) {
          setEmailError("Cette adresse email est déjà utilisée");
        } else {
          setEmailError("");
        }
      } catch (err) {
        console.error("Erreur validation email:", err);
        // On ne bloque pas l'utilisateur si la vérification échoue techniquement
        setEmailError("");
      } finally {
        setIsEmailChecking(false);
      }
    }, 500);

    return () => clearTimeout(checkEmailUnique);
  }, [email]);

  return { emailError, isEmailChecking };
};