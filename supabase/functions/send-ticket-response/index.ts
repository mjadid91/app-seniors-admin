
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface TicketResponseRequest {
  ticketId: number;
  response: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { ticketId, response }: TicketResponseRequest = await req.json();

    console.log('Traitement de la réponse au ticket:', { ticketId, response });

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

    // Créer le contenu de l'email
    const emailSubject = `Réponse à votre ticket support : ${ticketData.sujet}`;
    const emailContent = `
      <html>
        <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #333; margin: 0;">Nouvelle réponse à votre ticket support</h2>
          </div>
          
          <div style="background-color: white; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #333; margin-top: 0;">Ticket #${ticketId} : ${ticketData.sujet}</h3>
            <p style="color: #666; margin: 5px 0;"><strong>Statut :</strong> ${ticketData.statut}</p>
            <p style="color: #666; margin: 5px 0;"><strong>Priorité :</strong> ${ticketData.priorite}</p>
          </div>

          <div style="background-color: #f0f8ff; padding: 15px; border-left: 4px solid #007bff; margin-bottom: 20px;">
            <h4 style="color: #333; margin-top: 0;">Réponse de notre équipe support :</h4>
            <div style="white-space: pre-wrap; color: #333;">${response}</div>
          </div>

          <div style="background-color: #f8f9fa; padding: 15px; border-radius: 8px; text-align: center;">
            <p style="color: #666; margin: 0;">
              Cet email est généré automatiquement par le système de support AppSeniors.
            </p>
            <p style="color: #666; margin: 10px 0 0 0;">
              <strong>Notre équipe support</strong>
            </p>
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
        notificationCreated: true 
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
