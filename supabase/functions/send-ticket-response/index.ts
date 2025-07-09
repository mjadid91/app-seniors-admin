
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { Resend } from "npm:resend@2.0.0"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface TicketResponseRequest {
  emailClient: string;
  nomSupport: string;
  contenu: string;
  sujetTicket: string;
  idTicket: number;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { emailClient, nomSupport, contenu, sujetTicket, idTicket }: TicketResponseRequest = await req.json();

    console.log('Envoi d\'email pour le ticket:', { idTicket, emailClient, sujetTicket });

    // Initialiser Resend avec la clé API
    const resend = new Resend("re_ACeH9WdA_8aYtPsn4DnpQd3yUYVPiyvdK");

    // Créer le contenu HTML de l'email
    const emailSubject = `Réponse à votre ticket : ${sujetTicket}`;
    
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
              <p style="margin: 10px 0 0 0; opacity: 0.9; font-size: 16px;">Ticket #${idTicket}</p>
            </div>

            <!-- Contenu principal -->
            <h2 style="color: #333; margin: 0 0 20px 0; font-size: 20px;">🎫 Votre ticket "<strong>${sujetTicket}</strong>" a reçu une réponse</h2>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 25px; border-left: 4px solid #007bff;">
              <p style="margin: 0 0 10px 0; color: #333;"><strong>Support :</strong> ${nomSupport}</p>
            </div>

            <!-- Message de réponse -->
            <div style="background-color: #e8f4fd; padding: 20px; border-radius: 8px; margin-bottom: 25px; border-left: 4px solid #007bff;">
              <p style="margin: 0 0 10px 0; color: #333; font-weight: 600;"><strong>Message :</strong></p>
              <div style="background-color: white; padding: 15px; border-radius: 6px; white-space: pre-wrap; color: #333; line-height: 1.5;">
${contenu}
              </div>
            </div>

            <!-- Bouton d'action -->
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://appseniors.fr/support/tickets/${idTicket}" 
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

    console.log('Préparation de l\'envoi d\'email à:', emailClient);
    console.log('Sujet:', emailSubject);

    // Envoyer l'email via Resend
    const emailResponse = await resend.emails.send({
      from: "support@appseniors.fr",
      to: [emailClient],
      subject: emailSubject,
      html: emailContent,
    });

    console.log('Email envoyé avec succès via Resend:', emailResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Email envoyé avec succès via Resend',
        emailSent: true,
        emailResponse: emailResponse,
        emailSubject: emailSubject,
        recipient: emailClient
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
