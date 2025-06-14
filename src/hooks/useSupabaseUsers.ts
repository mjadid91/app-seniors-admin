
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User } from '../stores/authStore';
import { useUserCategories } from './useUserCategories';
import { CreateUserData } from '../components/users/userTypes';

export interface SupabaseUser {
  IDUtilisateurs: number;
  Nom: string;
  Prenom: string;
  Email: string;
  Telephone: string;
  DateNaissance: string;
  Adresse: string;
  Genre: string;
  MotDePasse: string;
  IDCatUtilisateurs: number;
  DateInscription: string;
  Commentaire: string;
  DateModification: string;
  LangueSite: string;
  Photo: string;
  EstDesactive?: boolean;
  EstRGPD?: boolean;
}

export const useSupabaseUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { getRoleFromCategory } = useUserCategories();

  // Fonction pour convertir un utilisateur Supabase vers le format de l'application
  const convertSupabaseUserToAppUser = (supabaseUser: SupabaseUser): User => {
    return {
      id: supabaseUser.IDUtilisateurs.toString(),
      nom: supabaseUser.Nom,
      prenom: supabaseUser.Prenom,
      email: supabaseUser.Email,
      role: getRoleFromCategory(supabaseUser.IDCatUtilisateurs),
      dateInscription: supabaseUser.DateInscription
    };
  };

  // Fonction pour récupérer tous les utilisateurs
  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('Utilisateurs')
        .select('*')
        .order('DateInscription', { ascending: false });

      if (fetchError) {
        throw fetchError;
      }

      const convertedUsers = data?.map(convertSupabaseUserToAppUser) || [];
      setUsers(convertedUsers);
    } catch (err) {
      console.error('Erreur lors de la récupération des utilisateurs:', err);
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour ajouter un utilisateur avec le mot de passe fourni
  const addUser = async (userData: CreateUserData, userPassword: string) => {
    try {
      const currentDate = new Date().toISOString();

      const supabaseUserData = {
        Nom: userData.nom,
        Prenom: userData.prenom,
        Email: userData.email,
        Telephone: '0000000000',
        DateNaissance: '1970-01-01',
        Adresse: 'Adresse non renseignée',
        Genre: 'Non précisé',
        MotDePasse: userPassword,
        IDCatUtilisateurs: userData.categoryId,
        DateInscription: userData.dateInscription,
        Commentaire: '',
        DateModification: currentDate,
        LangueSite: 'fr',
        Photo: '',
        EstDesactive: false,
        EstRGPD: false
      };

      console.log('Données envoyées à Supabase:', supabaseUserData);

      const { data, error: insertError } = await supabase
        .from('Utilisateurs')
        .insert([supabaseUserData])
        .select()
        .single();

      if (insertError) {
        console.error('Erreur lors de l\'insertion:', insertError);
        throw insertError;
      }

      console.log('Utilisateur créé avec succès:', data);
      const newUser = convertSupabaseUserToAppUser(data);
      setUsers(prevUsers => [...prevUsers, newUser]);
      return newUser;
    } catch (err) {
      console.error('Erreur lors de l\'ajout de l\'utilisateur:', err);
      throw err;
    }
  };

  // Fonction pour mettre à jour un utilisateur
  const updateUser = async (userId: string, updates: Partial<User>) => {
    try {
      const supabaseUpdates: any = {
        DateModification: new Date().toISOString()
      };
      
      if (updates.nom) supabaseUpdates.Nom = updates.nom;
      if (updates.prenom) supabaseUpdates.Prenom = updates.prenom;
      if (updates.email) supabaseUpdates.Email = updates.email;
      
      // Pour la mise à jour du rôle, on trouve la catégorie correspondante
      if (updates.role) {
        const getCategoryFromRole = (role: User['role']): number => {
          // Cette fonction devrait être remplacée par une recherche dans les catégories réelles
          // Pour l'instant, on garde une correspondance par défaut
          switch (role) {
            case 'administrateur': return 5;
            case 'moderateur': return 6;
            case 'support': return 4;
            case 'visualisateur': return 7;
            default: return 7;
          }
        };
        supabaseUpdates.IDCatUtilisateurs = getCategoryFromRole(updates.role);
      }

      const { data, error: updateError } = await supabase
        .from('Utilisateurs')
        .update(supabaseUpdates)
        .eq('IDUtilisateurs', parseInt(userId))
        .select()
        .single();

      if (updateError) {
        throw updateError;
      }

      const updatedUser = convertSupabaseUserToAppUser(data);
      setUsers(prevUsers => 
        prevUsers.map(user => user.id === userId ? updatedUser : user)
      );
      return updatedUser;
    } catch (err) {
      console.error('Erreur lors de la mise à jour de l\'utilisateur:', err);
      throw err;
    }
  };

  // Fonction pour supprimer un utilisateur
  const deleteUser = async (userId: string) => {
    try {
      const { error: deleteError } = await supabase
        .from('Utilisateurs')
        .delete()
        .eq('IDUtilisateurs', parseInt(userId));

      if (deleteError) {
        throw deleteError;
      }

      setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
    } catch (err) {
      console.error('Erreur lors de la suppression de l\'utilisateur:', err);
      throw err;
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [getRoleFromCategory]);

  return {
    users,
    loading,
    error,
    fetchUsers,
    addUser,
    updateUser,
    deleteUser
  };
};
