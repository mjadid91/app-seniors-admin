import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useAdminEmail = () => {
  const [adminEmail, setAdminEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAdminEmail = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const { data, error } = await supabase
          .from('Utilisateurs')
          .select('Email')
          .eq('IDCatUtilisateurs', 5)
          .limit(1)
          .single();

        if (error) {
          console.error('Erreur lors de la récupération de l\'email admin:', error);
          setError(error.message);
        } else if (data) {
          setAdminEmail(data.Email);
        }
      } catch (err) {
        console.error('Erreur lors de la récupération de l\'email admin:', err);
        setError('Erreur de connexion');
      } finally {
        setLoading(false);
      }
    };

    fetchAdminEmail();
  }, []);

  return { adminEmail, loading, error };
};