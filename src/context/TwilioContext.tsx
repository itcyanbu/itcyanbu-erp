import React, { createContext, useContext, useState } from 'react';

// Twilio types (mock until real SDK is connected with credentials)
interface TwilioCallLike {
    status: () => string;
    disconnect: () => void;
    mute: (muted: boolean) => void;
    sendDigits: (digits: string) => void;
    on: (event: string, handler: (...args: any[]) => void) => void;
    removeListener: (event: string, handler: (...args: any[]) => void) => void;
}

interface TwilioContextType {
    device: any | null;
    currentCall: TwilioCallLike | null;
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
    makeCall: async () => { console.warn('Twilio not configured'); },
    endCall: () => {},
    muteCall: () => {},
    sendDigits: () => {}
});

export const useTwilio = () => useContext(TwilioContext);

export const TwilioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [currentCall, setCurrentCall] = useState<TwilioCallLike | null>(null);
    const [isReady] = useState(true);

    // Mock mode: Twilio SDK will be dynamically loaded only when credentials are provided.
    // For now, all call actions go through the ActiveCallOverlay UI simulation.

    const makeCall = async (to: string, isWhatsApp = false) => {
        console.log(`[Mock] Initiating ${isWhatsApp ? 'WhatsApp' : 'Voice'} call to: ${to}`);
        // The ActiveCallOverlay handles the UI simulation
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
        <TwilioContext.Provider value={{ device: null, currentCall, isReady, makeCall, endCall, muteCall, sendDigits }}>
            {children}
        </TwilioContext.Provider>
    );
};
