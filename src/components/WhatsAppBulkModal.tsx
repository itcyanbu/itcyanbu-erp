import React, { useState, useEffect } from 'react';
import { X, Send, Clock, MessageSquare, CheckCircle2, Search, ArrowRight } from 'lucide-react';
import { MESSAGE_TEMPLATES, type MessageTemplate } from '../data/mockTemplates';

interface WhatsAppBulkModalProps {
    isOpen: boolean;
    onClose: () => void;
    selectedCount: number;
}

export const WhatsAppBulkModal: React.FC<WhatsAppBulkModalProps> = ({ isOpen, onClose, selectedCount }) => {
    const [step, setStep] = useState<1 | 2 | 3>(1);
    const [selectedTemplate, setSelectedTemplate] = useState<MessageTemplate | null>(null);
    const [scheduleMode, setScheduleMode] = useState<'now' | 'scheduled'>('now');
    const [scheduleDate, setScheduleDate] = useState('');
    const [progress, setProgress] = useState(0);
    const [sent, setSent] = useState(false);

    // Reset state when opened
    useEffect(() => {
        if (isOpen) {
            setStep(1);
            setSelectedTemplate(null);
            setScheduleMode('now');
            setProgress(0);
            setSent(false);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleSend = () => {
        setStep(3);
        let p = 0;
        const interval = setInterval(() => {
            p += Math.random() * 12 + 3;
            if (p >= 100) { 
                p = 100; 
                clearInterval(interval); 
                setSent(true); 
            }
            setProgress(Math.min(p, 100));
        }, 180);
    };

    const getCategoryColor = (category: string) => {
        switch (category) {
            case 'Greeting': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
            case 'Utility': return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'Marketing': return 'bg-purple-100 text-purple-700 border-purple-200';
            case 'Campaign': return 'bg-orange-100 text-orange-700 border-orange-200';
            case 'Support': return 'bg-gray-100 text-gray-700 border-gray-200';
            default: return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
            
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
                
                {/* Header */}
                <div className="flex-shrink-0 border-b border-gray-200 px-6 py-5 flex items-center justify-between bg-white">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-[#25D366]/10 text-[#25D366] rounded-xl flex items-center justify-center">
                            <MessageSquare size={24} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">WhatsApp Bulk Campaign</h2>
                            <p className="text-sm text-gray-500 mt-0.5">
                                Sending to <span className="font-bold text-ghl-blue">{selectedCount}</span> selected contact{selectedCount !== 1 ? 's' : ''}
                            </p>
                        </div>
                    </div>
                    <button 
                        onClick={onClose}
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Steps Indicator */}
                <div className="flex-shrink-0 bg-gray-50 border-b border-gray-200 px-6 py-3">
                    <div className="flex items-center gap-6">
                        {[
                            { num: 1, label: 'Select Template' },
                            { num: 2, label: 'Preview & Options' },
                            { num: 3, label: 'Send Progress' }
                        ].map((s, i) => (
                            <div key={s.num} className="flex items-center gap-3">
                                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors ${
                                    step > s.num ? 'bg-ghl-blue border-ghl-blue text-white' :
                                    step === s.num ? 'bg-white border-ghl-blue text-ghl-blue' :
                                    'bg-white border-gray-300 text-gray-400'
                                }`}>
                                    {step > s.num ? <CheckCircle2 size={16} /> : s.num}
                                </div>
                                <span className={`text-sm font-medium ${step >= s.num ? 'text-gray-900' : 'text-gray-400'}`}>
                                    {s.label}
                                </span>
                                {i < 2 && <ArrowRight size={16} className="text-gray-300 ml-3" />}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Content Body */}
                <div className="flex-1 overflow-y-auto p-6 bg-white">
                    {/* STEP 1: Select Template */}
                    {step === 1 && (
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <h3 className="text-base font-bold text-gray-900">Choose a pre-approved template</h3>
                                <div className="relative">
                                    <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input 
                                        type="text" 
                                        placeholder="Search templates..."
                                        className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-ghl-blue focus:border-ghl-blue outline-none transition-all w-64"
                                    />
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {MESSAGE_TEMPLATES.map(t => (
                                    <div 
                                        key={t.id}
                                        onClick={() => setSelectedTemplate(t)}
                                        className={`p-5 rounded-xl border-2 cursor-pointer transition-all ${
                                            selectedTemplate?.id === t.id 
                                                ? 'border-ghl-blue bg-blue-50/50 shadow-sm' 
                                                : 'border-gray-200 hover:border-blue-300 bg-white hover:bg-gray-50'
                                        }`}
                                    >
                                        <div className="flex items-start justify-between mb-3">
                                            <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold border ${getCategoryColor(t.category)}`}>
                                                {t.category}
                                            </span>
                                            {selectedTemplate?.id === t.id && (
                                                <CheckCircle2 size={20} className="text-ghl-blue" />
                                            )}
                                        </div>
                                        <h4 className="text-sm font-bold text-gray-900 mb-2">{t.name}</h4>
                                        <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed">
                                            {t.preview}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* STEP 2: Preview & Send */}
                    {step === 2 && selectedTemplate && (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
                            {/* Left: Message Preview (WhatsApp style UI) */}
                            <div className="flex flex-col">
                                <h3 className="text-base font-bold text-gray-900 mb-4">Message Preview</h3>
                                <div className="flex-1 bg-[#efeae2] rounded-2xl border border-gray-200 p-4 relative overflow-hidden flex flex-col justify-end min-h-[300px]">
                                    {/* WhatsApp background pattern (simulated with CSS or opacity) */}
                                    <div className="absolute inset-0 opacity-40 bg-[url('https://i.pinimg.com/736x/8c/98/99/8c98994518b575bfd8c949e91d20548b.jpg')] bg-cover mix-blend-overlay"></div>
                                    
                                    <div className="relative z-10 bg-white p-3.5 rounded-xl rounded-tr-none shadow-sm max-w-[90%] self-end">
                                        <div className="text-xs font-bold text-gray-400 mb-1 flex items-center gap-1.5">
                                            <MessageSquare size={12} />
                                            Template: {selectedTemplate.name}
                                        </div>
                                        <p className="text-sm text-gray-800 whitespace-pre-wrap leading-relaxed">
                                            {selectedTemplate.preview}
                                        </p>
                                        <div className="text-[10px] text-gray-400 mt-2 text-right flex items-center justify-end gap-1">
                                            10:42 AM <span className="text-blue-500 font-bold">✓✓</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right: Options */}
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-base font-bold text-gray-900 mb-4">Delivery Options</h3>
                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => setScheduleMode('now')}
                                            className={`flex-1 flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all ${
                                                scheduleMode === 'now' 
                                                ? 'border-ghl-blue bg-blue-50/50' 
                                                : 'border-gray-200 bg-white hover:bg-gray-50'
                                            }`}
                                        >
                                            <Send size={24} className={scheduleMode === 'now' ? 'text-ghl-blue' : 'text-gray-400'} />
                                            <span className="font-bold text-sm text-gray-900">Send Now</span>
                                        </button>
                                        <button
                                            onClick={() => setScheduleMode('scheduled')}
                                            className={`flex-1 flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all ${
                                                scheduleMode === 'scheduled' 
                                                ? 'border-ghl-blue bg-blue-50/50' 
                                                : 'border-gray-200 bg-white hover:bg-gray-50'
                                            }`}
                                        >
                                            <Clock size={24} className={scheduleMode === 'scheduled' ? 'text-ghl-blue' : 'text-gray-400'} />
                                            <span className="font-bold text-sm text-gray-900">Schedule</span>
                                        </button>
                                    </div>
                                </div>

                                {scheduleMode === 'scheduled' && (
                                    <div className="animate-in slide-in-from-top-2 duration-200">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Select Date & Time</label>
                                        <input 
                                            type="datetime-local" 
                                            value={scheduleDate}
                                            onChange={(e) => setScheduleDate(e.target.value)}
                                            className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-ghl-blue focus:border-ghl-blue outline-none transition-all shadow-sm"
                                        />
                                    </div>
                                )}

                                <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 mt-4">
                                    <h4 className="text-sm font-bold text-blue-900 mb-3">Estimated Performance Insights</h4>
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-blue-700">Total Recipients</span>
                                            <span className="font-bold text-blue-900">{selectedCount}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-blue-700">Est. Delivery Rate (94%)</span>
                                            <span className="font-bold text-blue-900">~{Math.round(selectedCount * 0.94)}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-blue-700">Est. Open Rate (76%)</span>
                                            <span className="font-bold text-blue-900">~{Math.round(selectedCount * 0.76)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* STEP 3: Progress & Completion */}
                    {step === 3 && (
                        <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center max-w-lg mx-auto">
                            {!sent ? (
                                <>
                                    <div className="relative mb-8">
                                        <div className="absolute inset-0 bg-[#25D366] rounded-full blur-xl opacity-20 animate-pulse"></div>
                                        <div className="w-24 h-24 bg-[#25D366]/10 rounded-full flex items-center justify-center relative">
                                            <Send size={40} className="text-[#25D366] ml-2 animate-bounce" />
                                        </div>
                                    </div>
                                    <h3 className="text-2xl font-black text-gray-900 mb-3">Sending Campaign...</h3>
                                    <p className="text-gray-500 mb-8 leading-relaxed">
                                        Connecting to WhatsApp API and dispatching messages to {selectedCount} recipients.
                                    </p>
                                    
                                    <div className="w-full bg-gray-100 rounded-full h-3 mb-3 overflow-hidden border border-gray-200">
                                        <div 
                                            className="bg-[#25D366] h-full rounded-full transition-all duration-300 ease-out" 
                                            style={{ width: `${progress}%` }}
                                        />
                                    </div>
                                    <div className="flex justify-between w-full text-sm font-medium text-gray-500">
                                        <span>{Math.round(progress)}% Complete</span>
                                        <span>{Math.round(selectedCount * (progress/100))} / {selectedCount} Sent</span>
                                    </div>
                                </>
                            ) : (
                                <div className="animate-in zoom-in duration-300">
                                    <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <CheckCircle2 size={48} className="text-emerald-600" />
                                    </div>
                                    <h3 className="text-2xl font-black text-gray-900 mb-3">Campaign Launched! 🎉</h3>
                                    <p className="text-gray-500 mb-8 leading-relaxed">
                                        Successfully queued {selectedCount} messages for delivery. You can track performance in the Campaigns tab.
                                    </p>
                                    <div className="grid grid-cols-3 gap-4 mb-8">
                                        <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                                            <div className="text-2xl font-black text-gray-900">{selectedCount}</div>
                                            <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mt-1">Total Sent</div>
                                        </div>
                                        <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                                            <div className="text-2xl font-black text-blue-600">{Math.round(selectedCount * 0.94)}</div>
                                            <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mt-1">Est. Delivered</div>
                                        </div>
                                        <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                                            <div className="text-2xl font-black text-purple-600">{Math.round(selectedCount * 0.76)}</div>
                                            <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mt-1">Est. Opens</div>
                                        </div>
                                    </div>
                                    <button 
                                        onClick={onClose}
                                        className="px-8 py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-colors shadow-lg shadow-gray-900/20"
                                    >
                                        Done
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Footer Controls */}
                {step < 3 && (
                    <div className="flex-shrink-0 border-t border-gray-200 px-6 py-4 bg-gray-50 flex items-center justify-between">
                        {step > 1 ? (
                            <button 
                                onClick={() => setStep((s) => (s - 1) as 1 | 2)}
                                className="px-5 py-2.5 text-sm font-bold text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
                            >
                                Back
                            </button>
                        ) : (
                            <button 
                                onClick={onClose}
                                className="px-5 py-2.5 text-sm font-bold text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
                            >
                                Cancel
                            </button>
                        )}

                        {step === 1 ? (
                            <button 
                                onClick={() => setStep(2)}
                                disabled={!selectedTemplate}
                                className="px-5 py-2.5 text-sm font-bold text-white bg-ghl-blue rounded-lg hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                Next: Review Options <ArrowRight size={16} />
                            </button>
                        ) : (
                            <button 
                                onClick={handleSend}
                                className="px-6 py-2.5 text-sm font-bold text-white bg-[#25D366] rounded-lg hover:bg-[#128C7E] transition-colors shadow-lg shadow-[#25D366]/30 flex items-center gap-2"
                            >
                                <Send size={16} />
                                {scheduleMode === 'now' ? 'Send Campaign Now' : 'Schedule Campaign'}
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
