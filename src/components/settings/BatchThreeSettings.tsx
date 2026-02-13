import { useState } from 'react';
import SettingsSectionLayout from './SettingsSectionLayout';

// Integrations
export const IntegrationsSettings = () => {
    const [activeTab, setActiveTab] = useState('connected-apps');
    return (
        <SettingsSectionLayout
            title="Integrations"
            description="Connect with third-party applications"
            showSearch={false}
            tabs={[
                { id: 'connected-apps', label: 'Connected Apps' },
                { id: 'webhooks', label: 'Webhooks' },
            ]}
            activeTab={activeTab}
            onTabChange={setActiveTab}
        >
            {activeTab === 'connected-apps' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                    {['Google', 'Facebook', 'QuickBooks', 'Stripe', 'Shopify', 'Slack', 'TikTok'].map((app) => (
                        <div key={app} className="border border-gray-200 rounded-lg p-6 flex flex-col items-center text-center hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-gray-100 rounded-full mb-4 flex items-center justify-center font-bold text-gray-500">
                                {app[0]}
                            </div>
                            <h3 className="font-medium text-gray-900 mb-2">{app}</h3>
                            <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50 w-full mt-auto">Connect</button>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="px-6 py-12 text-center">
                    <p className="text-gray-500">No webhooks configured</p>
                </div>
            )}
        </SettingsSectionLayout>
    );
};

// Conversation Providers
export const ConversationProvidersSettings = () => (
    <SettingsSectionLayout
        title="Conversation Providers"
        description="Manage email and SMS providers"
        showSearch={false}
    >
        <div className="p-6 space-y-4">
            <div className="border border-gray-200 rounded-lg p-4 flex items-center justify-between">
                <div>
                    <h3 className="font-medium text-gray-900">Email Providers</h3>
                    <p className="text-sm text-gray-500">Manage your SMTP services</p>
                </div>
                <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50">Manage</button>
            </div>
            <div className="border border-gray-200 rounded-lg p-4 flex items-center justify-between">
                <div>
                    <h3 className="font-medium text-gray-900">SMS Providers</h3>
                    <p className="text-sm text-gray-500">Manage your Twilio or LeadConnector settings</p>
                </div>
                <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50">Manage</button>
            </div>
        </div>
    </SettingsSectionLayout>
);

// Email Services
export const EmailServicesSettings = () => (
    <SettingsSectionLayout
        title="Email Services"
        description="Configure default email settings"
        actionButtonText="Add Service"
        onAction={() => console.log('Add Service')}
    >
        <div className="px-6 py-12 text-center">
            <p className="text-gray-500 mb-2">No email services configured</p>
            <button className="text-ghl-blue font-medium hover:underline">Add a service</button>
        </div>
    </SettingsSectionLayout>
);

// Tag Management
export const TagManagementSettings = () => (
    <SettingsSectionLayout
        title="Tag Management"
        description="Organize and manage your contact tags"
        actionButtonText="Create Tag"
        onAction={() => console.log('Create Tag')}
    >
        <div className="px-6 py-12 text-center">
            <p className="text-gray-500 mb-2">No tags found</p>
            <button className="text-ghl-blue font-medium hover:underline">Create your first tag</button>
        </div>
    </SettingsSectionLayout>
);
