import { Settings as SettingsIcon, User, Bell, Lock, Palette } from 'lucide-react';

const SettingsPage = () => {
    const settingsSections = [
        { icon: User, title: 'Profile Settings', description: 'Manage your personal information' },
        { icon: Bell, title: 'Notifications', description: 'Configure notification preferences' },
        { icon: Lock, title: 'Security', description: 'Password and authentication settings' },
        { icon: Palette, title: 'Appearance', description: 'Customize the look and feel' },
    ];

    return (
        <div className="flex-1 flex flex-col h-screen overflow-hidden bg-gray-50">
            <div className="px-8 py-6 bg-white border-b border-gray-200">
                <div className="flex items-center gap-3 mb-2">
                    <SettingsIcon className="text-ghl-blue" size={28} />
                    <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
                </div>
                <p className="text-gray-500">Manage your account and preferences</p>
            </div>

            <div className="flex-1 overflow-y-auto p-8">
                <div className="max-w-4xl mx-auto space-y-6">
                    {/* Settings Sections */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {settingsSections.map((section, i) => (
                            <button
                                key={i}
                                className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:border-ghl-blue hover:shadow-md transition-all text-left group"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="bg-blue-50 p-3 rounded-lg group-hover:bg-blue-100 transition-colors">
                                        <section.icon className="text-ghl-blue" size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 mb-1">{section.title}</h3>
                                        <p className="text-sm text-gray-500">{section.description}</p>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Quick Settings */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-6">Quick Settings</h2>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                <div>
                                    <h3 className="font-medium text-gray-900">Email Notifications</h3>
                                    <p className="text-sm text-gray-500">Receive email updates for important events</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" defaultChecked />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-ghl-blue"></div>
                                </label>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                <div>
                                    <h3 className="font-medium text-gray-900">Dark Mode</h3>
                                    <p className="text-sm text-gray-500">Switch to dark theme</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-ghl-blue"></div>
                                </label>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                <div>
                                    <h3 className="font-medium text-gray-900">Two-Factor Authentication</h3>
                                    <p className="text-sm text-gray-500">Add an extra layer of security</p>
                                </div>
                                <button className="text-ghl-blue hover:text-blue-700 text-sm font-medium">Enable</button>
                            </div>
                        </div>
                    </div>

                    {/* Account Info */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-6">Account Information</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                <input
                                    type="email"
                                    defaultValue="demo@example.com"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ghl-blue"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                                <input
                                    type="text"
                                    defaultValue="Agency"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ghl-blue"
                                />
                            </div>
                            <button className="bg-ghl-blue text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;
