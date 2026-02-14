import { useState } from 'react';
import SettingsSectionLayout from './SettingsSectionLayout';

// Custom Fields
export const CustomFieldsSettings = () => {
    const [activeTab, setActiveTab] = useState('fields');
    return (
        <SettingsSectionLayout
            title="Custom Fields"
            description="Create and manage custom fields for your contacts"
            actionButtonText="Add Field"
            onAction={() => console.log('Add Field')}
            tabs={[
                { id: 'fields', label: 'Fields' },
                { id: 'folders', label: 'Folders' },
            ]}
            activeTab={activeTab}
            onTabChange={setActiveTab}
        >
            <div className="px-6 py-12 text-center">
                <p className="text-gray-500 mb-2">No custom {activeTab} created</p>
                <button className="text-ghl-blue font-medium hover:underline">Create a custom {activeTab === 'fields' ? 'field' : 'folder'}</button>
            </div>
        </SettingsSectionLayout>
    );
};

// Custom Values
export const CustomValuesSettings = () => {
    const [activeTab, setActiveTab] = useState('values');

    return (
        <SettingsSectionLayout
            title="Custom Values"
            description="Manage global custom values for use in templates and workflows"
            actionButtonText="Add Value"
            onAction={() => console.log('Add Value')}
            tabs={[
                { id: 'values', label: 'Values' },
                { id: 'folders', label: 'Folders' },
            ]}
            activeTab={activeTab}
            onTabChange={setActiveTab}
        >
            {activeTab === 'values' && (
                <div className="px-6 py-12 text-center">
                    <p className="text-gray-500 mb-2">No custom values found</p>
                    <button className="text-ghl-blue font-medium hover:underline">Create a custom value</button>
                </div>
            )}
            {activeTab === 'folders' && (
                <div className="px-6 py-12 text-center">
                    <p className="text-gray-500 mb-2">No folders created</p>
                    <button className="text-ghl-blue font-medium hover:underline">Create a folder</button>
                </div>
            )}
        </SettingsSectionLayout>
    );
};

// Domains
export const DomainsSettings = () => {
    const [activeTab, setActiveTab] = useState('domains');
    return (
        <SettingsSectionLayout
            title="Domains"
            description="Connect and manage your domains"
            actionButtonText="Add Domain"
            onAction={() => console.log('Add Domain')}
            tabs={[
                { id: 'domains', label: 'Domains' },
                { id: 'dns-records', label: 'DNS Records' },
            ]}
            activeTab={activeTab}
            onTabChange={setActiveTab}
        >
            <div className="px-6 py-12 text-center">
                <p className="text-gray-500 mb-2">No {activeTab.replace('-', ' ')} found</p>
                <button className="text-ghl-blue font-medium hover:underline">Add a domain</button>
            </div>
        </SettingsSectionLayout>
    );
};

// Media Library
export const MediaLibrarySettings = () => {
    const [activeTab, setActiveTab] = useState('media');

    return (
        <SettingsSectionLayout
            title="Media Library"
            description="Manage your images, videos, and documents"
            actionButtonText="Upload File"
            onAction={() => console.log('Upload File')}
            tabs={[
                { id: 'media', label: 'Media' },
                { id: 'trash', label: 'Trash' },
            ]}
            activeTab={activeTab}
            onTabChange={setActiveTab}
        >
            {activeTab === 'media' && (
                <div className="px-6 py-12 text-center">
                    <p className="text-gray-500 mb-2">Media library is empty</p>
                    <button className="text-ghl-blue font-medium hover:underline">Upload your first file</button>
                </div>
            )}
            {activeTab === 'trash' && (
                <div className="px-6 py-12 text-center">
                    <p className="text-gray-500 mb-2">Trash is empty</p>
                </div>
            )}
        </SettingsSectionLayout>
    );
};

// URL Redirects
export const UrlRedirectsSettings = () => {
    const [activeTab, setActiveTab] = useState('redirects');

    return (
        <SettingsSectionLayout
            title="URL Redirects"
            description="Manage URL redirects for your domains"
            actionButtonText="Add Redirect"
            onAction={() => console.log('Add Redirect')}
            tabs={[
                { id: 'redirects', label: 'Redirects' },
                { id: '404-logs', label: '404 Logs' },
            ]}
            activeTab={activeTab}
            onTabChange={setActiveTab}
        >
            {activeTab === 'redirects' && (
                <div className="px-6 py-12 text-center">
                    <p className="text-gray-500 mb-2">No redirects configured</p>
                    <button className="text-ghl-blue font-medium hover:underline">Create a redirect</button>
                </div>
            )}
            {activeTab === '404-logs' && (
                <div className="px-6 py-12 text-center">
                    <p className="text-gray-500 mb-2">No 404 logs found</p>
                </div>
            )}
        </SettingsSectionLayout>
    );
};
