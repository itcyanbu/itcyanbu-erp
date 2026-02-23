import { Search, Filter, RefreshCcw, MoreHorizontal } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const SubscriptionsTab = () => {
    const { t } = useTranslation();

    const subscriptions = [
        { id: 'SUB-1201', customer: 'John Doe', plan: 'Pro Monthly', amount: '$49.00', interval: 'Month', status: 'Active', next_billing: 'Feb 10, 2026' },
        { id: 'SUB-1202', customer: 'Sarah Smith', plan: 'Basic Yearly', amount: '$150.00', interval: 'Year', status: 'Active', next_billing: 'Jan 15, 2027' },
        { id: 'SUB-1203', customer: 'Michael Brown', plan: 'Pro Monthly', amount: '$49.00', interval: 'Month', status: 'Past Due', next_billing: 'Jan 10, 2026' },
        { id: 'SUB-1204', customer: 'Emily Davis', plan: 'Enterprise', amount: '$299.00', interval: 'Month', status: 'Canceled', next_billing: '-' },
        { id: 'SUB-1205', customer: 'David Wilson', plan: 'Basic Monthly', amount: '$15.00', interval: 'Month', status: 'Active', next_billing: 'Feb 01, 2026' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center rtl:flex-row-reverse">
                <div className="flex items-center gap-3 rtl:flex-row-reverse">
                    <h2 className="text-xl font-semibold text-gray-900">{t('payments.tabs.subscriptions')}</h2>
                    <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-0.5 rounded-full">
                        {subscriptions.length}
                    </span>
                </div>
                <button className="bg-ghl-blue text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors flex items-center gap-2 rtl:flex-row-reverse">
                    <RefreshCcw size={16} />
                    {t('payments.modals.create_subscription')}
                </button>
            </div>

            {/* Search & Filters */}
            <div className="flex items-center gap-3 bg-white p-4 rounded-lg border border-gray-200 shadow-sm rtl:flex-row-reverse">
                <div className="relative flex-1">
                    <Search className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder={t('common.search') + "..."}
                        className="w-full pl-10 pr-4 rtl:pl-4 rtl:pr-10 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-ghl-blue text-sm text-left rtl:text-right"
                    />
                </div>
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-sm font-medium text-gray-600 transition-colors rtl:flex-row-reverse">
                    <Filter size={18} />
                    <span>{t('contacts.toolbar.more_filters')}</span>
                </button>
            </div>

            {/* Table */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left rtl:text-right">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="py-3 px-6 text-xs font-bold text-gray-500 uppercase">{t('payments.labels.customer')}</th>
                                <th className="py-3 px-6 text-xs font-bold text-gray-500 uppercase">{t('payments.labels.plan')}</th>
                                <th className="py-3 px-6 text-xs font-bold text-gray-500 uppercase">{t('payments.amount')}</th>
                                <th className="py-3 px-6 text-xs font-bold text-gray-500 uppercase">{t('payments.status')}</th>
                                <th className="py-3 px-6 text-xs font-bold text-gray-500 uppercase">{t('payments.labels.next_billing')}</th>
                                <th className="py-3 px-4 w-10"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {subscriptions.map((sub, i) => (
                                <tr key={i} className="hover:bg-gray-50 transition-colors group">
                                    <td className="py-4 px-6 text-sm font-medium text-gray-900">
                                        <div className="flex flex-col">
                                            <span>{sub.customer}</span>
                                            <span className="text-xs text-gray-400 font-normal">{sub.id}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 text-sm text-gray-600">{sub.plan}</td>
                                    <td className="py-4 px-6 text-sm font-semibold text-gray-900">
                                        {sub.amount} <span className="text-xs text-gray-500 font-normal">/ {sub.interval}</span>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className={`inline-flex px-2 py-1 text-xs font-bold rounded-full ${sub.status === 'Active' ? 'bg-green-100 text-green-700' :
                                            sub.status === 'Past Due' ? 'bg-red-100 text-red-700' :
                                                'bg-gray-100 text-gray-700'
                                            }`}>
                                            {t(`payments.status_types.${sub.status.toLowerCase().replace(' ', '_')}`)}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 text-sm text-gray-500">{sub.next_billing}</td>
                                    <td className="py-4 px-4 text-center">
                                        <button className="text-gray-400 hover:text-gray-600">
                                            <MoreHorizontal size={18} />
                                        </button>
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

export default SubscriptionsTab;
