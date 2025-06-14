
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User } from '../../stores/authStore';
import { SupabaseUser } from '../types/userTypes';
import { convertSupabaseUserToAppUser, getCategoryFromRole } from '../utils/userConversion';
import { CreateUserData } from '../../components/users/userTypes';

export const useUserCrud = (
  users: User[],
  setUsers: (users: User[]) => void,
  getRoleFromCategory: (categoryId: number) => User['role']
) => {
  // Fonction pour ajouter un utilisateur avec le mot de passe fourni
  const addUser = async (userData: CreateUserData, userPassword: string): Promise<User> => {
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
      const newUser = convertSupabaseUserToAppUser(data, getRoleFromCategory);
      setUsers([...users, newUser]);
      return newUser;
    } catch (err) {
      console.error('Erreur lors de l\'ajout de l\'utilisateur:', err);
      throw err;
    }
  };

  // Fonction pour mettre à jour un utilisateur
  const updateUser = async (userId: string, updates: Partial<User>): Promise<User> => {
    try {
      const supabaseUpdates: any = {
        DateModification: new Date().toISOString()
      };
      
      if (updates.nom) supabaseUpdates.Nom = updates.nom;
      if (updates.prenom) supabaseUpdates.Prenom = updates.prenom;
      if (updates.email) supabaseUpdates.Email = updates.email;
      
      // Pour la mise à jour du rôle, on trouve la catégorie correspondante
      if (updates.role) {
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

      const updatedUser = convertSupabaseUserToAppUser(data, getRoleFromCategory);
      setUsers(users.map(user => user.id === userId ? updatedUser : user));
      return updatedUser;
    } catch (err) {
      console.error('Erreur lors de la mise à jour de l\'utilisateur:', err);
      throw err;
    }
  };

  // Fonction pour supprimer un utilisateur
  const deleteUser = async (userId: string): Promise<void> => {
    try {
      const { error: deleteError } = await supabase
        .from('Utilisateurs')
        .delete()
        .eq('IDUtilisateurs', parseInt(userId));

      if (deleteError) {
        throw deleteError;
      }

      setUsers(users.filter(user => user.id !== userId));
    } catch (err) {
      console.error('Erreur lors de la suppression de l\'utilisateur:', err);
      throw err;
    }
  };

  return {
    addUser,
    updateUser,
    deleteUser
  };
};
