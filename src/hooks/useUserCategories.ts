
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

      // Filter and transform only admin-related categories
      const adminCategories: UserCategory[] = [];
      
      (data || []).forEach(cat => {
        if (cat.EstAdministrateur) {
          adminCategories.push({
            IDCatUtilisateurs: cat.IDCatUtilisateurs,
            LibelleCategorie: 'Administrateur',
            Actif: true
          });
        } else if (cat.EstModerateur) {
          adminCategories.push({
            IDCatUtilisateurs: cat.IDCatUtilisateurs,
            LibelleCategorie: 'Modérateur',
            Actif: true
          });
        } else if (cat.EstAidant) {
          // Map Aidant to Support for admin interface
          adminCategories.push({
            IDCatUtilisateurs: cat.IDCatUtilisateurs,
            LibelleCategorie: 'Support',
            Actif: true
          });
        }
        // Add Visualisateur if we find a matching category or create a default one
        // For now, we'll assume there's a category that can be used as Visualisateur
      });

      // Add Visualisateur as a default option if not found in database
      // This assumes ID 7 or the highest ID + 1 for Visualisateur
      const hasVisualisateur = adminCategories.some(cat => cat.LibelleCategorie === 'Visualisateur');
      if (!hasVisualisateur) {
        const maxId = Math.max(...adminCategories.map(cat => cat.IDCatUtilisateurs), 0);
        adminCategories.push({
          IDCatUtilisateurs: maxId + 1,
          LibelleCategorie: 'Visualisateur',
          Actif: true
        });
      }

      setCategories(adminCategories);
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
