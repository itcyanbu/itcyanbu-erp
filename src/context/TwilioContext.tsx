import React, { createContext, useContext, useEffect, useState } from 'react';
import { Call, Device } from '@twilio/voice-sdk';

interface TwilioContextType {
    device: Device | null;
    currentCall: Call | null;
    isReady: boolean;
    makeCall: (to: string, isWhatsApp?: boolean) => Promise<void>;
    endCall: () => void;
    muteCall: (mute: boolean) => void;
    sendDigits: (digits: string) => void;
}

const TwilioContext = createContext<TwilioContextType>({
    device: null,
    currentCall: null,
    isReady: false,
    makeCall: async () => {},
    endCall: () => {},
    muteCall: () => {},
    sendDigits: () => {}
});

export const useTwilio = () => useContext(TwilioContext);

export const TwilioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [device, setDevice] = useState<Device | null>(null);
    const [currentCall, setCurrentCall] = useState<Call | null>(null);
    const [isReady, setIsReady] = useState(false);
    
    // We will initialize this by fetching a token from Supabase Edge Functions
    useEffect(() => {
        const initTwilio = async () => {
            try {
                // In production, fetch this from the Supabase edge function:
                // const { data } = await supabase.functions.invoke('twilio-token');
                // const token = data.token;
                
                // For now, we wait for the user to provide keys and set up the backend.
                // We'll simulate readiness after a delay to mock the connection phase if keys are missing.
                const mockToken = import.meta.env.VITE_TWILIO_MOCK_TOKEN;
                
                if (mockToken) {
                    const newDevice = new Device(mockToken, {
                        codecPreferences: [Call.Codec.Opus, Call.Codec.PCMU],
                        logLevel: 1
                    });

                    newDevice.on('ready', () => {
                        console.log('Twilio.Device Ready!');
                        setIsReady(true);
                    });

                    newDevice.on('error', (twilioError) => {
                        console.error('Twilio.Device Error: ', twilioError.message);
                    });

                    await newDevice.register();
                    setDevice(newDevice);
                } else {
                    console.warn('Twilio Token not provided. Voice calling is running in mock mode.');
                    // Still set isReady to true so the UI can be tested without errors
                    setIsReady(true);
                }

            } catch (error) {
                console.error('Error initializing Twilio: ', error);
            }
        };

        initTwilio();

        return () => {
            if (device) {
                device.destroy();
            }
        };
    }, []);

    const makeCall = async (to: string, isWhatsApp = false) => {
        if (!device && !import.meta.env.VITE_TWILIO_MOCK_TOKEN) {
            console.warn('Simulating call to', to, isWhatsApp ? '(WhatsApp)' : '(Voice)');
            // Simulation mode - no real device connected
            return;
        }

        if (!device || !isReady) {
            console.error('Twilio device not ready');
            return;
        }

        try {
            // If calling via WhatsApp, Twilio expects the format whatsapp:+1234567890
            const destination = isWhatsApp && !to.startsWith('whatsapp:') 
                ? `whatsapp:${to}` 
                : to;

            const call = await device.connect({ 
                params: { To: destination } 
            });

            call.on('accept', () => {
                console.log('Call accepted');
            });
            
            call.on('disconnect', () => {
                console.log('Call disconnected');
                setCurrentCall(null);
            });

            setCurrentCall(call);
        } catch (error) {
            console.error('Error making call:', error);
        }
    };

    const endCall = () => {
        if (currentCall) {
            currentCall.disconnect();
            setCurrentCall(null);
        }
    };

    const muteCall = (mute: boolean) => {
        if (currentCall) {
            currentCall.mute(mute);
        }
    };

    const sendDigits = (digits: string) => {
        if (currentCall) {
            currentCall.sendDigits(digits);
        }
    };

    return (
        <TwilioContext.Provider value={{ device, currentCall, isReady, makeCall, endCall, muteCall, sendDigits }}>
            {children}
        </TwilioContext.Provider>
    );
};
