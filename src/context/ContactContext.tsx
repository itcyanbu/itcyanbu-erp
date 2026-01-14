import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Contact, ContactContextType } from '../types/contact';
import { generateMockContacts } from '../mock/contacts';

const ContactContext = createContext<ContactContextType | undefined>(undefined);

import { type FieldConfig } from '../types/contact';

const defaultFieldConfig: FieldConfig[] = [
    { id: 'image', label: 'Contact Image', type: 'file', required: false, visible: true, order: 0, width: 'full', isSystem: true },
    { id: 'firstName', label: 'First Name', type: 'text', required: true, visible: true, order: 1, width: 'half', isSystem: true },
    { id: 'lastName', label: 'Last Name', type: 'text', required: false, visible: true, order: 2, width: 'half', isSystem: true },
    { id: 'email', label: 'Email', type: 'email', required: false, visible: true, order: 3, width: 'full', isSystem: true },
    { id: 'phone', label: 'Phone', type: 'phone', required: false, visible: true, order: 4, width: 'full', isSystem: true },
    { id: 'contactType', label: 'Contact Type', type: 'select', required: false, visible: true, order: 5, width: 'full', options: ['Lead', 'Customer', 'Partner'], isSystem: true },
    { id: 'timeZone', label: 'Time Zone', type: 'select', required: false, visible: true, order: 6, width: 'full', isSystem: true }, // Options populated in UI
    { id: 'dndAllChannels', label: 'DND All Channels', type: 'checkbox', required: false, visible: true, order: 7, width: 'full', isSystem: true },
    { id: 'channels', label: 'Channels', type: 'checkbox', required: false, visible: true, order: 8, width: 'full', isSystem: true }, // Special UI for channels
];

export const ContactProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [fieldConfig, setFieldConfig] = useState<FieldConfig[]>(defaultFieldConfig);

    useEffect(() => {
        // Load mock data on init
        setContacts(generateMockContacts());
    }, []);

    const addContact = (newContactData: any) => {
        const initials = newContactData.name ? newContactData.name.split(' ').map((n: string) => n[0]).join('') : '??';
        const id = Math.random().toString(36).substr(2, 9);
        const colors = ['bg-purple-100 text-purple-600', 'bg-pink-100 text-pink-600', 'bg-orange-100 text-orange-600', 'bg-blue-100 text-blue-600', 'bg-green-100 text-green-600'];
        const avatarColor = colors[Math.floor(Math.random() * colors.length)];

        const newContact: Contact = {
            ...newContactData,
            id,
            initials,
            avatarColor,
            createdAt: new Date().toISOString()
        };

        setContacts(prev => [newContact, ...prev]);
    };

    const updateContact = (id: string, updatedData: Partial<Contact>) => {
        setContacts(prev => prev.map(contact =>
            contact.id === id ? { ...contact, ...updatedData } : contact
        ));
    };

    const deleteContact = (id: string) => {
        setContacts(prev => prev.filter(c => c.id !== id));
    };

    const updateFieldConfig = (newConfig: FieldConfig[]) => {
        setFieldConfig(newConfig);
    };

    return (
        <ContactContext.Provider value={{ contacts, searchQuery, fieldConfig, setSearchQuery, addContact, updateContact, deleteContact, updateFieldConfig }}>
            {children}
        </ContactContext.Provider>
    );
};

export const useContacts = () => {
    const context = useContext(ContactContext);
    if (context === undefined) {
        throw new Error('useContacts must be used within a ContactProvider');
    }
    return context;
};
