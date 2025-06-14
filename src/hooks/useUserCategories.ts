
import { useState, useEffect } from 'react';
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

  const fetchCategories = async () => {
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

      // Filtrer pour ne garder que les rôles administratifs
      const adminCategories = transformedCategories.filter(cat => 
        cat.EstAdministrateur || cat.EstModerateur || cat.EstSupport || 
        (!cat.EstAdministrateur && !cat.EstModerateur && !cat.EstSupport && !cat.EstSenior && !cat.EstAidant && !cat.EstTuteur && !cat.EstOrganisme)
      );

      console.log('Transformed categories:', adminCategories);
      setCategories(adminCategories);
    } catch (err) {
      console.error('Erreur lors de la récupération des catégories:', err);
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour déterminer le libellé du rôle basé sur les flags
  const getRoleLabel = (category: any): string => {
    if (category.EstAdministrateur) return 'Administrateur';
    if (category.EstModerateur) return 'Modérateur';
    if (category.EstSupport) return 'Support';
    // Si tous les flags administratifs sont à false, c'est un Visualisateur
    if (!category.EstAdministrateur && !category.EstModerateur && !category.EstSupport && 
        !category.EstSenior && !category.EstAidant && !category.EstTuteur && !category.EstOrganisme) {
      return 'Visualisateur';
    }
    return 'Inconnu';
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

  // Fonction pour déterminer le rôle basé sur les flags d'une catégorie
  const getRoleFromCategory = (categoryId: number): 'administrateur' | 'moderateur' | 'support' | 'visualisateur' => {
    const category = categories.find(cat => cat.IDCatUtilisateurs === categoryId);
    if (!category) {
      console.warn('Category not found for ID:', categoryId, 'Available categories:', categories);
      return 'visualisateur';
    }

    if (category.EstAdministrateur) return 'administrateur';
    if (category.EstModerateur) return 'moderateur';
    if (category.EstSupport) return 'support';
    return 'visualisateur';
  };

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
