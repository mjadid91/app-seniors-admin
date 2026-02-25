import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Senior, Aidant } from '../types/seniors';

// ✅ CORRECTION 1 : Interfaces pour les données brutes des jointures
interface RawUser {
    IDUtilisateurs: number;
    Nom: string;
    Prenom: string;
    Email: string;
    Telephone: string | null;
    DateNaissance: string | null;
    Adresse: string | null;
    Genre: string | null;
    DateInscription: string;
}

interface RawSeniorRow {
    IDSeniors: number;
    NiveauAutonomie: number | null;
    Utilisateurs: RawUser | null;
}

interface RawAidantRow {
    IDAidant: number;
    Experience: string | null;
    TarifAidant: number | null;
    Utilisateurs: RawUser | null;
}

interface UserUpdatePayload {
    Nom?: string;
    Prenom?: string;
    Email?: string;
    Telephone?: string;
    Adresse?: string;
    DateNaissance?: string;
    Genre?: string;
    DateModification: string;
}

export const useSupabaseSeniors = () => {
    const [seniors, setSeniors] = useState<Senior[]>([]);
    const [aidants, setAidants] = useState<Aidant[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchSeniors = async () => {
        try {
            const { data, error: supabaseError } = await supabase
                .from('Seniors')
                .select(`
                  IDSeniors,
                  NiveauAutonomie,
                  Utilisateurs:IDUtilisateurSenior (
                    IDUtilisateurs, Nom, Prenom, Email, Telephone, DateNaissance, Adresse, Genre, DateInscription
                  )
                `);

            if (supabaseError) throw supabaseError;

            // ✅ Typage de la ligne SQL
            const formattedSeniors: Senior[] = (data as unknown as RawSeniorRow[] || []).map((row) => {
                const u = row.Utilisateurs;
                return {
                    id: row.IDSeniors.toString(),
                    nom: u?.Nom || 'Nom inconnu',
                    prenom: u?.Prenom || 'Prénom inconnu',
                    email: u?.Email || 'Email inconnu',
                    telephone: u?.Telephone || 'Non renseigné',
                    dateNaissance: u?.DateNaissance || '1970-01-01',
                    adresse: u?.Adresse || 'Non renseigné',
                    genre: u?.Genre || undefined,
                    niveauAutonomie: row.NiveauAutonomie === 1 ? 'faible' : row.NiveauAutonomie === 2 ? 'moyen' : 'eleve',
                    dateInscription: u?.DateInscription || new Date().toISOString(),
                    statut: 'actif' as const,
                    ville: 'Non renseigné',
                    codePostal: 'Non renseigné'
                };
            });

            setSeniors(formattedSeniors);
        } catch (err) {
            const message = err instanceof Error ? err.message : "Erreur inconnue";
            console.error('Erreur fetchSeniors:', message);
            setError(message);
        }
    };

    const fetchAidants = async () => {
        try {
            const { data, error: supabaseError } = await supabase
                .from('Aidant')
                .select(`
                  IDAidant,
                  Experience,
                  TarifAidant,
                  Utilisateurs:IDUtilisateurs (
                    IDUtilisateurs, Nom, Prenom, Email, Telephone, DateNaissance, Adresse, Genre, DateInscription
                  )
                `);

            if (supabaseError) throw supabaseError;

            const formattedAidants: Aidant[] = (data as unknown as RawAidantRow[] || []).map((row) => {
                const u = row.Utilisateurs;
                return {
                    id: row.IDAidant.toString(),
                    nom: u?.Nom || 'Nom inconnu',
                    prenom: u?.Prenom || 'Prénom inconnu',
                    email: u?.Email || 'Email inconnu',
                    telephone: u?.Telephone || 'Non renseigné',
                    dateNaissance: u?.DateNaissance || '1970-01-01',
                    adresse: u?.Adresse || 'Non renseigné',
                    genre: u?.Genre || undefined,
                    profession: 'Aidant professionnel',
                    experience: row.Experience || 'Non renseignée',
                    tarifHoraire: row.TarifAidant || 0,
                    dateInscription: u?.DateInscription || new Date().toISOString(),
                    statut: 'actif' as const,
                    ville: 'Non renseigné',
                    codePostal: 'Non renseigné',
                    disponibilites: { jours: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'], heures: '9h-17h' }
                };
            });

            setAidants(formattedAidants);
        } catch (err) {
            const message = err instanceof Error ? err.message : "Erreur inconnue";
            console.error('Erreur fetchAidants:', message);
            setError(message);
        }
    };

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        await Promise.all([fetchSeniors(), fetchAidants()]);
        setLoading(false);
    };

    const addSenior = async (seniorData: Partial<Senior>) => {
        try {
            const { data: userData, error: userError } = await supabase
                .from('Utilisateurs')
                .insert({
                    Nom: seniorData.nom,
                    Prenom: seniorData.prenom,
                    Email: seniorData.email,
                    Telephone: seniorData.telephone || '0000000000',
                    DateNaissance: seniorData.dateNaissance || '1970-01-01',
                    Adresse: seniorData.adresse || 'Non renseignée',
                    Genre: seniorData.genre || 'Non précisé',
                    IDCatUtilisateurs: 1,
                    DateInscription: new Date().toISOString(),
                    DateModification: new Date().toISOString(),
                    Commentaire: '',
                    Photo: '',
                    LangueSite: 'fr',
                    EstDesactive: false,
                    EstRGPD: false
                })
                .select()
                .single();

            if (userError) throw userError;

            if (seniorData.niveauAutonomie) {
                const niveauValue = seniorData.niveauAutonomie === 'faible' ? 1 : seniorData.niveauAutonomie === 'moyen' ? 2 : 3;
                await supabase
                    .from('Seniors')
                    .update({ NiveauAutonomie: niveauValue })
                    .eq('IDUtilisateurSenior', userData.IDUtilisateurs);
            }

            await fetchData();
            return userData;
        } catch (err) {
            console.error('Erreur addSenior:', err);
            throw err;
        }
    };

    const addAidant = async (aidantData: Partial<Aidant>) => {
        try {
            const { data: userData, error: userError } = await supabase
                .from('Utilisateurs')
                .insert({
                    Nom: aidantData.nom,
                    Prenom: aidantData.prenom,
                    Email: aidantData.email,
                    Telephone: aidantData.telephone || '0000000000',
                    DateNaissance: aidantData.dateNaissance || '1970-01-01',
                    Adresse: aidantData.adresse || 'Non renseignée',
                    Genre: aidantData.genre || 'Non précisé',
                    IDCatUtilisateurs: 4,
                    DateInscription: new Date().toISOString(),
                    DateModification: new Date().toISOString(),
                    Commentaire: '',
                    Photo: '',
                    LangueSite: 'fr',
                    EstDesactive: false,
                    EstRGPD: false
                })
                .select()
                .single();

            if (userError) throw userError;

            await supabase
                .from('Aidant')
                .update({
                    Experience: aidantData.experience,
                    TarifAidant: aidantData.tarifHoraire
                })
                .eq('IDUtilisateurs', userData.IDUtilisateurs);

            await fetchData();
            return userData;
        } catch (err) {
            console.error('Erreur addAidant:', err);
            throw err;
        }
    };

    const updateSenior = async (seniorId: string, updates: Partial<Senior>) => {
        try {
            const { data: seniorData } = await supabase.from('Seniors').select('IDUtilisateurSenior').eq('IDSeniors', parseInt(seniorId)).single();
            if (!seniorData) return;

            const userUpdates: UserUpdatePayload = { DateModification: new Date().toISOString() };
            if (updates.nom) userUpdates.Nom = updates.nom;
            if (updates.prenom) userUpdates.Prenom = updates.prenom;
            if (updates.email) userUpdates.Email = updates.email;
            if (updates.telephone) userUpdates.Telephone = updates.telephone;
            if (updates.adresse) userUpdates.Adresse = updates.adresse;
            if (updates.dateNaissance) userUpdates.DateNaissance = updates.dateNaissance;
            if (updates.genre !== undefined) userUpdates.Genre = updates.genre;

            await supabase.from('Utilisateurs').update(userUpdates).eq('IDUtilisateurs', seniorData.IDUtilisateurSenior);

            if (updates.niveauAutonomie) {
                const niveauValue = updates.niveauAutonomie === 'faible' ? 1 : updates.niveauAutonomie === 'moyen' ? 2 : 3;
                await supabase.from('Seniors').update({ NiveauAutonomie: niveauValue }).eq('IDSeniors', parseInt(seniorId));
            }
            await fetchData();
        } catch (err) {
            console.error('Erreur updateSenior:', err);
            throw err;
        }
    };

    const deleteSenior = async (seniorId: string) => {
        try {
            const { data: seniorData } = await supabase.from('Seniors').select('IDUtilisateurSenior').eq('IDSeniors', parseInt(seniorId)).single();
            if (seniorData) {
                await supabase.from('Seniors').delete().eq('IDSeniors', parseInt(seniorId));
                await supabase.from('Utilisateurs').delete().eq('IDUtilisateurs', seniorData.IDUtilisateurSenior);
            }
            await fetchData();
        } catch (err) {
            console.error('Erreur deleteSenior:', err);
            throw err;
        }
    };

    const updateAidant = async (aidantId: string, updates: Partial<Aidant>) => {
        try {
            const { data: aidantData } = await supabase.from('Aidant').select('IDUtilisateurs').eq('IDAidant', parseInt(aidantId)).single();
            if (!aidantData) return;

            const userUpdates: UserUpdatePayload = { DateModification: new Date().toISOString() };
            if (updates.nom) userUpdates.Nom = updates.nom;
            if (updates.prenom) userUpdates.Prenom = updates.prenom;
            if (updates.email) userUpdates.Email = updates.email;
            if (updates.telephone) userUpdates.Telephone = updates.telephone;
            if (updates.adresse) userUpdates.Adresse = updates.adresse;
            if (updates.dateNaissance) userUpdates.DateNaissance = updates.dateNaissance;
            if (updates.genre !== undefined) userUpdates.Genre = updates.genre;

            await supabase.from('Utilisateurs').update(userUpdates).eq('IDUtilisateurs', aidantData.IDUtilisateurs);

            // ✅ Typage strict des colonnes de la table Aidant
            const aidantUpdates: { Experience?: string, TarifAidant?: number } = {};
            if (updates.experience) aidantUpdates.Experience = updates.experience;
            if (updates.tarifHoraire !== undefined) aidantUpdates.TarifAidant = updates.tarifHoraire;

            if (Object.keys(aidantUpdates).length > 0) {
                await supabase.from('Aidant').update(aidantUpdates).eq('IDAidant', parseInt(aidantId));
            }
            await fetchData();
        } catch (err) {
            console.error('Erreur updateAidant:', err);
            throw err;
        }
    };

    const deleteAidant = async (aidantId: string) => {
        try {
            const { data: aidantData } = await supabase.from('Aidant').select('IDUtilisateurs').eq('IDAidant', parseInt(aidantId)).single();
            if (aidantData) {
                await supabase.from('Aidant').delete().eq('IDAidant', parseInt(aidantId));
                await supabase.from('Utilisateurs').delete().eq('IDUtilisateurs', aidantData.IDUtilisateurs);
            }
            await fetchData();
        } catch (err) {
            console.error('Erreur deleteAidant:', err);
            throw err;
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

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