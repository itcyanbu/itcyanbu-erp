import { Search, FileText, CheckCircle, Clock, XCircle, MoreHorizontal } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const ProposalsTab = () => {
    const { t } = useTranslation();

    const proposals = [
        { title: 'Website Redesign', client: 'Acme Corp', value: '$8,500.00', date: 'Feb 02, 2026', status: 'Draft' },
        { title: 'Marketing Retainer', client: 'Globex Inc', value: '$2,000.00/mo', date: 'Jan 28, 2026', status: 'Sent' },
        { title: 'Custom CRM Development', client: 'Stark Ind', value: '$15,000.00', date: 'Jan 15, 2026', status: 'Accepted' },
        { title: 'SEO Audit', client: 'Massive Dynamic', value: '$1,200.00', date: 'Jan 10, 2026', status: 'Declined' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center rtl:flex-row-reverse">
                <div className="flex items-center gap-3 rtl:flex-row-reverse">
                    <h2 className="text-xl font-semibold text-gray-900">{t('payments.tabs.proposals')}</h2>
                </div>
                <button className="bg-ghl-blue text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors flex items-center gap-2 rtl:flex-row-reverse">
                    <FileText size={16} />
                    {t('payments.modals.new_proposal')}
                </button>
            </div>

            {/* Search */}
            <div className="flex items-center gap-3 bg-white p-4 rounded-lg border border-gray-200 shadow-sm rtl:flex-row-reverse">
                <div className="relative flex-1">
                    <Search className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search proposals..."
                        className="w-full pl-10 pr-4 rtl:pl-4 rtl:pr-10 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-ghl-blue text-sm text-left rtl:text-right"
                    />
                </div>
            </div>

            {/* Grid/List Hybrid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-4">
                {proposals.map((prop, i) => (
                    <div key={i} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between h-40">
                        <div className="flex justify-between items-start rtl:flex-row-reverse">
                            <div className="text-left rtl:text-right">
                                <h3 className="font-bold text-gray-900 text-lg">{prop.title}</h3>
                                <p className="text-gray-500 text-sm mt-1">{prop.client}</p>
                            </div>
                            <span className={`px-2.5 py-1 text-xs font-bold rounded-md flex items-center gap-1 ${prop.status === 'Accepted' ? 'bg-green-100 text-green-700' :
                                prop.status === 'Sent' ? 'bg-blue-100 text-blue-700' :
                                    prop.status === 'Declined' ? 'bg-red-100 text-red-700' :
                                        'bg-gray-100 text-gray-600'
                                }`}>
                                {prop.status === 'Accepted' && <CheckCircle size={12} />}
                                {prop.status === 'Sent' && <Clock size={12} />}
                                {prop.status === 'Declined' && <XCircle size={12} />}
                                {t(`payments.status_types.${prop.status.toLowerCase()}`)}
                            </span>
                        </div>

                        <div className="flex items-end justify-between border-t border-gray-100 pt-3 rtl:flex-row-reverse">
                            <div className="text-left rtl:text-right">
                                <p className="text-xs text-gray-400 uppercase tracking-wide">{t('payments.labels.value')}</p>
                                <p className="text-lg font-bold text-gray-900">{prop.value}</p>
                            </div>
                            <button className="text-gray-400 hover:text-gray-600 p-1 hover:bg-gray-50 rounded">
                                <MoreHorizontal size={20} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProposalsTab;
