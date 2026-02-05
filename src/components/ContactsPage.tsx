import { useState, useEffect } from 'react';
import {
    Plus, Filter, Trash2, Search, Columns, ListFilter, Users,
    MessageSquare, Mail, Star, Download, Building2, MessageCircle, Copy,
    Phone, Zap, Megaphone, Bell, HelpCircle, Send, X, Clock, RefreshCcw, Briefcase
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import ContactTable from '../components/ContactTable';
import ContactModal from '../components/ContactModal';
import { useContacts } from '../context/ContactContext';
import ModulePlaceholder from '../components/ModulePlaceholder';
import ContactDetailSlideOver from '../components/ContactDetailSlideOver';
import DialerModal from './DialerModal';

const ContactsPage = () => {
    const { contacts, searchQuery, deleteContact, setSearchQuery, addContact, updateContact } = useContacts();
    const { t, i18n } = useTranslation();
    const isRtl = i18n.language === 'ar';

    // State
    const [activeTab, setActiveTab] = useState('Smart Lists');
    const [activeFilter, setActiveFilter] = useState('All');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDialerOpen, setIsDialerOpen] = useState(false);
    const [editingContact, setEditingContact] = useState<any>(null);
    const [selectedContact, setSelectedContact] = useState<any>(null);
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
    const [localSearch, setLocalSearch] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [activeActionModal, setActiveActionModal] = useState<string | null>(null);

    // ... (rest of state items preserved implicitly by only replacing up to line 30ish if I could, but I need to replace the header block later too)
    // Actually, I'll replace the top block to add import and state, then the bottom block to render modal.

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

    // Clear selection when changing views/filters
    useEffect(() => {
        setSelectedIds(new Set());
    }, [activeTab, activeFilter, searchQuery]);

    const filteredContacts = contacts.filter(contact => {
        const query = searchQuery || localSearch;
        const matchesSearch = contact.name.toLowerCase().includes(query.toLowerCase()) ||
            contact.email.toLowerCase().includes(query.toLowerCase());

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

    const tabs = ['Smart Lists', 'Bulk Actions', 'Restore', 'Tasks', 'Companies', 'Manage Smart Lists'];
    const filterTabs = [
        'All',
        'Twilio ISV Pending',
        'Twilio Rebilling Beta Testers',
        'Mobile App Web customiser Beta',
        'Beauty & Fashion Active Users',
        'Imported on Feb 13, 2025'
    ];

    const getTabKey = (tab: string) => tab.toLowerCase().replace(/ /g, '_');

    const renderTabContent = () => {
        switch (activeTab) {
            case 'Smart Lists':
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
                            onEdit={handleOpenModal}
                            onRowClick={(contact) => setSelectedContact(contact)}
                            selectedIds={selectedIds}
                            onSelectionChange={handleSelectionChange}
                            onSelectAll={handleSelectAll}
                        />
                    </>
                );

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
                return <ModulePlaceholder name={activeTab} />;
        }
    };

    return (
        <div className="flex-1 flex flex-col overflow-hidden bg-gray-50 min-h-0 relative">
            {/* Header */}
            <div className="px-6 py-4 bg-white border-b border-gray-200 flex items-center justify-between rtl:flex-row-reverse">
                <div className="flex items-center gap-6 rtl:flex-row-reverse">
                    <h1 className="text-xl font-bold text-[#1a1a1a] mr-2 rtl:mr-0 rtl:ml-2">{t('sidebar.contacts')}</h1>
                    <div className="flex items-center gap-6 rtl:flex-row-reverse">
                        {tabs.map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`text-[15px] font-medium transition-colors relative h-full flex items-center ${activeTab === tab ? 'text-ghl-blue' : 'text-gray-500 hover:text-gray-700'}`}
                            >
                                {t(`contacts.tabs.${getTabKey(tab)}`, tab)}
                                {activeTab === tab && (
                                    <div className="absolute -bottom-[17px] left-0 right-0 h-[2px] bg-ghl-blue"></div>
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex items-center gap-3 rtl:flex-row-reverse transition-all">
                    <div className="flex items-center gap-2 mr-4 rtl:mr-0 rtl:ml-4">
                        {[
                            { icon: Phone, color: '#10b981', onClick: () => setIsDialerOpen(true) },
                            { icon: Zap, color: '#3b82f6', onClick: () => triggerToast('Features coming soon!') },
                            { icon: Megaphone, color: '#528a8d', onClick: () => triggerToast('Announcements coming soon!') },
                            { icon: Bell, color: '#f97316', onClick: () => triggerToast('Notifications coming soon!') },
                            { icon: HelpCircle, color: '#3b82f6', link: 'https://glow-guide-help-hub.lovable.app/' }
                        ].map((btn, idx) => {
                            const Icon = btn.icon;
                            if (btn.link) {
                                return (
                                    <a
                                        key={idx}
                                        href={btn.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-8 h-8 rounded-full flex items-center justify-center text-white shadow-sm hover:opacity-90 transition-opacity"
                                        style={{ backgroundColor: btn.color }}
                                    >
                                        <Icon size={16} />
                                    </a>
                                );
                            }
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

            {/* Sub-Header / Toolbars (Only for Smart Lists) */}
            {activeTab === 'Smart Lists' && (
                <>
                    {/* Filter Tabs Row */}
                    <div className="px-8 pt-4 pb-0 bg-white border-b border-gray-200 overflow-x-auto">
                        <div className="flex gap-6 min-w-max rtl:flex-row-reverse">
                            {filterTabs.map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveFilter(tab)}
                                    className={`pb-4 text-xs font-medium border-b-2 transition-colors ${activeFilter === tab ? 'border-ghl-blue text-ghl-blue' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Action Toolbar Row */}
                    <div className="px-6 py-3 bg-white border-b border-gray-200 flex items-center justify-between rtl:flex-row-reverse">
                        <div className="flex items-center gap-2 rtl:flex-row-reverse">
                            <button onClick={() => handleOpenModal()} className="w-10 h-10 flex items-center justify-center text-gray-400 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors shadow-sm" title={t('contacts.toolbar.add_contact')}>
                                <Plus size={20} />
                            </button>

                            <div className="flex items-center gap-1.5 ml-2 rtl:ml-0 rtl:mr-2 rtl:flex-row-reverse">
                                {[
                                    { icon: Filter, key: "pipeline_change" },
                                    { icon: Users, key: "add_to_workflow" },
                                    { icon: MessageSquare, key: "send_sms" },
                                    { icon: Mail, key: "send_email" }
                                ].map((btn) => (
                                    <button
                                        key={btn.key}
                                        onClick={() => handleAction(btn.key)}
                                        className="w-10 h-10 flex items-center justify-center text-gray-500 bg-gray-50 border border-transparent rounded-lg hover:bg-white hover:border-gray-200 transition-all shadow-sm group"
                                        title={t(`contacts.toolbar.${btn.key}`)}
                                    >
                                        <btn.icon size={20} className="group-hover:scale-110 transition-transform" />
                                    </button>
                                ))}

                                <button onClick={() => handleAction('add_tag')} className="w-10 h-10 flex items-center justify-center text-gray-500 bg-gray-50 border border-transparent rounded-lg hover:bg-white hover:border-gray-200 transition-all shadow-sm group" title={t('contacts.toolbar.add_tag')}>
                                    <div className="relative">
                                        <ListFilter size={20} className="group-hover:scale-110 transition-transform" />
                                        <Plus size={10} className="absolute -top-1 -right-1 font-bold text-ghl-blue" />
                                    </div>
                                </button>

                                <button onClick={() => handleAction('remove_tag')} className="w-10 h-10 flex items-center justify-center text-gray-500 bg-gray-50 border border-transparent rounded-lg hover:bg-white hover:border-gray-200 transition-all shadow-sm group" title={t('contacts.toolbar.remove_tag')}>
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
                                            triggerToast(t('contacts.toolbar.delete_contacts'));
                                        }
                                    }}
                                    className={`w-10 h-10 flex items-center justify-center border border-transparent rounded-lg transition-all shadow-sm group ${selectedIds.size > 0 ? 'bg-red-50 text-red-600 hover:bg-white hover:border-red-200' : 'bg-gray-50 text-gray-300'}`}
                                    title={t('contacts.toolbar.delete_contacts')}
                                    disabled={selectedIds.size === 0}
                                >
                                    <Trash2 size={20} className={selectedIds.size > 0 ? 'group-hover:scale-110 transition-transform' : ''} />
                                </button>

                                {[
                                    { icon: Star, key: "add_to_favorites" },
                                    { icon: Download, key: "export", rotate: 180 },
                                    { icon: Download, key: "import" },
                                    { icon: Mail, key: "direct_mail", opacity: true },
                                    { icon: Building2, key: "assign_company" },
                                    { icon: MessageCircle, key: "whatsapp" },
                                    { icon: Copy, key: "duplicate_merge" }
                                ].map((btn) => (
                                    <button
                                        key={btn.key}
                                        onClick={() => handleAction(btn.key)}
                                        className={`w-10 h-10 flex items-center justify-center text-gray-500 bg-gray-50 border border-transparent rounded-lg hover:bg-white hover:border-gray-200 transition-all shadow-sm group ${btn.opacity ? 'opacity-70' : ''}`}
                                        title={t(`contacts.toolbar.${btn.key}`)}
                                    >
                                        <btn.icon size={20} className={`group-hover:scale-110 transition-transform ${btn.rotate ? 'rotate-180' : ''}`} />
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center gap-3 rtl:flex-row-reverse">
                            <button onClick={() => triggerToast(t('contacts.toolbar.columns'))} className="flex items-center gap-2 px-4 py-2 text-[14px] font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-all shadow-sm group rtl:flex-row-reverse">
                                <span className="group-hover:text-ghl-blue transition-colors">{t('contacts.toolbar.columns')}</span>
                                <Columns size={16} className="text-[#3b82f6]" />
                            </button>

                            <div className="relative">
                                <Search className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold" size={16} />
                                <input
                                    type="text"
                                    placeholder={t('common.search')}
                                    className="pl-10 pr-4 rtl:pl-4 rtl:pr-10 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-ghl-blue focus:border-ghl-blue w-80 text-[14px] shadow-sm placeholder:text-gray-400 text-left rtl:text-right"
                                    value={localSearch}
                                    onChange={handleSearchChange}
                                />
                            </div>

                            <button onClick={() => triggerToast(t('contacts.toolbar.more_filters'))} className="flex items-center gap-2 px-4 py-2 text-[14px] font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-all shadow-sm group rtl:flex-row-reverse">
                                <span className="group-hover:text-ghl-blue transition-colors">{t('contacts.toolbar.more_filters')}</span>
                                <ListFilter size={18} className="text-[#3b82f6]" />
                            </button>
                        </div>
                    </div>
                </>
            )}

            {/* Main Content Area */}
            <div className="flex-1 overflow-y-auto p-8">
                <div className="max-w-7xl mx-auto">
                    {renderTabContent()}
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
