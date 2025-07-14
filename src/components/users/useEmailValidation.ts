
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface EmailValidationResult {
  emailError: string | null;
  isEmailChecking: boolean;
  validateEmail: (email: string) => Promise<boolean>;
}

export const useEmailValidation = (email: string): EmailValidationResult => {
  const [emailError, setEmailError] = useState<string | null>(null);
  const [isEmailChecking, setIsEmailChecking] = useState(false);
  const { toast } = useToast();

  // Validation du format email
  const validateEmailFormat = useCallback((email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }, []);

  // Vérification de l'unicité de l'email
  const checkEmailUniqueness = useCallback(async (email: string): Promise<boolean> => {
    if (!email?.trim()) return true;

    try {
      setIsEmailChecking(true);
      setEmailError(null);

      const { data, error } = await supabase
        .from('Utilisateurs')
        .select('IDUtilisateurs')
        .eq('Email', email.trim())
        .maybeSingle();

      if (error) {
        console.error('Email validation error:', error);
        setEmailError('Erreur lors de la vérification de l\'email');
        toast({
          title: "Erreur de validation",
          description: "Impossible de vérifier l'unicité de l'email",
          variant: "destructive",
        });
        return false;
      }

      if (data) {
        setEmailError('Cet email est déjà utilisé par un autre utilisateur');
        return false;
      }

      return true;
    } catch (error) {
      console.error('Email validation exception:', error);
      setEmailError('Erreur de validation inattendue');
      toast({
        title: "Erreur",
        description: "Une erreur inattendue s'est produite",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsEmailChecking(false);
    }
  }, [toast]);

  // Validation complète de l'email
  const validateEmail = useCallback(async (email: string): Promise<boolean> => {
    if (!email?.trim()) {
      setEmailError('L\'email est requis');
      return false;
    }

    if (!validateEmailFormat(email.trim())) {
      setEmailError('Format d\'email invalide');
      return false;
    }

    return await checkEmailUniqueness(email.trim());
  }, [validateEmailFormat, checkEmailUniqueness]);

  // Effet pour valider l'email automatiquement avec debounce
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (email?.trim()) {
        validateEmail(email);
      } else {
        setEmailError(null);
      }
    }, 500); // Debounce de 500ms

    return () => clearTimeout(timeoutId);
  }, [email, validateEmail]);

  return {
    emailError,
    isEmailChecking,
    validateEmail,
  };
};
