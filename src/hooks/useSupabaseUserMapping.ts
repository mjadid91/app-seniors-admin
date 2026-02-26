// src/hooks/useSupabaseUserMapping.ts
import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from './use-toast';
import { User as SupabaseUser } from '@supabase/supabase-js';

export interface UserMapping {
  supabaseUserId: string;
  dbUserId: number;
  nom: string;
  prenom: string;
  email: string;
  role: 'administrateur' | 'moderateur' | 'support' | 'visualisateur';
}

export const useSupabaseUserMapping = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  // Helper timeout fiable (corrigé pour TS)
  const withTimeout = <T>(promiseFn: () => Promise<T>, ms = 15000): Promise<T> => {
    return new Promise((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        reject(new Error(`[Mapping] Timeout après ${ms}ms`));
      }, ms);

      promiseFn()
          .then(resolve)
          .catch(reject)
          .finally(() => clearTimeout(timeoutId));
    });
  };

  const findOrCreateUserMapping = useCallback(async (supabaseUser: SupabaseUser | null): Promise<UserMapping | null> => {
    if (!supabaseUser?.id || !supabaseUser?.email) {
      console.warn('[Mapping] Utilisateur Supabase invalide');
      return null;
    }

    const email = supabaseUser.email;
    console.log(`🔍 [Mapping] Début requête pour ${email}`);

    setIsLoading(true);

    try {
      console.log('🚀 [Mapping] Exécution SELECT sur table Utilisateurs...');

      const { data: existing, error } = await withTimeout(async () => {
        return await supabase
            .from('Utilisateurs')
            .select(`
            IDUtilisateurs, Nom, Prenom, Email, EstDesactive,
            CatUtilisateurs:IDCatUtilisateurs (
              EstAdministrateur, EstModerateur, EstSupport
            )
          `)
            .eq('Email', email)
            .maybeSingle();
      });

      console.log('✅ [Mapping] Requête terminée → data:', !!existing, 'error:', error?.message || 'aucune');

      if (error) {
        console.error('❌ [Mapping] Erreur Supabase:', error);
        return null;
      }

      if (!existing) {
        console.warn(`⚠️ [Mapping] Utilisateur ${email} non trouvé dans la table Utilisateurs`);
        // Création gérée globalement (signup ou trigger)
        return null;
      }

      console.log(`✅ [Mapping] Utilisateur trouvé (ID: ${existing.IDUtilisateurs})`);

      if (existing.EstDesactive) {
        toast({
          title: "Compte désactivé",
          description: "Contactez l'administrateur.",
          variant: "destructive",
        });
        return null;
      }

      let role: UserMapping['role'] = 'visualisateur';
      const cat = existing.CatUtilisateurs as any;
      if (cat?.EstAdministrateur) role = 'administrateur';
      else if (cat?.EstModerateur) role = 'moderateur';
      else if (cat?.EstSupport) role = 'support';

      return {
        supabaseUserId: supabaseUser.id,
        dbUserId: existing.IDUtilisateurs,
        nom: existing.Nom || '',
        prenom: existing.Prenom || '',
        email: existing.Email || '',
        role
      };
    } catch (error: any) {
      console.error('❌ [Mapping] Erreur critique (timeout ou autre):', error.message || error);
      toast({
        title: "Erreur de chargement du profil",
        description: error.message?.includes('Timeout')
            ? "La requête a pris trop de temps (vérifie RLS ou index sur Email)."
            : "Impossible de charger votre profil admin.",
        variant: "destructive",
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  return {
    isLoading,
    findOrCreateUserMapping
  };
};