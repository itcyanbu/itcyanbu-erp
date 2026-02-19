import { useState } from 'react';
import SettingsSectionLayout from './SettingsSectionLayout';

// Custom Fields
import { useContacts } from '../../context/ContactContext';
import { Trash2 } from 'lucide-react';
import CustomFieldForm from './CustomFieldForm';

export const CustomFieldsSettings = () => {
    const [activeTab, setActiveTab] = useState('fields');
    const { fieldConfig, addCustomField, deleteCustomField } = useContacts();
    const [isCreating, setIsCreating] = useState(false);

    // Filter to show only custom fields (not system ones) unless we want to show all
    // For this view, usually we show everything or just editable ones.
    // Let's show all but highlight system ones as locked.
    const fields = fieldConfig;

    return (
        <>
            <SettingsSectionLayout
                title="Custom Fields"
                description="Create and manage custom fields for your contacts"
                actionButtonText="Add Field"
                onAction={() => setIsCreating(true)}
                tabs={[
                    { id: 'fields', label: 'Fields' },
                    { id: 'folders', label: 'Folders' },
                ]}
                activeTab={activeTab}
                onTabChange={setActiveTab}
            >
                {fields.length === 0 ? (
                    <div className="px-6 py-12 text-center">
                        <p className="text-gray-500 mb-2">No custom {activeTab} created</p>
                        <button
                            onClick={() => setIsCreating(true)}
                            className="text-ghl-blue font-medium hover:underline"
                        >
                            Create a custom {activeTab === 'fields' ? 'field' : 'folder'}
                        </button>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Field Name</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Object</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Folder</th>
                                    <th scope="col" className="relative px-6 py-3">
                                        <span className="sr-only">Actions</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {fields.map((field) => (
                                    <tr key={field.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{field.label}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{field.objectType || 'Contact'}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <span className="inline-flex items-center gap-1">
                                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path></svg>
                                                {field.group?.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') || 'General Info'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            {!field.isSystem && (
                                                <button
                                                    onClick={() => deleteCustomField(field.id)}
                                                    className="text-gray-400 hover:text-red-600 transition-colors"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </SettingsSectionLayout>

            {isCreating && (
                <CustomFieldForm
                    onClose={() => setIsCreating(false)}
                    onSave={addCustomField}
                />
            )}
        </>
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
