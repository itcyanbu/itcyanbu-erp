import { useState, useEffect } from 'react';
import {
    Plus, Filter, Trash2, Search, ListFilter,
    MessageSquare, Mail, Star, Download, Building2, MessageCircle, Copy,
    Phone, Zap, HelpCircle, Send, X, Clock, RefreshCcw, Briefcase,
    Bot, Globe, ChevronDown, Tag, Upload, Settings
} from 'lucide-react';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import ContactTable from '../components/ContactTable';
import ContactModal from '../components/ContactModal';
import { useContacts } from '../context/ContactContext';
import ModulePlaceholder from '../components/ModulePlaceholder';
import ContactDetailSlideOver from '../components/ContactDetailSlideOver';
import DialerModal from './DialerModal';
import { ColumnManager, type ColumnDef } from './ColumnManager';

const ContactsPage = () => {
    const { contacts, searchQuery, deleteContact, setSearchQuery, addContact, updateContact } = useContacts();
    console.log('ContactsPage mounted - checking for updates');
    const { t, i18n } = useTranslation();
    const isRtl = i18n.language === 'ar';

    // State
    const [topTab, setTopTab] = useState('Smart Lists');
    const [activeListId, setActiveListId] = useState('all');
    const [isModalOpen, setIsModalOpen] = useState(false);
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

    const handleAction = (actionKey: string) => {
        if (selectedIds.size === 0 && !['import', 'add_contact'].includes(actionKey)) {
            triggerToast(isRtl ? 'يرجى تحديد جهة اتصال واحدة على الأقل' : 'Please select at least one contact');
            return;
        }

        if (['send_sms', 'send_email', 'add_tag', 'remove_tag'].includes(actionKey)) {
            setActiveActionModal(actionKey);
        } else {
            triggerToast(t('contacts.toolbar.action_triggered', { action: t(`contacts.toolbar.${actionKey}`) }));
        }
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

    const topTabs = ['Contacts', 'Smart Lists', 'Bulk Actions', 'Restore', 'Tasks', 'Companies', 'Manage Smart Lists'];

    return (
        <div className="flex-1 flex flex-col h-full overflow-hidden bg-gray-50 min-h-0 relative">
            <ColumnManager
                isOpen={isColumnMenuOpen}
                onClose={() => setIsColumnMenuOpen(false)}
                columns={columns}
                setColumns={updateActiveListColumns}
            />
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

                    <div className="flex items-center gap-3 ml-4">
                        <div className="flex items-center gap-2">
                            {[
                                { icon: Phone, color: '#10b981', onClick: () => setIsDialerOpen(true) },
                                { icon: Zap, color: '#3b82f6' },
                                { icon: HelpCircle, color: '#3b82f6', link: 'https://glow-guide-help-hub.lovable.app/' }
                            ].map((btn, idx) => {
                                const Icon = btn.icon;
                                return (
                                    <button
                                        key={idx}
                                        onClick={btn.onClick}
                                        className="w-8 h-8 rounded-full flex items-center justify-center text-white shadow-sm hover:opacity-90 transition-opacity"
                                        style={{ backgroundColor: btn.color }}
                                    >
                                        <Icon size={16} />
                                    </button>
                                );
                            })}
                        </div>
                        <div className="w-9 h-9 rounded-full bg-[#c084fc] flex items-center justify-center text-white font-bold text-sm shadow-sm border border-purple-300">
                            MM
                        </div>
                    </div>
                </div>

                {/* Info Banner */}
                <div className="px-6 py-2.5 bg-gray-50/50 text-[13px] text-gray-500 italic border-b border-gray-100">
                    The 'Manage Smart Lists' & 'Restore' menu options are moving! From Jan 05, 2026, you'll find it under the actions menu (⋮) next to the Add Contact Button.
                </div>

                {/* Title & Count Row */}
                <div className="px-6 py-5 flex items-center gap-3">
                    <h1 className="text-[22px] font-bold text-gray-900">Contacts</h1>
                    <span className="bg-[#eef2ff] text-[#4f46e5] px-2.5 py-0.5 rounded-full text-[12px] font-bold border border-[#e0e7ff] h-6 flex items-center">
                        {contacts.length} Contacts
                    </span>
                </div>

                {/* Smart List Tabs Row */}
                <div className="px-6 flex items-center h-11 border-b border-gray-50">
                    <div className="flex items-center h-full gap-1 overflow-x-auto no-scrollbar">
                        {smartLists.map(list => (
                            <button
                                key={list.id}
                                onClick={() => handleTabChange(list.id)}
                                className={clsx(
                                    "px-4 h-full flex items-center gap-2 text-[14px] font-medium transition-all relative group",
                                    (topTab === 'Smart Lists' || topTab === 'Contacts') && activeListId === list.id ? "text-ghl-blue after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-ghl-blue" : "text-gray-500 hover:text-gray-900"
                                )}
                            >
                                <ListFilter size={14} className={clsx(activeListId === list.id ? "text-ghl-blue" : "text-gray-400 group-hover:text-gray-600")} />
                                {list.name}
                            </button>
                        ))}
                        <button
                            onClick={() => setShowSaveListModal(true)}
                            className="px-4 h-full flex items-center gap-2 text-[14px] font-medium text-gray-500 hover:text-gray-900 transition-all font-bold"
                        >
                            <Plus size={16} className="text-gray-400" />
                            Add Smart List
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

                {/* Main Toolbar */}
                <div className="px-6 py-3 flex items-center justify-between rtl:flex-row-reverse border-b border-gray-100">
                    <div className="flex items-center gap-1 rtl:flex-row-reverse">
                        <button onClick={() => handleOpenModal()} className="w-10 h-10 flex items-center justify-center text-gray-500 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-all shadow-sm" title={t('contacts.toolbar.add_contact')}>
                            <Plus size={18} />
                        </button>

                        <div className="flex items-center gap-1 ml-0 rtl:ml-0 rtl:flex-row-reverse">
                            {[
                                { icon: Filter, key: "pipeline_change", bg: "bg-gray-100" },
                                { icon: Bot, key: "add_to_workflow", bg: "bg-white" },
                                { icon: MessageSquare, key: "send_sms", bg: "bg-white" },
                                { icon: Mail, key: "send_email", bg: "bg-white" }
                            ].map((btn) => (
                                <button
                                    key={btn.key}
                                    onClick={() => handleAction(btn.key)}
                                    className={`w-10 h-10 flex items-center justify-center text-gray-600 border border-gray-200 rounded-lg hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-all shadow-sm group ${btn.bg}`}
                                    title={t(`contacts.toolbar.${btn.key}`)}
                                >
                                    <btn.icon size={18} className="group-hover:scale-105 transition-transform" />
                                </button>
                            ))}

                            <button onClick={() => handleAction('add_tag')} className="w-10 h-10 flex items-center justify-center text-gray-600 bg-gray-100 border border-gray-200 rounded-lg hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-all shadow-sm group" title={t('contacts.toolbar.add_tag')}>
                                <div className="relative">
                                    <Tag size={18} className="group-hover:scale-105 transition-transform" />
                                    <Plus size={9} className="absolute -top-1 -right-1 font-bold text-gray-600 group-hover:text-blue-600" />
                                </div>
                            </button>

                            <button onClick={() => handleAction('remove_tag')} className="w-10 h-10 flex items-center justify-center text-gray-600 bg-gray-100 border border-gray-200 rounded-lg hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-all shadow-sm group" title={t('contacts.toolbar.remove_tag')}>
                                <div className="relative">
                                    <Tag size={18} className="group-hover:scale-105 transition-transform" />
                                    <div className="absolute top-0.5 -right-0.5 w-2 h-[2px] bg-gray-600 rounded-full group-hover:bg-blue-600"></div>
                                </div>
                            </button>

                            <button
                                onClick={() => {
                                    if (selectedIds.size > 0) {
                                        selectedIds.forEach((id: string) => deleteContact(id));
                                        setSelectedIds(new Set());
                                        triggerToast(t('contacts.toolbar.delete_contacts'));
                                    }
                                }}
                                className={`w-10 h-10 flex items-center justify-center border rounded-lg transition-all shadow-sm group ${selectedIds.size > 0 ? 'bg-red-50 border-red-200 text-red-600 hover:bg-red-100 hover:border-red-300' : 'bg-gray-100 border-gray-200 text-gray-400'}`}
                                title={t('contacts.toolbar.delete_contacts')}
                                disabled={selectedIds.size === 0}
                            >
                                <Trash2 size={18} className={selectedIds.size > 0 ? 'group-hover:scale-105 transition-transform' : ''} />
                            </button>

                            {[
                                { icon: Star, key: "add_to_favorites", bg: "bg-gray-100" },
                                { icon: Upload, key: "export", bg: "bg-white" },
                                { icon: Download, key: "import", bg: "bg-white" },
                                { icon: Building2, key: "assign_company", bg: "bg-gray-100" },
                                { icon: MessageCircle, key: "whatsapp", bg: "bg-gray-100" },
                                { icon: Copy, key: "duplicate_merge", bg: "bg-gray-100" }
                            ].map((btn) => (
                                <button
                                    key={btn.key}
                                    onClick={() => handleAction(btn.key)}
                                    className={`w-10 h-10 flex items-center justify-center text-gray-600 border border-gray-200 rounded-lg hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-all shadow-sm group ${btn.bg}`}
                                    title={t(`contacts.toolbar.${btn.key}`)}
                                >
                                    <btn.icon size={18} className="group-hover:scale-105 transition-transform" />
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-3 rtl:flex-row-reverse">
                        <button
                            onClick={() => setIsColumnMenuOpen(true)}
                            className="flex items-center gap-2 px-4 py-2 text-[14px] font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-all shadow-sm group rtl:flex-row-reverse"
                        >
                            <span>{t('contacts.toolbar.columns')}</span>
                            <ChevronDown size={16} className="text-ghl-blue group-hover:translate-y-0.5 transition-transform" />
                        </button>

                        <div className="relative">
                            <Search className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                            <input
                                type="text"
                                placeholder="Quick search"
                                className="pl-10 pr-4 rtl:pl-4 rtl:pr-10 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-ghl-blue focus:border-ghl-blue w-64 text-[14px] shadow-sm placeholder:text-gray-400 bg-white text-left rtl:text-right"
                                value={localSearch}
                                onChange={handleSearchChange}
                            />
                        </div>

                        <div className="relative">
                            <button
                                onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
                                className={`flex items-center gap-2 px-4 py-2 text-[14px] font-medium border rounded-lg transition-all shadow-sm group rtl:flex-row-reverse ${isFilterMenuOpen ? 'bg-blue-50 border-blue-200 text-ghl-blue' : 'text-gray-600 bg-white border-gray-200 hover:bg-gray-50'}`}
                            >
                                <span className="group-hover:text-ghl-blue transition-colors">{t('contacts.toolbar.more_filters', 'More Filters')}</span>
                                <ListFilter size={18} className="text-ghl-blue" />
                                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-ghl-blue text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white shadow-sm animate-bounce">1</span>
                            </button>

                            {isFilterMenuOpen && (
                                <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 z-50 p-4 animate-in fade-in zoom-in-50 duration-200 text-left rtl:text-right">
                                    <h3 className="text-sm font-bold text-gray-900 mb-3">{t('contacts.filters.add_filter', 'Add Filter')}</h3>
                                    <div className="space-y-3">
                                        <div>
                                            <label className="text-xs font-medium text-gray-500 mb-1 block">{t('contacts.filters.field', 'Field')}</label>
                                            <select id="filter-field" className="w-full text-sm border-gray-200 rounded-lg focus:ring-ghl-blue">
                                                <option value="name">Name</option>
                                                <option value="email">Email</option>
                                                <option value="tags">Tag</option>
                                                <option value="company">Company</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="text-xs font-medium text-gray-500 mb-1 block">{t('contacts.filters.operator', 'Operator')}</label>
                                            <select id="filter-operator" className="w-full text-sm border-gray-200 rounded-lg focus:ring-ghl-blue">
                                                <option value="contains">Contains</option>
                                                <option value="equals">Is</option>
                                                <option value="starts_with">Starts With</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="text-xs font-medium text-gray-500 mb-1 block">{t('contacts.filters.value', 'Value')}</label>
                                            <input id="filter-value" type="text" className="w-full text-sm border-gray-200 rounded-lg focus:ring-ghl-blue" placeholder="Value..." />
                                        </div>
                                        <button
                                            onClick={() => {
                                                const field = (document.getElementById('filter-field') as HTMLSelectElement).value;
                                                const operator = (document.getElementById('filter-operator') as HTMLSelectElement).value as any;
                                                const value = (document.getElementById('filter-value') as HTMLInputElement).value;

                                                if (value) {
                                                    const newFilter: Filter = {
                                                        id: Math.random().toString(36).substr(2, 9),
                                                        field,
                                                        operator,
                                                        value
                                                    };
                                                    setActiveFilters([...activeFilters, newFilter]);
                                                    setIsFilterMenuOpen(false);
                                                }
                                            }}
                                            className="w-full bg-ghl-blue text-white py-2 rounded-lg text-sm font-bold hover:bg-blue-600 transition-colors"
                                        >
                                            {t('contacts.filters.apply', 'Apply Filter')}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Global List Label */}
                <button
                    onClick={() => {
                        setActiveListId('all');
                        setSearchQuery('');
                        setLocalSearch('');
                        setActiveFilters([]);
                        triggerToast(isRtl ? 'تم عرض القائمة الكاملة' : 'Viewing Global List');
                    }}
                    className="px-6 py-2 bg-gray-50/50 flex items-center gap-2 text-[13px] text-gray-500 font-medium hover:bg-gray-100/80 transition-colors w-full border-b border-gray-100 group"
                >
                    <Globe size={14} className="text-gray-400 group-hover:text-ghl-blue transition-colors" />
                    <span className="group-hover:text-gray-900 transition-colors">Global List</span>
                    <span className="bg-gray-200/50 text-gray-500 px-1.5 py-0.5 rounded text-[10px] ml-1">{contacts.length}</span>
                </button>

            </div>

            {/* Save Smart List Modal */}
            {showSaveListModal && (
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
            )}

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

            <ContactDetailSlideOver
                isOpen={!!selectedContact}
                contact={selectedContact}
                onClose={() => setSelectedContact(null)}
                onEdit={(contact) => { setSelectedContact(null); handleOpenModal(contact); }}
            />

            {/* Placeholder Action Modal */}
            {activeActionModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden text-left rtl:text-right">
                        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                            <h2 className="text-xl font-bold text-gray-900">{t(`contacts.toolbar.${activeActionModal}`)}</h2>
                            <button onClick={() => setActiveActionModal(null)} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                                <X size={20} className="text-gray-500" />
                            </button>
                        </div>
                        <div className="p-8 text-center">
                            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                {activeActionModal.includes('sms') ? <MessageSquare size={32} /> : activeActionModal.includes('email') ? <Mail size={32} /> : <ListFilter size={32} />}
                            </div>
                            <p className="text-gray-600 mb-6">{t('common.coming_soon')}</p>
                            <div className="space-y-4">
                                <div className="h-4 bg-gray-100 rounded w-3/4 mx-auto animate-pulse"></div>
                                <div className="h-4 bg-gray-100 rounded w-1/2 mx-auto animate-pulse"></div>
                            </div>
                        </div>
                        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3 rtl:flex-row-reverse">
                            <button onClick={() => setActiveActionModal(null)} className="px-4 py-2 text-sm font-bold text-gray-600 hover:text-gray-800">
                                {t('common.cancel')}
                            </button>
                            <button
                                onClick={() => {
                                    triggerToast(t('contacts.toolbar.action_triggered', { action: t(`contacts.toolbar.${activeActionModal}`) }));
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
            )}

            {/* Success Toast */}
            {showToast && (
                <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-gray-900 text-white px-6 py-4 rounded-xl shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-300 z-[200] rtl:flex-row-reverse">
                    <div className="p-1 bg-blue-500 rounded-full">
                        <Zap size={14} className="text-white" />
                    </div>
                    <span className="font-medium">{toastMessage}</span>
                </div>
            )}

            <DialerModal isOpen={isDialerOpen} onClose={() => setIsDialerOpen(false)} />
        </div>
    );
};

export default ContactsPage;
