import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Senior, Aidant } from '../types/seniors';

export const useSupabaseSeniors = () => {
  const [seniors, setSeniors] = useState<Senior[]>([]);
  const [aidants, setAidants] = useState<Aidant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSeniors = async () => {
    try {
      console.log('Fetching seniors...');
      
      // Récupérer les utilisateurs avec la catégorie 1 (seniors)
      const { data: utilisateursData, error: utilisateursError } = await supabase
        .from('Utilisateurs')
        .select('*')
        .eq('IDCatUtilisateurs', 1);

      if (utilisateursError) {
        console.error('Erreur lors de la récupération des utilisateurs seniors:', utilisateursError);
        throw new Error(`Erreur utilisateurs seniors: ${utilisateursError.message}`);
      }

      console.log('Utilisateurs seniors data:', utilisateursData);

      if (!utilisateursData || utilisateursData.length === 0) {
        console.log('Aucun utilisateur senior trouvé avec la catégorie 1');
        setSeniors([]);
        return;
      }

      // Pour chaque utilisateur senior, s'assurer qu'il a une entrée dans la table Seniors
      for (const user of utilisateursData) {
        const { data: existingSenior } = await supabase
          .from('Seniors')
          .select('IDSeniors')
          .eq('IDUtilisateurSenior', user.IDUtilisateurs)
          .maybeSingle();

        if (!existingSenior) {
          console.log(`Creating missing Senior entry for user ${user.IDUtilisateurs}`);
          await supabase
            .from('Seniors')
            .insert({
              IDUtilisateurSenior: user.IDUtilisateurs,
              NiveauAutonomie: 2,
              EstRGPD: false
            });
        }
      }

      // Récupérer les informations seniors correspondantes
      const userIds = utilisateursData.map(u => u.IDUtilisateurs);
      const { data: seniorsData, error: seniorsError } = await supabase
        .from('Seniors')
        .select('*')
        .in('IDUtilisateurSenior', userIds);

      if (seniorsError) {
        console.error('Erreur lors de la récupération des seniors:', seniorsError);
        throw new Error(`Erreur seniors: ${seniorsError.message}`);
      }

      console.log('Seniors data:', seniorsData);

      // Créer un map des utilisateurs par ID
      const utilisateursMap = new Map();
      utilisateursData.forEach(user => {
        utilisateursMap.set(user.IDUtilisateurs, user);
      });

      // Transformer les données
      const seniorsWithUserInfo: Senior[] = (seniorsData || []).map(senior => {
        const userInfo = utilisateursMap.get(senior.IDUtilisateurSenior);
        
        console.log('Processing senior:', senior.IDSeniors, 'User info genre:', userInfo?.Genre);
        
        return {
          id: senior.IDSeniors.toString(),
          nom: userInfo?.Nom || 'Nom non renseigné',
          prenom: userInfo?.Prenom || 'Prénom non renseigné',
          email: userInfo?.Email || 'Email non renseigné',
          telephone: userInfo?.Telephone || 'Non renseigné',
          dateNaissance: userInfo?.DateNaissance || '1970-01-01',
          adresse: userInfo?.Adresse || 'Non renseigné',
          genre: userInfo?.Genre || undefined,
          niveauAutonomie: senior.NiveauAutonomie === 1 ? 'faible' : senior.NiveauAutonomie === 2 ? 'moyen' : 'eleve',
          dateInscription: userInfo?.DateInscription || new Date().toISOString(),
          statut: 'actif' as const,
          ville: 'Non renseigné',
          codePostal: 'Non renseigné'
        };
      });

      console.log('Seniors transformés:', seniorsWithUserInfo);
      setSeniors(seniorsWithUserInfo);
    } catch (err) {
      console.error('Erreur complète lors de la récupération des seniors:', err);
      setError(err instanceof Error ? err.message : 'Erreur inconnue lors du chargement des seniors');
      setSeniors([]);
    }
  };

  const addSenior = async (seniorData: {
    nom: string;
    prenom: string;
    email: string;
    telephone?: string;
    dateNaissance?: string;
    adresse?: string;
    genre?: string;
    niveauAutonomie?: 'faible' | 'moyen' | 'eleve';
    motDePasse: string;
  }) => {
    try {
      console.log('Ajout d\'un nouveau senior:', seniorData);
      
      // Insérer dans la table Utilisateurs avec IDCatUtilisateurs = 1 (senior)
      const { data: userData, error: userError } = await supabase
        .from('Utilisateurs')
        .insert({
          Nom: seniorData.nom,
          Prenom: seniorData.prenom,
          Email: seniorData.email,
          Telephone: seniorData.telephone || '0000000000',
          DateNaissance: seniorData.dateNaissance || '1970-01-01',
          Adresse: seniorData.adresse || 'Adresse non renseignée',
          Genre: seniorData.genre || 'Non précisé',
          MotDePasse: seniorData.motDePasse,
          IDCatUtilisateurs: 1, // Catégorie Senior
          DateInscription: new Date().toISOString(),
          Commentaire: '',
          DateModification: new Date().toISOString(),
          LangueSite: 'fr',
          Photo: '',
          EstDesactive: false,
          EstRGPD: false
        })
        .select()
        .single();

      if (userError) {
        console.error('Erreur lors de l\'insertion de l\'utilisateur:', userError);
        throw new Error(`Erreur lors de l'ajout du senior: ${userError.message}`);
      }

      console.log('Utilisateur senior créé:', userData);
      
      // Mettre à jour le niveau d'autonomie si spécifié
      if (seniorData.niveauAutonomie) {
        const niveauValue = seniorData.niveauAutonomie === 'faible' ? 1 : 
                           seniorData.niveauAutonomie === 'moyen' ? 2 : 3;
        
        const { error: seniorUpdateError } = await supabase
          .from('Seniors')
          .update({ NiveauAutonomie: niveauValue })
          .eq('IDUtilisateurSenior', userData.IDUtilisateurs);

        if (seniorUpdateError) {
          console.warn('Avertissement lors de la mise à jour du niveau d\'autonomie:', seniorUpdateError);
        }
      }
      
      // Rafraîchir les données
      await fetchData();
      
      return userData;
    } catch (err) {
      console.error('Erreur lors de l\'ajout du senior:', err);
      throw err;
    }
  };

  const addAidant = async (aidantData: {
    nom: string;
    prenom: string;
    email: string;
    telephone?: string;
    dateNaissance?: string;
    adresse?: string;
    genre?: string;
    experience: string;
    tarifHoraire: number;
    motDePasse: string;
  }) => {
    try {
      console.log('Ajout d\'un nouvel aidant:', aidantData);
      
      // Insérer dans la table Utilisateurs avec IDCatUtilisateurs = 4 (aidant)
      const { data: userData, error: userError } = await supabase
        .from('Utilisateurs')
        .insert({
          Nom: aidantData.nom,
          Prenom: aidantData.prenom,
          Email: aidantData.email,
          Telephone: aidantData.telephone || '0000000000',
          DateNaissance: aidantData.dateNaissance || '1970-01-01',
          Adresse: aidantData.adresse || 'Adresse non renseignée',
          Genre: aidantData.genre || 'Non précisé',
          MotDePasse: aidantData.motDePasse,
          IDCatUtilisateurs: 4, // Catégorie Aidant
          DateInscription: new Date().toISOString(),
          Commentaire: '',
          DateModification: new Date().toISOString(),
          LangueSite: 'fr',
          Photo: '',
          EstDesactive: false,
          EstRGPD: false
        })
        .select()
        .single();

      if (userError) {
        console.error('Erreur lors de l\'insertion de l\'utilisateur aidant:', userError);
        throw new Error(`Erreur lors de l'ajout de l'aidant: ${userError.message}`);
      }

      console.log('Utilisateur aidant créé:', userData);
      
      // Le trigger se chargera automatiquement de créer l'entrée dans la table Aidant
      // Mais on peut aussi mettre à jour l'expérience et le tarif
      const { error: aidantUpdateError } = await supabase
        .from('Aidant')
        .update({
          Experience: aidantData.experience,
          TarifAidant: aidantData.tarifHoraire
        })
        .eq('IDUtilisateurs', userData.IDUtilisateurs);

      if (aidantUpdateError) {
        console.warn('Avertissement lors de la mise à jour des informations aidant:', aidantUpdateError);
      }
      
      // Rafraîchir les données
      await fetchData();
      
      return userData;
    } catch (err) {
      console.error('Erreur lors de l\'ajout de l\'aidant:', err);
      throw err;
    }
  };

  const fetchAidants = async () => {
    try {
      console.log('Fetching aidants...');
      
      // Récupérer les utilisateurs avec la catégorie 4 (aidants)
      const { data: utilisateursData, error: utilisateursError } = await supabase
        .from('Utilisateurs')
        .select('*')
        .eq('IDCatUtilisateurs', 4);

      if (utilisateursError) {
        console.error('Erreur lors de la récupération des utilisateurs aidants:', utilisateursError);
        throw new Error(`Erreur utilisateurs aidants: ${utilisateursError.message}`);
      }

      console.log('Utilisateurs aidants data:', utilisateursData);

      if (!utilisateursData || utilisateursData.length === 0) {
        console.log('Aucun utilisateur aidant trouvé avec la catégorie 4');
        setAidants([]);
        return;
      }

      // Pour chaque utilisateur aidant, s'assurer qu'il a une entrée dans la table Aidant
      for (const user of utilisateursData) {
        const { data: existingAidant } = await supabase
          .from('Aidant')
          .select('IDAidant')
          .eq('IDUtilisateurs', user.IDUtilisateurs)
          .maybeSingle();

        if (!existingAidant) {
          console.log(`Creating missing Aidant entry for user ${user.IDUtilisateurs}`);
          await supabase
            .from('Aidant')
            .insert({
              IDUtilisateurs: user.IDUtilisateurs,
              Experience: 'Expérience à définir',
              TarifAidant: 0
            });
        }
      }

      // Récupérer les informations aidants correspondantes
      const userIds = utilisateursData.map(u => u.IDUtilisateurs);
      const { data: aidantsData, error: aidantsError } = await supabase
        .from('Aidant')
        .select('*')
        .in('IDUtilisateurs', userIds);

      if (aidantsError) {
        console.error('Erreur lors de la récupération des aidants:', aidantsError);
        throw new Error(`Erreur aidants: ${aidantsError.message}`);
      }

      console.log('Aidants data:', aidantsData);

      // Créer un map des utilisateurs par ID
      const utilisateursMap = new Map();
      utilisateursData.forEach(user => {
        utilisateursMap.set(user.IDUtilisateurs, user);
      });

      // Transformer les données
      const aidantsWithUserInfo: Aidant[] = (aidantsData || []).map(aidant => {
        const userInfo = utilisateursMap.get(aidant.IDUtilisateurs);
        
        console.log('Processing aidant:', aidant.IDAidant, 'User info genre:', userInfo?.Genre);
        
        return {
          id: aidant.IDAidant.toString(),
          nom: userInfo?.Nom || 'Nom non renseigné',
          prenom: userInfo?.Prenom || 'Prénom non renseigné',
          email: userInfo?.Email || 'Email non renseigné',
          telephone: userInfo?.Telephone || 'Non renseigné',
          dateNaissance: userInfo?.DateNaissance || '1970-01-01',
          adresse: userInfo?.Adresse || 'Non renseigné',
          genre: userInfo?.Genre || undefined,
          profession: 'Aidant professionnel',
          experience: aidant.Experience || 'Expérience à définir',
          dateInscription: userInfo?.DateInscription || new Date().toISOString(),
          statut: 'actif' as const,
          ville: 'Non renseigné',
          codePostal: 'Non renseigné',
          tarifHoraire: aidant.TarifAidant || 0,
          disponibilites: {
            jours: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'],
            heures: '9h-17h'
          }
        };
      });

      console.log('Aidants transformés:', aidantsWithUserInfo);
      setAidants(aidantsWithUserInfo);
    } catch (err) {
      console.error('Erreur complète lors de la récupération des aidants:', err);
      setError(err instanceof Error ? err.message : 'Erreur inconnue lors du chargement des aidants');
      setAidants([]);
    }
  };

  const updateSenior = async (seniorId: string, updates: Partial<Senior>) => {
    try {
      console.log('Mise à jour du senior:', seniorId, updates);
      
      // Récupérer l'ID utilisateur correspondant
      const { data: seniorData, error: seniorError } = await supabase
        .from('Seniors')
        .select('IDUtilisateurSenior')
        .eq('IDSeniors', parseInt(seniorId))
        .single();

      if (seniorError) {
        throw new Error(`Erreur lors de la récupération du senior: ${seniorError.message}`);
      }

      // Mettre à jour les informations utilisateur
      const userUpdates: any = {};
      if (updates.nom) userUpdates.Nom = updates.nom;
      if (updates.prenom) userUpdates.Prenom = updates.prenom;
      if (updates.email) userUpdates.Email = updates.email;
      if (updates.telephone) userUpdates.Telephone = updates.telephone;
      if (updates.adresse) userUpdates.Adresse = updates.adresse;
      if (updates.dateNaissance) userUpdates.DateNaissance = updates.dateNaissance;
      if (updates.genre !== undefined) userUpdates.Genre = updates.genre;
      
      userUpdates.DateModification = new Date().toISOString();

      const { error: updateError } = await supabase
        .from('Utilisateurs')
        .update(userUpdates)
        .eq('IDUtilisateurs', seniorData.IDUtilisateurSenior);

      if (updateError) {
        throw new Error(`Erreur lors de la mise à jour: ${updateError.message}`);
      }

      // Mettre à jour les informations spécifiques au senior
      if (updates.niveauAutonomie) {
        const niveauValue = updates.niveauAutonomie === 'faible' ? 1 : 
                           updates.niveauAutonomie === 'moyen' ? 2 : 3;
        
        const { error: seniorUpdateError } = await supabase
          .from('Seniors')
          .update({ NiveauAutonomie: niveauValue })
          .eq('IDSeniors', parseInt(seniorId));

        if (seniorUpdateError) {
          throw new Error(`Erreur lors de la mise à jour du niveau d'autonomie: ${seniorUpdateError.message}`);
        }
      }

      console.log('Senior mis à jour avec succès');
      
      // Rafraîchir les données
      await fetchData();
    } catch (err) {
      console.error('Erreur lors de la mise à jour du senior:', err);
      throw err;
    }
  };

  const deleteSenior = async (seniorId: string) => {
    try {
      console.log('Suppression du senior:', seniorId);
      
      // Récupérer l'ID utilisateur correspondant
      const { data: seniorData, error: seniorError } = await supabase
        .from('Seniors')
        .select('IDUtilisateurSenior')
        .eq('IDSeniors', parseInt(seniorId))
        .single();

      if (seniorError) {
        throw new Error(`Erreur lors de la récupération du senior: ${seniorError.message}`);
      }

      // Supprimer d'abord l'entrée Senior
      const { error: deleteSeniorError } = await supabase
        .from('Seniors')
        .delete()
        .eq('IDSeniors', parseInt(seniorId));

      if (deleteSeniorError) {
        throw new Error(`Erreur lors de la suppression du profil senior: ${deleteSeniorError.message}`);
      }

      // Supprimer l'utilisateur (cela supprimera aussi les références liées)
      const { error: deleteUserError } = await supabase
        .from('Utilisateurs')
        .delete()
        .eq('IDUtilisateurs', seniorData.IDUtilisateurSenior);

      if (deleteUserError) {
        throw new Error(`Erreur lors de la suppression de l'utilisateur: ${deleteUserError.message}`);
      }

      console.log('Senior supprimé avec succès');
      
      // Rafraîchir les données
      await fetchData();
    } catch (err) {
      console.error('Erreur lors de la suppression du senior:', err);
      throw err;
    }
  };

  const updateAidant = async (aidantId: string, updates: Partial<Aidant>) => {
    try {
      console.log('Mise à jour de l\'aidant:', aidantId, updates);
      
      // Récupérer l'ID utilisateur correspondant
      const { data: aidantData, error: aidantError } = await supabase
        .from('Aidant')
        .select('IDUtilisateurs')
        .eq('IDAidant', parseInt(aidantId))
        .single();

      if (aidantError) {
        throw new Error(`Erreur lors de la récupération de l'aidant: ${aidantError.message}`);
      }

      // Mettre à jour les informations utilisateur
      const userUpdates: any = {};
      if (updates.nom) userUpdates.Nom = updates.nom;
      if (updates.prenom) userUpdates.Prenom = updates.prenom;
      if (updates.email) userUpdates.Email = updates.email;
      if (updates.telephone) userUpdates.Telephone = updates.telephone;
      if (updates.adresse) userUpdates.Adresse = updates.adresse;
      if (updates.dateNaissance) userUpdates.DateNaissance = updates.dateNaissance;
      if (updates.genre !== undefined) userUpdates.Genre = updates.genre;
      
      userUpdates.DateModification = new Date().toISOString();

      const { error: updateError } = await supabase
        .from('Utilisateurs')
        .update(userUpdates)
        .eq('IDUtilisateurs', aidantData.IDUtilisateurs);

      if (updateError) {
        throw new Error(`Erreur lors de la mise à jour: ${updateError.message}`);
      }

      // Mettre à jour les informations spécifiques à l'aidant
      const aidantUpdates: any = {};
      if (updates.experience) aidantUpdates.Experience = updates.experience;
      if (updates.tarifHoraire !== undefined) aidantUpdates.TarifAidant = updates.tarifHoraire;

      if (Object.keys(aidantUpdates).length > 0) {
        const { error: aidantUpdateError } = await supabase
          .from('Aidant')
          .update(aidantUpdates)
          .eq('IDAidant', parseInt(aidantId));

        if (aidantUpdateError) {
          throw new Error(`Erreur lors de la mise à jour des informations aidant: ${aidantUpdateError.message}`);
        }
      }

      console.log('Aidant mis à jour avec succès');
      
      // Rafraîchir les données
      await fetchData();
    } catch (err) {
      console.error('Erreur lors de la mise à jour de l\'aidant:', err);
      throw err;
    }
  };

  const deleteAidant = async (aidantId: string) => {
    try {
      console.log('Suppression de l\'aidant:', aidantId);
      
      // Récupérer l'ID utilisateur correspondant
      const { data: aidantData, error: aidantError } = await supabase
        .from('Aidant')
        .select('IDUtilisateurs')
        .eq('IDAidant', parseInt(aidantId))
        .single();

      if (aidantError) {
        throw new Error(`Erreur lors de la récupération de l'aidant: ${aidantError.message}`);
      }

      // Supprimer d'abord l'entrée Aidant
      const { error: deleteAidantError } = await supabase
        .from('Aidant')
        .delete()
        .eq('IDAidant', parseInt(aidantId));

      if (deleteAidantError) {
        throw new Error(`Erreur lors de la suppression du profil aidant: ${deleteAidantError.message}`);
      }

      // Supprimer l'utilisateur (cela supprimera aussi les références liées)
      const { error: deleteUserError } = await supabase
        .from('Utilisateurs')
        .delete()
        .eq('IDUtilisateurs', aidantData.IDUtilisateurs);

      if (deleteUserError) {
        throw new Error(`Erreur lors de la suppression de l'utilisateur: ${deleteUserError.message}`);
      }

      console.log('Aidant supprimé avec succès');
      
      // Rafraîchir les données
      await fetchData();
    } catch (err) {
      console.error('Erreur lors de la suppression de l\'aidant:', err);
      throw err;
    }
  };

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      await Promise.all([
        fetchSeniors(),
        fetchAidants()
      ]);
    } catch (err) {
      console.error('Erreur globale:', err);
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Rafraîchissement automatique toutes les 3 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      if (!loading) {
        console.log('Rafraîchissement automatique des seniors et aidants...');
        fetchData();
      }
    }, 3 * 60 * 1000); // 3 minutes

    return () => clearInterval(interval);
  }, [loading]);

  return {
    seniors,
    aidants,
    loading,
    error,
    refetch: fetchData,
    addSenior,
    addAidant,
    updateSenior,
    deleteSenior,
    updateAidant,
    deleteAidant
  };
};
