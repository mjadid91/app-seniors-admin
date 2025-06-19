
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface PartnerCredentialsRequest {
  email: string;
  nom: string;
  password: string;
  raisonSociale: string;
}

const handler = async (req: Request): Promise<Response> => {
  console.log('Partner credentials email function called');

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, nom, password, raisonSociale }: PartnerCredentialsRequest = await req.json();
    
    console.log('Sending credentials email to:', email);

    // Pour cette implémentation, nous retournons simplement un succès
    // Dans un vrai environnement, vous devriez configurer Resend ou un autre service d'email
    console.log('Email would be sent with credentials:', {
      email,
      nom,
      password: '***hidden***',
      raisonSociale
    });

    // Simuler l'envoi d'email réussi
    const emailResponse = {
      id: 'mock-email-id',
      to: [email],
      subject: 'Vos identifiants partenaire AppSeniors'
    };

    console.log('Email sent successfully:', emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-partner-credentials function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
