import React, { useState, useEffect } from 'react';
import { PhoneOff, Mic, MicOff, Volume2, VolumeX, User } from 'lucide-react';

interface ActiveCallOverlayProps {
    isOpen: boolean;
    onClose: () => void;
    contactName?: string;
    phoneNumber?: string;
    isWhatsApp?: boolean;
}

const ActiveCallOverlay: React.FC<ActiveCallOverlayProps> = ({ 
    isOpen, 
    onClose, 
    contactName = 'Unknown Contact', 
    phoneNumber,
    isWhatsApp = false 
}) => {
    const [callStatus, setCallStatus] = useState<'calling' | 'connected' | 'ended'>('calling');
    const [callDuration, setCallDuration] = useState(0);
    const [isMuted, setIsMuted] = useState(false);
    const [isSpeaker, setIsSpeaker] = useState(false);

    useEffect(() => {
        if (!isOpen) {
            setCallStatus('calling');
            setCallDuration(0);
            setIsMuted(false);
            setIsSpeaker(false);
            return;
        }

        // Simulate connecting after 3 seconds
        const connectTimer = setTimeout(() => {
            setCallStatus('connected');
        }, 3000);

        return () => clearTimeout(connectTimer);
    }, [isOpen]);

    useEffect(() => {
        let interval: ReturnType<typeof setInterval>;
        if (callStatus === 'connected') {
            interval = setInterval(() => {
                setCallDuration(prev => prev + 1);
            }, 1000);
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [callStatus]);

    const handleEndCall = () => {
        setCallStatus('ended');
        setTimeout(() => {
            onClose();
        }, 1500);
    };

    const formatDuration = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    if (!isOpen) return null;

    const themeColor = isWhatsApp ? 'bg-[#128C7E]' : 'bg-gray-900';

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
            <div className={`relative w-full max-w-sm h-[600px] max-h-[90vh] ${themeColor} rounded-[3rem] shadow-2xl overflow-hidden flex flex-col items-center py-12 animate-in slide-in-from-bottom-10 duration-500`}>
                
                {/* Header */}
                <div className="flex flex-col items-center mt-8 mb-12">
                    <h2 className="text-white text-2xl font-semibold mb-2">{contactName}</h2>
                    {phoneNumber && <p className="text-white/70 text-sm mb-1">{phoneNumber}</p>}
                    <p className="text-white/80 text-sm tracking-wide">
                        {callStatus === 'calling' && 'Calling...'}
                        {callStatus === 'connected' && formatDuration(callDuration)}
                        {callStatus === 'ended' && 'Call Ended'}
                    </p>
                    {isWhatsApp && (
                        <p className="text-white/60 text-xs mt-2 font-medium">WhatsApp Audio</p>
                    )}
                </div>

                {/* Avatar area with ripple effect when calling */}
                <div className="relative flex-1 flex items-center justify-center w-full">
                    {callStatus === 'calling' && (
                        <>
                            <div className="absolute w-40 h-40 bg-white/10 rounded-full animate-ping" style={{ animationDuration: '2s' }}></div>
                            <div className="absolute w-56 h-56 bg-white/5 rounded-full animate-ping" style={{ animationDuration: '2s', animationDelay: '0.5s' }}></div>
                        </>
                    )}
                    <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm z-10 border-4 border-white/30">
                        <User size={64} className="text-white" />
                    </div>
                </div>

                {/* Controls */}
                <div className="w-full px-12 pb-12 mt-auto">
                    <div className="grid grid-cols-2 gap-8 mb-12">
                        <button 
                            onClick={() => setIsMuted(!isMuted)}
                            className={`flex flex-col items-center gap-2 transition-colors ${isMuted ? 'text-white' : 'text-white/60 hover:text-white'}`}
                        >
                            <div className={`w-16 h-16 rounded-full flex items-center justify-center ${isMuted ? 'bg-white/20' : 'bg-black/20'}`}>
                                {isMuted ? <MicOff size={28} /> : <Mic size={28} />}
                            </div>
                            <span className="text-xs font-medium tracking-wide">Mute</span>
                        </button>

                        <button 
                            onClick={() => setIsSpeaker(!isSpeaker)}
                            className={`flex flex-col items-center gap-2 transition-colors ${isSpeaker ? 'text-white' : 'text-white/60 hover:text-white'}`}
                        >
                            <div className={`w-16 h-16 rounded-full flex items-center justify-center ${isSpeaker ? 'bg-white/20' : 'bg-black/20'}`}>
                                {isSpeaker ? <Volume2 size={28} /> : <VolumeX size={28} />}
                            </div>
                            <span className="text-xs font-medium tracking-wide">Speaker</span>
                        </button>
                    </div>

                    {/* End Call Button */}
                    <div className="flex justify-center">
                        <button
                            onClick={handleEndCall}
                            disabled={callStatus === 'ended'}
                            className={`w-20 h-20 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center shadow-lg shadow-red-500/30 transition-transform ${callStatus !== 'ended' ? 'hover:scale-110 active:scale-95' : 'opacity-50 cursor-not-allowed'}`}
                        >
                            <PhoneOff size={32} className="text-white" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ActiveCallOverlay;
