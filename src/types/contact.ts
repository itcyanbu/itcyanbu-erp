export interface FieldConfig {
    id: string;
    label: string;
    type: 'text' | 'email' | 'phone' | 'select' | 'date' | 'checkbox' | 'file' | 'custom';
    required: boolean;
    visible: boolean;
    order: number;
    options?: string[];
    isSystem?: boolean; // Cannot be deleted
    width?: 'full' | 'half';
}

export interface Contact {
    id: string;
    name: string;
    email: string;
    phone: string;
    createdAt: string;
    tags: string[];
    initials: string;
    avatarColor: string;
    [key: string]: any; // Allow dynamic fields
}

export interface ContactContextType {
    contacts: Contact[];
    searchQuery: string;
    fieldConfig: FieldConfig[];
    setSearchQuery: (query: string) => void;
    addContact: (contact: any) => void;
    updateContact: (id: string, contact: Partial<Contact>) => void;
    deleteContact: (id: string) => void;
    updateFieldConfig: (newConfig: FieldConfig[]) => void;
}
