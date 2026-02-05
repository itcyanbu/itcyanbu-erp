import { Settings as SettingsIcon, CreditCard, Receipt, Building, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const SettingsTab = () => {
    const { t } = useTranslation();

    const sections = [
        { icon: CreditCard, title: 'Payment Integrations', desc: 'Connect Stripe, PayPal, and Authorize.net' },
        { icon: Receipt, title: 'Taxes', desc: 'Manage tax rates and regions' },
        { icon: Building, title: 'Business Info', desc: 'Address, Tax ID, and Branding for Invoices' },
        { icon: Globe, title: 'Currency', desc: 'Set default currency and formatting' },
    ];

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 rtl:text-right">{t('payments.tabs.settings')}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {sections.map((section, i) => (
                    <div key={i} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:border-blue-200 hover:shadow-md transition-all cursor-pointer group">
                        <div className="flex items-start gap-4 rtl:flex-row-reverse">
                            <div className="w-12 h-12 bg-gray-50 text-gray-600 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                                <section.icon size={24} />
                            </div>
                            <div className="text-left rtl:text-right">
                                <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-700 transition-colors">{section.title}</h3>
                                <p className="text-gray-500 text-sm mt-1">{section.desc}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start gap-3 rtl:flex-row-reverse">
                <div className="text-yellow-600 mt-0.5">
                    <SettingsIcon size={20} />
                </div>
                <div className="text-left rtl:text-right">
                    <p className="text-sm font-medium text-yellow-800">Test Mode Active</p>
                    <p className="text-sm text-yellow-700 mt-1">
                        Your payments account is currently in test mode. No real money will be processed.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SettingsTab;
