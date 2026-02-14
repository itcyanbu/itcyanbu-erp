import { useState } from 'react';
import SettingsSectionLayout from './SettingsSectionLayout';

// Calendars
export const CalendarsSettings = () => {
    const [activeTab, setActiveTab] = useState('calendars');

    return (
        <SettingsSectionLayout
            title="Calendars"
            description="Manage your calendars and appointment settings"
            actionButtonText="Create Calendar"
            onAction={() => window.alert('Create Calendar Clicked')}
            tabs={[
                { id: 'calendars', label: 'Calendars' },
                { id: 'appointments', label: 'Appointments' },
                { id: 'preferences', label: 'Preferences' },
                { id: 'conflicts', label: 'Conflicts' },
            ]}
            activeTab={activeTab}
            onTabChange={setActiveTab}
        >

            {activeTab === 'calendars' && (
                <div className="px-6 py-12 text-center">
                    <p className="text-gray-500 mb-2">No calendars found</p>
                    <button className="text-ghl-blue font-medium hover:underline">Create your first calendar</button>
                </div>
            )}
            {activeTab !== 'calendars' && (
                <div className="px-6 py-12 text-center">
                    <p className="text-gray-500">No {activeTab} configured</p>
                </div>
            )}
        </SettingsSectionLayout>
    );
};

// Phone Numbers
export const PhoneNumbersSettings = () => {
    const [activeTab, setActiveTab] = useState('phone-numbers');

    return (
        <SettingsSectionLayout
            title="Phone Numbers"
            description="Manage your tracking numbers and SMS settings"
            actionButtonText="Add Number"
            onAction={() => window.alert('Add Number Clicked')}
            tabs={[
                { id: 'phone-numbers', label: 'Phone Numbers' },
                { id: 'porting', label: 'Porting' },
                { id: 'trust-center', label: 'Trust Center' },
                { id: 'regulatory-bundle', label: 'Regulatory Bundle' },
            ]}
            activeTab={activeTab}
            onTabChange={setActiveTab}
        >
            {activeTab === 'phone-numbers' && (
                <div className="px-6 py-12 text-center">
                    <p className="text-gray-500 mb-2">No phone numbers connected</p>
                    <button className="text-ghl-blue font-medium hover:underline">Add a phone number</button>
                </div>
            )}
            {activeTab !== 'phone-numbers' && (
                <div className="px-6 py-12 text-center">
                    <p className="text-gray-500">No {activeTab.replace('-', ' ')} settings available</p>
                </div>
            )}
        </SettingsSectionLayout>
    );
};

// WhatsApp
export const WhatsAppSettings = () => {
    const [activeTab, setActiveTab] = useState('account');

    return (
        <SettingsSectionLayout
            title="WhatsApp"
            description="Connect your WhatsApp Business account"
            actionButtonText="Connect Account"
            onAction={() => console.log('Connect WhatsApp')}
            tabs={[
                { id: 'account', label: 'Account' },
                { id: 'conversations', label: 'Conversations' },
                { id: 'templates', label: 'Templates' },
            ]}
            activeTab={activeTab}
            onTabChange={setActiveTab}
        >
            {activeTab === 'account' && (
                <div className="px-6 py-12 text-center">
                    <p className="text-gray-500 mb-2">WhatsApp is not connected</p>
                    <button className="text-ghl-blue font-medium hover:underline">Connect WhatsApp Business</button>
                </div>
            )}
            {activeTab !== 'account' && (
                <div className="px-6 py-12 text-center">
                    <p className="text-gray-500">No {activeTab} data found</p>
                </div>
            )}
        </SettingsSectionLayout>
    );
};

// Reputation Management
export const ReputationSettings = () => {
    const [activeTab, setActiveTab] = useState('overview');

    return (
        <SettingsSectionLayout
            title="Reputation Management"
            description="Manage reviews and review requests"
            actionButtonText="Send Review Request"
            onAction={() => console.log('Send Request')}
            tabs={[
                { id: 'overview', label: 'Overview' },
                { id: 'requests', label: 'Requests' },
                { id: 'reviews', label: 'Reviews' },
                { id: 'listings', label: 'Listings' },
            ]}
            activeTab={activeTab}
            onTabChange={setActiveTab}
        >
            {activeTab === 'overview' && (
                <>
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
                </>
            )}
            {activeTab !== 'overview' && (
                <div className="px-6 py-12 text-center">
                    <p className="text-gray-500">No {activeTab} data found</p>
                </div>
            )}
        </SettingsSectionLayout>
    );
};
