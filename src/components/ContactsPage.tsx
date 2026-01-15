import { useState, useEffect } from 'react';
import {
    Plus, Filter, Trash2, Search, Columns, ListFilter, Users,
    MessageSquare, Mail, Star, Download, Building2, MessageCircle, Copy,
    Settings, Phone, Zap, Megaphone, Bell, HelpCircle, ChevronRight, ChevronDown
} from 'lucide-react';
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
        <div className="flex-1 flex flex-col overflow-hidden bg-gray-50 min-h-0">
            {/* Header */}
            {/* Merged Header Row */}
            <div className="px-6 py-4 bg-white border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-6">
                    <h1 className="text-xl font-bold text-[#1a1a1a] mr-2">Contacts</h1>
                    <div className="flex items-center gap-6">
                        {tabs.map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`text - [15px] font - medium transition - colors relative h - full flex items - center ${activeTab === tab ? 'text-ghl-blue' : 'text-gray-500 hover:text-gray-700'} `}
                            >
                                {tab}
                                {activeTab === tab && (
                                    <div className="absolute -bottom-[17px] left-0 right-0 h-[2px] bg-ghl-blue"></div>
                                )}
                            </button>
                        ))}
                    </div>
                    <div className="w-[1px] h-6 bg-gray-200 mx-1"></div>
                    <button className="text-gray-400 hover:text-gray-600">
                        <Settings size={20} />
                    </button>
                </div>

                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 mr-4">
                        <button className="w-8 h-8 rounded-full bg-[#10b981] flex items-center justify-center text-white shadow-sm hover:opacity-90 transition-opacity">
                            <Phone size={16} fill="currentColor" />
                        </button>
                        <button className="w-8 h-8 rounded-full bg-[#3b82f6] flex items-center justify-center text-white shadow-sm hover:opacity-90 transition-opacity">
                            <Zap size={16} fill="currentColor" />
                        </button>
                        <div className="relative">
                            <button className="w-8 h-8 rounded-full bg-[#528a8d] flex items-center justify-center text-white shadow-sm hover:opacity-90 transition-opacity">
                                <Megaphone size={16} />
                            </button>
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></div>
                        </div>
                        <div className="relative">
                            <button className="w-8 h-8 rounded-full bg-[#f97316] flex items-center justify-center text-white shadow-sm hover:opacity-90 transition-opacity">
                                <Bell size={16} />
                            </button>
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full border-2 border-white"></div>
                        </div>
                        <button className="w-8 h-8 rounded-full bg-[#3b82f6] flex items-center justify-center text-white shadow-sm hover:opacity-90 transition-opacity">
                            <HelpCircle size={16} />
                        </button>
                    </div>
                    <div className="w-9 h-9 rounded-full bg-[#c084fc] flex items-center justify-center text-white font-bold text-sm shadow-sm border border-purple-300">
                        MM
                    </div>
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
                                className={`pb - 4 text - sm font - medium border - b - 2 transition - colors ${activeFilter === tab ? 'border-ghl-blue text-ghl-blue' : 'border-transparent text-gray-500 hover:text-gray-700'} `}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Action Toolbar Row */}
            <div className="px-6 py-3 bg-white border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <button onClick={() => handleOpenModal()} className="w-10 h-10 flex items-center justify-center text-gray-400 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors shadow-sm" title="Add Contact">
                        <Plus size={20} />
                    </button>

                    <div className="flex items-center gap-1.5 ml-2">
                        {[
                            { icon: Filter, title: "Pipeline Change" },
                            { icon: Users, title: "Add to Workflow" },
                            { icon: MessageSquare, title: "Send SMS" },
                            { icon: Mail, title: "Send Email" }
                        ].map((btn, i) => (
                            <button key={i} className="w-10 h-10 flex items-center justify-center text-gray-500 bg-gray-50 border border-transparent rounded-lg hover:bg-white hover:border-gray-200 transition-all shadow-sm group" title={btn.title}>
                                <btn.icon size={20} className="group-hover:scale-110 transition-transform" />
                            </button>
                        ))}

                        <button className="w-10 h-10 flex items-center justify-center text-gray-500 bg-gray-50 border border-transparent rounded-lg hover:bg-white hover:border-gray-200 transition-all shadow-sm group" title="Add Tag">
                            <div className="relative">
                                <ListFilter size={20} className="group-hover:scale-110 transition-transform" />
                                <Plus size={10} className="absolute -top-1 -right-1 font-bold text-ghl-blue" />
                            </div>
                        </button>

                        <button className="w-10 h-10 flex items-center justify-center text-gray-500 bg-gray-50 border border-transparent rounded-lg hover:bg-white hover:border-gray-200 transition-all shadow-sm group" title="Remove Tag">
                            <div className="relative">
                                <ListFilter size={20} className="group-hover:scale-110 transition-transform" />
                                <div className="absolute -top-1 -right-1 w-2.5 h-[2px] bg-red-500 rounded-full mt-[4px]"></div>
                            </div>
                        </button>

                        <button
                            onClick={() => {
                                if (selectedIds.size > 0) {
                                    selectedIds.forEach((id: string) => deleteContact(id));
                                    setSelectedIds(new Set());
                                }
                            }}
                            className={`w-10 h-10 flex items-center justify-center border border-transparent rounded-lg transition-all shadow-sm group ${selectedIds.size > 0 ? 'bg-red-50 text-red-600 hover:bg-white hover:border-red-200' : 'bg-gray-50 text-gray-300'} `}
                            title="Delete Contacts"
                            disabled={selectedIds.size === 0}
                        >
                            <Trash2 size={20} className={selectedIds.size > 0 ? 'group-hover:scale-110 transition-transform' : ''} />
                        </button>

                        {[
                            { icon: Star, title: "Add to Favorites" },
                            { icon: Download, title: "Export", rotate: 180 },
                            { icon: Download, title: "Import" },
                            { icon: Mail, title: "Direct Mail", opacity: true },
                            { icon: Building2, title: "Assign Company" },
                            { icon: MessageCircle, title: "WhatsApp" },
                            { icon: Copy, title: "Duplicate/Merge" }
                        ].map((btn, i) => (
                            <button key={i} className={`w-10 h-10 flex items-center justify-center text-gray-500 bg-gray-50 border border-transparent rounded-lg hover:bg-white hover:border-gray-200 transition-all shadow-sm group ${btn.opacity ? 'opacity-70' : ''} `} title={btn.title}>
                                <btn.icon size={20} className={`group-hover:scale-110 transition-transform ${btn.rotate ? 'rotate-180' : ''} `} />
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 text-[14px] font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-all shadow-sm group">
                        <span className="group-hover:text-ghl-blue transition-colors">Columns</span>
                        <Columns size={16} className="text-[#3b82f6]" />
                    </button>

                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold" size={16} />
                        <input
                            type="text"
                            placeholder="Quick search"
                            className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-ghl-blue focus:border-ghl-blue w-80 text-[14px] shadow-sm placeholder:text-gray-400"
                            value={localSearch}
                            onChange={handleSearchChange}
                        />
                    </div>

                    <button className="flex items-center gap-2 px-4 py-2 text-[14px] font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-all shadow-sm group">
                        <span className="group-hover:text-ghl-blue transition-colors">More Filters</span>
                        <ListFilter size={18} className="text-[#3b82f6]" />
                    </button>
                </div>
            </div>

            {/* Pagination/Status Row */}
            <div className="px-6 py-0 bg-[#eff6ff] flex items-center justify-between border-b border-gray-200 shadow-inner">
                <div className="text-[12px] text-gray-500 flex items-center gap-1 py-1">
                    <span>Total <span className="font-bold text-gray-700">{filteredContacts.length}</span> records</span>
                    <span className="mx-1">|</span>
                    <span><span className="font-bold text-gray-700">1</span> of 1 Pages</span>
                </div>
                <div className="flex items-center gap-4 text-[13px]">
                    <div className="flex items-center">
                        <button className="w-8 h-8 flex items-center justify-center bg-ghl-blue text-white font-bold rounded shadow-sm">1</button>
                        <button className="w-8 h-8 flex items-center justify-center text-[#3b82f6] hover:bg-blue-50 transition-colors">
                            <ChevronRight size={18} />
                        </button>
                    </div>
                    <div className="flex items-center gap-1 text-[#3b82f6] cursor-pointer hover:underline py-1">
                        <span>Page Size: 20</span>
                        <ChevronDown size={14} />
                    </div>
                </div>
            </div>

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
                                            selectedIds.forEach((id: string) => deleteContact(id));
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
