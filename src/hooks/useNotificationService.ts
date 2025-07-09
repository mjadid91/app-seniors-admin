
import { supabase } from '@/integrations/supabase/client';

interface CreateNotificationParams {
  titre: string;
  message: string;
  typeNotification: 'info' | 'success' | 'warning' | 'error' | 'système';
  idUtilisateurDestinataire?: number | null;
  idUtilisateurOrigine?: number | null;
  cible?: 'Tous' | 'Admin' | 'Aidant' | 'Senior' | 'Support' | 'Moderateur' | null;
}

export const useNotificationService = () => {
  const createNotification = async (params: CreateNotificationParams) => {
    try {
      const { error } = await supabase
        .from('Notifications')
        .insert({
          Titre: params.titre,
          Message: params.message,
          TypeNotification: params.typeNotification,
          IDUtilisateurDestinataire: params.idUtilisateurDestinataire,
          IDUtilisateurOrigine: params.idUtilisateurOrigine,
          Cible: params.cible,
          DateCreation: new Date().toISOString(),
          EstLu: false
        });

      if (error) {
        console.error('Erreur lors de la création de la notification:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Erreur lors de la création de la notification:', error);
      return false;
    }
  };

  // Exemples de notifications automatiques
  const notifyTicketAssignment = async (ticketId: number, assignedUserId: number, assignedByUserId: number) => {
    return createNotification({
      titre: "Nouveau ticket support",
      message: `Vous avez été assigné au ticket #${ticketId}`,
      typeNotification: 'info',
      idUtilisateurDestinataire: assignedUserId,
      idUtilisateurOrigine: assignedByUserId
    });
  };

  const notifyNewPrestation = async (prestationTitle: string, createdByUserId: number) => {
    return createNotification({
      titre: "Nouvelle prestation créée",
      message: `Une nouvelle prestation "${prestationTitle}" a été créée`,
      typeNotification: 'info',
      idUtilisateurOrigine: createdByUserId,
      cible: 'Admin'
    });
  };

  const notifyRGPDRequest = async (requestType: string, userId: number) => {
    return createNotification({
      titre: "Nouvelle demande RGPD",
      message: `Une demande de ${requestType} a été soumise et nécessite votre attention`,
      typeNotification: 'warning',
      idUtilisateurOrigine: userId,
      cible: 'Admin'
    });
  };

  const notifyNewDocument = async (documentTitle: string, uploadedByUserId: number) => {
    return createNotification({
      titre: "Nouveau document partagé",
      message: `Le document "${documentTitle}" a été partagé`,
      typeNotification: 'info',
      idUtilisateurOrigine: uploadedByUserId,
      cible: 'Tous'
    });
  };

  const notifyEvaluationReceived = async (evaluatedUserId: number, evaluatorUserId: number, note: number) => {
    return createNotification({
      titre: "Nouvelle évaluation reçue",
      message: `Vous avez reçu une évaluation de ${note}/5 étoiles`,
      typeNotification: 'success',
      idUtilisateurDestinataire: evaluatedUserId,
      idUtilisateurOrigine: evaluatorUserId
    });
  };

  const notifyGroupAddition = async (groupName: string, addedUserId: number, addedByUserId: number) => {
    return createNotification({
      titre: "Ajout à un groupe",
      message: `Vous avez été ajouté au groupe "${groupName}"`,
      typeNotification: 'info',
      idUtilisateurDestinataire: addedUserId,
      idUtilisateurOrigine: addedByUserId
    });
  };

  return {
    createNotification,
    notifyTicketAssignment,
    notifyNewPrestation,
    notifyRGPDRequest,
    notifyNewDocument,
    notifyEvaluationReceived,
    notifyGroupAddition
  };
};
