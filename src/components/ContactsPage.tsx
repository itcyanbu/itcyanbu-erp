import { useState, useEffect } from 'react';
import { Plus, Filter, Trash2, Search, Columns, ListFilter, Users } from 'lucide-react';
import ContactTable from '../components/ContactTable';
import ContactModal from '../components/ContactModal';
import { useContacts } from '../context/ContactContext';
import ModulePlaceholder from '../components/ModulePlaceholder';

import ContactDetailSlideOver from '../components/ContactDetailSlideOver';

const ContactsPage = () => {
    const { contacts, searchQuery, deleteContact, setSearchQuery } = useContacts();

    // State
    const [activeTab, setActiveTab] = useState('Smart Lists');
    const [activeFilter, setActiveFilter] = useState('All');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingContact, setEditingContact] = useState<any>(null);
    const [selectedContact, setSelectedContact] = useState<any>(null);
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
    const [localSearch, setLocalSearch] = useState('');

    // Clear selection when changing views/filters to avoid confusion
    useEffect(() => {
        setSelectedIds(new Set());
    }, [activeTab, activeFilter, searchQuery]);

    // Filter Logic
    const filteredContacts = contacts.filter(contact => {
        // 1. Search Filter (Global from context OR local - ideally sync them)
        // Note: We use localSearch for the input, but update context on change? 
        // Or just use context? Original code used context. Let's use context + local for UI.
        const query = searchQuery || localSearch;
        const matchesSearch = contact.name.toLowerCase().includes(query.toLowerCase()) ||
            contact.email.toLowerCase().includes(query.toLowerCase());

        // 2. Tab Filter
        let matchesTab = true;
        if (activeFilter === 'Twilio ISV Pending') matchesTab = contact.tags?.some((t: string) => t.includes('isv') || t.includes('pending')) || false;
        else if (activeFilter === 'Beauty & Fashion Active Users') matchesTab = contact.tags?.some((t: string) => t.includes('beauty') || t.includes('fashion')) || false;
        else if (activeFilter === 'Imported on Feb 13, 2025') matchesTab = contact.tags?.includes('imported_feb_13') || false;

        return matchesSearch && matchesTab;
    });

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalSearch(e.target.value);
        setSearchQuery(e.target.value);
    };

    const handleSelectionChange = (id: string) => {
        const newSelected = new Set(selectedIds);
        if (newSelected.has(id)) {
            newSelected.delete(id);
        } else {
            newSelected.add(id);
        }
        setSelectedIds(newSelected);
    };

    const handleSelectAll = (ids: string[]) => {
        if (selectedIds.size === ids.length) {
            setSelectedIds(new Set());
        } else {
            setSelectedIds(new Set(ids));
        }
    };

    const handleOpenModal = (contact?: any) => {
        setEditingContact(contact || null);
        setIsModalOpen(true);
    };


    // Need to get add/update from context
    const { addContact, updateContact } = useContacts();

    const handleActualSubmit = (data: any) => {
        if (editingContact) {
            updateContact(editingContact.id, data);
        } else {
            addContact(data);
        }
        // Modal closes itself or we effectively close it by state change if needed?
        // ContactModal has internal state but also takes isOpen.
        // We need to keep this consistent.
        // If specific 'add another' logic is inside modal, we should rely on it.
        // But for `isOpen`, parent controls it.
        // Let's assume onModalClose handles the state.
    };


    const tabs = ['Smart Lists', 'Bulk Actions', 'Restore', 'Tasks', 'Companies', 'Manage Smart Lists'];
    const filterTabs = [
        'All',
        'Twilio ISV Pending',
        'Twilio Rebilling Beta Testers',
        'Mobile App Web customiser Beta',
        'Beauty & Fashion Active Users',
        'Imported on Feb 13, 2025'
    ];

    return (
        <div className="flex-1 flex flex-col overflow-hidden bg-gray-50">
            {/* Header */}
            <div className="px-8 py-6 bg-white border-b border-gray-200">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="bg-gray-100 p-2 rounded-lg">
                                <Users className="text-gray-600" size={24} />
                            </div>
                            <h1 className="text-2xl font-semibold text-gray-900">Contacts</h1>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <span>Smart Lists</span>
                            <span>•</span>
                            <span>{activeFilter}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder="Quick Search"
                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ghl-blue focus:border-transparent w-64"
                                value={localSearch}
                                onChange={handleSearchChange}
                            />
                        </div>
                        <button
                            onClick={() => handleOpenModal()}
                            className="bg-ghl-blue text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                        >
                            <Plus size={18} />
                            Add Contact
                        </button>
                    </div>
                </div>

                <div className="flex gap-8 border-b border-gray-200">
                    {tabs.map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`pb-4 text-sm font-medium border-b-2 transition-colors ${activeTab === tab ? 'border-ghl-blue text-ghl-blue' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* Filter Tabs Row */}
            {activeTab === 'Smart Lists' && (
                <div className="px-8 pt-4 pb-0 bg-white border-b border-gray-200 overflow-x-auto">
                    <div className="flex gap-6 min-w-max">
                        {filterTabs.map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveFilter(tab)}
                                className={`pb-4 text-sm font-medium border-b-2 transition-colors ${activeFilter === tab ? 'border-ghl-blue text-ghl-blue' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                            >
                                {tab}
                            </button>
                        ))}
                        <button className="pb-4 text-sm font-medium text-gray-500 hover:text-gray-700 flex items-center gap-1">
                            <ListFilter size={16} />
                            More Filters
                        </button>
                        <button className="pb-4 text-sm font-medium text-gray-500 hover:text-gray-700 flex items-center gap-1">
                            <Columns size={16} />
                            Columns
                        </button>
                    </div>
                </div>
            )}

            <div className="flex-1 overflow-y-auto p-8">
                {activeTab === 'Smart Lists' ? (
                    <>
                        {selectedIds.size > 0 && (
                            <div className="mb-4 bg-purple-50 border border-purple-100 text-purple-700 px-4 py-3 rounded-md flex items-center justify-between animate-in fade-in slide-in-from-top-2 duration-200">
                                <span className="font-medium text-sm">{selectedIds.size} selected</span>
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => {
                                            // Implement bulk delete
                                            selectedIds.forEach(id => deleteContact(id));
                                            setSelectedIds(new Set());
                                        }}
                                        className="text-sm font-medium hover:text-purple-900 flex items-center gap-2 bg-white px-3 py-1.5 rounded border border-purple-200 shadow-sm"
                                    >
                                        <Trash2 size={14} />
                                        Delete Selected
                                    </button>
                                    <button onClick={() => setSelectedIds(new Set())} className="text-xs underline hover:text-purple-900">Clear Selection</button>
                                </div>
                            </div>
                        )}
                        <ContactTable
                            data={filteredContacts}
                            onEdit={handleOpenModal}
                            onRowClick={(contact) => {
                                setSelectedContact(contact);
                            }}
                            selectedIds={selectedIds}
                            onSelectionChange={handleSelectionChange}
                            onSelectAll={handleSelectAll}
                        />
                    </>
                ) : (
                    <ModulePlaceholder name={activeTab} />
                )}
            </div>

            <ContactModal
                key={isModalOpen ? 'open' : 'closed'}
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setEditingContact(null);
                }}
                onSubmit={handleActualSubmit}
                initialData={editingContact}
            />

            <ContactDetailSlideOver
                isOpen={!!selectedContact}
                contact={selectedContact}
                onClose={() => setSelectedContact(null)}
                onEdit={(contact) => {
                    setSelectedContact(null);
                    handleOpenModal(contact);
                }}
            />
        </div>
    );
};

export default ContactsPage;
