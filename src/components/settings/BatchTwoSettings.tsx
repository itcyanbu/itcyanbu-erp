import SettingsSectionLayout from './SettingsSectionLayout';

// Custom Fields
export const CustomFieldsSettings = () => (
    <SettingsSectionLayout
        title="Custom Fields"
        description="Create and manage custom fields for your contacts"
        actionButtonText="Add Field"
        onAction={() => console.log('Add Field')}
    >
        <div className="px-6 py-12 text-center">
            <p className="text-gray-500 mb-2">No custom fields created</p>
            <button className="text-ghl-blue font-medium hover:underline">Create a custom field</button>
        </div>
    </SettingsSectionLayout>
);

// Custom Values
export const CustomValuesSettings = () => (
    <SettingsSectionLayout
        title="Custom Values"
        description="Manage global custom values for use in templates and workflows"
        actionButtonText="Add Value"
        onAction={() => console.log('Add Value')}
    >
        <div className="px-6 py-12 text-center">
            <p className="text-gray-500 mb-2">No custom values found</p>
            <button className="text-ghl-blue font-medium hover:underline">Create a custom value</button>
        </div>
    </SettingsSectionLayout>
);

// Domains
export const DomainsSettings = () => (
    <SettingsSectionLayout
        title="Domains"
        description="Connect and manage your domains"
        actionButtonText="Add Domain"
        onAction={() => console.log('Add Domain')}
    >
        <div className="px-6 py-12 text-center">
            <p className="text-gray-500 mb-2">No domains connected</p>
            <button className="text-ghl-blue font-medium hover:underline">Connect a domain</button>
        </div>
    </SettingsSectionLayout>
);

// Media Library
export const MediaLibrarySettings = () => (
    <SettingsSectionLayout
        title="Media Library"
        description="Manage your images, videos, and documents"
        actionButtonText="Upload File"
        onAction={() => console.log('Upload File')}
    >
        <div className="px-6 py-12 text-center">
            <p className="text-gray-500 mb-2">Media library is empty</p>
            <button className="text-ghl-blue font-medium hover:underline">Upload your first file</button>
        </div>
    </SettingsSectionLayout>
);

// URL Redirects
export const UrlRedirectsSettings = () => (
    <SettingsSectionLayout
        title="URL Redirects"
        description="Manage URL redirects for your domains"
        actionButtonText="Add Redirect"
        onAction={() => console.log('Add Redirect')}
    >
        <div className="px-6 py-12 text-center">
            <p className="text-gray-500 mb-2">No redirects configured</p>
            <button className="text-ghl-blue font-medium hover:underline">Create a redirect</button>
        </div>
    </SettingsSectionLayout>
);
