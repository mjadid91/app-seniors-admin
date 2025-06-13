
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User } from '../stores/authStore';

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

  // Fonction pour convertir un utilisateur Supabase vers le format de l'application
  const convertSupabaseUserToAppUser = (supabaseUser: SupabaseUser): User => {
    // Mapping des catégories vers les rôles
    const getRoleFromCategory = (categoryId: number): User['role'] => {
      switch (categoryId) {
        case 1: return 'administrateur';
        case 2: return 'moderateur';
        case 3: return 'support';
        case 4: return 'visualisateur';
        default: return 'visualisateur';
      }
    };

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

  // Fonction pour ajouter un utilisateur
  const addUser = async (userData: Omit<User, 'id'>) => {
    try {
      // Mapping du rôle vers la catégorie
      const getCategoryFromRole = (role: User['role']): number => {
        switch (role) {
          case 'administrateur': return 1;
          case 'moderateur': return 2;
          case 'support': return 3;
          case 'visualisateur': return 4;
          default: return 4;
        }
      };

      const currentDate = new Date().toISOString();

      const supabaseUserData = {
        Nom: userData.nom,
        Prenom: userData.prenom,
        Email: userData.email,
        Telephone: '0000000000', // Valeur par défaut
        DateNaissance: '1970-01-01', // Valeur par défaut
        Adresse: 'Adresse non renseignée', // Valeur par défaut
        Genre: 'Non précisé', // Valeur par défaut
        MotDePasse: 'temp_password', // Mot de passe temporaire
        IDCatUtilisateurs: getCategoryFromRole(userData.role),
        DateInscription: userData.dateInscription,
        Commentaire: '', // Champ requis - valeur par défaut vide
        DateModification: currentDate, // Champ requis - date actuelle
        LangueSite: 'fr', // Champ requis - valeur par défaut français
        Photo: '', // Champ requis - valeur par défaut vide
        EstDesactive: false, // Champ optionnel - par défaut actif
        EstRGPD: false // Champ optionnel - par défaut non RGPD
      };

      const { data, error: insertError } = await supabase
        .from('Utilisateurs')
        .insert([supabaseUserData])
        .select()
        .single();

      if (insertError) {
        throw insertError;
      }

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
      const getCategoryFromRole = (role: User['role']): number => {
        switch (role) {
          case 'administrateur': return 1;
          case 'moderateur': return 2;
          case 'support': return 3;
          case 'visualisateur': return 4;
          default: return 4;
        }
      };

      const supabaseUpdates: any = {
        DateModification: new Date().toISOString() // Toujours mettre à jour la date de modification
      };
      
      if (updates.nom) supabaseUpdates.Nom = updates.nom;
      if (updates.prenom) supabaseUpdates.Prenom = updates.prenom;
      if (updates.email) supabaseUpdates.Email = updates.email;
      if (updates.role) supabaseUpdates.IDCatUtilisateurs = getCategoryFromRole(updates.role);

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
  }, []);

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
