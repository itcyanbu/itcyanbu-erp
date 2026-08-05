import React, { useState } from 'react';
import { X, Phone, Delete } from 'lucide-react';
import ActiveCallOverlay from './ActiveCallOverlay';
import { useTwilio } from '../context/TwilioContext';

const WhatsAppIcon = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
    <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.66-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51h-.57c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.052 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
    </svg>
);

interface DialerModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const DialerModal: React.FC<DialerModalProps> = ({ isOpen, onClose }) => {
    const [number, setNumber] = useState('');
    const [isCallActive, setIsCallActive] = useState(false);
    const [isWhatsAppCall, setIsWhatsAppCall] = useState(false);
    const { makeCall } = useTwilio();

    if (!isOpen && !isCallActive) return null;

    const handleDigit = (digit: string) => {
        if (number.length < 15) {
            setNumber(prev => prev + digit);
        }
    };

    const handleDelete = () => {
        setNumber(prev => prev.slice(0, -1));
    };

    const handleCall = () => {
        if (!number) return;
        setIsWhatsAppCall(false);
        setIsCallActive(true);
        makeCall(number, false);
    };

    const handleWhatsAppCall = () => {
        if (!number) return;
        setIsWhatsAppCall(true);
        setIsCallActive(true);
        makeCall(number, true);
    };

    const digits = [
        ['1', ''], ['2', 'ABC'], ['3', 'DEF'],
        ['4', 'GHI'], ['5', 'JKL'], ['6', 'MNO'],
        ['7', 'PQRS'], ['8', 'TUV'], ['9', 'WXYZ'],
        ['*', ''], ['0', '+'], ['#', '']
    ];

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden flex flex-col items-center pb-8 animate-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="w-full px-6 py-4 flex items-center justify-between">
                    <div className="w-8"></div> {/* Spacer */}
                    <h3 className="text-lg font-semibold text-gray-700">Phone</h3>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <X size={20} className="text-gray-500" />
                    </button>
                </div>

                {/* Display */}
                <div className="w-full px-8 py-6 flex flex-col items-center justify-center h-24 mb-4">
                    <span className="text-4xl font-bold text-gray-900 tracking-wider h-12">
                        {number || <span className="text-gray-300">...</span>}
                    </span>
                    {number && (
                        <button onClick={() => setNumber('')} className="text-xs text-blue-600 font-medium mt-2 hover:underline">
                            Add to contact
                        </button>
                    )}
                </div>

                {/* Keypad */}
                <div className="grid grid-cols-3 gap-x-8 gap-y-6 mb-8">
                    {digits.map(([digit, letters]) => (
                        <button
                            key={digit}
                            onClick={() => handleDigit(digit)}
                            className="w-16 h-16 rounded-full bg-gray-50 hover:bg-gray-100 flex flex-col items-center justify-center transition-colors active:scale-95 duration-100"
                        >
                            <span className="text-2xl font-medium text-gray-900 leading-none">{digit}</span>
                            {letters && <span className="text-[10px] font-bold text-gray-400 mt-0.5">{letters}</span>}
                        </button>
                    ))}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-6">
                    <div className="w-10"></div> {/* Spacer for alignment */}

                    <button
                        onClick={handleCall}
                        className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 text-white flex items-center justify-center shadow-lg shadow-green-200 transition-all hover:scale-105 active:scale-95"
                        title="Regular Call"
                    >
                        <Phone size={24} fill="currentColor" />
                    </button>

                    <button
                        onClick={handleWhatsAppCall}
                        className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20b958] text-white flex items-center justify-center shadow-lg shadow-[#25D366]/30 transition-all hover:scale-105 active:scale-95"
                        title="WhatsApp Voice Call"
                    >
                        <div className="relative">
                            <WhatsAppIcon size={26} />
                        </div>
                    </button>

                    <div className="w-10 flex justify-center">
                        {number && (
                            <button
                                onClick={handleDelete}
                                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <Delete size={24} />
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <ActiveCallOverlay 
                isOpen={isCallActive}
                onClose={() => setIsCallActive(false)}
                contactName={number}
                phoneNumber={number}
                isWhatsApp={isWhatsAppCall}
            />
        </div>
    );
};

export default DialerModal;
