
import { useState, useEffect } from "react";

export const useEmailValidation = (email: string) => {
  const [emailError, setEmailError] = useState("");
  const [isEmailChecking, setIsEmailChecking] = useState(false);

  const existingEmails = [
    'admin@appseniors.fr',
    'support@appseniors.fr',
    'moderateur@appseniors.fr',
    'viewer@appseniors.fr',
    'admin2@appseniors.fr',
    'support2@appseniors.fr',
    'moderateur2@appseniors.fr'
  ];

  useEffect(() => {
    if (email && email.includes('@')) {
      setIsEmailChecking(true);
      const checkEmail = setTimeout(() => {
        if (existingEmails.includes(email.toLowerCase())) {
          setEmailError("Cette adresse email est déjà utilisée");
        } else {
          setEmailError("");
        }
        setIsEmailChecking(false);
      }, 500);

      return () => clearTimeout(checkEmail);
    } else {
      setEmailError("");
      setIsEmailChecking(false);
    }
  }, [email]);

  return { emailError, isEmailChecking };
};
