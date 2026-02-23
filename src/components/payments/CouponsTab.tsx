import { Search, Ticket, MoreHorizontal, Clock, CheckCircle, XCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const CouponsTab = () => {
    const { t } = useTranslation();

    const coupons = [
        { code: 'WELCOME20', discount: '20% OFF', type: 'Percentage', usage: '45 / 100', status: 'Active', expiry: 'Dec 31, 2026' },
        { code: 'BlackFriday', discount: '50% OFF', type: 'Percentage', usage: '500 / 500', status: 'Expired', expiry: 'Nov 30, 2025' },
        { code: 'SAVE10', discount: '$10.00 OFF', type: 'Fixed Amount', usage: '12 / ∞', status: 'Active', expiry: 'Never' },
        { code: 'VIP_ACCESS', discount: '100% OFF', type: 'Percentage', usage: '5 / 10', status: 'Paused', expiry: 'Mar 15, 2026' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center rtl:flex-row-reverse">
                <div className="flex items-center gap-3 rtl:flex-row-reverse">
                    <h2 className="text-xl font-semibold text-gray-900">{t('payments.tabs.coupons')}</h2>
                </div>
                <button className="bg-ghl-blue text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors flex items-center gap-2 rtl:flex-row-reverse">
                    <Ticket size={16} />
                    {t('payments.modals.create_coupon')}
                </button>
            </div>

            {/* Search */}
            <div className="flex items-center gap-3 bg-white p-4 rounded-lg border border-gray-200 shadow-sm rtl:flex-row-reverse">
                <div className="relative flex-1">
                    <Search className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search coupons..."
                        className="w-full pl-10 pr-4 rtl:pl-4 rtl:pr-10 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-ghl-blue text-sm text-left rtl:text-right"
                    />
                </div>
            </div>

            {/* Grid Layout for Coupons */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {coupons.map((coupon, i) => (
                    <div key={i} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                        <div className={`absolute top-0 left-0 w-1 h-full ${coupon.status === 'Active' ? 'bg-green-500' :
                            coupon.status === 'Expired' ? 'bg-gray-300' : 'bg-orange-400'
                            }`}></div>

                        <div className="flex justify-between items-start mb-4 rtl:flex-row-reverse">
                            <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-md">
                                <Ticket size={14} className="text-gray-500" />
                                <span className="font-mono font-bold text-gray-800 tracking-wide">{coupon.code}</span>
                            </div>
                            <button className="text-gray-400 hover:text-gray-600">
                                <MoreHorizontal size={18} />
                            </button>
                        </div>

                        <div className="mb-4 text-center py-2">
                            <div className="text-2xl font-bold text-gray-900">{coupon.discount}</div>
                            <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">
                                {coupon.type === 'Percentage' ? t('payments.labels.percentage') : t('payments.labels.fixed_amount')}
                            </div>
                        </div>

                        <div className="border-t border-gray-100 pt-3 flex flex-col gap-2">
                            <div className="flex justify-between text-sm rtl:flex-row-reverse">
                                <span className="text-gray-500">{t('payments.labels.usage')}</span>
                                <span className="font-medium text-gray-700">{coupon.usage}</span>
                            </div>
                            <div className="flex justify-between text-sm rtl:flex-row-reverse">
                                <span className="text-gray-500">{t('payments.labels.expires')}</span>
                                <span className="font-medium text-gray-700">{coupon.expiry}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm mt-1 rtl:flex-row-reverse">
                                <span className="text-gray-500">{t('payments.status')}</span>
                                <span className={`flex items-center gap-1.5 font-medium ${coupon.status === 'Active' ? 'text-green-600' :
                                    coupon.status === 'Expired' ? 'text-gray-500' : 'text-orange-600'
                                    }`}>
                                    {coupon.status === 'Active' && <CheckCircle size={14} />}
                                    {coupon.status === 'Expired' && <XCircle size={14} />}
                                    {coupon.status === 'Paused' && <Clock size={14} />}
                                    {t(`payments.status_types.${coupon.status.toLowerCase()}`)}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CouponsTab;
