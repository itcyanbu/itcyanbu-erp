import React, { useState, useEffect } from 'react';
import { X, Settings, Plus, Trash2 } from 'lucide-react';
import { useContacts } from '../context/ContactContext';
import FieldConfigPanel from './FieldConfigPanel';
import type { FieldConfig } from '../types/contact';

interface ContactModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void;
    initialData?: {
        name: string;
        email: string;
        phone: string;
    } | null;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose, onSubmit, initialData }) => {
    const { fieldConfig, updateFieldConfig } = useContacts();
    const [isConfiguring, setIsConfiguring] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const [formData, setFormData] = useState<any>({
        firstName: '',
        lastName: '',
        emails: [''],
        phones: [''],
        contactType: '',
        timeZone: '',
        dndAllChannels: false,
        channels: {
            email: false,
            text: false,
            callsVoicemail: false,
            whatsapp: false,
            inboundCallsSms: false,
        },
        image: null as File | null,
        // Custom fields
        dateOfBirth: '',
        marketingSource: '',
        message: '',
        budget: '',
        marketingStrategy: '',
        apptTime: '',
        contactMethod: '',
        questions: '',
    });

    useEffect(() => {
        setIsSaving(false); // Reset saving state whenever modal opens/data changes
        if (initialData) {
            const [firstName, ...lastNameParts] = initialData.name.split(' ');
            setFormData((prev: any) => ({
                ...prev,
                firstName: firstName || '',
                lastName: lastNameParts.join(' ') || '',
                emails: [initialData.email || ''],
                phones: [initialData.phone || ''],
            }));
        } else {
            setFormData((prev: any) => ({
                ...prev,
                firstName: '',
                lastName: '',
                emails: [''],
                phones: [''],
                // Reset custom fields
                dateOfBirth: '',
                marketingSource: '',
                message: '',
                budget: '',
                marketingStrategy: '',
                apptTime: '',
                contactMethod: '',
                questions: '',
            }));
        }
    }, [initialData, isOpen]);

    if (!isOpen) return null;

    const handleSaveConfig = (newConfig: FieldConfig[]) => {
        updateFieldConfig(newConfig);
        setIsConfiguring(false);
    };

    const handleAddEmail = () => {
        setFormData((prev: any) => ({ ...prev, emails: [...prev.emails, ''] }));
    };

    const handleAddPhone = () => {
        setFormData((prev: any) => ({ ...prev, phones: [...prev.phones, ''] }));
    };

    const handleSubmit = async (e: React.FormEvent, addAnother: boolean = false) => {
        e.preventDefault();
        setIsSaving(true);

        try {
            // Simulate network request/processing time for better UX
            await new Promise(resolve => setTimeout(resolve, 1000));

            const data = {
                name: `${formData.firstName} ${formData.lastName}`.trim(),
                emails: formData.emails.filter((e: string) => e),
                phones: formData.phones.filter((p: string) => p),
                contactType: formData.contactType,
                timeZone: formData.timeZone,
                dndAllChannels: formData.dndAllChannels,
                channels: Object.entries(formData.channels)
                    .filter(([_, v]) => v)
                    .map(([k, _]) => k),
                // Include custom fields
                dateOfBirth: formData.dateOfBirth,
                marketingSource: formData.marketingSource,
                message: formData.message,
                budget: formData.budget,
                marketingStrategy: formData.marketingStrategy,
                apptTime: formData.apptTime,
                contactMethod: formData.contactMethod,
                questions: formData.questions,
            };

            onSubmit(data);

            if (!addAnother) {
                // Keep isSaving true until the component unmounts/closes for smooth transition
                onClose();
            } else {
                setIsSaving(false);
                setFormData({
                    firstName: '',
                    lastName: '',
                    emails: [''],
                    phones: [''],
                    contactType: '',
                    timeZone: '',
                    dndAllChannels: false,
                    channels: {
                        email: false,
                        text: false,
                        callsVoicemail: false,
                        whatsapp: false,
                        inboundCallsSms: false,
                    },
                    image: null,
                    dateOfBirth: '',
                    marketingSource: '',
                    message: '',
                    budget: '',
                    marketingStrategy: '',
                    apptTime: '',
                    contactMethod: '',
                    questions: '',
                });
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setIsSaving(false); // Ensure spinner stops on error
        }
    };

    const renderField = (field: FieldConfig) => {
        if (!field.visible) return null;

        const commonClasses = "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-ghl-blue focus:border-ghl-blue";

        switch (field.id) {
            case 'image':
                return (
                    <div key={field.id} className={`${field.width === 'half' ? 'col-span-1' : 'col-span-2'} flex items-center justify-between`}>
                        <div className="flex items-center space-x-4">
                            <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 overflow-hidden">
                                {formData.image ? (
                                    <img src={URL.createObjectURL(formData.image)} alt="Contact" className="h-full w-full object-cover" />
                                ) : (
                                    <span className="text-xs">Photo</span>
                                )}
                            </div>
                            <div>
                                <label className="cursor-pointer text-sm text-ghl-blue hover:underline font-medium">
                                    Upload Image
                                    <input type="file" accept="image/*" className="hidden" onChange={e => setFormData((prev: any) => ({ ...prev, image: e.target.files?.[0] || null }))} />
                                </label>
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={() => setIsConfiguring(true)}
                            className="text-sm text-ghl-blue hover:text-blue-700 flex items-center gap-1"
                        >
                            <Settings size={14} />
                            Customize form
                        </button>
                    </div>
                );
            case 'firstName':
                return (
                    <div key={field.id} className={`${field.width === 'half' ? 'col-span-1' : 'col-span-2'}`}>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            {field.label} {field.required && '*'}
                        </label>
                        <input
                            type="text"
                            required={field.required}
                            className={commonClasses}
                            value={formData.firstName}
                            onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                        />
                    </div>
                );
            case 'lastName':
                return (
                    <div key={field.id} className={`${field.width === 'half' ? 'col-span-1' : 'col-span-2'}`}>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            {field.label} {field.required && '*'}
                        </label>
                        <input
                            type="text"
                            required={field.required}
                            className={commonClasses}
                            value={formData.lastName}
                            onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                        />
                    </div>
                );
            case 'email':
                return (
                    <div key={field.id} className="col-span-2 space-y-2">
                        {formData.emails.map((email: string, idx: number) => (
                            <div key={idx} className="flex items-center gap-2">
                                <div className="flex-1">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        {field.label} {formData.emails.length > 1 && `#${idx + 1}`} {field.required && idx === 0 && '*'}
                                    </label>
                                    <input
                                        type="email"
                                        required={field.required && idx === 0}
                                        className={commonClasses}
                                        value={email}
                                        onChange={e => {
                                            const newEmails = [...formData.emails];
                                            newEmails[idx] = e.target.value;
                                            setFormData({ ...formData, emails: newEmails });
                                        }}
                                        placeholder="email@example.com"
                                    />
                                </div>
                                {formData.emails.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => setFormData((prev: any) => ({ ...prev, emails: prev.emails.filter((_: any, i: number) => i !== idx) }))}
                                        className="mt-6 text-gray-400 hover:text-red-500"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                )}
                            </div>
                        ))}
                        <button type="button" onClick={handleAddEmail} className="text-sm text-ghl-blue hover:underline flex items-center gap-1">
                            <Plus size={14} /> Add Email
                        </button>
                    </div>
                );
            case 'phone':
                return (
                    <div key={field.id} className="col-span-2 space-y-2">
                        {formData.phones.map((phone: string, idx: number) => (
                            <div key={idx} className="flex items-center gap-2">
                                <div className="flex-1">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        {field.label} {formData.phones.length > 1 && `#${idx + 1}`} {field.required && idx === 0 && '*'}
                                    </label>
                                    <input
                                        type="tel"
                                        required={field.required && idx === 0}
                                        className={commonClasses}
                                        value={phone}
                                        onChange={e => {
                                            const newPhones = [...formData.phones];
                                            newPhones[idx] = e.target.value;
                                            setFormData({ ...formData, phones: newPhones });
                                        }}
                                        placeholder="+1 234 567 8900"
                                    />
                                </div>
                                {formData.phones.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => setFormData((prev: any) => ({ ...prev, phones: prev.phones.filter((_: any, i: number) => i !== idx) }))}
                                        className="mt-6 text-gray-400 hover:text-red-500"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                )}
                            </div>
                        ))}
                        <button type="button" onClick={handleAddPhone} className="text-sm text-ghl-blue hover:underline flex items-center gap-1">
                            <Plus size={14} /> Add Phone
                        </button>
                    </div>
                );
            case 'contactType':
                return (
                    <div key={field.id} className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            {field.label} {field.required && '*'}
                        </label>
                        <select
                            required={field.required}
                            className={commonClasses}
                            value={formData.contactType}
                            onChange={e => setFormData({ ...formData, contactType: e.target.value })}
                        >
                            <option value="">Select</option>
                            {field.options?.map(opt => <option key={opt} value={opt.toLowerCase()}>{opt}</option>)}
                        </select>
                    </div>
                );
            case 'timeZone':
                return (
                    <div key={field.id} className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            {field.label} {field.required && '*'}
                        </label>
                        <select
                            required={field.required}
                            className={commonClasses}
                            value={formData.timeZone}
                            onChange={e => setFormData({ ...formData, timeZone: e.target.value })}
                        >
                            <option value="">Please Select</option>
                            {[...Array(25)].map((_, i) => {
                                const offset = i - 12;
                                const str = `UTC${offset >= 0 ? '+' : ''}${offset}`;
                                return <option key={str} value={str}>{str}</option>;
                            })}
                        </select>
                    </div>
                );
            case 'dndAllChannels':
                return (
                    <div key={field.id} className="col-span-2 flex items-center">
                        <input
                            type="checkbox"
                            id="dndAll"
                            checked={formData.dndAllChannels}
                            onChange={e => setFormData({ ...formData, dndAllChannels: e.target.checked })}
                            className="mr-2 h-4 w-4 text-ghl-blue focus:ring-ghl-blue border-gray-300 rounded"
                        />
                        <label htmlFor="dndAll" className="text-sm font-medium text-gray-700">{field.label}</label>
                    </div>
                );
            case 'channels':
                return (
                    <div key={field.id} className="col-span-2 space-y-2">
                        <span className="block text-sm font-medium text-gray-700">{field.label}</span>
                        {[
                            { id: 'email', label: 'Email' },
                            { id: 'text', label: 'Text Messages' },
                            { id: 'callsVoicemail', label: 'Calls & Voicemail' },
                            { id: 'whatsapp', label: 'WhatsApp' },
                            { id: 'inboundCallsSms', label: 'Inbound Calls and SMS' },
                        ].map(c => (
                            <div key={c.id} className="flex items-center">
                                <input
                                    type="checkbox"
                                    id={`ch-${c.id}`}
                                    // @ts-ignore
                                    checked={formData.channels[c.id]}
                                    // @ts-ignore
                                    onChange={e => setFormData({ ...formData, channels: { ...formData.channels, [c.id]: e.target.checked } })}
                                    className="mr-2 h-4 w-4 text-ghl-blue focus:ring-ghl-blue border-gray-300 rounded"
                                />
                                <label htmlFor={`ch-${c.id}`} className="text-sm text-gray-700">{c.label}</label>
                            </div>
                        ))}
                    </div>
                );
            // Dynamic/Custom Fields handling based on type
            default:
                if (field.type === 'date') {
                    return (
                        <div key={field.id} className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                {field.label} {field.required && '*'}
                            </label>
                            <input
                                type="date"
                                required={field.required}
                                className={commonClasses}
                                value={formData[field.id] || ''}
                                onChange={e => setFormData({ ...formData, [field.id]: e.target.value })}
                            />
                        </div>
                    );
                }
                if (field.type === 'select') {
                    return (
                        <div key={field.id} className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                {field.label} {field.required && '*'}
                            </label>
                            <select
                                required={field.required}
                                className={commonClasses}
                                value={formData[field.id] || ''}
                                onChange={e => setFormData({ ...formData, [field.id]: e.target.value })}
                            >
                                <option value="">Select</option>
                                {field.options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                            </select>
                        </div>
                    );
                }
                if (field.id === 'questions' || field.id === 'message') { // Textarea heuristics
                    return (
                        <div key={field.id} className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                {field.label} {field.required && '*'}
                            </label>
                            <textarea
                                required={field.required}
                                className={commonClasses}
                                rows={3}
                                value={formData[field.id] || ''}
                                onChange={e => setFormData({ ...formData, [field.id]: e.target.value })}
                            />
                        </div>
                    );
                }
                // Default to text input
                return (
                    <div key={field.id} className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            {field.label} {field.required && '*'}
                        </label>
                        <input
                            type="text"
                            required={field.required}
                            className={commonClasses}
                            value={formData[field.id] || ''}
                            onChange={e => setFormData({ ...formData, [field.id]: e.target.value })}
                        />
                    </div>
                );
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 overflow-hidden"
            aria-labelledby="slide-over-title"
            role="dialog"
            aria-modal="true"
        >
            <div className="absolute inset-0 overflow-hidden">
                {/* Backdrop */}
                <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose} aria-hidden="true"></div>

                <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                    <div className="pointer-events-auto w-screen max-w-md transform transition ease-in-out duration-500 sm:duration-700 translate-x-0">
                        <div className="flex h-full flex-col bg-white shadow-xl">
                            {isConfiguring ? (
                                <FieldConfigPanel
                                    currentConfig={fieldConfig}
                                    onSave={handleSaveConfig}
                                    onCancel={() => setIsConfiguring(false)}
                                />
                            ) : (
                                <>
                                    {/* Header */}
                                    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                                        <h2 className="text-lg font-semibold text-gray-900" id="slide-over-title">
                                            {initialData ? 'Edit Contact' : 'Add New Contact'}
                                        </h2>
                                        <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
                                            <span className="sr-only">Close panel</span>
                                            <X size={24} />
                                        </button>
                                    </div>

                                    {/* Content */}
                                    <div className="relative flex-1 px-6 py-6 overflow-y-auto">
                                        <form id="contact-form" onSubmit={e => handleSubmit(e, false)} className="grid grid-cols-2 gap-4">
                                            {fieldConfig.filter(f => f.visible).sort((a, b) => a.order - b.order).map(field => renderField(field))}
                                        </form>
                                    </div>

                                    {/* Footer */}
                                    <div className="flex flex-shrink-0 justify-end gap-3 px-6 py-4 border-t border-gray-200">
                                        <button
                                            type="button"
                                            onClick={onClose}
                                            disabled={isSaving}
                                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ghl-blue disabled:opacity-50"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            form="contact-form"
                                            disabled={isSaving}
                                            className="px-4 py-2 text-sm font-medium text-white bg-ghl-blue rounded-md hover:bg-blue-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ghl-blue disabled:opacity-70 flex items-center"
                                        >
                                            {isSaving && !formData._addAnother ? (
                                                <>
                                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                                    Saving...
                                                </>
                                            ) : 'Save'}
                                        </button>
                                        <button
                                            type="button"
                                            disabled={isSaving}
                                            onClick={e => {
                                                // Quick hack to track which button triggered save for spinner
                                                setFormData((prev: any) => ({ ...prev, _addAnother: true }));
                                                handleSubmit(e as any, true).then(() => setFormData((prev: any) => ({ ...prev, _addAnother: false })));
                                            }}
                                            className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600 disabled:opacity-70 flex items-center"
                                        >
                                            {isSaving && formData._addAnother ? (
                                                <>
                                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                                    Saving...
                                                </>
                                            ) : 'Save and Add Another'}
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactModal;
