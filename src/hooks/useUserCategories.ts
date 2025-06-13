
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface UserCategory {
  IDCatUtilisateurs: number;
  LibelleCategorie: string;
  Actif: boolean;
}

export const useUserCategories = () => {
  const [categories, setCategories] = useState<UserCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('CatUtilisateurs')
        .select('*')
        .order('IDCatUtilisateurs', { ascending: true });

      if (fetchError) {
        throw fetchError;
      }

      // Transform the database data to match our expected interface
      const transformedCategories: UserCategory[] = (data || []).map(cat => {
        let libelle = 'Utilisateur';
        
        if (cat.EstAdministrateur) {
          libelle = 'Administrateur';
        } else if (cat.EstModerateur) {
          libelle = 'Modérateur';
        } else if (cat.EstAidant) {
          libelle = 'Aidant';
        } else if (cat.EstSenior) {
          libelle = 'Senior';
        } else if (cat.EstTuteur) {
          libelle = 'Tuteur';
        } else if (cat.EstOrganisme) {
          libelle = 'Organisme';
        }

        return {
          IDCatUtilisateurs: cat.IDCatUtilisateurs,
          LibelleCategorie: libelle,
          Actif: true // Assuming all categories are active
        };
      });

      setCategories(transformedCategories);
    } catch (err) {
      console.error('Erreur lors de la récupération des catégories:', err);
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Fonction utilitaire pour obtenir le libellé d'une catégorie par son ID
  const getCategoryLabel = (categoryId: number): string => {
    const category = categories.find(cat => cat.IDCatUtilisateurs === categoryId);
    return category?.LibelleCategorie || 'Inconnu';
  };

  // Fonction utilitaire pour obtenir l'ID d'une catégorie par son libellé
  const getCategoryId = (label: string): number | null => {
    const category = categories.find(cat => cat.LibelleCategorie.toLowerCase() === label.toLowerCase());
    return category?.IDCatUtilisateurs || null;
  };

  return {
    categories,
    loading,
    error,
    fetchCategories,
    getCategoryLabel,
    getCategoryId
  };
};
