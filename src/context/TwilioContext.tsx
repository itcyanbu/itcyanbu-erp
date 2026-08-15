import React, { createContext, useContext, useState } from 'react';

interface TwilioContextType {
    device: any;
    currentCall: any;
    isReady: boolean;
    makeCall: (to: string, isWhatsApp?: boolean) => Promise<void>;
    endCall: () => void;
    muteCall: (mute: boolean) => void;
    sendDigits: (digits: string) => void;
}

const TwilioContext = createContext<TwilioContextType>({
    device: null,
    currentCall: null,
    isReady: true,
    makeCall: async () => { console.warn('TwilioProvider not mounted'); },
    endCall: () => {},
    muteCall: () => {},
    sendDigits: () => {}
});

export const useTwilio = () => useContext(TwilioContext);

export const TwilioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [currentCall, setCurrentCall] = useState<any>(null);

    // Mock mode — no Twilio credentials configured yet.
    // When credentials are provided, we'll dynamically import @twilio/voice-sdk here.
    const makeCall = async (to: string, isWhatsApp = false) => {
        console.warn('Twilio: Simulating call to', to, isWhatsApp ? '(WhatsApp)' : '(Voice)');
    };

    const endCall = () => {
        if (currentCall) {
            try { currentCall.disconnect(); } catch (_) {}
            setCurrentCall(null);
        }
    };

    const muteCall = (mute: boolean) => {
        if (currentCall) {
            try { currentCall.mute(mute); } catch (_) {}
        }
    };

    const sendDigits = (digits: string) => {
        if (currentCall) {
            try { currentCall.sendDigits(digits); } catch (_) {}
        }
    };

    return (
        <TwilioContext.Provider value={{ device: null, currentCall, isReady: true, makeCall, endCall, muteCall, sendDigits }}>
            {children}
        </TwilioContext.Provider>
    );
};
