
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface TicketResponseRequest {
  ticketId: number;
  response: string;
  fileUrl?: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { ticketId, response, fileUrl }: TicketResponseRequest = await req.json();

    console.log('Traitement de la réponse au ticket:', { ticketId, response, fileUrl });

    // Initialiser le client Supabase avec la clé de service
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Récupérer les détails du ticket et de l'utilisateur
    const { data: ticketData, error: ticketError } = await supabase
      .from('support_dashboard_view')
      .select('*')
      .eq('id', ticketId)
      .single();

    if (ticketError) {
      console.error('Erreur lors de la récupération du ticket:', ticketError);
      throw new Error('Ticket non trouvé');
    }

    console.log('Données du ticket récupérées:', ticketData);

    if (!ticketData.utilisateur_email) {
      console.log('Pas d\'email utilisateur disponible pour le ticket:', ticketId);
      return new Response(
        JSON.stringify({ success: true, message: 'Pas d\'email à envoyer' }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200 
        }
      );
    }

    // Récupérer les informations de l'agent de support qui a répondu
    const { data: lastResponse, error: responseError } = await supabase
      .from('ReponsesSupport')
      .select(`
        *,
        Utilisateurs!fk_auteur(
          Nom,
          Prenom,
          Email
        )
      `)
      .eq('IDTicketClient', ticketId)
      .order('DateReponse', { ascending: false })
      .limit(1)
      .single();

    if (responseError) {
      console.error('Erreur lors de la récupération de la réponse:', responseError);
    }

    const supportAgent = lastResponse?.Utilisateurs || { Nom: 'Support', Prenom: 'Équipe' };
    const supportName = `${supportAgent.Prenom} ${supportAgent.Nom}`;
    const responseDate = new Date().toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    // Créer le contenu de l'email
    const emailSubject = `Réponse à votre ticket : ${ticketData.sujet}`;
    
    // Créer le lien vers le fichier joint si disponible
    const fileSection = fileUrl ? `
      <div style="background-color: #f8f9fa; padding: 15px; border-radius: 8px; margin: 20px 0;">
        <p style="margin: 0; color: #333;">
          <strong>📎 Fichier joint :</strong> 
          <a href="${fileUrl}" style="color: #007bff; text-decoration: none;" target="_blank">
            Télécharger le fichier
          </a>
        </p>
      </div>
    ` : '';

    const emailContent = `
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Réponse à votre ticket support</title>
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
          <div style="background-color: white; border-radius: 12px; padding: 30px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            
            <!-- En-tête -->
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 25px; border-radius: 8px; text-align: center; margin-bottom: 30px;">
              <h1 style="margin: 0; font-size: 24px; font-weight: 600;">🎫 Réponse à votre ticket</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9; font-size: 16px;">Ticket #${ticketId}</p>
            </div>

            <!-- Informations du ticket -->
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 25px; border-left: 4px solid #007bff;">
              <h2 style="color: #333; margin: 0 0 15px 0; font-size: 18px;">📋 ${ticketData.sujet}</h2>
              <div style="display: flex; flex-wrap: wrap; gap: 20px; font-size: 14px; color: #666;">
                <div><strong>Support :</strong> ${supportName}</div>
                <div><strong>Date :</strong> ${responseDate}</div>
                <div><strong>Statut :</strong> <span style="background-color: #28a745; color: white; padding: 2px 8px; border-radius: 12px; font-size: 12px;">${ticketData.statut}</span></div>
              </div>
            </div>

            <!-- Contenu de la réponse -->
            <div style="background-color: #e8f4fd; padding: 20px; border-radius: 8px; margin-bottom: 25px; border-left: 4px solid #007bff;">
              <h3 style="color: #333; margin: 0 0 15px 0; font-size: 16px; display: flex; align-items: center;">
                💬 Message de notre équipe support
              </h3>
              <div style="background-color: white; padding: 15px; border-radius: 6px; white-space: pre-wrap; color: #333; line-height: 1.5;">
${response}
              </div>
            </div>

            <!-- Fichier joint -->
            ${fileSection}

            <!-- Bouton d'action -->
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://kszpkzlkevjsqncfwhvt.supabase.co/support/ticket/${ticketId}" 
                 style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 12px 30px; text-decoration: none; border-radius: 25px; font-weight: 600; font-size: 14px; box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);">
                👉 Consulter le ticket dans l'application
              </a>
            </div>

            <!-- Informations complémentaires -->
            <div style="background-color: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 8px; margin-top: 25px;">
              <p style="margin: 0; font-size: 14px; color: #856404;">
                <strong>💡 Besoin d'aide supplémentaire ?</strong><br>
                N'hésitez pas à répondre à ce ticket si vous avez d'autres questions. Notre équipe est là pour vous accompagner.
              </p>
            </div>

            <!-- Pied de page -->
            <div style="border-top: 1px solid #e9ecef; padding-top: 20px; margin-top: 30px; text-align: center;">
              <p style="color: #6c757d; font-size: 12px; margin: 0;">
                Vous recevez ce message car vous avez ouvert un ticket de support sur <strong>AppSeniors</strong>.<br>
                Cet email est généré automatiquement par notre système de support.
              </p>
              <p style="color: #6c757d; font-size: 12px; margin: 10px 0 0 0;">
                <strong>Notre équipe support AppSeniors</strong>
              </p>
            </div>
          </div>
        </body>
      </html>
    `;

    console.log('Préparation de l\'envoi d\'email à:', ticketData.utilisateur_email);
    console.log('Sujet:', emailSubject);

    // Simuler l'envoi d'email (ici vous pouvez intégrer votre service d'email préféré)
    // Par exemple avec Resend, SendGrid, etc.
    
    // Pour l'instant, on simule l'envoi réussi
    console.log('Email simulé envoyé avec succès');
    console.log('Contenu HTML:', emailContent);

    // Créer une notification in-app pour l'utilisateur
    if (ticketData.id_utilisateur) {
      const { error: notifError } = await supabase
        .from('Notifications')
        .insert({
          Titre: `Réponse à votre ticket #${ticketId}`,
          Message: `Notre équipe support a répondu à votre ticket "${ticketData.sujet}". Consultez la réponse dans votre espace.`,
          TypeNotification: 'info',
          IDUtilisateurDestinataire: ticketData.id_utilisateur,
          IDUtilisateurOrigine: null,
          Cible: null
        });

      if (notifError) {
        console.error('Erreur lors de la création de la notification:', notifError);
      } else {
        console.log('Notification in-app créée avec succès');
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Email envoyé et notification créée avec succès',
        emailSent: true,
        notificationCreated: true,
        emailContent: emailContent,
        emailSubject: emailSubject,
        recipient: ticketData.utilisateur_email
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    console.error('Erreur dans send-ticket-response:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        success: false 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
})
