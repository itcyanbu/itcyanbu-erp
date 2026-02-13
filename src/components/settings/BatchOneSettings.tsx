import SettingsSectionLayout from './SettingsSectionLayout';

// Calendars
export const CalendarsSettings = () => (
    <SettingsSectionLayout
        title="Calendars"
        description="Manage your calendars and appointment settings"
        actionButtonText="Create Calendar"
        onAction={() => console.log('Create Calendar')}
    >
        <div className="px-6 py-12 text-center">
            <p className="text-gray-500 mb-2">No calendars found</p>
            <button className="text-ghl-blue font-medium hover:underline">Create your first calendar</button>
        </div>
    </SettingsSectionLayout>
);

// Phone Numbers
export const PhoneNumbersSettings = () => (
    <SettingsSectionLayout
        title="Phone Numbers"
        description="Manage your tracking numbers and SMS settings"
        actionButtonText="Add Number"
        onAction={() => console.log('Add Number')}
    >
        <div className="px-6 py-12 text-center">
            <p className="text-gray-500 mb-2">No phone numbers connected</p>
            <button className="text-ghl-blue font-medium hover:underline">Add a phone number</button>
        </div>
    </SettingsSectionLayout>
);

// WhatsApp
export const WhatsAppSettings = () => (
    <SettingsSectionLayout
        title="WhatsApp"
        description="Connect your WhatsApp Business account"
        actionButtonText="Connect Account"
        onAction={() => console.log('Connect WhatsApp')}
    >
        <div className="px-6 py-12 text-center">
            <p className="text-gray-500 mb-2">WhatsApp is not connected</p>
            <button className="text-ghl-blue font-medium hover:underline">Connect WhatsApp Business</button>
        </div>
    </SettingsSectionLayout>
);

// Reputation Management
export const ReputationSettings = () => (
    <SettingsSectionLayout
        title="Reputation Management"
        description="Manage reviews and review requests"
        actionButtonText="Send Review Request"
        onAction={() => console.log('Send Request')}
    >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-gray-50 border-b border-gray-200">
            <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                <div className="text-2xl font-bold text-gray-900">0</div>
                <div className="text-sm text-gray-500">Reviews Received</div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                <div className="text-2xl font-bold text-gray-900">0.0</div>
                <div className="text-sm text-gray-500">Average Rating</div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                <div className="text-2xl font-bold text-gray-900">0</div>
                <div className="text-sm text-gray-500">Sentiment Score</div>
            </div>
        </div>
        <div className="px-6 py-12 text-center">
            <p className="text-gray-500">No reviews yet</p>
        </div>
    </SettingsSectionLayout>
);
