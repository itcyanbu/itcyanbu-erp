import { useState } from 'react';
import {
    CreditCard, FileText, History, RefreshCcw, Ticket, Link as LinkIcon,
    FileCheck, Box, Settings as SettingsIcon
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import InvoicesTab from '../components/payments/InvoicesTab';
import TransactionsTab from '../components/payments/TransactionsTab';
import SubscriptionsTab from '../components/payments/SubscriptionsTab';
import CouponsTab from '../components/payments/CouponsTab';
import PaymentLinksTab from '../components/payments/PaymentLinksTab';
import ProposalsTab from '../components/payments/ProposalsTab';
import ProductsTab from '../components/payments/ProductsTab';
import SettingsTab from '../components/payments/SettingsTab';

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

    const renderTabContent = () => {
        switch (activeTab) {
            case 'Invoices':
                return <InvoicesTab />;
            case 'Transactions':
                return <TransactionsTab />;
            case 'Subscriptions':
                return <SubscriptionsTab />;
            case 'Coupons':
                return <CouponsTab />;
            case 'Payment Links':
                return <PaymentLinksTab />;
            case 'Proposals':
                return <ProposalsTab />;
            case 'Products':
                return <ProductsTab />;
            case 'Settings':
                return <SettingsTab />;
            default:
                return <InvoicesTab />;
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



export default PaymentsPage;
