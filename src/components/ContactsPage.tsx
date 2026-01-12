import { useState } from 'react';
import { Plus, Filter, ArrowUpDown, Trash2 } from 'lucide-react';
import ContactTable from '../components/ContactTable';
import ContactModal from '../components/ContactModal';
import { useContacts } from '../context/ContactContext';

import ContactDetailSlideOver from '../components/ContactDetailSlideOver';

const ContactsPage = () => {
    const { addContact, updateContact, deleteContact, setSearchQuery } = useContacts();
    const [activeTab, setActiveTab] = useState('Smart Lists');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingContact, setEditingContact] = useState<any>(null);
    const [selectedContact, setSelectedContact] = useState<any>(null);
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

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
        if (contact) {
            setEditingContact(contact);
        } else {
            setEditingContact(null);
        }
        setIsModalOpen(true);
    };

    const handleModalSubmit = (data: any) => {
        if (editingContact) {
            updateContact(editingContact.id, data);
        } else {
            addContact(data);
        }
        setIsModalOpen(false);
        setEditingContact(null);
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
    const [activeFilter, setActiveFilter] = useState('All');

    return (
        <div className="flex-1 flex flex-col h-screen overflow-hidden bg-white">
            {/* Module Header */}
            <div className="border-b border-ghl-border px-8 py-3 flex items-center gap-6 overflow-x-auto shrink-0">
                {tabs.map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`text-sm font-medium whitespace-nowrap pb-3 -mb-3.5 border-b-2 transition-colors ${activeTab === tab
                            ? 'border-ghl-blue text-ghl-blue'
                            : 'border-transparent text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Filter Tabs Row - Only show when Smart Lists is active */}
            {activeTab === 'Smart Lists' && (
                <div className="border-b border-gray-200 px-8 py-2 bg-gray-50">
                    <div className="flex items-center gap-4 overflow-x-auto">
                        {filterTabs.map(filter => (
                            <button
                                key={filter}
                                onClick={() => setActiveFilter(filter)}
                                className={`text-xs font-medium whitespace-nowrap px-3 py-1.5 rounded-md transition-colors ${activeFilter === filter
                                    ? 'bg-ghl-blue text-white'
                                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                                    }`}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Action Bar */}
            <div className="px-8 py-6">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-semibold text-ghl-text flex items-center gap-3">
                        Contacts
                        <span className="bg-gray-100 text-gray-600 text-sm py-0.5 px-2 rounded-full font-normal">{activeFilter}</span>
                    </h1>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => handleOpenModal()}
                            className="bg-ghl-blue hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-md flex items-center gap-2 shadow-sm transition-colors"
                        >
                            <Plus size={16} />
                            Add Contact
                        </button>
                    </div>
                </div>

                {/* Filter Row */}
                <div className="flex items-center justify-between gap-4 mb-4">
                    <div className="flex items-center gap-2">
                        <button className="flex items-center gap-2 px-3 py-1.5 border border-ghl-border rounded text-sm text-gray-600 hover:bg-gray-50 bg-white">
                            <Filter size={14} />
                            More Filters
                        </button>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Quick Search..."
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-8 pr-3 py-1.5 border border-ghl-border rounded text-sm focus:border-ghl-blue focus:ring-0 outline-none w-64"
                            />
                            <Filter className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" size={12} />
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <button className="p-1.5 text-gray-400 hover:text-gray-600">
                            <ArrowUpDown size={16} />
                        </button>
                    </div>
                </div>

                {/* Content */}
                {activeTab === 'Smart Lists' ? (
                    <>
                        {selectedIds.size > 0 && (
                            <div className="mb-4 bg-purple-50 border border-purple-100 text-purple-700 px-4 py-3 rounded-md flex items-center justify-between animate-in fade-in slide-in-from-top-2 duration-200">
                                <span className="font-medium text-sm">{selectedIds.size} selected</span>
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => {
                                            selectedIds.forEach(id => deleteContact(id));
                                            setSelectedIds(new Set());
                                        }}
                                        className="text-sm font-medium hover:text-purple-900 flex items-center gap-2 bg-white px-3 py-1.5 rounded border border-purple-200 shadow-sm"
                                    >
                                        <Trash2 size={14} />
                                        Delete Selected
                                    </button>
                                </div>
                            </div>
                        )}

                        <ContactTable
                            onEdit={handleOpenModal}
                            onRowClick={setSelectedContact}
                            selectedIds={selectedIds}
                            onSelectionChange={handleSelectionChange}
                            onSelectAll={handleSelectAll}
                        />
                    </>
                ) : (
                    <div className="flex items-center justify-center h-96 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                        <div className="text-center">
                            <div className="text-gray-400 mb-4">
                                <svg className="mx-auto w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">{activeTab}</h3>
                            <p className="text-gray-500">This feature is currently in development</p>
                        </div>
                    </div>
                )}
            </div>

            <ContactModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setEditingContact(null);
                }}
                onSubmit={handleModalSubmit}
                initialData={editingContact}
            />

            <ContactDetailSlideOver
                isOpen={!!selectedContact}
                contact={selectedContact}
                onClose={() => setSelectedContact(null)}
                onEdit={(contact) => {
                    setSelectedContact(null); // Close the card
                    handleOpenModal(contact); // Open the modal
                }}
            />
        </div>
    );
};

export default ContactsPage;
