import React, { useState, useEffect } from 'react';
import { X, Settings, Plus, Trash2 } from 'lucide-react';
import { useContacts } from '../context/ContactContext';
import { useTranslation } from 'react-i18next';
import FieldConfigPanel from './FieldConfigPanel';
import type { FieldConfig, Contact } from '../types/contact';

interface ContactModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void;
    initialData?: Partial<Contact> | null;
}

interface ContactFormData {
    firstName: string;
    lastName: string;
    emails: string[];
    phones: string[];
    contactType: string;
    timeZone: string;
    dndAllChannels: boolean;
    channels: {
        email: boolean;
        text: boolean;
        callsVoicemail: boolean;
        whatsapp: boolean;
        inboundCallsSms: boolean;
    };
    image: File | null;
    [key: string]: any;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose, onSubmit, initialData }) => {
    const { t } = useTranslation();
    const { fieldConfig, updateFieldConfig } = useContacts();
    const [isConfiguring, setIsConfiguring] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const [formData, setFormData] = useState<ContactFormData>({
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
    });

    useEffect(() => {
        // Initialize form data based on fieldConfig and initialData
        const newFormData: ContactFormData = {
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
        };

        // Initialize dynamic fields
        fieldConfig.forEach(field => {
            if (!field.isSystem) {
                newFormData[field.id] = field.type === 'checkbox' ? false : '';
            }
        });

        if (initialData) {
            const name = initialData.name || '';
            const [firstName, ...lastNameParts] = name.split(' ');

            // Merge initial standard data
            Object.assign(newFormData, {
                firstName: initialData.firstName || firstName || '',
                lastName: initialData.lastName || lastNameParts.join(' ') || '',
                emails: initialData.emails && initialData.emails.length > 0 ? initialData.emails : [initialData.email || ''],
                phones: initialData.phones && initialData.phones.length > 0 ? initialData.phones : [initialData.phone || ''],
                contactType: initialData.contactType || '',
                timeZone: initialData.timeZone || '',
                dndAllChannels: initialData.dndAllChannels || false,
            });

            // Merge custom fields from initialData if they exist
            if (initialData.customFields) {
                Object.assign(newFormData, initialData.customFields);
            } else {
                // Fallback for flat structure if used previously
                fieldConfig.forEach(field => {
                    if (!field.isSystem && initialData[field.id] !== undefined) {
                        newFormData[field.id] = initialData[field.id];
                    }
                });
            }
        }

        setFormData(newFormData);
        // setIsSaving(false); Removed to fix lint error
    }, [initialData, isOpen, fieldConfig]);

    if (!isOpen) return null;

    const handleSaveConfig = (newConfig: FieldConfig[]) => {
        updateFieldConfig(newConfig);
        setIsConfiguring(false);
    };

    const handleAddEmail = () => {
        setFormData(prev => ({ ...prev, emails: [...prev.emails, ''] }));
    };

    const handleAddPhone = () => {
        setFormData(prev => ({ ...prev, phones: [...prev.phones, ''] }));
    };

    const handleSubmit = async (e: React.FormEvent, addAnother: boolean = false) => {
        e.preventDefault();
        setIsSaving(true);

        try {
            // Simulate network request
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Separate standard fields from custom fields
            const customFields: Record<string, any> = {};

            fieldConfig.forEach(field => {
                if (!field.isSystem) {
                    customFields[field.id] = formData[field.id];
                }
            });

            const data = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                name: `${formData.firstName} ${formData.lastName}`.trim(),
                emails: formData.emails.filter(e => e),
                phones: formData.phones.filter(p => p),
                contactType: formData.contactType,
                timeZone: formData.timeZone,
                dndAllChannels: formData.dndAllChannels,
                channels: Object.entries(formData.channels || {})
                    .filter(([_, v]) => v)
                    .map(([k, _]) => k),
                customFields: customFields,
                // Spread custom fields at root level too for backward compatibility if needed by consumers
                ...customFields
            };

            onSubmit(data);

            if (!addAnother) {
                onClose();
            } else {
                setIsSaving(false);
                // Reset form to defaults
                const resetData: ContactFormData = {
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
                };
                fieldConfig.forEach(field => {
                    if (!field.isSystem) {
                        resetData[field.id] = field.type === 'checkbox' ? false : '';
                    }
                });
                setFormData(resetData);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setIsSaving(false);
        }
    };

    const renderField = (field: FieldConfig) => {
        if (!field.visible) return null;

        const commonClasses = "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-ghl-blue focus:border-ghl-blue text-left rtl:text-right";

        switch (field.id) {
            case 'image':
                return (
                    <div key={field.id} className={`${field.width === 'half' ? 'col-span-1' : 'col-span-2'} flex items-center justify-between rtl:flex-row-reverse`}>
                        <div className="flex items-center space-x-4 rtl:space-x-reverse">
                            <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 overflow-hidden">
                                {formData.image ? (
                                    <img src={URL.createObjectURL(formData.image)} alt="Contact" className="h-full w-full object-cover" />
                                ) : (
                                    <span className="text-xs">{t('contacts_modal.photo_placeholder')}</span>
                                )}
                            </div>
                            <div>
                                <label className="cursor-pointer text-sm text-ghl-blue hover:underline font-medium">
                                    {t('contacts_modal.upload_image')}
                                    <input type="file" accept="image/*" className="hidden" onChange={e => setFormData(prev => ({ ...prev, image: e.target.files?.[0] || null }))} />
                                </label>
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={() => setIsConfiguring(true)}
                            className="text-sm text-ghl-blue hover:text-blue-700 flex items-center gap-1 rtl:flex-row-reverse"
                        >
                            <Settings size={14} />
                            {t('contacts_modal.customize_form')}
                        </button>
                    </div>
                );
            case 'firstName':
            case 'lastName':
                const fieldKey = field.id === 'firstName' ? 'first_name' : 'last_name';
                return (
                    <div key={field.id} className={`${field.width === 'half' ? 'col-span-1' : 'col-span-2'}`}>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            {t(`contacts_modal.fields.${fieldKey}`)} {field.required && '*'}
                        </label>
                        <input
                            type="text"
                            required={field.required}
                            className={commonClasses}
                            value={formData[field.id]}
                            onChange={e => setFormData({ ...formData, [field.id]: e.target.value })}
                        />
                    </div>
                );
            case 'email':
                return (
                    <div key={field.id} className="col-span-2 space-y-2">
                        {formData.emails.map((email: string, idx: number) => (
                            <div key={idx} className="flex items-center gap-2 rtl:flex-row-reverse">
                                <div className="flex-1">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        {t('contacts_modal.fields.email')} {formData.emails.length > 1 && `#${idx + 1}`} {field.required && idx === 0 && '*'}
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
                                        onClick={() => setFormData(prev => ({ ...prev, emails: prev.emails.filter((_, i) => i !== idx) }))}
                                        className="mt-6 text-gray-400 hover:text-red-500"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                )}
                            </div>
                        ))}
                        <button type="button" onClick={handleAddEmail} className="text-sm text-ghl-blue hover:underline flex items-center gap-1 rtl:flex-row-reverse">
                            <Plus size={14} /> {t('contacts_modal.add_email')}
                        </button>
                    </div>
                );
            case 'phone':
                return (
                    <div key={field.id} className="col-span-2 space-y-2">
                        {formData.phones.map((phone: string, idx: number) => (
                            <div key={idx} className="flex items-center gap-2 rtl:flex-row-reverse">
                                <div className="flex-1">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        {t('contacts_modal.fields.phone')} {formData.phones.length > 1 && `#${idx + 1}`} {field.required && idx === 0 && '*'}
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
                                        onClick={() => setFormData(prev => ({ ...prev, phones: prev.phones.filter((_, i) => i !== idx) }))}
                                        className="mt-6 text-gray-400 hover:text-red-500"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                )}
                            </div>
                        ))}
                        <button type="button" onClick={handleAddPhone} className="text-sm text-ghl-blue hover:underline flex items-center gap-1 rtl:flex-row-reverse">
                            <Plus size={14} /> {t('contacts_modal.add_phone')}
                        </button>
                    </div>
                );
            case 'contactType':
                return (
                    <div key={field.id} className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            {t('contacts_modal.fields.type')} {field.required && '*'}
                        </label>
                        <select
                            required={field.required}
                            className={commonClasses}
                            value={formData.contactType}
                            onChange={e => setFormData({ ...formData, contactType: e.target.value })}
                        >
                            <option value="">{t('contacts_modal.fields.select_opt')}</option>
                            {field.options?.map(opt => <option key={opt} value={opt.toLowerCase()}>{opt}</option>)}
                        </select>
                    </div>
                );
            case 'timeZone':
                return (
                    <div key={field.id} className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            {t('contacts_modal.fields.timezone')} {field.required && '*'}
                        </label>
                        <select
                            required={field.required}
                            className={commonClasses}
                            value={formData.timeZone}
                            onChange={e => setFormData({ ...formData, timeZone: e.target.value })}
                        >
                            <option value="">{t('contacts_modal.fields.please_select')}</option>
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
                    <div key={field.id} className="col-span-2 flex items-center rtl:flex-row-reverse">
                        <input
                            type="checkbox"
                            id="dndAll"
                            checked={formData.dndAllChannels}
                            onChange={e => setFormData({ ...formData, dndAllChannels: e.target.checked })}
                            className="mr-2 rtl:mr-0 rtl:ml-2 h-4 w-4 text-ghl-blue focus:ring-ghl-blue border-gray-300 rounded"
                        />
                        <label htmlFor="dndAll" className="text-sm font-medium text-gray-700">{t('contacts_modal.fields.dnd')}</label>
                    </div>
                );
            case 'channels':
                return (
                    <div key={field.id} className="col-span-2 space-y-2">
                        <span className="block text-sm font-medium text-gray-700">{t('contacts_modal.fields.channels')}</span>
                        {[
                            { id: 'email', label: 'Email' },
                            { id: 'text', label: 'Text Messages' },
                            { id: 'callsVoicemail', label: 'Calls & Voicemail' },
                            { id: 'whatsapp', label: 'WhatsApp' },
                            { id: 'inboundCallsSms', label: 'Inbound Calls and SMS' },
                        ].map(c => (
                            <div key={c.id} className="flex items-center rtl:flex-row-reverse">
                                <input
                                    type="checkbox"
                                    id={`ch-${c.id}`}
                                    checked={(formData.channels as any)[c.id]}
                                    onChange={e => setFormData({ ...formData, channels: { ...formData.channels, [c.id]: e.target.checked } })}
                                    className="mr-2 rtl:mr-0 rtl:ml-2 h-4 w-4 text-ghl-blue focus:ring-ghl-blue border-gray-300 rounded"
                                />
                                <label htmlFor={`ch-${c.id}`} className="text-sm text-gray-700">{c.label}</label>
                            </div>
                        ))}
                    </div>
                );
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
                                <option value="">{t('contacts_modal.fields.select_opt')}</option>
                                {field.options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                            </select>
                        </div>
                    );
                }
                if (field.id === 'questions' || field.id === 'message') {
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
                <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose} aria-hidden="true"></div>

                <div className={`pointer-events-none fixed inset-y-0 ${t('dir') === 'rtl' ? 'left-0' : 'right-0'} flex max-w-full pl-10 rtl:pl-0 rtl:pr-10`}>
                    <div className="pointer-events-auto w-screen max-w-md transform transition ease-in-out duration-500 sm:duration-700">
                        <div className="flex h-full flex-col bg-white shadow-xl">
                            {isConfiguring ? (
                                <FieldConfigPanel
                                    currentConfig={fieldConfig}
                                    onSave={handleSaveConfig}
                                    onCancel={() => setIsConfiguring(false)}
                                />
                            ) : (
                                <>
                                    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 rtl:flex-row-reverse">
                                        <h2 className="text-lg font-semibold text-gray-900" id="slide-over-title">
                                            {initialData ? t('contacts_modal.edit_title') : t('contacts_modal.add_title')}
                                        </h2>
                                        <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
                                            <span className="sr-only">Close panel</span>
                                            <X size={24} />
                                        </button>
                                    </div>

                                    <div className="relative flex-1 min-h-0 overflow-y-auto px-6 py-6">
                                        <form id="contact-form" onSubmit={e => handleSubmit(e, false)} className="grid grid-cols-2 gap-4">
                                            {fieldConfig.filter(f => f.visible).sort((a, b) => a.order - b.order).map(field => renderField(field))}
                                        </form>
                                    </div>

                                    <div className="flex flex-shrink-0 justify-end gap-3 px-6 py-4 border-t border-gray-200 rtl:flex-row-reverse">
                                        <button
                                            type="button"
                                            onClick={onClose}
                                            disabled={isSaving}
                                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ghl-blue disabled:opacity-50"
                                        >
                                            {t('common.cancel')}
                                        </button>
                                        <button
                                            type="submit"
                                            form="contact-form"
                                            disabled={isSaving}
                                            className="px-4 py-2 text-sm font-medium text-white bg-ghl-blue rounded-md hover:bg-blue-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ghl-blue disabled:opacity-70 flex items-center rtl:flex-row-reverse"
                                        >
                                            {isSaving && !formData._addAnother ? (
                                                <>
                                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2 rtl:mr-0 rtl:ml-2"></div>
                                                    {t('contacts_modal.saving')}
                                                </>
                                            ) : t('common.save')}
                                        </button>
                                        <button
                                            type="button"
                                            disabled={isSaving}
                                            onClick={e => {
                                                setFormData(prev => ({ ...prev, _addAnother: true }));
                                                handleSubmit(e as any, true).then(() => setFormData(prev => ({ ...prev, _addAnother: false })));
                                            }}
                                            className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600 disabled:opacity-70 flex items-center rtl:flex-row-reverse"
                                        >
                                            {isSaving && formData._addAnother ? (
                                                <>
                                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2 rtl:mr-0 rtl:ml-2"></div>
                                                    {t('contacts_modal.saving')}
                                                </>
                                            ) : t('contacts_modal.save_and_add')}
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
