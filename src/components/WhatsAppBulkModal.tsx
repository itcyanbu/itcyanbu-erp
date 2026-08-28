import React, { useState, useEffect } from 'react';
import { X, Send, Clock, MessageSquare, CheckCircle2, Search, ArrowRight, ExternalLink, Wifi } from 'lucide-react';
import { MESSAGE_TEMPLATES, type MessageTemplate } from '../data/mockTemplates';
import { getWAConfig, sendBulkTextMessages, type WASendResult } from '../utils/whatsappApi';

interface WhatsAppBulkModalProps {
    isOpen: boolean;
    onClose: () => void;
    selectedCount: number;
    selectedContacts?: { id: string; name?: string; firstName?: string; phone?: string; }[];
}

export const WhatsAppBulkModal: React.FC<WhatsAppBulkModalProps> = ({ isOpen, onClose, selectedCount, selectedContacts = [] }) => {
    const [step, setStep] = useState<1 | 2 | 3>(1);
    const [selectedTemplate, setSelectedTemplate] = useState<MessageTemplate | null>(MESSAGE_TEMPLATES[0] || null);
    const [isCustomMode, setIsCustomMode] = useState(false);
    const [customText, setCustomText] = useState('Hello {{name}},\n\nThank you for reaching out to us. How can we help you today?');
    const [attachmentUrl, setAttachmentUrl] = useState('');
    const [scheduleMode, setScheduleMode] = useState<'now' | 'scheduled'>('now');
    const [scheduleDate, setScheduleDate] = useState('');
    const [progress, setProgress] = useState(0);
    const [sent, setSent] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [sendResults, setSendResults] = useState<WASendResult[]>([]);
    const [sendMode, setSendMode] = useState<'api' | 'web'>('web');

    // Check if Meta Cloud API is configured
    const waCfg = getWAConfig();
    const hasApiConfig = !!waCfg;

    // Helpers
    const firstContact = selectedContacts.length > 0 ? selectedContacts[0] : null;
    const recipientName = firstContact?.name || firstContact?.firstName || 'Valued Customer';
    const rawPhone = firstContact?.phone || '';
    const cleanPhone = rawPhone.replace(/[^0-9]/g, '');

    const buildMessage = (contact: { name?: string; firstName?: string }) => {
        const name = contact.name || contact.firstName || 'Valued Customer';
        const templateText = isCustomMode ? customText : (selectedTemplate?.preview || '');
        let text = templateText
            .replace(/\{\{name\}\}/g, name)
            .replace(/\{\{order_id\}\}/g, 'ORD-9842')
            .replace(/\{\{date\}\}/g, 'Tomorrow')
            .replace(/\{\{link\}\}/g, 'https://itcyanbu.net/track')
            .replace(/\{\{code\}\}/g, 'SAVE15');
        
        if (attachmentUrl.trim()) {
            text += `\n\n📎 Attachment: ${attachmentUrl.trim()}`;
        }
        return text;
    };

    const getProcessedMessage = () => buildMessage(firstContact || {});

    const openDirectWhatsApp = () => {
        const msg = getProcessedMessage();
        const url = cleanPhone
            ? `https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`
            : `https://wa.me/?text=${encodeURIComponent(msg)}`;
        window.open(url, '_blank');
    };

    // Reset state when opened
    useEffect(() => {
        if (isOpen) {
            setStep(1);
            setSelectedTemplate(MESSAGE_TEMPLATES[0] || null);
            setScheduleMode('now');
            setProgress(0);
            setSent(false);
            setSearchTerm('');
            setSendResults([]);
            setSendMode(hasApiConfig ? 'api' : 'web');
        }
    }, [isOpen, hasApiConfig]);

    if (!isOpen) return null;

    const contactsWithPhone = selectedContacts.filter(c => c.phone && c.phone.trim() !== '');

    const handleSend = async () => {
        setStep(3);
        setProgress(0);
        setSendResults([]);

        if (hasApiConfig && waCfg && sendMode === 'api') {
            // ── Real Meta Cloud API send ──
            const messages = contactsWithPhone.map(c => ({
                to: (c.phone || '').replace(/[^0-9+]/g, '').replace(/^\+/, ''),
                body: buildMessage(c),
            }));

            await sendBulkTextMessages(waCfg, messages, (done, total, result) => {
                setProgress(Math.round((done / total) * 100));
                setSendResults(prev => [...prev, result]);
                if (done === total) setSent(true);
            });

            if (messages.length === 0) { setProgress(100); setSent(true); }
        } else {
            // ── WhatsApp Web fallback ──
            contactsWithPhone.forEach((contact, index) => {
                const phone = (contact.phone || '').replace(/[^0-9]/g, '');
                const msg = buildMessage(contact);
                const url = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
                setTimeout(() => { window.open(url, '_blank'); }, index * 600);
            });

            // Animate progress
            let p = 0;
            const interval = setInterval(() => {
                p += Math.random() * 14 + 6;
                if (p >= 100) { p = 100; clearInterval(interval); setSent(true); }
                setProgress(Math.min(p, 100));
            }, 150);
        }
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
                    {/* STEP 1: Select Template or Write Custom Message */}
                    {step === 1 && (
                        <div className="space-y-6">
                            {/* Mode Toggle Header */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
                                <div className="flex gap-2 bg-gray-100 p-1.5 rounded-xl border border-gray-200">
                                    <button
                                        type="button"
                                        key="btn-templates"
                                        onClick={() => setIsCustomMode(false)}
                                        className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer select-none ${
                                            !isCustomMode ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'
                                        }`}
                                    >
                                        📑 Pre-made Templates
                                    </button>
                                    <button
                                        type="button"
                                        key="btn-custom"
                                        onClick={() => setIsCustomMode(true)}
                                        className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer select-none ${
                                            isCustomMode ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-500 hover:text-gray-900'
                                        }`}
                                    >
                                        ✏️ Write Custom Message & Attachments
                                    </button>
                                </div>

                                {!isCustomMode && (
                                    <div className="relative">
                                        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input 
                                            type="text" 
                                            placeholder="Search templates..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-ghl-blue focus:border-ghl-blue outline-none transition-all w-64"
                                        />
                                    </div>
                                )}
                            </div>

                            {/* CUSTOM MESSAGE EDITOR */}
                            {isCustomMode ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <div>
                                            <div className="flex items-center justify-between mb-2">
                                                <label className="text-sm font-bold text-gray-900">Type Your Message Text:</label>
                                                <div className="flex gap-1">
                                                    {['{{name}}', '{{date}}', '{{order_id}}', '{{link}}'].map(tag => (
                                                        <button
                                                            key={tag}
                                                            type="button"
                                                            onClick={() => setCustomText(prev => prev + ' ' + tag)}
                                                            className="text-[11px] bg-blue-50 text-blue-600 hover:bg-blue-100 px-2 py-0.5 rounded font-mono font-bold transition-colors"
                                                            title={`Insert ${tag}`}
                                                        >
                                                            +{tag}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                            <textarea
                                                rows={7}
                                                value={customText}
                                                onChange={e => setCustomText(e.target.value)}
                                                placeholder="Write your custom WhatsApp message here... You can use variables like {{name}}"
                                                className="w-full p-4 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-sans leading-relaxed"
                                            />
                                        </div>

                                        <div>
                                            <label className="text-sm font-bold text-gray-900 mb-1.5 flex items-center justify-between">
                                                <span>📎 File / Image URL (Optional):</span>
                                                <span className="text-xs font-normal text-gray-400">PDF, JPG, PNG, Document Link</span>
                                            </label>
                                            <input
                                                type="url"
                                                value={attachmentUrl}
                                                onChange={e => setAttachmentUrl(e.target.value)}
                                                placeholder="https://example.com/brochure.pdf or https://example.com/image.png"
                                                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-xs font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            />
                                            <p className="text-[11px] text-gray-400 mt-1">This link will be attached at the bottom of the message.</p>
                                        </div>
                                    </div>

                                    {/* Real-time Preview in Step 1 */}
                                    <div className="flex flex-col">
                                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Live Preview for: {recipientName}</span>
                                        <div className="flex-1 bg-[#efeae2] rounded-2xl border border-gray-200 p-4 relative overflow-hidden flex flex-col justify-end min-h-[220px]">
                                            <div className="relative z-10 bg-[#d9fdd3] p-4 rounded-xl rounded-tr-none shadow-sm max-w-[95%] self-end border border-emerald-200/50">
                                                <p className="text-sm text-gray-900 whitespace-pre-wrap leading-relaxed">
                                                    {getProcessedMessage() || 'Start typing your message on the left...'}
                                                </p>
                                                <div className="text-[10px] text-gray-500 mt-2 text-right flex items-center justify-end gap-1">
                                                    Now <span className="text-blue-500 font-bold">✓✓</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                /* TEMPLATES GRID */
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {MESSAGE_TEMPLATES.filter(t =>
                                        t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                        t.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                        t.preview.toLowerCase().includes(searchTerm.toLowerCase())
                                    ).map(t => {
                                        const isSelected = selectedTemplate?.id === t.id;
                                        return (
                                            <div 
                                                key={t.id}
                                                onClick={() => setSelectedTemplate(t)}
                                                className={`p-5 rounded-xl border-2 cursor-pointer transition-all ${
                                                    isSelected
                                                        ? 'border-blue-600 bg-blue-50/60 shadow-md ring-2 ring-blue-500/20' 
                                                        : 'border-gray-200 hover:border-blue-300 bg-white hover:bg-gray-50'
                                                }`}
                                            >
                                                <div className="flex items-start justify-between mb-3">
                                                    <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold border ${getCategoryColor(t.category)}`}>
                                                        {t.category}
                                                    </span>
                                                    {isSelected && (
                                                        <div className="flex items-center gap-1 text-[11px] font-bold text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">
                                                            <CheckCircle2 size={12} /> Selected
                                                        </div>
                                                    )}
                                                </div>
                                                <h4 className="text-sm font-bold text-gray-900 mb-2">{t.name}</h4>
                                                <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed">
                                                    {t.preview}
                                                </p>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    )}

                    {/* STEP 2: Preview & Send */}
                    {step === 2 && selectedTemplate && (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
                            {/* Left: Message Preview (WhatsApp style UI) */}
                            <div className="flex flex-col">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-base font-bold text-gray-900">Message Preview</h3>
                                    <span className="text-xs text-emerald-700 font-bold bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                                        Live Preview
                                    </span>
                                </div>
                                <div className="flex-1 bg-[#efeae2] rounded-2xl border border-gray-200 p-4 relative overflow-hidden flex flex-col justify-between min-h-[300px] shadow-inner">
                                    {/* WhatsApp background pattern */}
                                    <div className="absolute inset-0 opacity-40 bg-[url('https://i.pinimg.com/736x/8c/98/99/8c98994518b575bfd8c949e91d20548b.jpg')] bg-cover mix-blend-overlay"></div>

                                    {/* Recipient info chip */}
                                    {firstContact && (
                                        <div className="relative z-10 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-gray-200 text-xs text-gray-500 w-fit mx-auto text-center">
                                            To: <strong className="text-gray-900">{recipientName}</strong>
                                            {cleanPhone && <span className="ml-1 text-gray-400">({cleanPhone})</span>}
                                        </div>
                                    )}
                                    
                                    <div className="relative z-10 bg-[#d9fdd3] p-4 rounded-xl rounded-tr-none shadow-sm max-w-[90%] self-end border border-emerald-200/50 mt-4">
                                        <div className="text-[11px] font-bold text-emerald-800 mb-1 flex items-center gap-1.5">
                                            <MessageSquare size={12} />
                                            {selectedTemplate.name}
                                        </div>
                                        <p className="text-sm text-gray-900 whitespace-pre-wrap leading-relaxed">
                                            {getProcessedMessage()}
                                        </p>
                                        <div className="text-[10px] text-gray-500 mt-2 text-right flex items-center justify-end gap-1">
                                            Now <span className="text-blue-500 font-bold">✓✓</span>
                                        </div>
                                    </div>

                                    {/* Direct WhatsApp button */}
                                    <button
                                        onClick={openDirectWhatsApp}
                                        className="relative z-10 mt-4 w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white py-2.5 rounded-xl font-bold transition-all shadow-md text-sm"
                                    >
                                        <ExternalLink size={15} />
                                        Open in WhatsApp Web
                                    </button>
                                </div>
                            </div>

                            {/* Right: Options */}
                            <div className="space-y-6">
                                {/* Send Method */}
                                <div>
                                    <h3 className="text-base font-bold text-gray-900 mb-3">Send Method</h3>
                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => setSendMode('api')}
                                            disabled={!hasApiConfig}
                                            className={`flex-1 flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all ${
                                                sendMode === 'api'
                                                    ? 'border-emerald-500 bg-emerald-50'
                                                    : hasApiConfig ? 'border-gray-200 bg-white hover:bg-gray-50' : 'border-gray-100 bg-gray-50 opacity-50 cursor-not-allowed'
                                            }`}
                                        >
                                            <Wifi size={22} className={sendMode === 'api' && hasApiConfig ? 'text-emerald-600' : 'text-gray-400'} />
                                            <span className="font-bold text-xs text-gray-900 text-center">Meta Cloud API{'\n'}(Automatic)</span>
                                            {!hasApiConfig && <span className="text-[10px] text-gray-400">Configure in Settings</span>}
                                            {hasApiConfig && <span className="text-[10px] text-emerald-600 font-bold">● Connected</span>}
                                        </button>
                                        <button
                                            onClick={() => setSendMode('web')}
                                            className={`flex-1 flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all ${
                                                sendMode === 'web' ? 'border-ghl-blue bg-blue-50/50' : 'border-gray-200 bg-white hover:bg-gray-50'
                                            }`}
                                        >
                                            <ExternalLink size={22} className={sendMode === 'web' ? 'text-ghl-blue' : 'text-gray-400'} />
                                            <span className="font-bold text-xs text-gray-900 text-center">WhatsApp Web{'\n'}(Manual)</span>
                                        </button>
                                    </div>
                                    {sendMode === 'api' && hasApiConfig && (
                                        <p className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-lg px-3 py-2 mt-2">
                                            ✅ Messages will be sent automatically via Meta Cloud API — no manual clicking required.
                                        </p>
                                    )}
                                    {sendMode === 'web' && (
                                        <p className="text-xs text-blue-700 bg-blue-50 border border-blue-100 rounded-lg px-3 py-2 mt-2">
                                            WhatsApp Web tabs will open — click Send in each tab to deliver. <a href="#" onClick={() => { onClose(); }} className="underline">Configure Meta API in Settings</a> for automatic sending.
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <h3 className="text-base font-bold text-gray-900 mb-3">Schedule</h3>
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
                            ) : (() => {
                                    const noPhone = selectedCount - contactsWithPhone.length;
                                    const successCount = sendResults.filter(r => r.success).length;
                                    const failCount = sendResults.filter(r => !r.success).length;
                                    const isApiMode = sendMode === 'api' && hasApiConfig;
                                    return (
                                        <div className="animate-in zoom-in duration-300 w-full">
                                            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-5">
                                                <CheckCircle2 size={44} className="text-emerald-600" />
                                            </div>
                                            <h3 className="text-2xl font-black text-gray-900 mb-3">
                                                {isApiMode ? '✅ Messages Sent!' : '📱 WhatsApp Opened!'}
                                            </h3>
                                            <p className="text-gray-500 mb-4 leading-relaxed text-sm">
                                                {isApiMode
                                                    ? <>{successCount > 0 ? <><strong className="text-gray-900">{successCount}</strong> message{successCount > 1 ? 's' : ''} delivered via Meta Cloud API.</> : 'No messages were sent.'}{failCount > 0 && <span className="text-red-600"> {failCount} failed.</span>}</>
                                                    : contactsWithPhone.length > 0
                                                        ? <><strong className="text-gray-900">{contactsWithPhone.length}</strong> WhatsApp Web tab{contactsWithPhone.length > 1 ? 's' : ''} opened — click Send in each tab.</>
                                                        : 'No contacts with phone numbers found.'
                                                }
                                            </p>
                                            {noPhone > 0 && (
                                                <p className="text-xs text-amber-600 bg-amber-50 border border-amber-200 px-4 py-2 rounded-lg mb-4">
                                                    ⚠️ {noPhone} contact{noPhone > 1 ? 's' : ''} had no phone number and {noPhone > 1 ? 'were' : 'was'} skipped.
                                                </p>
                                            )}

                                            {/* Per-contact result list (API mode only) */}
                                            {isApiMode && sendResults.length > 0 && (
                                                <div className="mb-5 max-h-32 overflow-y-auto text-xs space-y-1 border border-gray-100 rounded-xl p-3 bg-gray-50 text-left">
                                                    {sendResults.map((r, i) => (
                                                        <div key={i} className={`flex items-center gap-2 ${r.success ? 'text-emerald-700' : 'text-red-600'}`}>
                                                            <span>{r.success ? '✅' : '❌'}</span>
                                                            <span className="font-mono">{r.to}</span>
                                                            {r.error && <span className="text-gray-400 truncate">— {r.error}</span>}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}


                                            {contactsWithPhone.length > 0 && (
                                                <button
                                                    onClick={() => {
                                                        contactsWithPhone.forEach((contact, index) => {
                                                            const phone = (contact.phone || '').replace(/[^0-9]/g, '');
                                                            const name = contact.name || contact.firstName || 'Valued Customer';
                                                            const msg = selectedTemplate ? selectedTemplate.preview
                                                                .replace(/\{\{name\}\}/g, name)
                                                                .replace(/\{\{order_id\}\}/g, 'ORD-9842')
                                                                .replace(/\{\{date\}\}/g, 'Tomorrow')
                                                                .replace(/\{\{link\}\}/g, 'https://itcyanbu.net/track')
                                                                .replace(/\{\{code\}\}/g, 'SAVE15') : '';
                                                            const url = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
                                                            setTimeout(() => { window.open(url, '_blank'); }, index * 600);
                                                        });
                                                    }}
                                                    className="flex items-center justify-center gap-2 mx-auto px-6 py-2.5 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-xl font-bold transition-all shadow-md text-sm mb-6"
                                                >
                                                    <ExternalLink size={16} />
                                                    Re-open WhatsApp Tab{contactsWithPhone.length > 1 ? 's' : ''}
                                                </button>
                                            )}
                                            <div className="grid grid-cols-3 gap-4 mb-6">
                                                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                                                    <div className="text-2xl font-black text-gray-900">{contactsWithPhone.length}</div>
                                                    <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mt-1">WA Opened</div>
                                                </div>
                                                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                                                    <div className="text-2xl font-black text-amber-600">{noPhone}</div>
                                                    <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mt-1">No Phone</div>
                                                </div>
                                                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                                                    <div className="text-2xl font-black text-blue-600">{selectedCount}</div>
                                                    <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mt-1">Total</div>
                                                </div>
                                            </div>
                                            <button 
                                                onClick={onClose}
                                                className="px-8 py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-colors shadow-lg shadow-gray-900/20"
                                            >
                                                Done
                                            </button>
                                        </div>
                                    );
                                })()}
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
