import React, { useState } from 'react';
import { X, Phone, Delete } from 'lucide-react';

interface DialerModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const DialerModal: React.FC<DialerModalProps> = ({ isOpen, onClose }) => {
    const [number, setNumber] = useState('');

    if (!isOpen) return null;

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
        // Mock call action
        alert(`Calling ${number}...`);
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
                <div className="flex items-center gap-8">
                    <div className="w-14"></div> {/* Spacer for alignment */}

                    <button
                        onClick={handleCall}
                        className="w-16 h-16 rounded-full bg-green-500 hover:bg-green-600 text-white flex items-center justify-center shadow-lg shadow-green-200 transition-all hover:scale-105 active:scale-95"
                    >
                        <Phone size={28} fill="currentColor" />
                    </button>

                    <div className="w-14 flex justify-center">
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
        </div>
    );
};

export default DialerModal;
