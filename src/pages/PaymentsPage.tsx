import { useState } from 'react';
import {
    CreditCard, DollarSign, TrendingUp, Download,
    FileText, History, RefreshCcw, Ticket, Link as LinkIcon,
    FileCheck, Box, Settings as SettingsIcon, Search, Filter
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

const PaymentsPage = () => {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState('Invoices');

    const tabs = [
        { id: 'Invoices', icon: FileText, key: 'invoices' },
        { id: 'Transactions', icon: History, key: 'transactions' },
        { id: 'Subscriptions', icon: RefreshCcw, key: 'subscriptions' },
        { id: 'Coupons', icon: Ticket, key: 'coupons' },
        { id: 'Payment Links', icon: LinkIcon, key: 'payment_links' },
        { id: 'Proposals', icon: FileCheck, key: 'proposals' },
        { id: 'Products', icon: Box, key: 'products' },
        { id: 'Settings', icon: SettingsIcon, key: 'settings' }
    ];

    const recentPayments = [
        { id: 'INV-001', client: 'Acme Corp', amount: '$5,000', status: 'Paid', date: 'Jan 10, 2026' },
        { id: 'INV-002', client: 'Tech Solutions', amount: '$3,500', status: 'Pending', date: 'Jan 9, 2026' },
        { id: 'INV-003', client: 'Local Business', amount: '$1,200', status: 'Paid', date: 'Jan 8, 2026' },
    ];

    const renderTabContent = () => {
        switch (activeTab) {
            case 'Invoices':
                return (
                    <div className="space-y-6">
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
                        <div className="flex items-center gap-3 bg-white p-4 rounded-lg border border-gray-200 shadow-sm rtl:flex-row-reverse">
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
                            <button className="flex items-center gap-2 px-4 py-2 bg-ghl-blue text-white rounded-lg hover:bg-blue-600 text-sm font-medium transition-colors rtl:flex-row-reverse">
                                <PlusIcon className="w-4 h-4" />
                                <span>{t('contacts.toolbar.add_contact')}</span>
                            </button>
                        </div>

                        {/* Table */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between rtl:flex-row-reverse">
                                <h2 className="text-lg font-semibold text-gray-900">{t('payments.recent_payments')}</h2>
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
                                            <th className="py-3 px-6 text-xs font-bold text-gray-500 uppercase">{t('payments.status')}</th>
                                            <th className="py-3 px-6 text-xs font-bold text-gray-500 uppercase">{t('payments.date')}</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {recentPayments.map((payment, i) => (
                                            <tr key={i} className="hover:bg-gray-50 transition-colors">
                                                <td className="py-4 px-6 text-sm font-medium text-gray-900">{payment.id}</td>
                                                <td className="py-4 px-6 text-sm text-gray-600">{payment.client}</td>
                                                <td className="py-4 px-6 text-sm font-semibold text-gray-900">{payment.amount}</td>
                                                <td className="py-4 px-6">
                                                    <span className={`inline-flex px-2 py-1 text-xs font-bold rounded-full ${payment.status === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                                                        }`}>
                                                        {payment.status === 'Paid' ? t('payments.paid') : t('payments.pending_status')}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-6 text-sm text-gray-500">{payment.date}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                );
            default:
                return (
                    <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
                        <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mb-4">
                            {tabs.find(t => t.id === activeTab)?.icon && (() => {
                                const Icon = tabs.find(t => t.id === activeTab)!.icon;
                                return <Icon size={32} />;
                            })()}
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 mb-2">{t(`payments.tabs.${activeTab.toLowerCase().replace(/ /g, '_')}`)}</h2>
                        <p className="text-gray-500">{t('common.coming_soon')}</p>
                    </div>
                );
        }
    };

    return (
        <div className="flex-1 flex flex-col overflow-hidden bg-gray-50 h-full">
            {/* Header and Sub-Navigation */}
            <div className="bg-white border-b border-gray-200">
                <div className="px-8 py-6 flex items-center justify-between rtl:flex-row-reverse">
                    <div className="flex items-center gap-3">
                        <CreditCard className="text-ghl-blue" size={28} />
                        <h1 className="text-2xl font-bold text-gray-900">{t('payments.title')}</h1>
                    </div>
                </div>

                {/* Desktop Tabs */}
                <div className="px-8 flex gap-8 overflow-x-auto no-scrollbar rtl:flex-row-reverse translate-y-[1px]">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`pb-4 text-sm font-medium whitespace-nowrap border-b-2 transition-all flex items-center gap-2 ${activeTab === tab.id
                                ? 'border-ghl-blue text-ghl-blue'
                                : 'border-transparent text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            <tab.icon size={16} />
                            {t(`payments.tabs.${tab.key}`)}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-8">
                <div className="max-w-7xl mx-auto">
                    {renderTabContent()}
                </div>
            </div>
        </div>
    );
};

const PlusIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
);

export default PaymentsPage;
