import { createContext, useContext, useState, useEffect, useMemo, type ReactNode } from 'react';
import type { Contact, ContactContextType } from '../types/contact';
import { generateMockContacts } from '../mock/contacts';

const ContactContext = createContext<ContactContextType | undefined>(undefined);

import { type FieldConfig } from '../types/contact';

const defaultFieldConfig: FieldConfig[] = [
    // Standard Fields
    { id: 'image', label: 'Contact Image', type: 'file', required: false, visible: true, order: 0, width: 'full', isSystem: true },
    { id: 'firstName', label: 'First Name', type: 'text', required: true, visible: true, order: 1, width: 'half', isSystem: true },
    { id: 'lastName', label: 'Last Name', type: 'text', required: false, visible: true, order: 2, width: 'half', isSystem: true },
    { id: 'email', label: 'Email', type: 'email', required: false, visible: true, order: 3, width: 'full', isSystem: true },
    { id: 'phone', label: 'Phone', type: 'phone', required: false, visible: true, order: 4, width: 'full', isSystem: true },
    { id: 'contactType', label: 'Contact Type', type: 'select', required: false, visible: true, order: 5, width: 'full', options: ['Lead', 'Customer', 'Partner'], isSystem: true },
    { id: 'timeZone', label: 'Time Zone', type: 'select', required: false, visible: true, order: 6, width: 'full', isSystem: true },
    { id: 'dndAllChannels', label: 'DND All Channels', type: 'checkbox', required: false, visible: true, order: 7, width: 'full', isSystem: true },
    { id: 'channels', label: 'Channels', type: 'checkbox', required: false, visible: true, order: 8, width: 'full', isSystem: true },

    // Custom Fields (Message Group)
    { id: 'dateOfBirth', label: 'Date of Birth', type: 'date', required: false, visible: false, order: 9, width: 'full' },
    { id: 'marketingSource', label: 'How did you learn about our webinar?', type: 'text', required: false, visible: false, order: 10, width: 'full' },
    { id: 'message', label: 'Your Message', type: 'text', required: false, visible: false, order: 11, width: 'full' },
    { id: 'budget', label: 'Project Budget', type: 'text', required: false, visible: false, order: 12, width: 'full' },
    { id: 'marketingStrategy', label: 'What marketing strategy piques your interest?', type: 'text', required: false, visible: false, order: 13, width: 'full' },
    { id: 'apptTime', label: 'Proposed Appt Time', type: 'date', required: false, visible: false, order: 14, width: 'full' },
    { id: 'contactMethod', label: 'How would you like to be contacted?', type: 'select', required: false, visible: false, order: 15, width: 'full', options: ['Email', 'Phone', 'SMS'] },
    { id: 'questions', label: 'Please enter any questions you may have below so we can address them during the webinar.', type: 'text', required: false, visible: false, order: 16, width: 'full' },
];

export const ContactProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [fieldConfig, setFieldConfig] = useState<FieldConfig[]>(defaultFieldConfig);

    useEffect(() => {
        // Load from localStorage or mock data
        const savedContacts = localStorage.getItem('ghl_contacts');
        if (savedContacts) {
            setContacts(JSON.parse(savedContacts));
        } else {
            const mocks = generateMockContacts();
            setContacts(mocks);
            localStorage.setItem('ghl_contacts', JSON.stringify(mocks));
        }
    }, []);

    const saveToStorage = (newContacts: Contact[]) => {
        try {
            localStorage.setItem('ghl_contacts', JSON.stringify(newContacts));
        } catch (error) {
            console.error('Failed to save contacts to localStorage:', error);
            // Could add toast notification here
        }
    };

    const addContact = (newContactData: any) => {
        const initials = newContactData.name ? newContactData.name.split(' ').map((n: string) => n[0]).join('') : '??';
        const id = Math.random().toString(36).substr(2, 9);
        const colors = ['bg-purple-100 text-purple-600', 'bg-pink-100 text-pink-600', 'bg-orange-100 text-orange-600', 'bg-blue-100 text-blue-600', 'bg-green-100 text-green-600'];
        const avatarColor = colors[Math.floor(Math.random() * colors.length)];

        const newContact: Contact = {
            tags: [], // Default tags to prevent crash in ContactTable
            email: newContactData.emails?.[0] || '', // Map first email
            phone: newContactData.phones?.[0] || '', // Map first phone
            ...newContactData,
            id,
            initials,
            avatarColor,
            createdAt: new Date().toISOString()
        };

        setContacts(prev => {
            const updated = [newContact, ...prev];
            saveToStorage(updated);
            return updated;
        });
    };

    const updateContact = (id: string, updatedData: Partial<Contact>) => {
        setContacts(prev => {
            const updated = prev.map(contact =>
                contact.id === id ? { ...contact, ...updatedData } : contact
            );
            saveToStorage(updated);
            return updated;
        });
    };

    const deleteContact = (id: string) => {
        setContacts(prev => {
            const updated = prev.filter(c => c.id !== id);
            saveToStorage(updated);
            return updated;
        });
    };

    const updateFieldConfig = (newConfig: FieldConfig[]) => {
        setFieldConfig(newConfig);
    };

    const value = useMemo(() => ({
        contacts,
        searchQuery,
        fieldConfig,
        setSearchQuery,
        addContact,
        updateContact,
        deleteContact,
        updateFieldConfig
    }), [contacts, searchQuery, fieldConfig]);

    return (
        <ContactContext.Provider value={value}>
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
