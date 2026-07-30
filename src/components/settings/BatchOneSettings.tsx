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
    const [connectionState, setConnectionState] = useState<'not_connected' | 'connecting' | 'connected'>('not_connected');
    const [connectionMethod, setConnectionMethod] = useState<'method1' | 'method2' | 'method3' | null>(null);
    const [wizardStep, setWizardStep] = useState(1);
    const [formData, setFormData] = useState({ phone: '', otp: '' });

    const handleStartConnection = (method: 'method1' | 'method2' | 'method3') => {
        setConnectionMethod(method);
        setConnectionState('connecting');
        setWizardStep(1);
    };

    const handleNextStep = () => {
        setWizardStep(prev => prev + 1);
    };

    const handleFinish = () => {
        setConnectionState('connected');
        setConnectionMethod(null);
        setWizardStep(1);
    };

    const renderNotConnected = () => (
        <div className="p-8 max-w-4xl mx-auto space-y-6">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">WhatsApp Business Integration</h2>
                <p className="text-gray-500">Connect your WhatsApp Business account to LeadConnector. Choose the method that fits your situation.</p>
            </div>

            <div className="space-y-4">
                <button 
                    onClick={() => handleStartConnection('method1')}
                    className="w-full text-left p-6 border border-gray-200 rounded-xl hover:border-ghl-blue hover:shadow-md transition-all bg-white flex items-center gap-4 group"
                >
                    <div className="w-8 h-8 rounded-full bg-[#25d366] text-white flex items-center justify-center font-bold text-sm">1</div>
                    <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 text-lg group-hover:text-ghl-blue transition-colors">Connect Your Existing WhatsApp Business App</h3>
                        <p className="text-gray-500 text-sm mt-1">Keep using your existing app alongside the platform (Coexistence)</p>
                    </div>
                </button>

                <button 
                    onClick={() => handleStartConnection('method2')}
                    className="w-full text-left p-6 border border-gray-200 rounded-xl hover:border-ghl-blue hover:shadow-md transition-all bg-white flex items-center gap-4 group"
                >
                    <div className="w-8 h-8 rounded-full bg-[#25d366] text-white flex items-center justify-center font-bold text-sm">2</div>
                    <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 text-lg group-hover:text-ghl-blue transition-colors">Connect a New WhatsApp Business Number</h3>
                        <p className="text-gray-500 text-sm mt-1">Starting fresh with a brand-new number</p>
                    </div>
                </button>

                <button 
                    onClick={() => handleStartConnection('method3')}
                    className="w-full text-left p-6 border border-gray-200 rounded-xl hover:border-ghl-blue hover:shadow-md transition-all bg-white flex items-center gap-4 group"
                >
                    <div className="w-8 h-8 rounded-full bg-[#25d366] text-white flex items-center justify-center font-bold text-sm">3</div>
                    <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 text-lg group-hover:text-ghl-blue transition-colors">Migrate from an Existing BSP</h3>
                        <p className="text-gray-500 text-sm mt-1">Switch from another Business Solution Provider</p>
                    </div>
                </button>
            </div>
            
            <div className="mt-8 p-4 bg-orange-50 border border-orange-200 rounded-lg text-orange-800 text-sm">
                <span className="font-semibold block mb-1">NOTE</span>
                <ul className="list-disc pl-5 space-y-1">
                    <li>Sending template messages is not supported via the WhatsApp Business App — they can only be sent through the CRM.</li>
                    <li>You will manage your WhatsApp profile from the WhatsApp Business App, not the CRM.</li>
                    <li>You can only have a maximum of one phone number under Coexistence.</li>
                </ul>
            </div>
        </div>
    );

    const renderConnecting = () => (
        <div className="p-8 max-w-2xl mx-auto">
            <div className="mb-8 flex items-center gap-4">
                <button onClick={() => setConnectionState('not_connected')} className="text-gray-500 hover:text-gray-800 transition-colors">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                </button>
                <h2 className="text-xl font-bold text-gray-900">
                    {connectionMethod === 'method1' && "Connect Existing WhatsApp Business App"}
                    {connectionMethod === 'method2' && "Connect New WhatsApp Business Number"}
                    {connectionMethod === 'method3' && "Migrate from Existing BSP"}
                </h2>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
                <div className="mb-8 flex justify-between items-center text-sm font-medium relative">
                    <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-gray-200 -z-10 -translate-y-1/2 rounded-full"></div>
                    <div className="absolute top-1/2 left-0 h-[2px] bg-ghl-blue -z-10 -translate-y-1/2 rounded-full transition-all duration-300" style={{ width: `${(wizardStep - 1) * 33.33}%` }}></div>
                    
                    <div className={`flex flex-col items-center gap-2 ${wizardStep >= 1 ? 'text-ghl-blue' : 'text-gray-400'}`}>
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs text-white ${wizardStep >= 1 ? 'bg-ghl-blue' : 'bg-gray-200 text-gray-500'}`}>1</div>
                        <span>Step 1</span>
                    </div>
                    <div className={`flex flex-col items-center gap-2 ${wizardStep >= 2 ? 'text-ghl-blue' : 'text-gray-400'}`}>
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs text-white ${wizardStep >= 2 ? 'bg-ghl-blue' : 'bg-gray-200 text-gray-500'}`}>2</div>
                        <span>Step 2</span>
                    </div>
                    <div className={`flex flex-col items-center gap-2 ${wizardStep >= 3 ? 'text-ghl-blue' : 'text-gray-400'}`}>
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs text-white ${wizardStep >= 3 ? 'bg-ghl-blue' : 'bg-gray-200 text-gray-500'}`}>3</div>
                        <span>Step 3</span>
                    </div>
                    <div className={`flex flex-col items-center gap-2 ${wizardStep >= 4 ? 'text-ghl-blue' : 'text-gray-400'}`}>
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs text-white ${wizardStep >= 4 ? 'bg-ghl-blue' : 'bg-gray-200 text-gray-500'}`}>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                        </div>
                        <span>Finish</span>
                    </div>
                </div>

                <div className="space-y-6">
                    {wizardStep === 1 && (
                        <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Connect to Facebook</h3>
                            <p className="text-gray-500 text-sm mb-6">Log in using the Facebook account associated with your business to continue.</p>
                            <button onClick={handleNextStep} className="w-full py-3 bg-[#1877f2] text-white rounded-lg font-medium hover:bg-[#166fe5] transition-colors flex justify-center items-center gap-2">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                                Continue with Facebook
                            </button>
                        </div>
                    )}
                    {wizardStep === 2 && (
                        <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Enter Business Details</h3>
                            <p className="text-gray-500 text-sm mb-4">Fill in all required business information to create or select your WhatsApp Business Account.</p>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp Business Account Name</label>
                                    <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-ghl-blue focus:ring-1 focus:ring-ghl-blue transition-colors" placeholder="My Business" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                    <input type="text" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-ghl-blue focus:ring-1 focus:ring-ghl-blue transition-colors" placeholder="+1 (555) 000-0000" />
                                </div>
                            </div>
                            <div className="mt-8 flex justify-end gap-3">
                                <button onClick={handleNextStep} className="px-6 py-2 bg-ghl-blue text-white rounded-md font-medium hover:bg-blue-700 transition-colors">Next</button>
                            </div>
                        </div>
                    )}
                    {wizardStep === 3 && (
                        <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Verify Phone Number</h3>
                            <p className="text-gray-500 text-sm mb-4">Enter the 6-digit verification code sent to <span className="font-semibold text-gray-700">{formData.phone || "your number"}</span>.</p>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Verification Code</label>
                                <input type="text" value={formData.otp} onChange={(e) => setFormData({...formData, otp: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-ghl-blue focus:ring-1 focus:ring-ghl-blue transition-colors text-center text-2xl tracking-[0.5em] font-mono" maxLength={6} placeholder="------" />
                            </div>
                            <div className="mt-8 flex justify-end gap-3">
                                <button onClick={handleNextStep} className="px-6 py-2 bg-ghl-blue text-white rounded-md font-medium hover:bg-blue-700 transition-colors">Verify</button>
                            </div>
                        </div>
                    )}
                    {wizardStep === 4 && (
                        <div className="text-center py-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">Integration Complete</h3>
                            <p className="text-gray-500 text-sm mb-8 max-w-sm mx-auto">Your WhatsApp Business Account is now successfully integrated and ready to use.</p>
                            <button onClick={handleFinish} className="px-10 py-3 bg-ghl-blue text-white rounded-lg font-medium hover:bg-blue-700 transition-colors w-full sm:w-auto">Return to Settings</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

    const renderConnected = () => (
        <div className="p-8 max-w-4xl mx-auto">
             <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                    <div className="flex items-center gap-5">
                        <div className="w-16 h-16 bg-[#25d366] text-white rounded-2xl flex items-center justify-center shadow-sm shrink-0">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                        </div>
                        <div>
                            <div className="flex items-center gap-3 mb-1">
                                <h3 className="text-xl font-bold text-gray-900">WhatsApp Business Connected</h3>
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5"></span>
                                    Active
                                </span>
                            </div>
                            <p className="text-gray-500 font-medium">{formData.phone || "+1 (555) 123-4567"}</p>
                        </div>
                    </div>
                </div>
                
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-gray-100 pt-8">
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                        <p className="text-sm text-gray-500 mb-1">WABA ID</p>
                        <p className="font-mono text-sm text-gray-900 font-medium">1029384756</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                        <p className="text-sm text-gray-500 mb-1">Quality Rating</p>
                        <p className="text-sm text-green-600 font-medium">High</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                        <p className="text-sm text-gray-500 mb-1">Messaging Limit</p>
                        <p className="text-sm text-gray-900 font-medium">1,000 / day</p>
                    </div>
                </div>

                <div className="mt-8 flex gap-4">
                    <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-50 transition-colors shadow-sm">Manage Account</button>
                    <button onClick={() => setConnectionState('not_connected')} className="px-4 py-2 bg-white border border-red-200 text-red-600 rounded-md font-medium hover:bg-red-50 transition-colors shadow-sm">Disconnect</button>
                </div>
             </div>
        </div>
    );

    return (
        <SettingsSectionLayout
            title="WhatsApp"
            description="Manage your WhatsApp Business integration"
            tabs={connectionState === 'connected' ? [
                { id: 'account', label: 'Account' },
                { id: 'conversations', label: 'Conversations' },
                { id: 'templates', label: 'Templates' },
            ] : undefined}
            activeTab={activeTab}
            onTabChange={setActiveTab}
        >
            {connectionState === 'not_connected' && renderNotConnected()}
            {connectionState === 'connecting' && renderConnecting()}
            {connectionState === 'connected' && activeTab === 'account' && renderConnected()}
            {connectionState === 'connected' && activeTab !== 'account' && (
                <div className="px-6 py-12 text-center bg-white m-8 border border-gray-200 rounded-xl">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-100">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="9" y1="3" x2="9" y2="21"/></svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-1">No {activeTab} data found</h3>
                    <p className="text-gray-500 text-sm">Your {activeTab} will appear here once they are synced.</p>
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
