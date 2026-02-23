import { Search, Link as LinkIcon, ExternalLink, Copy, MoreHorizontal } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const PaymentLinksTab = () => {
    const { t } = useTranslation();

    const links = [
        { name: 'Consulting Session', url: 'https://pay.example.com/consulting', visits: 120, conversions: 8, status: 'Active' },
        { name: 'E-Book Presale', url: 'https://pay.example.com/ebook', visits: 540, conversions: 45, status: 'Active' },
        { name: 'Webinar Access', url: 'https://pay.example.com/webinar', visits: 89, conversions: 12, status: 'Disabled' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center rtl:flex-row-reverse">
                <div className="flex items-center gap-3 rtl:flex-row-reverse">
                    <h2 className="text-xl font-semibold text-gray-900">{t('payments.tabs.payment_links')}</h2>
                </div>
                <button className="bg-ghl-blue text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors flex items-center gap-2 rtl:flex-row-reverse">
                    <LinkIcon size={16} />
                    {t('payments.modals.new_payment_link')}
                </button>
            </div>

            {/* Search */}
            <div className="flex items-center gap-3 bg-white p-4 rounded-lg border border-gray-200 shadow-sm rtl:flex-row-reverse">
                <div className="relative flex-1">
                    <Search className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder={t('common.search') + "..."}
                        className="w-full pl-10 pr-4 rtl:pl-4 rtl:pr-10 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-ghl-blue text-sm text-left rtl:text-right"
                    />
                </div>
            </div>

            {/* Links List */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden divide-y divide-gray-100">
                {links.map((link, i) => (
                    <div key={i} className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors rtl:flex-row-reverse">
                        <div className="flex items-start gap-4 rtl:flex-row-reverse">
                            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center shrink-0">
                                <LinkIcon size={24} />
                            </div>
                            <div className="text-left rtl:text-right">
                                <h3 className="text-lg font-medium text-gray-900">{link.name}</h3>
                                <div className="flex items-center gap-2 mt-1 text-sm text-gray-500 rtl:flex-row-reverse">
                                    <span className="truncate max-w-[200px] text-blue-500 hover:underline cursor-pointer">{link.url}</span>
                                    <button className="text-gray-400 hover:text-gray-600" title="Copy Link">
                                        <Copy size={14} />
                                    </button>
                                    <a href="#" className="text-gray-400 hover:text-gray-600" title="Open Link">
                                        <ExternalLink size={14} />
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-10 rtl:flex-row-reverse">
                            <div className="text-center">
                                <div className="text-lg font-bold text-gray-900">{link.visits}</div>
                                <div className="text-xs text-gray-500 uppercase">{t('payments.labels.visits')}</div>
                            </div>
                            <div className="text-center">
                                <div className="text-lg font-bold text-gray-900">{link.conversions}</div>
                                <div className="text-xs text-gray-500 uppercase">{t('payments.labels.conversions')}</div>
                            </div>
                            <div className="text-center">
                                <span className={`inline-flex px-3 py-1 text-xs font-bold rounded-full ${link.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                                    }`}>
                                    {t(`payments.status_types.${link.status.toLowerCase()}`)}
                                </span>
                            </div>
                            <button className="text-gray-400 hover:text-gray-600">
                                <MoreHorizontal size={20} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PaymentLinksTab;
