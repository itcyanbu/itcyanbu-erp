import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import twilio from "npm:twilio";

const TWILIO_CALLER_ID = Deno.env.get('TWILIO_CALLER_ID');

serve(async (req) => {
    try {
        const formData = await req.formData();
        const to = formData.get('To');

        const VoiceResponse = twilio.twiml.VoiceResponse;
        const twiml = new VoiceResponse();

        if (!to) {
            twiml.say("Welcome to the Twilio integration. We could not find a number to dial.");
        } else if (to.toString().startsWith('whatsapp:')) {
            // Dialing a WhatsApp destination
            // Note: Twilio Voice to WhatsApp requires specific SIP domain setups in production
            // For a basic WebRTC to standard network, we use standard Dial. 
            // We'll leave the basic structure for routing here.
            twiml.say("Connecting you to WhatsApp...");
            const dial = twiml.dial({ callerId: TWILIO_CALLER_ID });
            dial.number(to.toString());
        } else {
            // Standard PSTN Dial
            twiml.say("Connecting...");
            const dial = twiml.dial({ callerId: TWILIO_CALLER_ID });
            dial.number(to.toString());
        }

        return new Response(twiml.toString(), {
            headers: { 'Content-Type': 'text/xml' },
            status: 200,
        });
    } catch (error) {
        console.error("Twilio Voice Webhook Error:", error);
        return new Response("Error processing TwiML", { status: 500 });
    }
});
