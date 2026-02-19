import { createContext, useContext, useState, useEffect, useMemo, type ReactNode } from 'react';
import type { Contact, ContactContextType } from '../types/contact';
import { generateMockContacts } from '../mock/contacts';
import { contactsService } from '../lib/supabaseService';
import { useAuth } from './AuthContext';

const ContactContext = createContext<ContactContextType | undefined>(undefined);

import { type FieldConfig } from '../types/contact';

const defaultFieldConfig: FieldConfig[] = [
    // Standard Fields
    { id: 'image', label: 'Contact Image', type: 'file', required: false, visible: true, order: 0, width: 'full', isSystem: true, group: 'contact_info', objectType: 'contact' },
    { id: 'firstName', label: 'First Name', type: 'text', required: true, visible: true, order: 1, width: 'half', isSystem: true, group: 'contact_info', objectType: 'contact' },
    { id: 'lastName', label: 'Last Name', type: 'text', required: false, visible: true, order: 2, width: 'half', isSystem: true, group: 'contact_info', objectType: 'contact' },
    { id: 'email', label: 'Email', type: 'email', required: false, visible: true, order: 3, width: 'full', isSystem: true, group: 'contact_info', objectType: 'contact' },
    { id: 'phone', label: 'Phone', type: 'phone', required: false, visible: true, order: 4, width: 'full', isSystem: true, group: 'contact_info', objectType: 'contact' },
    { id: 'contactType', label: 'Contact Type', type: 'select', required: false, visible: true, order: 5, width: 'full', options: ['Lead', 'Customer', 'Partner'], isSystem: true, group: 'contact_info', objectType: 'contact' },
    { id: 'timeZone', label: 'Time Zone', type: 'select', required: false, visible: true, order: 6, width: 'full', isSystem: true, group: 'general_info', objectType: 'contact' },
    { id: 'dndAllChannels', label: 'DND All Channels', type: 'checkbox', required: false, visible: true, order: 7, width: 'full', isSystem: true, group: 'general_info', objectType: 'contact' },
    { id: 'channels', label: 'Channels', type: 'checkbox', required: false, visible: true, order: 8, width: 'full', isSystem: true, group: 'general_info', objectType: 'contact' },

    // Custom Fields (Message Group)
    { id: 'dateOfBirth', label: 'Date of Birth', type: 'date', required: false, visible: false, order: 9, width: 'full', group: 'general_info', objectType: 'contact' },
    { id: 'marketingSource', label: 'How did you learn about our webinar?', type: 'text', required: false, visible: false, order: 10, width: 'full', group: 'additional_info', objectType: 'contact' },
    { id: 'message', label: 'Your Message', type: 'text', required: false, visible: false, order: 11, width: 'full', group: 'additional_info', objectType: 'contact' },
    { id: 'budget', label: 'Project Budget', type: 'text', required: false, visible: false, order: 12, width: 'full', group: 'additional_info', objectType: 'contact' },
    { id: 'marketingStrategy', label: 'What marketing strategy piques your interest?', type: 'text', required: false, visible: false, order: 13, width: 'full', group: 'additional_info', objectType: 'contact' },
    { id: 'apptTime', label: 'Proposed Appt Time', type: 'date', required: false, visible: false, order: 14, width: 'full', group: 'additional_info', objectType: 'contact' },
    { id: 'contactMethod', label: 'How would you like to be contacted?', type: 'select', required: false, visible: false, order: 15, width: 'full', options: ['Email', 'Phone', 'SMS'], group: 'additional_info', objectType: 'contact' },
    { id: 'questions', label: 'Please enter any questions you may have below so we can address them during the webinar.', type: 'text', required: false, visible: false, order: 16, width: 'full', group: 'additional_info', objectType: 'contact' },
];

// Helper to map DB contact to App contact
const mapDbContactToAppContact = (dbContact: any): Contact => {
    return {
        id: dbContact.id,
        name: dbContact.name,
        firstName: dbContact.first_name || undefined,
        lastName: dbContact.last_name || undefined,
        email: dbContact.email || '',
        phone: dbContact.phone || '',
        contactType: dbContact.contact_type || 'Lead',
        tags: dbContact.tags || [],
        initials: dbContact.initials || '??',
        avatarColor: dbContact.avatar_color || 'bg-blue-100 text-blue-600',
        timeZone: dbContact.time_zone || undefined,
        dndAllChannels: dbContact.dnd_all_channels || false,
        createdAt: dbContact.created_at || dbContact.createdAt || new Date().toISOString(),
        lastActivity: dbContact.last_activity || dbContact.lastActivity || dbContact.created_at || dbContact.createdAt || new Date().toISOString(),
        customFields: dbContact.custom_fields || {}
    };
};

// Helper to map App contact to DB contact
const mapAppContactToDbContact = (appContact: any): any => {
    return {
        name: appContact.name || `${appContact.firstName || ''} ${appContact.lastName || ''}`.trim(),
        first_name: appContact.firstName || null,
        last_name: appContact.lastName || null,
        email: appContact.email || null,
        phone: appContact.phone || null,
        contact_type: appContact.contactType || 'Lead',
        tags: appContact.tags || [],
        initials: appContact.initials || null,
        avatar_color: appContact.avatarColor || null,
        time_zone: appContact.timeZone || null,
        dnd_all_channels: appContact.dndAllChannels || false,
        last_activity: appContact.lastActivity || null,
        custom_fields: appContact.customFields || {}
    };
};

export const ContactProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [fieldConfig, setFieldConfig] = useState<FieldConfig[]>(() => {
        // Load from localStorage on initial render
        try {
            const savedConfig = localStorage.getItem('ghl_field_config');
            return savedConfig ? JSON.parse(savedConfig) : defaultFieldConfig;
        } catch (e) {
            console.error('Failed to load field config', e);
            return defaultFieldConfig;
        }
    });
    const [synced, setSynced] = useState(false);
    const { user, isSupabaseEnabled } = useAuth();

    const DATA_VERSION = '4'; // Increment to force data refresh

    // Load contacts on mount
    useEffect(() => {
        loadContacts();
    }, [user]);

    // Data migration: sync localStorage to Supabase on first authentication
    useEffect(() => {
        if (user && isSupabaseEnabled && !synced) {
            migrateLocalDataToSupabase();
        }
    }, [user, isSupabaseEnabled, synced]);

    // Persist field config whenever it changes
    useEffect(() => {
        try {
            localStorage.setItem('ghl_field_config', JSON.stringify(fieldConfig));
        } catch (e) {
            console.error('Failed to save field config', e);
        }
    }, [fieldConfig]);

    const loadContacts = async () => {
        if (user && isSupabaseEnabled) {
            // Load from Supabase
            const { data, error } = await contactsService.getAll();

            if (error) {
                console.error('Failed to load contacts from Supabase:', error);
                // Fallback to localStorage
                loadFromLocalStorage();
            } else if (data) {
                const appContacts = data.map(mapDbContactToAppContact);
                setContacts(appContacts);
                // Also save to localStorage as cache
                saveToStorage(appContacts);
            }
        } else {
            // Load from localStorage or mock data
            loadFromLocalStorage();
        }
    };

    const loadFromLocalStorage = () => {
        const storageKey = user ? `ghl_contacts_${user.id}` : 'ghl_contacts';
        const versionKey = user ? `ghl_contacts_version_${user.id}` : 'ghl_contacts_version';

        const savedContacts = localStorage.getItem(storageKey);
        const savedVersion = localStorage.getItem(versionKey);

        if (savedContacts && savedVersion === DATA_VERSION) {
            try {
                setContacts(JSON.parse(savedContacts));
            } catch (error) {
                console.error('Failed to parse contacts from local storage:', error);
                // Fallback to mocks if parsing fails
                const mocks = generateMockContacts();
                setContacts(mocks);
                localStorage.setItem(storageKey, JSON.stringify(mocks));
                localStorage.setItem(versionKey, DATA_VERSION);
            }
        } else {
            const mocks = generateMockContacts();
            setContacts(mocks);
            localStorage.setItem(storageKey, JSON.stringify(mocks));
            localStorage.setItem(versionKey, DATA_VERSION);
        }
    };

    const migrateLocalDataToSupabase = async () => {
        if (!user) return;

        const storageKey = `ghl_contacts_${user.id}`;
        const savedContacts = localStorage.getItem(storageKey) || localStorage.getItem('ghl_contacts'); // Check legacy key too 

        if (!savedContacts) {
            setSynced(true);
            return;
        }

        try {
            const localContacts: Contact[] = JSON.parse(savedContacts);

            // Check if Supabase already has contacts
            const { data: existingContacts } = await contactsService.getAll();

            if (existingContacts && existingContacts.length > 0) {
                // Already has data, skip migration
                console.log('Supabase already has contacts, skipping migration');
                setSynced(true);
                return;
            }

            // Migrate local contacts to Supabase
            console.log(`Migrating ${localContacts.length} contacts to Supabase...`);
            const dbContacts = localContacts.map(mapAppContactToDbContact);

            const { error } = await contactsService.bulkCreate(dbContacts);

            if (error) {
                console.error('Failed to migrate contacts:', error);
            } else {
                console.log('✅ Successfully migrated contacts to Supabase');
                // Reload from Supabase to get proper IDs
                await loadContacts();
            }
        } catch (err) {
            console.error('Error during migration:', err);
        } finally {
            setSynced(true);
        }
    };

    const saveToStorage = (newContacts: Contact[]) => {
        try {
            const storageKey = user ? `ghl_contacts_${user.id}` : 'ghl_contacts';
            localStorage.setItem(storageKey, JSON.stringify(newContacts));
        } catch (error) {
            console.error('Failed to save contacts to localStorage:', error);
        }
    };

    const addContact = async (newContactData: any) => {
        const initials = newContactData.name ? newContactData.name.split(' ').map((n: string) => n[0]).join('') : '??';
        const colors = ['bg-purple-100 text-purple-600', 'bg-pink-100 text-pink-600', 'bg-orange-100 text-orange-600', 'bg-blue-100 text-blue-600', 'bg-green-100 text-green-600'];
        const avatarColor = colors[Math.floor(Math.random() * colors.length)];

        const newContact: any = {
            tags: [],
            email: newContactData.emails?.[0] || '',
            phone: newContactData.phones?.[0] || '',
            ...newContactData,
            initials,
            avatarColor,
            lastActivity: new Date().toISOString(),
            createdAt: new Date().toISOString()
        };

        if (user && isSupabaseEnabled) {
            // Save to Supabase
            const dbContact = mapAppContactToDbContact(newContact);
            const { data, error } = await contactsService.create(dbContact);

            if (error) {
                console.error('Failed to create contact in Supabase:', error);
                // Fallback to local-only
                const localContact = { ...newContact, id: Math.random().toString(36).substr(2, 9), createdAt: new Date().toISOString() };
                setContacts(prev => {
                    const updated = [localContact, ...prev];
                    saveToStorage(updated);
                    return updated;
                });
            } else if (data) {
                const appContact = mapDbContactToAppContact(data);
                setContacts(prev => {
                    const updated = [appContact, ...prev];
                    saveToStorage(updated);
                    return updated;
                });
            }
        } else {
            // Local-only mode
            const localContact: Contact = {
                ...newContact,
                id: Math.random().toString(36).substr(2, 9),
                createdAt: new Date().toISOString()
            };
            setContacts(prev => {
                const updated = [localContact, ...prev];
                saveToStorage(updated);
                return updated;
            });
        }
    };

    const updateContact = async (id: string, updatedData: Partial<Contact>) => {
        if (user && isSupabaseEnabled) {
            // Update in Supabase
            const dbUpdates = mapAppContactToDbContact(updatedData);
            const { data, error } = await contactsService.update(id, dbUpdates);

            if (error) {
                console.error('Failed to update contact in Supabase:', error);
                // Fallback to local update
                setContacts(prev => {
                    const updated = prev.map(contact =>
                        contact.id === id ? { ...contact, ...updatedData } : contact
                    );
                    saveToStorage(updated);
                    return updated;
                });
            } else if (data) {
                const appContact = mapDbContactToAppContact(data);
                setContacts(prev => {
                    const updated = prev.map(contact =>
                        contact.id === id ? appContact : contact
                    );
                    saveToStorage(updated);
                    return updated;
                });
            }
        } else {
            // Local-only mode
            setContacts(prev => {
                const updated = prev.map(contact =>
                    contact.id === id ? { ...contact, ...updatedData } : contact
                );
                saveToStorage(updated);
                return updated;
            });
        }
    };

    const deleteContact = async (id: string) => {
        if (user && isSupabaseEnabled) {
            // Delete from Supabase
            const { error } = await contactsService.delete(id);

            if (error) {
                console.error('Failed to delete contact from Supabase:', error);
            }
        }

        // Remove from local state
        setContacts(prev => {
            const updated = prev.filter(c => c.id !== id);
            saveToStorage(updated);
            return updated;
        });
    };

    const bulkAddContacts = async (newContacts: Partial<Contact>[], onProgress?: (progress: number) => void) => {
        const total = newContacts.length;
        let processed = 0;

        // Process in chunks of 50
        const chunkSize = 50;
        const chunks = [];
        for (let i = 0; i < total; i += chunkSize) {
            chunks.push(newContacts.slice(i, i + chunkSize));
        }

        const allNewContacts: Contact[] = [];

        for (const chunk of chunks) {
            const chunkContacts: Contact[] = chunk.map(contact => ({
                id: Math.random().toString(36).substr(2, 9),
                name: contact.name || `${contact.firstName || ''} ${contact.lastName || ''}`.trim(),
                email: contact.email || '',
                phone: contact.phone || '',
                firstName: contact.firstName,
                lastName: contact.lastName,
                contactType: contact.contactType || 'Lead',
                initials: (contact.firstName?.[0] || contact.name?.[0] || '?') + (contact.lastName?.[0] || contact.name?.split(' ')?.[1]?.[0] || '?'),
                avatarColor: contact.avatarColor || 'bg-blue-100 text-blue-600',
                tags: contact.tags || [],
                dndAllChannels: contact.dndAllChannels || false,
                createdAt: new Date().toISOString(),
                lastActivity: new Date().toISOString(),
                customFields: contact.customFields || {}
            }));

            // Optimistically update local state for this chunk
            setContacts(prev => [...chunkContacts, ...prev]);
            allNewContacts.push(...chunkContacts);

            // Background sync to Supabase (if enabled)
            if (user && isSupabaseEnabled) {
                const dbContacts = chunkContacts.map(mapAppContactToDbContact);
                const { error } = await contactsService.bulkCreate(dbContacts);
                if (error) {
                    console.error('Failed to bulk create contacts in Supabase', error);
                }
            } else {
                // Local storage save for this chunk
                // We need to wait a tick to allow UI to update
                await new Promise(resolve => setTimeout(resolve, 0));
            }

            processed += chunk.length;
            if (onProgress) {
                onProgress(Math.round((processed / total) * 100));
            }

            // Allow UI to breathe
            await new Promise(resolve => setTimeout(resolve, 50));
        }

        // Final save to storage for local-only mode
        if (!user || !isSupabaseEnabled) {
            saveToStorage([...allNewContacts, ...contacts]);
        }
    };

    const updateFieldConfig = (newConfig: FieldConfig[]) => {
        setFieldConfig(newConfig);
    };

    const addCustomField = (field: FieldConfig) => {
        setFieldConfig(prev => {
            // Find max order
            const maxOrder = Math.max(...prev.map(f => f.order), 0);
            return [...prev, { ...field, order: maxOrder + 1 }];
        });
    };

    const deleteCustomField = (id: string) => {
        setFieldConfig(prev => prev.filter(f => f.id !== id || f.isSystem));
    };

    const value = useMemo(() => ({
        contacts,
        searchQuery,
        fieldConfig,
        setSearchQuery,
        addContact,
        updateContact,
        deleteContact,
        bulkAddContacts,
        updateFieldConfig,
        addCustomField,
        deleteCustomField
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
