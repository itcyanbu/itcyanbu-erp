import SettingsSectionLayout from './SettingsSectionLayout';

// SMS & Email Templates
export const SmsEmailTemplatesSettings = () => (
    <SettingsSectionLayout
        title="SMS & Email Templates"
        description="Create and manage message templates"
        actionButtonText="Create Template"
        onAction={() => console.log('Create Template')}
    >
        <div className="px-6 py-12 text-center">
            <p className="text-gray-500 mb-2">No templates found</p>
            <button className="text-ghl-blue font-medium hover:underline">Create a template</button>
        </div>
    </SettingsSectionLayout>
);

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
