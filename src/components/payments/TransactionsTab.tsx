import { Search, Filter, Download, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const TransactionsTab = () => {
    const { t } = useTranslation();

    const transactions = [
        { id: 'TXN-8823', description: 'Monthly Subscription', amount: '$49.00', type: 'incoming', date: 'Jan 10, 2026, 09:23 AM', status: 'Success' },
        { id: 'TXN-8822', description: 'Consulting Service', amount: '$150.00', type: 'incoming', date: 'Jan 09, 2026, 02:15 PM', status: 'Success' },
        { id: 'TXN-8821', description: 'Refund: Order #921', amount: '-$49.00', type: 'outgoing', date: 'Jan 09, 2026, 11:05 AM', status: 'Refunded' },
        { id: 'TXN-8820', description: 'Yearly Plan', amount: '$490.00', type: 'incoming', date: 'Jan 08, 2026, 04:45 PM', status: 'Success' },
        { id: 'TXN-8819', description: 'Add-on Purchase', amount: '$25.00', type: 'incoming', date: 'Jan 08, 2026, 10:12 AM', status: 'Failed' },
        { id: 'TXN-8818', description: 'Monthly Subscription', amount: '$49.00', type: 'incoming', date: 'Jan 07, 2026, 08:30 AM', status: 'Success' },
    ];

    return (
        <div className="space-y-6">
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
                <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 text-sm font-medium text-gray-600 transition-colors rtl:flex-row-reverse">
                    <Download size={18} />
                    <span>{t('payments.export')}</span>
                </button>
            </div>

            {/* Table */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left rtl:text-right">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="py-3 px-6 text-xs font-bold text-gray-500 uppercase">{t('payments.transaction_id')}</th>
                                <th className="py-3 px-6 text-xs font-bold text-gray-500 uppercase">{t('payments.description')}</th>
                                <th className="py-3 px-6 text-xs font-bold text-gray-500 uppercase">{t('payments.amount')}</th>
                                <th className="py-3 px-6 text-xs font-bold text-gray-500 uppercase">{t('payments.date')}</th>
                                <th className="py-3 px-6 text-xs font-bold text-gray-500 uppercase">{t('payments.status')}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {transactions.map((txn, i) => (
                                <tr key={i} className="hover:bg-gray-50 transition-colors">
                                    <td className="py-4 px-6 text-sm font-medium text-gray-900 font-mono">{txn.id}</td>
                                    <td className="py-4 px-6 text-sm text-gray-600">
                                        <div className="flex items-center gap-2">
                                            {txn.type === 'incoming' ?
                                                <ArrowDownLeft size={16} className="text-green-500" /> :
                                                <ArrowUpRight size={16} className="text-gray-400" />
                                            }
                                            {txn.description}
                                        </div>
                                    </td>
                                    <td className={`py-4 px-6 text-sm font-semibold ${txn.type === 'outgoing' ? 'text-gray-900' : 'text-green-600'}`}>
                                        {txn.amount}
                                    </td>
                                    <td className="py-4 px-6 text-sm text-gray-500">{txn.date}</td>
                                    <td className="py-4 px-6">
                                        <span className={`inline-flex px-2 py-1 text-xs font-bold rounded-full ${txn.status === 'Success' ? 'bg-green-100 text-green-700' :
                                            txn.status === 'Refunded' ? 'bg-gray-100 text-gray-700' :
                                                'bg-red-100 text-red-700'
                                            }`}>
                                            {t(`payments.status_types.${txn.status.toLowerCase()}`)}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default TransactionsTab;
