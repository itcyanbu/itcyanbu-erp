import { useState, useEffect } from 'react';
import {
    Search, HelpCircle, Download, Plus, Zap, Phone, Globe, Settings, RefreshCcw, MoreVertical, LayoutGrid, ChevronDown, ListFilter, Send, Mail, MessageSquare, X, Clock, Briefcase, Trash2
} from 'lucide-react';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import ContactTable from '../components/ContactTable';
import ContactModal from '../components/ContactModal';
import { useContacts } from '../context/ContactContext';
import ModulePlaceholder from '../components/ModulePlaceholder';
import ContactDetailSlideOver from '../components/ContactDetailSlideOver';
import DialerModal from './DialerModal';
import { type ColumnDef } from './ColumnManager';
import { ManageFieldsSidebar } from './ManageFieldsSidebar';
import { ImportWizard } from './contacts/import/ImportWizard';

const ContactsPage = () => {
    const { contacts, searchQuery, deleteContact, setSearchQuery, addContact, updateContact } = useContacts();
    console.log('ContactsPage mounted - checking for updates');
    const { t, i18n } = useTranslation();
    const isRtl = i18n.language === 'ar';

    // State
    const [topTab, setTopTab] = useState('Smart Lists');
    const [activeListId, setActiveListId] = useState('all');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isImportWizardOpen, setIsImportWizardOpen] = useState(false);
    const [isDialerOpen, setIsDialerOpen] = useState(false);
    const [editingContact, setEditingContact] = useState<any>(null);
    const [selectedContact, setSelectedContact] = useState<any>(null);
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
    const [localSearch, setLocalSearch] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [activeActionModal, setActiveActionModal] = useState<string | null>(null);

    // Smart Lists & Filters State
    interface Filter {
        id: string;
        field: string;
        operator: 'contains' | 'equals' | 'starts_with' | 'is_empty' | 'is_not_empty';
        value: string;
    }

    interface SmartList {
        id: string;
        name: string;
        filters: Filter[];
        columns?: ColumnDef[];
    }

    const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
    const [activeFilters, setActiveFilters] = useState<Filter[]>([]);
    const DEFAULT_COLUMNS: ColumnDef[] = [
        { id: 'name', label: 'Name', visible: true },
        { id: 'phone', label: 'Phone', visible: true },
        { id: 'email', label: 'Email', visible: true },
        { id: 'created', label: 'Created', visible: true },
        { id: 'last_activity', label: 'Last Activity', visible: true },
        { id: 'tags', label: 'Tags', visible: true },
    ];

    const [columns, setColumns] = useState<ColumnDef[]>(DEFAULT_COLUMNS);
    const [smartLists, setSmartLists] = useState<SmartList[]>(() => {
        const saved = localStorage.getItem('ghl_smart_lists');
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (e) {
                console.error('Failed to parse saved smart lists', e);
            }
        }
        return [
            { id: 'all', name: 'All', filters: [], columns: [...DEFAULT_COLUMNS] },
            { id: 'leads', name: 'Leads', filters: [{ id: 'f1', field: 'tags', operator: 'contains', value: 'lead' }], columns: [...DEFAULT_COLUMNS] }
        ];
    });

    // Save smart lists to local storage
    useEffect(() => {
        localStorage.setItem('ghl_smart_lists', JSON.stringify(smartLists));
    }, [smartLists]);

    // Update columns state when tab changes
    useEffect(() => {
        const activeList = smartLists.find(l => l.id === activeListId);
        if (activeList?.columns) {
            setColumns(activeList.columns);
        } else {
            setColumns(DEFAULT_COLUMNS);
        }
    }, [activeListId]);

    // Update active smart list's columns when they change
    const updateActiveListColumns = (newColumns: ColumnDef[] | ((prev: ColumnDef[]) => ColumnDef[])) => {
        const resolvedColumns = typeof newColumns === 'function' ? newColumns(columns) : newColumns;
        setColumns(resolvedColumns);
        setSmartLists(prev => prev.map(list =>
            list.id === activeListId ? { ...list, columns: resolvedColumns } : list
        ));
    };

    const [newSmartListName, setNewSmartListName] = useState('');
    const [showSaveListModal, setShowSaveListModal] = useState(false);
    const [isColumnMenuOpen, setIsColumnMenuOpen] = useState(false);

    // Mock Data for Tabs
    const [bulkActions] = useState([
        { id: 1, name: 'Send SMS', status: 'Completed', created: '2026-02-01 10:00', completed: '2026-02-01 10:05', user: 'Admin' },
        { id: 2, name: 'Add Tag: VIP', status: 'In Progress', created: '2026-02-01 18:30', completed: '-', user: 'Sales' },
        { id: 3, name: 'Bulk Email', status: 'Failed', created: '2026-01-31 15:00', completed: '2026-01-31 15:10', user: 'Admin' },
    ]);

    const [deletedContacts] = useState([
        { id: 'del1', name: 'John Oldman', email: 'john@old.com', deletedAt: '2026-01-25' },
        { id: 'del2', name: 'Sarah Former', email: 'sarah@ex.com', deletedAt: '2026-01-20' },
    ]);

    const [tasks] = useState([
        { id: 1, title: 'Follow up call', contact: 'Alice Brown', due: '2026-02-05', status: 'Pending' },
        { id: 2, title: 'Email contract', contact: 'Bob Smith', due: '2026-02-02', status: 'Overdue' },
    ]);

    const [companies] = useState([
        { id: 1, name: 'Tech Solutions Inc', website: 'techsol.com', phone: '+1 234 567', employees: 50 },
        { id: 2, name: 'Global Marketing', website: 'globalm.net', phone: '+1 987 654', employees: 12 },
    ]);

    // clear selection when changing queries
    useEffect(() => {
        setSelectedIds(new Set());
    }, [activeListId, activeFilters, searchQuery]);

    const applyFilters = (contacts: any[], filters: Filter[]) => {
        return contacts.filter(contact => {
            return filters.every(filter => {
                const startValue = contact[filter.field]?.toString().toLowerCase() || '';
                const filterValue = filter.value.toLowerCase();
                if (filter.field === 'tags') {
                    // Handle tags array specifically
                    if (!contact.tags) return false;
                    if (filter.operator === 'contains') return contact.tags.some((t: string) => t.toLowerCase().includes(filterValue));
                    if (filter.operator === 'equals') return contact.tags.some((t: string) => t.toLowerCase() === filterValue);
                    return false;
                }

                switch (filter.operator) {
                    case 'contains': return startValue.includes(filterValue);
                    case 'equals': return startValue === filterValue;
                    case 'starts_with': return startValue.startsWith(filterValue);
                    case 'is_empty': return !startValue;
                    case 'is_not_empty': return !!startValue;
                    default: return true;
                }
            });
        });
    };

    const filteredContacts = (() => {
        const query = searchQuery || localSearch;
        const baseContacts = contacts.filter(contact =>
            contact.name.toLowerCase().includes(query.toLowerCase()) ||
            contact.email.toLowerCase().includes(query.toLowerCase())
        );
        return applyFilters(baseContacts, activeFilters);
    })();

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

    const handleActualSubmit = (data: any) => {
        if (editingContact) {
            updateContact(editingContact.id, data);
        } else {
            addContact(data);
        }
    };

    const triggerToast = (msg: string) => {
        setToastMessage(msg);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };




    const renderTabContent = () => {
        switch (topTab) {
            case 'Bulk Actions':
                return (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <table className="w-full text-left rtl:text-right">
                            <thead className="bg-gray-50 border-b border-gray-100">
                                <tr>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">{t('contacts.bulk_actions.name')}</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">{t('contacts.bulk_actions.status')}</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">{t('contacts.bulk_actions.created')}</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">{t('contacts.bulk_actions.completed')}</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">{t('contacts.bulk_actions.user')}</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {bulkActions.map(action => (
                                    <tr key={action.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900 flex items-center gap-3 rtl:flex-row-reverse">
                                            <div className="w-8 h-8 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
                                                <Clock size={16} />
                                            </div>
                                            {action.name}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${action.status === 'Completed' ? 'bg-green-100 text-green-700' :
                                                action.status === 'In Progress' ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'
                                                }`}>
                                                {action.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{action.created}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{action.completed}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{action.user}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                );

            case 'Restore':
                return (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <table className="w-full text-left rtl:text-right">
                            <thead className="bg-gray-50 border-b border-gray-100">
                                <tr>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">{t('contacts.restore.name')}</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">{t('contacts.restore.email')}</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">{t('contacts.restore.deleted_at')}</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right rtl:text-left">{t('contacts.restore.actions')}</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {deletedContacts.map(contact => (
                                    <tr key={contact.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{contact.name}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{contact.email}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{contact.deletedAt}</td>
                                        <td className="px-6 py-4 text-right rtl:text-left">
                                            <button
                                                onClick={() => triggerToast(`Restored ${contact.name}`)}
                                                className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold hover:bg-blue-100 transition-colors rtl:flex-row-reverse"
                                            >
                                                <RefreshCcw size={14} />
                                                {t('contacts.restore.restore_btn')}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                );

            case 'Tasks':
                return (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {tasks.map(task => (
                            <div key={task.id} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:border-ghl-blue transition-all group">
                                <div className="flex justify-between items-start mb-4 rtl:flex-row-reverse">
                                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                                        <Clock size={20} />
                                    </div>
                                    <span className={`px-2 px-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${task.status === 'Overdue' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                                        }`}>
                                        {task.status}
                                    </span>
                                </div>
                                <h3 className="text-gray-900 font-bold mb-1">{task.title}</h3>
                                <p className="text-sm text-gray-500 mb-4">{t('contacts.tasks.contact')}: <span className="text-ghl-blue font-medium">{task.contact}</span></p>
                                <div className="pt-4 border-t border-gray-50 flex items-center justify-between rtl:flex-row-reverse">
                                    <span className="text-xs text-gray-400">{t('contacts.tasks.due_date')}: {task.due}</span>
                                    <button className="text-blue-600 hover:underline text-xs font-bold">{t('common.save')}</button>
                                </div>
                            </div>
                        ))}
                    </div>
                );

            case 'Companies':
                return (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <table className="w-full text-left rtl:text-right">
                            <thead className="bg-gray-50 border-b border-gray-100">
                                <tr>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">{t('contacts.companies.name')}</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">{t('contacts.companies.website')}</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">{t('contacts.companies.phone')}</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">{t('contacts.companies.employees')}</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {companies.map(company => (
                                    <tr key={company.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900 flex items-center gap-3 rtl:flex-row-reverse">
                                            <div className="w-8 h-8 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center">
                                                <Briefcase size={16} />
                                            </div>
                                            {company.name}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-blue-600 hover:underline cursor-pointer">{company.website}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{company.phone}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{company.employees}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                );

            default:
                // Assume it's a Smart List
                if (smartLists.some(l => l.id === activeListId)) {
                    return (
                        <>
                            {selectedIds.size > 0 && (
                                <div className="mb-4 bg-blue-50 border border-blue-100 text-blue-700 px-4 py-3 rounded-md flex items-center justify-between animate-in fade-in slide-in-from-top-2 duration-200 rtl:flex-row-reverse">
                                    <span className="font-medium text-sm">{t('contacts.selection.selected', { count: selectedIds.size })}</span>
                                    <div className="flex items-center gap-3 rtl:flex-row-reverse">
                                        <button
                                            onClick={() => {
                                                selectedIds.forEach((id: string) => deleteContact(id));
                                                setSelectedIds(new Set());
                                                triggerToast(t('contacts.toolbar.delete_contacts'));
                                            }}
                                            className="text-sm font-medium hover:text-blue-900 flex items-center gap-2 bg-white px-3 py-1.5 rounded border border-blue-200 shadow-sm rtl:flex-row-reverse"
                                        >
                                            <Trash2 size={14} />
                                            {t('contacts.selection.delete_selected')}
                                        </button>
                                        <button onClick={() => setSelectedIds(new Set())} className="text-xs underline hover:text-blue-900">{t('contacts.selection.clear_selection')}</button>
                                    </div>
                                </div>
                            )}
                            <ContactTable
                                data={filteredContacts}
                                columns={columns}
                                onEdit={handleOpenModal}
                                onRowClick={(contact) => setSelectedContact(contact)}
                                selectedIds={selectedIds}
                                onSelectionChange={handleSelectionChange}
                                onSelectAll={handleSelectAll}
                            />
                        </>
                    );
                }
                return <ModulePlaceholder name={topTab} />;
        }
    };

    const handleTabChange = (listId: string) => {
        setActiveListId(listId);
        const list = smartLists.find(l => l.id === listId);
        if (list) {
            setActiveFilters(list.filters);
        }
    };

    const topTabs = ['Contacts', 'Smart Lists', 'Bulk Actions', 'Tasks', 'Companies'];
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="flex-1 flex flex-col h-full overflow-hidden bg-gray-50 min-h-0 relative">
            {/* Header Structure */}
            <div className="flex flex-col bg-white border-b border-gray-200">
                {/* Top Row: Navigation Tabs */}
                <div className="px-6 flex items-center justify-between h-14 border-b border-gray-100">
                    <div className="flex items-center h-full gap-2 overflow-x-auto no-scrollbar">
                        <span className="text-gray-900 font-bold mr-6 text-[15px]">Contacts</span>
                        <div className="flex items-center h-full gap-1">
                            {topTabs.map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => setTopTab(tab)}
                                    className={clsx(
                                        "px-4 h-full flex items-center text-[14px] font-medium transition-all relative whitespace-nowrap",
                                        topTab === tab ? "text-ghl-blue after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2.5px] after:bg-ghl-blue" : "text-gray-500 hover:text-gray-900"
                                    )}
                                >
                                    {tab}
                                </button>
                            ))}
                            <div className="w-[1px] h-6 bg-gray-200 mx-2" />
                            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                                <Settings size={18} />
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center gap-1 ml-4 h-full">
                        <div className="flex items-center gap-2 mr-4">
                            {[
                                { icon: Phone, color: '#10b981', onClick: () => setIsDialerOpen(true) },
                                { icon: Zap, color: '#3b82f6', onClick: () => setActiveActionModal('add_to_workflow') },
                                { icon: HelpCircle, color: '#3b82f6', link: 'https://glow-guide-help-hub.lovable.app/' }
                            ].map((btn, idx) => {
                                const Icon = btn.icon;
                                return (
                                    <button
                                        key={idx}
                                        onClick={() => {
                                            if (btn.onClick) {
                                                btn.onClick();
                                            } else if (btn.link) {
                                                window.open(btn.link, '_blank');
                                            }
                                        }}
                                        className="w-8 h-8 rounded-full flex items-center justify-center text-white shadow-sm hover:opacity-90 transition-opacity"
                                        style={{ backgroundColor: btn.color }}
                                    >
                                        <Icon size={16} />
                                    </button>
                                );
                            })}
                        </div>
                        <div className="w-[1px] h-6 bg-gray-200 mr-2" />
                        <button className="flex items-center gap-2 px-2 hover:bg-gray-100 h-10 rounded-lg transition-colors group">
                            <div className="w-8 h-8 rounded-full bg-[#c084fc] flex items-center justify-center text-white font-bold text-[13px] shadow-sm border border-purple-200">
                                MM
                            </div>
                            <ChevronDown size={14} className="text-gray-400 group-hover:text-gray-600" />
                        </button>
                    </div>
                </div>

                {/* Info Banner */}
                <div className="px-6 py-2.5 bg-gray-50/50 text-[13px] text-gray-500 italic border-b border-gray-100">
                    The 'Manage Smart Lists' & 'Restore' menu options are moving! From Jan 05, 2026, you'll find it under the actions menu (⋮) next to the Add Contact Button.
                </div>

                {/* Title Row with Upper Action Row */}
                <div className="px-6 py-5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <h1 className="text-[22px] font-black text-[#111827]">Contacts</h1>
                        <span className="bg-[#eff6ff] text-[#2563eb] px-3 py-1 rounded-full text-[13px] font-black border border-[#dbeafe] h-7 flex items-center">
                            {contacts.length} Contacts
                        </span>
                    </div>

                    <div className="flex items-center gap-2.5">
                        <button
                            onClick={() => setIsImportWizardOpen(true)}
                            className="flex items-center gap-2 px-5 py-2.5 text-[14px] font-black text-[#4b5563] bg-white border border-[#e5e7eb] rounded-xl hover:bg-gray-50 transition-all shadow-sm"
                        >
                            <Download size={18} className="text-gray-400" />
                            {t('contacts.toolbar.import', 'Import')}
                        </button>

                        <button
                            onClick={() => handleOpenModal()}
                            className="flex items-center gap-2 px-6 py-2.5 text-[14px] font-black text-white bg-[#0052cc] rounded-xl hover:bg-blue-700 transition-all shadow-[0_4px_12px_rgba(0,102,255,0.25)] active:scale-[0.98]"
                        >
                            <Plus size={20} />
                            {t('contacts.toolbar.add_contact', 'Add Contact')}
                        </button>

                        <div className="relative">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="w-11 h-11 flex items-center justify-center text-gray-400 hover:text-gray-900 bg-white border border-[#e5e7eb] rounded-xl hover:bg-gray-50 transition-all"
                            >
                                <MoreVertical size={20} />
                            </button>

                            {isMenuOpen && (
                                <div className="absolute top-[calc(100%+8px)] right-0 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 z-50 p-2 animate-in fade-in zoom-in-95 duration-200">
                                    <button className="w-full flex items-center gap-3 px-3 py-2.5 text-[14px] font-bold text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                                        <RefreshCcw size={16} className="text-gray-400" />
                                        Restore
                                    </button>
                                    <button className="w-full flex items-center gap-3 px-3 py-2.5 text-[14px] font-bold text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                                        <LayoutGrid size={16} className="text-gray-400" />
                                        Manage Smart Lists
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Smart List Tabs Row */}
                <div className="px-6 flex items-center justify-between h-11 border-b border-gray-50">
                    <div className="flex items-center h-full gap-1 overflow-x-auto no-scrollbar">
                        {smartLists.map(list => (
                            <button
                                key={list.id}
                                onClick={() => handleTabChange(list.id)}
                                className={clsx(
                                    "px-4 h-full flex items-center gap-2 text-[14px] font-black transition-all relative group",
                                    (topTab === 'Smart Lists' || topTab === 'Contacts') && activeListId === list.id ? "text-ghl-blue after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2.5px] after:bg-ghl-blue" : "text-gray-400 hover:text-gray-900"
                                )}
                            >
                                <LayoutGrid size={14} className={clsx(activeListId === list.id ? "text-ghl-blue" : "text-gray-300 group-hover:text-gray-500")} />
                                {list.name}
                            </button>
                        ))}
                        <button
                            onClick={() => setShowSaveListModal(true)}
                            className="px-4 h-full flex items-center gap-2 text-[14px] font-black text-gray-400 hover:text-gray-600 transition-all"
                        >
                            <Plus size={18} className="text-gray-300" />
                            Add Smart List
                        </button>
                    </div>

                    <div className="flex items-center h-full gap-4">
                        <button className="flex items-center gap-2 text-[13px] font-black text-gray-400 hover:text-gray-700 transition-colors">
                            <LayoutGrid size={16} />
                            Customise List
                        </button>
                        <div className="w-[1px] h-4 bg-gray-200" />
                        <button
                            onClick={() => {
                                console.log('Opening Manage Fields sidebar');
                                setIsColumnMenuOpen(true);
                            }}
                            className="flex items-center gap-2 text-[13px] font-black text-[#2563eb] hover:text-blue-700 transition-colors"
                        >
                            <Settings size={16} />
                            Manage Fields
                        </button>
                    </div>
                </div>
            </div>

            {/* Sub-Header / Toolbars */}
            <div className="bg-white border-b border-gray-200">
                {/* Active Filters Row (if any) */}
                {activeFilters.length > 0 && (
                    <div className="px-6 py-2 border-b border-gray-100 flex flex-wrap gap-2 rtl:flex-row-reverse">
                        {activeFilters.map(filter => (
                            <div key={filter.id} className="flex items-center gap-1 bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-medium border border-blue-100 rtl:flex-row-reverse">
                                <span className="opacity-70">{filter.field}:</span>
                                <span>{filter.operator === 'contains' ? '~' : filter.operator === 'equals' ? '=' : filter.operator}</span>
                                <span className="font-bold">"{filter.value}"</span>
                                <button
                                    onClick={() => setActiveFilters(prev => prev.filter(f => f.id !== filter.id))}
                                    className="hover:text-blue-900 ml-1 rtl:mr-1"
                                >
                                    <X size={12} />
                                </button>
                            </div>
                        ))}
                        <button
                            onClick={() => setActiveFilters([])}
                            className="text-xs text-gray-500 hover:text-gray-700 underline px-2"
                        >
                            {t('common.clear_all')}
                        </button>
                        <button
                            onClick={() => setShowSaveListModal(true)}
                            className="text-xs text-ghl-blue hover:text-blue-700 font-bold ml-auto rtl:mr-auto rtl:ml-0"
                        >
                            {t('contacts.lists.save_as_smart_list', 'Save as Smart List')}
                        </button>
                    </div>
                )}

                {/* Filter & Search Toolbar */}
                <div className="px-6 py-4 flex items-center justify-between border-b border-gray-100">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <button
                                onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
                                className={clsx(
                                    "flex items-center gap-3 px-5 py-2.5 text-[15px] font-black border rounded-xl transition-all shadow-sm group",
                                    isFilterMenuOpen ? "bg-[#eff6ff] border-[#bfdbfe] text-[#2563eb]" : "bg-white border-[#e5e7eb] text-[#2563eb] hover:bg-blue-50/50"
                                )}
                            >
                                <ListFilter size={18} className="text-[#2563eb]" />
                                <span className="transition-colors">Advanced Filters ({activeFilters.length > 0 ? activeFilters.length : '10'})</span>
                                {activeFilters.length > 0 && (
                                    <span className="absolute -top-2.5 -right-2.5 w-6 h-6 bg-[#2563eb] text-white text-[11px] font-black rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                                        {activeFilters.length}
                                    </span>
                                )}
                            </button>

                            {isFilterMenuOpen && (
                                <div className="absolute top-[calc(100%+12px)] left-0 w-[300px] bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 p-6 animate-in fade-in zoom-in-95 duration-200 max-h-[45vh] overflow-y-auto">
                                    <h3 className="text-[19px] font-black text-[#111827] mb-6">Add Filter</h3>

                                    <div className="space-y-6 text-left">
                                        <div>
                                            <label className="text-[13px] font-black text-gray-400 mb-2.5 block">Field</label>
                                            <div className="relative group/select">
                                                <select
                                                    id="filter-field-new"
                                                    className="w-full h-12 pl-4 pr-10 text-[16px] border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 appearance-none bg-white font-bold text-gray-900 cursor-pointer"
                                                >
                                                    <option value="name">Name</option>
                                                    <option value="email">Email</option>
                                                    <option value="phone">Phone</option>
                                                    <option value="tags">Tag</option>
                                                </select>
                                                <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="text-[13px] font-black text-gray-400 mb-2.5 block">Operator</label>
                                            <div className="relative group/select">
                                                <select
                                                    id="filter-operator-new"
                                                    className="w-full h-12 pl-4 pr-10 text-[16px] border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 appearance-none bg-white font-bold text-gray-900 cursor-pointer"
                                                >
                                                    <option value="contains">Contains</option>
                                                    <option value="equals">Is</option>
                                                </select>
                                                <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="text-[13px] font-black text-gray-400 mb-2.5 block">Value</label>
                                            <input
                                                id="filter-value-new"
                                                type="text"
                                                className="w-full h-12 px-4 text-[16px] border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 font-bold placeholder:text-gray-300"
                                                placeholder="Value..."
                                            />
                                        </div>

                                        <button
                                            onClick={() => {
                                                const field = (document.getElementById('filter-field-new') as HTMLSelectElement).value;
                                                const operator = (document.getElementById('filter-operator-new') as HTMLSelectElement).value as any;
                                                const value = (document.getElementById('filter-value-new') as HTMLInputElement).value;
                                                if (value) {
                                                    const newFilter: Filter = { id: Math.random().toString(36).substr(2, 9), field, operator, value };
                                                    setActiveFilters([...activeFilters, newFilter]);
                                                    setIsFilterMenuOpen(false);
                                                }
                                            }}
                                            className="w-full bg-[#2563eb] text-white h-14 rounded-xl text-[17px] font-black hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/30 mt-2"
                                        >
                                            Apply Filter
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        <button className="flex items-center gap-2 px-6 py-2.5 text-[15px] font-black text-[#4b5563] bg-white border border-[#e5e7eb] rounded-xl hover:bg-gray-50 transition-all shadow-sm">
                            <RefreshCcw size={18} className="text-gray-400" />
                            Sort
                        </button>
                    </div>

                    <div className="flex items-center gap-4 rtl:flex-row-reverse">
                        <div className="relative group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-ghl-blue transition-colors" size={18} />
                            <input
                                type="text"
                                placeholder="Search Contacts"
                                className="h-12 pl-12 pr-4 w-72 border border-gray-100 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 text-[15px] font-bold placeholder:text-gray-300 bg-white transition-all shadow-sm"
                                value={localSearch}
                                onChange={handleSearchChange}
                            />
                        </div>
                    </div>
                </div>

                {/* Global List Banner */}
                <button
                    onClick={() => {
                        setActiveListId('all');
                        setSearchQuery('');
                        setLocalSearch('');
                        setActiveFilters([]);
                        triggerToast(isRtl ? 'تم عرض القائمة الكاملة' : 'Viewing Global List');
                    }}
                    className="px-6 py-2 bg-gray-50/50 flex items-center gap-2 text-[13px] text-gray-500 font-medium hover:bg-gray-100/80 transition-colors w-full border-t border-gray-100 group"
                >
                    <Globe size={14} className="text-gray-400 group-hover:text-ghl-blue transition-colors" />
                    <span className="group-hover:text-gray-900 transition-colors">Global List</span>
                    <span className="bg-gray-200/50 text-gray-500 px-1.5 py-0.5 rounded text-[10px] ml-1">{contacts.length}</span>
                </button>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 overflow-y-auto p-0">
                <div className="max-w-full">
                    <div className="p-8">
                        <div className="max-w-7xl mx-auto">
                            {renderTabContent()}
                        </div>
                    </div>
                </div>
            </div>

            {/* Modals & Popovers */}
            <ContactModal
                isOpen={isModalOpen}
                onClose={() => { setIsModalOpen(false); setEditingContact(null); }}
                onSubmit={handleActualSubmit}
                initialData={editingContact}
            />

            <ImportWizard
                isOpen={isImportWizardOpen}
                onClose={() => setIsImportWizardOpen(false)}
            />

            <ContactDetailSlideOver
                isOpen={!!selectedContact}
                contact={selectedContact}
                onClose={() => setSelectedContact(null)}
                onEdit={(contact) => { setSelectedContact(null); handleOpenModal(contact); }}
            />

            {activeActionModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden text-left rtl:text-right">
                        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                            <h2 className="text-xl font-bold text-gray-900">
                                {activeActionModal === 'add_to_workflow' ? t('contacts.toolbar.add_to_workflow', 'Add to Workflow') : t(`contacts.toolbar.${activeActionModal}`)}
                            </h2>
                            <button onClick={() => setActiveActionModal(null)} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                                <X size={20} className="text-gray-500" />
                            </button>
                        </div>

                        {activeActionModal === 'add_to_workflow' ? (
                            <div className="p-6">
                                <p className="text-gray-600 mb-4 text-sm">Select a workflow to add the selected contacts to:</p>
                                <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                                    {['Nurture Sequence', 'Appointment Reminder', 'Birthday Promo', 'Webinar Follow-up', 'New Lead Onboarding'].map((wf) => (
                                        <label key={wf} className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl hover:bg-blue-50 hover:border-blue-200 cursor-pointer transition-colors group">
                                            <input type="radio" name="workflow" className="w-4 h-4 text-ghl-blue focus:ring-ghl-blue border-gray-300" />
                                            <div className="flex items-center gap-3">
                                                <div className="p-1.5 bg-gray-100 rounded-lg group-hover:bg-blue-100 text-gray-400 group-hover:text-blue-600 transition-colors">
                                                    <Zap size={16} />
                                                </div>
                                                <span className="font-bold text-gray-700 group-hover:text-gray-900">{wf}</span>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                                <div className="mt-4 p-3 bg-blue-50 text-blue-800 text-xs rounded-lg flex gap-2 items-start">
                                    <div className="p-0.5 mt-0.5"><Zap size={12} fill="currentColor" /></div>
                                    <div>
                                        Contacts will be added to this workflow immediately. Ensure your workflow triggers are configured correctly.
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="p-8 text-center">
                                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                    {activeActionModal.includes('sms') ? <MessageSquare size={32} /> : activeActionModal.includes('email') ? <Mail size={32} /> : <Zap size={32} />}
                                </div>
                                <p className="text-gray-600 mb-6">{t('common.coming_soon')}</p>
                            </div>
                        )}

                        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3 rtl:flex-row-reverse">
                            <button onClick={() => setActiveActionModal(null)} className="px-4 py-2 text-sm font-bold text-gray-600 hover:text-gray-800">
                                {t('common.cancel')}
                            </button>
                            <button
                                onClick={() => {
                                    const action = activeActionModal === 'add_to_workflow' ? t('contacts.toolbar.add_to_workflow', 'Add to Workflow') : t(`contacts.toolbar.${activeActionModal}`);
                                    triggerToast(t('contacts.toolbar.action_triggered', { action }));
                                    setActiveActionModal(null);
                                }}
                                className="px-6 py-2 text-sm font-bold bg-ghl-blue text-white rounded-lg hover:bg-blue-600 shadow-md transition-all active:scale-95 flex items-center gap-2 rtl:flex-row-reverse"
                            >
                                <Send size={16} />
                                {t('common.save')}
                            </button>
                        </div>
                    </div>
                </div>
            )
            }

            {/* Save Smart List Modal */}
            {
                showSaveListModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
                        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden text-left rtl:text-right">
                            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                                <h2 className="text-lg font-bold text-gray-900">{t('contacts.lists.save_title', 'Save Smart List')}</h2>
                                <button onClick={() => setShowSaveListModal(false)} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                                    <X size={20} className="text-gray-500" />
                                </button>
                            </div>
                            <div className="p-6">
                                <p className="text-sm text-gray-500 mb-4">{t('contacts.lists.save_desc', 'Give your smart list a name to save existing filters.')}</p>
                                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 block">{t('contacts.lists.name_label', 'List Name')}</label>
                                <input
                                    type="text"
                                    value={newSmartListName}
                                    onChange={(e) => setNewSmartListName(e.target.value)}
                                    className="w-full border-gray-300 rounded-lg focus:ring-ghl-blue focus:border-ghl-blue"
                                    placeholder="e.g. Hot Leads"
                                />
                            </div>
                            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3 rtl:flex-row-reverse">
                                <button onClick={() => setShowSaveListModal(false)} className="px-4 py-2 text-sm font-bold text-gray-600 hover:text-gray-800">
                                    {t('common.cancel')}
                                </button>
                                <button
                                    onClick={() => {
                                        if (newSmartListName) {
                                            const newList: SmartList = {
                                                id: Math.random().toString(36).substr(2, 9),
                                                name: newSmartListName,
                                                filters: [...activeFilters],
                                                columns: [...columns]
                                            };
                                            setSmartLists([...smartLists, newList]);
                                            setActiveListId(newList.id);
                                            setNewSmartListName('');
                                            setShowSaveListModal(false);
                                            triggerToast(t('contacts.lists.saved', 'Smart List saved successfully'));
                                        }
                                    }}
                                    className="px-6 py-2 text-sm font-bold bg-ghl-blue text-white rounded-lg hover:bg-blue-600 shadow-md transition-all active:scale-95"
                                >
                                    {t('common.save')}
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }

            {/* Success Toast */}
            {
                showToast && (
                    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-gray-900 text-white px-6 py-4 rounded-xl shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-300 z-[200] rtl:flex-row-reverse">
                        <div className="p-1 bg-blue-500 rounded-full">
                            <Zap size={14} className="text-white" />
                        </div>
                        <span className="font-medium">{toastMessage}</span>
                    </div>
                )
            }

            <DialerModal isOpen={isDialerOpen} onClose={() => setIsDialerOpen(false)} />

            <ManageFieldsSidebar
                isOpen={isColumnMenuOpen}
                onClose={() => setIsColumnMenuOpen(false)}
                columns={columns}
                setColumns={updateActiveListColumns}
            />
        </div >
    );
};

export default ContactsPage;
