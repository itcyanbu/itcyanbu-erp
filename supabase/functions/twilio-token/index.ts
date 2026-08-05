import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import twilio from "npm:twilio";

const TWILIO_ACCOUNT_SID = Deno.env.get('TWILIO_ACCOUNT_SID');
const TWILIO_API_KEY = Deno.env.get('TWILIO_API_KEY');
const TWILIO_API_SECRET = Deno.env.get('TWILIO_API_SECRET');
const TWILIO_TWIML_APP_SID = Deno.env.get('TWILIO_TWIML_APP_SID');

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
    // Handle CORS preflight requests
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders });
    }

    try {
        if (!TWILIO_ACCOUNT_SID || !TWILIO_API_KEY || !TWILIO_API_SECRET || !TWILIO_TWIML_APP_SID) {
            throw new Error("Missing Twilio credentials in environment variables.");
        }

        // Ideally, we'd get the user's identity from Supabase Auth
        // const authHeader = req.headers.get('Authorization');
        // Validate user here...
        const identity = 'user_demo_' + Math.floor(Math.random() * 1000);

        const AccessToken = twilio.jwt.AccessToken;
        const VoiceGrant = AccessToken.VoiceGrant;

        // Create an access token which we will sign and return to the client
        const token = new AccessToken(
            TWILIO_ACCOUNT_SID,
            TWILIO_API_KEY,
            TWILIO_API_SECRET,
            { identity: identity }
        );

        // Create a Voice grant and add it to the token
        const voiceGrant = new VoiceGrant({
            outgoingApplicationSid: TWILIO_TWIML_APP_SID,
            incomingAllow: true, 
        });

        token.addGrant(voiceGrant);

        return new Response(JSON.stringify({ token: token.toJwt(), identity }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200,
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 500,
        });
    }
});
