
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface UserCategory {
  IDCatUtilisateurs: number;
  LibelleCategorie: string;
  Actif: boolean;
  EstAdministrateur: boolean;
  EstModerateur: boolean;
  EstSupport: boolean;
  EstSenior: boolean;
  EstAidant: boolean;
  EstTuteur: boolean;
  EstOrganisme: boolean;
}

export const useUserCategories = () => {
  const [categories, setCategories] = useState<UserCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = useCallback(async () => {
    try {
      console.log('Fetching categories...');
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('CatUtilisateurs')
        .select('*')
        .order('IDCatUtilisateurs', { ascending: true });

      console.log('Categories query result:', { data, error: fetchError });

      if (fetchError) {
        console.error('Categories fetch error:', fetchError);
        throw fetchError;
      }

      // Transformer les données pour inclure tous les flags
      const transformedCategories: UserCategory[] = (data || []).map(cat => ({
        IDCatUtilisateurs: cat.IDCatUtilisateurs,
        LibelleCategorie: getRoleLabel(cat),
        Actif: true,
        EstAdministrateur: cat.EstAdministrateur || false,
        EstModerateur: cat.EstModerateur || false,
        EstSupport: cat.EstSupport || false,
        EstSenior: cat.EstSenior || false,
        EstAidant: cat.EstAidant || false,
        EstTuteur: cat.EstTuteur || false,
        EstOrganisme: cat.EstOrganisme || false
      }));

      console.log('All transformed categories:', transformedCategories);
      
      // Ne pas filtrer ici - garder toutes les catégories pour les conversions
      setCategories(transformedCategories);
    } catch (err) {
      console.error('Erreur lors de la récupération des catégories:', err);
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  }, []);

  // Fonction pour déterminer le libellé du rôle basé sur les flags
  const getRoleLabel = (category: any): string => {
    if (category.EstAdministrateur) return 'Administrateur';
    if (category.EstModerateur) return 'Modérateur';
    if (category.EstSupport) return 'Support';
    if (category.EstSenior) return 'Senior';
    if (category.EstAidant) return 'Aidant';
    if (category.EstTuteur) return 'Tuteur';
    if (category.EstOrganisme) return 'Organisme';
    // Si tous les flags sont à false, c'est un Visualisateur
    return 'Visualisateur';
  };

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // Fonction utilitaire pour obtenir le libellé d'une catégorie par son ID
  const getCategoryLabel = useCallback((categoryId: number): string => {
    const category = categories.find(cat => cat.IDCatUtilisateurs === categoryId);
    return category?.LibelleCategorie || 'Inconnu';
  }, [categories]);

  // Fonction utilitaire pour obtenir l'ID d'une catégorie par son libellé
  const getCategoryId = useCallback((label: string): number | null => {
    const category = categories.find(cat => cat.LibelleCategorie.toLowerCase() === label.toLowerCase());
    return category?.IDCatUtilisateurs || null;
  }, [categories]);

  // Fonction pour déterminer le rôle basé sur les flags d'une catégorie
  const getRoleFromCategory = useCallback((categoryId: number): 'administrateur' | 'moderateur' | 'support' | 'visualisateur' => {
    const category = categories.find(cat => cat.IDCatUtilisateurs === categoryId);
    if (!category) {
      console.warn('Category not found for ID:', categoryId, 'Available categories:', categories);
      return 'visualisateur';
    }

    if (category.EstAdministrateur) return 'administrateur';
    if (category.EstModerateur) return 'moderateur';
    if (category.EstSupport) return 'support';
    return 'visualisateur';
  }, [categories]);

  return {
    categories,
    loading,
    error,
    fetchCategories,
    getCategoryLabel,
    getCategoryId,
    getRoleFromCategory
  };
};
