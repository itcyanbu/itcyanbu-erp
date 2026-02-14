import { useState } from 'react';
import SettingsSectionLayout from './SettingsSectionLayout';

// SMS & Email Templates
export const SmsEmailTemplatesSettings = () => {
    const [activeTab, setActiveTab] = useState('sms-templates');

    return (
        <SettingsSectionLayout
            title="SMS & Email Templates"
            description="Create and manage message templates"
            actionButtonText="Create Template"
            onAction={() => console.log('Create Template')}
            tabs={[
                { id: 'sms-templates', label: 'SMS Templates' },
                { id: 'email-templates', label: 'Email Templates' },
            ]}
            activeTab={activeTab}
            onTabChange={setActiveTab}
        >
            {activeTab === 'sms-templates' && (
                <div className="px-6 py-12 text-center">
                    <p className="text-gray-500 mb-2">No SMS templates found</p>
                    <button className="text-ghl-blue font-medium hover:underline">Create SMS template</button>
                </div>
            )}
            {activeTab === 'email-templates' && (
                <div className="px-6 py-12 text-center">
                    <p className="text-gray-500 mb-2">No email templates found</p>
                    <button className="text-ghl-blue font-medium hover:underline">Create email template</button>
                </div>
            )}
        </SettingsSectionLayout>
    );
};

// Labs
export const LabsSettings = () => (
    <SettingsSectionLayout
        title="Labs"
        description="Try out beta features"
        showSearch={false}
    >
        <div className="p-6">
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                <h3 className="font-semibold text-blue-900 mb-2">Beta Features</h3>
                <p className="text-sm text-blue-800">New features will appear here. Stay tuned!</p>
            </div>
        </div>
    </SettingsSectionLayout>
);

// Audit Logs
export const AuditLogsSettings = () => (
    <SettingsSectionLayout
        title="Audit Logs"
        description="View system activity and changes"
        showSearch={true}
    >
        <div className="px-6 py-12 text-center">
            <p className="text-gray-500">No activity logs found for the selected period</p>
        </div>
    </SettingsSectionLayout>
);
