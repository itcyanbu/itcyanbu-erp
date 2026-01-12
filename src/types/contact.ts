export interface Contact {
    id: string;
    name: string;
    email: string;
    phone: string;
    createdAt: string;
    tags: string[];
    initials: string;
    avatarColor: string;
}

export interface ContactContextType {
    contacts: Contact[];
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    addContact: (contact: Omit<Contact, 'id' | 'createdAt' | 'initials' | 'avatarColor'>) => void;
    updateContact: (id: string, contact: Partial<Contact>) => void;
    deleteContact: (id: string) => void;
}
