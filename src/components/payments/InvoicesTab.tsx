import { useState } from 'react';
import { DollarSign, TrendingUp, CreditCard, Search, Filter, Download, Plus, RefreshCw, ChevronDown, Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import CreateInvoiceModal from './CreateInvoiceModal';

const InvoicesTab = () => {
    const { t } = useTranslation();
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [createType, setCreateType] = useState<'one-time' | 'recurring'>('one-time');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const [invoices, setInvoices] = useState([
        { id: 'INV-001', client: 'Acme Corp', amount: '$5,000', status: 'Paid', date: 'Jan 10, 2026', type: 'one-time' },
        { id: 'INV-002', client: 'Tech Solutions', amount: '$3,500', status: 'Pending', date: 'Jan 9, 2026', type: 'recurring' },
        { id: 'INV-003', client: 'Local Business', amount: '$1,200', status: 'Paid', date: 'Jan 8, 2026', type: 'one-time' },
        { id: 'INV-004', client: 'Global Ent', amount: '$8,400', status: 'Overdue', date: 'Jan 5, 2026', type: 'recurring' },
        { id: 'INV-005', client: 'StartUp Inc', amount: '$2,100', status: 'Paid', date: 'Jan 2, 2026', type: 'one-time' },
    ]);

    const handleOpenCreateJson = (type: 'one-time' | 'recurring') => {
        setCreateType(type);
        setIsCreateModalOpen(true);
        setIsDropdownOpen(false);
    };

    const handleSaveInvoice = (newInvoice: any) => {
        setInvoices([newInvoice, ...invoices]);
    };

    return (
        <div className="space-y-6 relative" onClick={() => isDropdownOpen && setIsDropdownOpen(false)}>
            <CreateInvoiceModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onSave={handleSaveInvoice}
                initialType={createType}
            />

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between mb-2 rtl:flex-row-reverse text-left rtl:text-right">
                        <span className="text-gray-500 text-sm font-medium">{t('payments.revenue')}</span>
                        <DollarSign className="text-green-500" size={20} />
                    </div>
                    <p className="text-3xl font-bold text-gray-900">$45,200</p>
                    <p className="text-green-600 text-sm mt-1">+12% {t('dashboard.vs_last_month')}</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between mb-2 rtl:flex-row-reverse text-left rtl:text-right">
                        <span className="text-gray-500 text-sm font-medium">{t('payments.pending')}</span>
                        <TrendingUp className="text-orange-500" size={20} />
                    </div>
                    <p className="text-3xl font-bold text-gray-900">$8,500</p>
                    <p className="text-gray-500 text-sm mt-1">5 {t('payments.tabs.invoices')}</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-left rtl:text-right">
                    <div className="flex items-center justify-between mb-2 rtl:flex-row-reverse">
                        <span className="text-gray-500 text-sm font-medium">{t('payments.this_month')}</span>
                        <CreditCard className="text-blue-500" size={20} />
                    </div>
                    <p className="text-3xl font-bold text-gray-900">$12,300</p>
                    <p className="text-green-600 text-sm mt-1">18 {t('payments.tabs.transactions')}</p>
                </div>
            </div>

            {/* Search & Filters */}
            <div className="flex items-center gap-3 bg-white p-4 rounded-lg border border-gray-200 shadow-sm rtl:flex-row-reverse z-10 relative">
                <div className="relative flex-1">
                    <Search className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder={t('common.search')}
                        className="w-full pl-10 pr-4 rtl:pl-4 rtl:pr-10 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-ghl-blue text-sm text-left rtl:text-right"
                    />
                </div>
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-sm font-medium text-gray-600 transition-colors rtl:flex-row-reverse">
                    <Filter size={18} />
                    <span>{t('contacts.toolbar.more_filters')}</span>
                </button>

                {/* Dropdown Button */}
                <div className="relative">
                    <button
                        onClick={(e) => { e.stopPropagation(); setIsDropdownOpen(!isDropdownOpen); }}
                        className="flex items-center gap-2 px-4 py-2 bg-ghl-blue text-white rounded-lg hover:bg-blue-600 text-sm font-bold transition-all rtl:flex-row-reverse"
                    >
                        <Plus className="w-4 h-4" />
                        <span>{t('payments.new')}</span>
                        <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Dropdown Menu */}
                    {isDropdownOpen && (
                        <div className="absolute right-0 rtl:right-auto rtl:left-0 top-full mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 p-2 z-50 animate-in fade-in zoom-in-95 duration-200">
                            <button
                                onClick={() => handleOpenCreateJson('one-time')}
                                className="w-full text-left rtl:text-right px-4 py-3 rounded-lg hover:bg-gray-50 flex items-center gap-3 group transition-colors"
                            >
                                <div className="w-8 h-8 bg-green-50 text-green-600 rounded-lg flex items-center justify-center group-hover:bg-green-100 transition-colors">
                                    <DollarSign size={18} />
                                </div>
                                <div>
                                    <div className="font-semibold text-gray-900 text-sm">{t('payments.new_invoice')}</div>
                                    <div className="text-xs text-gray-500">Send a one-time invoice</div>
                                </div>
                            </button>

                            <button
                                onClick={() => handleOpenCreateJson('recurring')}
                                className="w-full text-left rtl:text-right px-4 py-3 rounded-lg hover:bg-gray-50 flex items-center gap-3 group transition-colors"
                            >
                                <div className="w-8 h-8 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                                    <RefreshCw size={18} />
                                </div>
                                <div>
                                    <div className="font-semibold text-gray-900 text-sm">{t('payments.new_recurring_invoice')}</div>
                                    <div className="text-xs text-gray-500">Send recurring invoices</div>
                                </div>
                            </button>

                            <div className="h-px bg-gray-100 my-1"></div>

                            <button className="w-full text-left rtl:text-right px-4 py-3 rounded-lg hover:bg-gray-50 flex items-center gap-3 group transition-colors">
                                <div className="w-8 h-8 bg-gray-50 text-gray-600 rounded-lg flex items-center justify-center group-hover:bg-gray-100 transition-colors">
                                    <Download size={18} />
                                </div>
                                <div>
                                    <div className="font-semibold text-gray-900 text-sm">{t('payments.import_invoices')}</div>
                                    <div className="text-xs text-gray-500">Import CSV file</div>
                                </div>
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between rtl:flex-row-reverse">
                    <h2 className="text-lg font-semibold text-gray-900">{t('payments.recent_invoices')}</h2>
                    <button className="text-ghl-blue hover:text-blue-700 text-sm font-medium flex items-center gap-2 rtl:flex-row-reverse">
                        <Download size={16} />
                        {t('payments.export')}
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left rtl:text-right">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="py-3 px-6 text-xs font-bold text-gray-500 uppercase">{t('payments.invoice_id')}</th>
                                <th className="py-3 px-6 text-xs font-bold text-gray-500 uppercase">{t('payments.client')}</th>
                                <th className="py-3 px-6 text-xs font-bold text-gray-500 uppercase">{t('payments.amount')}</th>
                                <th className="py-3 px-6 text-xs font-bold text-gray-500 uppercase">{t('payments.type')}</th>
                                <th className="py-3 px-6 text-xs font-bold text-gray-500 uppercase">{t('payments.status')}</th>
                                <th className="py-3 px-6 text-xs font-bold text-gray-500 uppercase">{t('payments.date')}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {invoices.map((invoice, i) => (
                                <tr key={i} className="hover:bg-gray-50 transition-colors animate-in fade-in slide-in-from-left-2 duration-300">
                                    <td className="py-4 px-6 text-sm font-medium text-gray-900">{invoice.id}</td>
                                    <td className="py-4 px-6 text-sm text-gray-600">{invoice.client}</td>
                                    <td className="py-4 px-6 text-sm font-semibold text-gray-900">{invoice.amount}</td>
                                    <td className="py-4 px-6 text-sm text-gray-500">
                                        <div className="flex items-center gap-1.5">
                                            {invoice.type === 'recurring' ? <RefreshCw size={14} className="text-blue-500" /> : <Check size={14} className="text-gray-400" />}
                                            {invoice.type === 'recurring' ? 'Recurring' : 'One-time'}
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className={`inline-flex px-2 py-1 text-xs font-bold rounded-full ${invoice.status === 'Paid' ? 'bg-green-100 text-green-700' :
                                            invoice.status === 'Overdue' ? 'bg-red-100 text-red-700' :
                                                'bg-orange-100 text-orange-700'
                                            }`}>
                                            {invoice.status}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 text-sm text-gray-500">{invoice.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default InvoicesTab;
