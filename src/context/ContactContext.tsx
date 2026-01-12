import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Contact, ContactContextType } from '../types/contact';
import { generateMockContacts } from '../mock/contacts';

const ContactContext = createContext<ContactContextType | undefined>(undefined);

export const ContactProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        // Load mock data on init
        setContacts(generateMockContacts());
    }, []);

    const addContact = (newContactData: Omit<Contact, 'id' | 'createdAt' | 'initials' | 'avatarColor'>) => {
        const initials = newContactData.name.split(' ').map(n => n[0]).join('');
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

    return (
        <ContactContext.Provider value={{ contacts, searchQuery, setSearchQuery, addContact, updateContact, deleteContact }}>
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
