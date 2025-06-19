
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { to, ticketId, response } = await req.json();

    console.log('Envoi d\'email pour le ticket:', ticketId);
    console.log('Destinataire:', to);
    console.log('Réponse:', response);

    // Ici vous pouvez intégrer votre service d'email préféré
    // Par exemple avec Resend, SendGrid, etc.
    
    // Pour l'instant, on simule l'envoi
    const emailSent = true;

    if (emailSent) {
      return new Response(
        JSON.stringify({ success: true, message: 'Email envoyé avec succès' }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200 
        }
      );
    } else {
      throw new Error('Échec de l\'envoi de l\'email');
    }

  } catch (error) {
    console.error('Erreur dans send-ticket-response:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400 
      }
    );
  }
})
