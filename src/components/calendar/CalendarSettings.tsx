import { useState } from 'react';
import { Settings, ChevronLeft, Calendar as CalendarIcon, Users, Video, Info, Plus, ChevronRight, Clock, Check } from 'lucide-react';
import { useCalendars } from '../../context/CalendarContext';

const CalendarSettings = ({ onBack }: { onBack: () => void }) => {
    const {
        serviceMenuEnabled,
        setServiceMenuEnabled,
        calendars,
        groups,
        addCalendar,
        updateCalendar,
        deleteCalendar,
        addGroup,
        updateGroup,
        deleteGroup
    } = useCalendars();

    const [activeTab, setActiveTab] = useState('Preferences');
    const [subTab, setSubTab] = useState('Account Preference');
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    // Form state for creation
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        slug: '',
        duration: 60,
        groupId: '',
        color: '#3b82f6'
    });
    const [creationStep, setCreationStep] = useState(0);

    const tabs = ['Calendars', 'Preferences', 'Availability', 'Connections'];

    const renderCalendarsTab = () => (
        <div className="p-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Calendars</h2>
                <button
                    onClick={() => {
                        setFormData({ name: '', description: '', slug: '', duration: 60, groupId: '', color: '#3b82f6' });
                        setEditingId(null);
                        setIsCreateModalOpen(true);
                    }}
                    className="bg-ghl-blue text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                    Create Calendar
                </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {calendars.length === 0 ? (
                    <div className="bg-white border border-gray-200 rounded-lg p-12 text-center text-gray-500">
                        No calendars found. Create one to get started.
                    </div>
                ) : (
                    calendars.map(calendar => (
                        <div key={calendar.id} className="bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-between shadow-sm">
                            <div className="flex items-center gap-4">
                                <div className="p-2 rounded-md bg-ghl-bg text-ghl-blue">
                                    <CalendarIcon size={20} />
                                </div>
                                <div>
                                    <div className="font-semibold text-gray-900">{calendar.name}</div>
                                    <div className="text-xs text-gray-500">{calendar.type === 'service' ? 'Service Calendar' : calendar.type} • {calendar.duration} mins</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => {
                                        setFormData({
                                            name: calendar.name,
                                            description: calendar.description || '',
                                            slug: calendar.locationValue || '',
                                            duration: calendar.duration,
                                            groupId: calendar.groupId || '',
                                            color: calendar.color || '#3b82f6'
                                        });
                                        setEditingId(calendar.id);
                                        setCreationStep(1); // Jump straight to essentials
                                        setIsCreateModalOpen(true);
                                    }}
                                    className="text-xs font-semibold text-ghl-blue hover:underline"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => {
                                        if (confirm('Are you sure you want to delete this calendar?')) {
                                            deleteCalendar(calendar.id);
                                        }
                                    }}
                                    className="text-xs font-semibold text-red-500 hover:underline"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Create Calendar Modal */}
            {isCreateModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                            <h3 className="text-lg font-semibold">{editingId ? 'Edit Calendar' : 'Select Calendar Type'}</h3>
                            <button onClick={() => { setIsCreateModalOpen(false); setEditingId(null); setCreationStep(0); }} className="text-gray-400 hover:text-gray-600">
                                <span className="text-2xl">&times;</span>
                            </button>
                        </div>
                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* ... existing tiles ... */}
                            <div className="border border-gray-200 rounded-lg p-4 hover:border-ghl-blue hover:bg-blue-50 cursor-pointer transition-all">
                                <div className="bg-blue-100 w-10 h-10 rounded-full flex items-center justify-center text-ghl-blue mb-3">
                                    <CalendarIcon size={20} />
                                </div>
                                <h4 className="font-semibold text-gray-900 mb-1">Simple Calendar</h4>
                                <p className="text-sm text-gray-500">Basic physical calendar for straight-forward scheduling.</p>
                            </div>
                            <div className="border border-gray-200 rounded-lg p-4 hover:border-ghl-blue hover:bg-blue-50 cursor-pointer transition-all">
                                <div className="bg-green-100 w-10 h-10 rounded-full flex items-center justify-center text-green-600 mb-3">
                                    <Users size={20} />
                                </div>
                                <h4 className="font-semibold text-gray-900 mb-1">Round Robin</h4>
                                <p className="text-sm text-gray-500">Distribute appointments among team members.</p>
                            </div>
                            <div className="border border-gray-200 rounded-lg p-4 hover:border-ghl-blue hover:bg-blue-50 cursor-pointer transition-all">
                                <div className="bg-purple-100 w-10 h-10 rounded-full flex items-center justify-center text-purple-600 mb-3">
                                    <Video size={20} />
                                </div>
                                <h4 className="font-semibold text-gray-900 mb-1">Class Booking</h4>
                                <p className="text-sm text-gray-500">Events with multiple attendees like webinars or classes.</p>
                            </div>

                            {/* Service Calendar */}
                            {serviceMenuEnabled && (
                                <div
                                    onClick={() => setCreationStep(1)}
                                    className="border border-gray-200 rounded-lg p-4 hover:border-ghl-blue hover:bg-blue-50 cursor-pointer transition-all relative"
                                >
                                    <div className="bg-orange-100 w-10 h-10 rounded-full flex items-center justify-center text-orange-600 mb-3">
                                        <Settings size={20} />
                                    </div>
                                    <h4 className="font-semibold text-gray-900 mb-1">Service Calendar</h4>
                                    <p className="text-sm text-gray-500">Select services from a menu. Ideal for salons and service businesses.</p>
                                </div>
                            )}
                        </div>

                        {/* Creation Flow Overlay */}
                        {creationStep > 0 && (
                            <div className="absolute inset-0 bg-white z-10 flex flex-col">
                                <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <button onClick={() => setCreationStep(0)} className="text-gray-400 hover:text-gray-600">
                                            <ChevronLeft size={20} />
                                        </button>
                                        <div>
                                            <h3 className="text-lg font-semibold">Create Service Calendar</h3>
                                            <div className="flex items-center gap-1 text-[11px] text-gray-400">
                                                <span className={creationStep >= 1 ? 'text-ghl-blue font-bold' : ''}>Essentials</span>
                                                <ChevronRight size={10} />
                                                <span className={creationStep >= 2 ? 'text-ghl-blue font-bold' : ''}>Details</span>
                                                <ChevronRight size={10} />
                                                <span className={creationStep >= 3 ? 'text-ghl-blue font-bold' : ''}>Availability</span>
                                                <ChevronRight size={10} />
                                                <span className={creationStep >= 4 ? 'text-ghl-blue font-bold' : ''}>Forms</span>
                                            </div>
                                        </div>
                                    </div>
                                    <button onClick={() => { setIsCreateModalOpen(false); setEditingId(null); setCreationStep(0); }} className="text-gray-400 hover:text-gray-600">
                                        <span className="text-2xl">&times;</span>
                                    </button>
                                </div>

                                <div className="flex-1 overflow-y-auto p-8">
                                    <div className="max-w-xl mx-auto">
                                        {creationStep === 1 && (
                                            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                                                <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex gap-3 text-sm text-blue-700">
                                                    <Info size={20} className="shrink-0" />
                                                    <p>Service calendars simplify scheduling for service-based businesses by grouping services into a menu.</p>
                                                </div>

                                                <div className="space-y-4">
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">Service Name *</label>
                                                        <input
                                                            value={formData.name}
                                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                            placeholder="e.g. Hair Cut & Style"
                                                            className="w-full border-gray-300 rounded-md focus:ring-ghl-blue focus:border-ghl-blue shadow-sm"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                                        <textarea
                                                            value={formData.description}
                                                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                                            rows={3}
                                                            placeholder="Describe the service..."
                                                            className="w-full border-gray-300 rounded-md focus:ring-ghl-blue focus:border-ghl-blue shadow-sm"
                                                        />
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-1">URL / Slug *</label>
                                                            <div className="flex border border-gray-300 rounded-md shadow-sm">
                                                                <span className="bg-gray-50 px-3 py-2 text-gray-400 text-sm border-r border-gray-300 rounded-l-md">/</span>
                                                                <input
                                                                    value={formData.slug}
                                                                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                                                    className="flex-1 border-none bg-transparent focus:ring-0 p-2 text-sm"
                                                                    placeholder="hair-cut"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-1">Duration *</label>
                                                            <div className="flex border border-gray-300 rounded-md shadow-sm">
                                                                <input
                                                                    type="number"
                                                                    value={formData.duration}
                                                                    onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) || 60 })}
                                                                    className="flex-1 border-none bg-transparent focus:ring-0 p-2 text-sm"
                                                                />
                                                                <span className="bg-gray-50 px-3 py-2 text-gray-400 text-sm border-l border-gray-300 rounded-r-md">min</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {creationStep === 2 && (
                                            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                                                <div className="space-y-4">
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">Service Group (Category)</label>
                                                        <select
                                                            value={formData.groupId}
                                                            onChange={(e) => setFormData({ ...formData, groupId: e.target.value })}
                                                            className="w-full border-gray-300 rounded-md focus:ring-ghl-blue focus:border-ghl-blue shadow-sm"
                                                        >
                                                            <option value="">No Group</option>
                                                            {groups.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
                                                        </select>
                                                        <p className="mt-1 text-xs text-gray-400">Grouping similar services together (e.g., "HAIR") displays them together in the menu.</p>
                                                    </div>

                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">Event Color</label>
                                                        <div className="flex gap-2">
                                                            {['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'].map(color => (
                                                                <button
                                                                    key={color}
                                                                    onClick={() => setFormData({ ...formData, color })}
                                                                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${formData.color === color ? 'border-gray-900 scale-110' : 'border-transparent hover:scale-105'}`}
                                                                    style={{ backgroundColor: color }}
                                                                >
                                                                    {formData.color === color && <Check size={14} className="text-white" />}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        {/* ... Availability & Forms steps ... */}
                                        {creationStep === 3 && (
                                            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                                                <div className="space-y-6">
                                                    <div>
                                                        <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                                            <Clock size={16} className="text-ghl-blue" />
                                                            Weekly Working Hours
                                                        </h4>
                                                        <div className="space-y-2">
                                                            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map(day => (
                                                                <div key={day} className="flex items-center gap-4 text-sm">
                                                                    <div className="w-12 font-medium text-gray-700">{day}</div>
                                                                    <div className="flex-1 flex items-center gap-2">
                                                                        <input type="time" defaultValue="09:00" className="border-gray-300 rounded text-xs p-1" />
                                                                        <span>to</span>
                                                                        <input type="time" defaultValue="17:00" className="border-gray-300 rounded text-xs p-1" />
                                                                    </div>
                                                                    <button className="text-gray-300 hover:text-red-500">&times;</button>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    <div className="grid grid-cols-2 gap-6 pt-4 border-t border-gray-100">
                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-1">Service Interval</label>
                                                            <select className="w-full border-gray-300 rounded-md text-sm">
                                                                <option>15 mins (Default)</option>
                                                                <option>30 mins</option>
                                                            </select>
                                                        </div>
                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-1">Min Scheduling Notice</label>
                                                            <div className="flex border border-gray-300 rounded-md shadow-sm">
                                                                <input type="number" defaultValue={2} className="flex-1 border-none bg-transparent focus:ring-0 p-2 text-sm" />
                                                                <span className="bg-gray-50 px-3 py-2 text-gray-400 text-sm border-l border-gray-300 rounded-r-md">hours</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {creationStep === 4 && (
                                            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                                                <div className="space-y-4">
                                                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                                                        <div className="flex items-center justify-between mb-4">
                                                            <div className="text-sm font-medium text-gray-900">Default Form</div>
                                                            <span className="text-[10px] bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full font-bold">ACTIVE</span>
                                                        </div>
                                                        <p className="text-xs text-gray-500 mb-2">Collects: Name, Email, Phone Number.</p>
                                                    </div>

                                                    <div className="pt-4 border-t border-gray-100">
                                                        <label className="block text-sm font-medium text-gray-900 mb-3">Confirmation Page</label>
                                                        <div className="space-y-2">
                                                            <label className="flex items-center gap-3 p-3 rounded-md border border-gray-200 hover:bg-gray-50 cursor-pointer">
                                                                <input type="radio" name="confirm" defaultChecked className="text-ghl-blue" />
                                                                <span className="text-sm text-gray-700">Display "Thank You" message</span>
                                                            </label>
                                                            <label className="flex items-center gap-3 p-3 rounded-md border border-gray-200 hover:bg-gray-50 cursor-pointer">
                                                                <input type="radio" name="confirm" className="text-ghl-blue" />
                                                                <span className="text-sm text-gray-700">Redirect to URL</span>
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="px-6 py-4 border-t border-gray-200 flex justify-between bg-gray-50">
                                    <button
                                        onClick={() => setCreationStep(creationStep - 1)}
                                        className={`px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors ${creationStep === 1 ? 'invisible' : ''}`}
                                    >
                                        Back
                                    </button>
                                    <button
                                        onClick={() => {
                                            if (creationStep < 4) setCreationStep(creationStep + 1);
                                            else {
                                                // Save Logic
                                                const calendarData = {
                                                    name: formData.name || 'Untitled Service',
                                                    description: formData.description,
                                                    type: 'service' as const,
                                                    staffIds: [],
                                                    duration: formData.duration,
                                                    color: formData.color,
                                                    groupId: formData.groupId || undefined,
                                                    locationValue: formData.slug
                                                };

                                                if (editingId) {
                                                    updateCalendar(editingId, calendarData);
                                                } else {
                                                    addCalendar(calendarData);
                                                }
                                                setIsCreateModalOpen(false);
                                                setEditingId(null);
                                                setCreationStep(0);
                                            }
                                        }}
                                        className="px-6 py-2 text-sm font-medium text-white bg-ghl-blue rounded-md hover:bg-blue-700 transition-colors shadow-sm"
                                    >
                                        {creationStep === 4 ? (editingId ? 'Save Changes' : 'Save & Finish') : 'Next'}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );

    const renderPreferencesTab = () => (
        <div className="flex h-full">
            {/* Sidebar */}
            <div className="w-64 border-r border-gray-200 bg-gray-50 pt-6">
                <button
                    className={`w-full text-left px-6 py-2 text-sm font-medium ${subTab === 'My Preference' ? 'text-ghl-blue bg-blue-50 border-r-2 border-ghl-blue' : 'text-gray-600 hover:text-gray-900'}`}
                    onClick={() => setSubTab('My Preference')}
                >
                    My Preference
                </button>
                <button
                    className={`w-full text-left px-6 py-2 text-sm font-medium ${subTab === 'Account Preference' ? 'text-ghl-blue bg-blue-50 border-r-2 border-ghl-blue' : 'text-gray-600 hover:text-gray-900'}`}
                    onClick={() => setSubTab('Account Preference')}
                >
                    Account Preference
                </button>
            </div>

            {/* Content */}
            <div className="flex-1 p-8 overflow-y-auto">
                {subTab === 'Account Preference' && (
                    <div className="max-w-3xl">
                        <h3 className="text-lg font-semibold text-gray-900 mb-6">In App preferences</h3>

                        <div className="space-y-8">
                            {/* View Options */}
                            <div className="border-b border-gray-200 pb-6">
                                <h4 className="text-sm font-medium text-gray-900 mb-4">View Options</h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm text-gray-700 mb-1">Week Starts On</label>
                                        <select className="w-full border-gray-300 rounded-md text-sm focus:ring-ghl-blue focus:border-ghl-blue">
                                            <option>Sunday</option>
                                            <option>Monday</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Services */}
                            <div className="border-b border-gray-200 pb-6">
                                <h4 className="text-sm font-medium text-gray-900 mb-4">Services</h4>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="text-sm font-medium text-gray-900">Service Menu</div>
                                            <div className="text-sm text-gray-500">Enable service menu for calendars</div>
                                        </div>
                                        <button
                                            onClick={() => setServiceMenuEnabled(!serviceMenuEnabled)}
                                            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-ghl-blue focus:ring-offset-2 ${serviceMenuEnabled ? 'bg-ghl-blue' : 'bg-gray-200'}`}
                                        >
                                            <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${serviceMenuEnabled ? 'translate-x-5' : 'translate-x-0'}`} />
                                        </button>
                                    </div>

                                    {serviceMenuEnabled && (
                                        <div className="mt-6 pt-6 border-t border-gray-100">
                                            <div className="flex items-center justify-between mb-4">
                                                <h5 className="text-sm font-semibold text-gray-900">Service Groups (Categories)</h5>
                                                <button
                                                    onClick={() => addGroup({ name: 'New Category' })}
                                                    className="text-ghl-blue text-xs font-semibold flex items-center gap-1 hover:underline"
                                                >
                                                    <Plus size={14} /> Add Category
                                                </button>
                                            </div>

                                            <div className="space-y-3">
                                                {groups.length === 0 ? (
                                                    <div className="text-xs text-gray-400 italic bg-gray-50 p-3 rounded border border-dashed border-gray-200">
                                                        No categories created yet. Example: "HAIR", "BEAUTY".
                                                    </div>
                                                ) : (
                                                    groups.map(group => (
                                                        <div key={group.id} className="flex items-center gap-3 bg-white p-3 rounded-lg border border-gray-200 shadow-sm group">
                                                            <div className="flex-1">
                                                                <input
                                                                    className="w-full text-sm font-medium text-gray-900 border-none focus:ring-0 p-0"
                                                                    value={group.name}
                                                                    autoFocus={group.name === 'New Category'}
                                                                    onChange={(e) => updateGroup(group.id, { name: e.target.value })}
                                                                />
                                                                <div className="text-[10px] text-gray-400">
                                                                    {calendars.filter(c => c.groupId === group.id).length} services assigned
                                                                </div>
                                                            </div>
                                                            <button
                                                                onClick={() => deleteGroup(group.id)}
                                                                className="text-gray-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                                                            >
                                                                <span className="text-lg">&times;</span>
                                                            </button>
                                                        </div>
                                                    ))
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex items-center justify-between opacity-50 pointer-events-none">
                                        <div>
                                            <div className="text-sm font-medium text-gray-900">Rooms</div>
                                            <div className="text-sm text-gray-500">Manage rooms for appointments</div>
                                        </div>
                                        <button className="bg-gray-200 relative inline-flex h-6 w-11 flex-shrink-0 rounded-full border-2 border-transparent">
                                            <span className="translate-x-0 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Widget Preferences placeholder */}
                            <div>
                                <h4 className="text-sm font-medium text-gray-900 mb-4">Widget preferences</h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm text-gray-700 mb-1">Language</label>
                                        <select className="w-full border-gray-300 rounded-md text-sm focus:ring-ghl-blue focus:border-ghl-blue">
                                            <option>English</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-700 mb-1">Time Format</label>
                                        <select className="w-full border-gray-300 rounded-md text-sm focus:ring-ghl-blue focus:border-ghl-blue">
                                            <option>12h (am/pm)</option>
                                            <option>24h</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {subTab === 'My Preference' && (
                    <div className="text-gray-500 italic">User preferences coming soon...</div>
                )}
            </div>
        </div>
    );

    const renderAvailabilityTab = () => (
        <div className="p-8 max-w-4xl">
            <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Standard Availability</h2>
                <p className="text-sm text-gray-500">Define your default weekly working hours. These hours will be applied to all your calendars unless overridden.</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                <div className="p-6">
                    <div className="space-y-6">
                        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day) => (
                            <div key={day} className="flex items-center gap-6">
                                <label className="flex items-center gap-3 w-32 cursor-pointer">
                                    <input type="checkbox" defaultChecked className="w-4 h-4 text-ghl-blue rounded border-gray-300 focus:ring-ghl-blue" />
                                    <span className="text-sm font-medium text-gray-900">{day}</span>
                                </label>
                                
                                <div className="flex-1 flex items-center gap-4">
                                    <div className="flex items-center border border-gray-300 rounded-md shadow-sm bg-white overflow-hidden">
                                        <input type="time" defaultValue="09:00" className="border-none focus:ring-0 text-sm py-2 px-3 w-32" />
                                    </div>
                                    <span className="text-gray-400 text-sm">to</span>
                                    <div className="flex items-center border border-gray-300 rounded-md shadow-sm bg-white overflow-hidden">
                                        <input type="time" defaultValue="17:00" className="border-none focus:ring-0 text-sm py-2 px-3 w-32" />
                                    </div>
                                    <button className="text-gray-400 hover:text-gray-600 p-2">
                                        <Plus size={16} />
                                    </button>
                                </div>
                            </div>
                        ))}
                        {['Saturday', 'Sunday'].map((day) => (
                            <div key={day} className="flex items-center gap-6 opacity-60">
                                <label className="flex items-center gap-3 w-32 cursor-pointer">
                                    <input type="checkbox" className="w-4 h-4 text-ghl-blue rounded border-gray-300 focus:ring-ghl-blue" />
                                    <span className="text-sm font-medium text-gray-900">{day}</span>
                                </label>
                                <div className="flex-1 text-sm text-gray-500 italic">Unavailable</div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end">
                    <button className="bg-ghl-blue text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm">
                        Save Availability
                    </button>
                </div>
            </div>

            <div className="mt-12 mb-8">
                <div className="flex items-center justify-between mb-2">
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900">Date Overrides</h2>
                        <p className="text-sm text-gray-500">Add specific dates when you are unavailable or have different hours (e.g., Holidays).</p>
                    </div>
                    <button className="flex items-center gap-2 border border-gray-300 bg-white text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm">
                        <Plus size={16} /> Add Override
                    </button>
                </div>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-xl p-8 text-center text-gray-500 shadow-sm flex flex-col items-center">
                <CalendarIcon size={32} className="text-gray-300 mb-3" />
                <p>No date overrides added yet.</p>
            </div>
        </div>
    );

    const renderConnectionsTab = () => (
        <div className="p-8 max-w-5xl">
            <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Calendar Connections</h2>
                <p className="text-sm text-gray-500">Connect your external calendars to automatically block busy times and sync new appointments.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Google Calendar */}
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex flex-col">
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white border border-gray-100 rounded-full flex items-center justify-center shadow-sm">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">Google Calendar</h3>
                                <p className="text-sm text-gray-500">Connect to your Google account</p>
                            </div>
                        </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-6 flex-1">Two-way sync with Google Calendar. Appointments booked here will appear on your Google Calendar, and Google events will block your availability.</p>
                    <button className="w-full bg-white border border-gray-300 text-gray-700 py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors shadow-sm flex items-center justify-center gap-2">
                        Connect Google Account
                    </button>
                </div>

                {/* Outlook Calendar */}
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex flex-col">
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white border border-gray-100 rounded-full flex items-center justify-center shadow-sm">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.5 4L21 6V18L10.5 20V4Z" fill="#0078D4"/>
                                    <path d="M10.5 4L3 6V18L10.5 20V4Z" fill="#50E6FF"/>
                                    <path d="M8.5 12.5V11H6V9.5H8.5V8L11 8.5V15.5L8.5 16V12.5Z" fill="white"/>
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">Outlook Calendar</h3>
                                <p className="text-sm text-gray-500">Connect Office 365 or Outlook.com</p>
                            </div>
                        </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-6 flex-1">Seamlessly integrate with Microsoft Outlook. Synchronize your schedule across both platforms instantly.</p>
                    <button className="w-full bg-white border border-gray-300 text-gray-700 py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors shadow-sm flex items-center justify-center gap-2">
                        Connect Outlook Account
                    </button>
                </div>
                
                {/* iCloud Calendar */}
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex flex-col">
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white border border-gray-100 rounded-full flex items-center justify-center shadow-sm">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13.2 4.2C13.2 2.43 14.63 1 16.4 1C18.17 1 19.6 2.43 19.6 4.2C19.6 5.97 18.17 7.4 16.4 7.4C14.63 7.4 13.2 5.97 13.2 4.2Z" fill="#000000"/>
                                    <path d="M22 15C22 11.69 19.31 9 16 9C15.51 9 15.03 9.06 14.58 9.17C13.88 7.32 12.06 6 10 6C6.69 6 4 8.69 4 12C4 12.17 4.01 12.33 4.03 12.5C2.33 13.06 1 14.66 1 16.5C1 18.99 3.01 21 5.5 21H17.5C19.99 21 22 18.99 22 16.5C22 15.96 21.9 15.46 21.73 15C21.82 15 21.91 15 22 15Z" fill="#333333"/>
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">Apple iCloud</h3>
                                <p className="text-sm text-gray-500">Connect your Apple ID</p>
                            </div>
                        </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-6 flex-1">Sync your appointments with Apple Calendar across your iPhone, iPad, and Mac devices using an App-Specific Password.</p>
                    <button className="w-full bg-white border border-gray-300 text-gray-700 py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors shadow-sm flex items-center justify-center gap-2">
                        Connect iCloud Account
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <div className="flex flex-col h-full bg-white">
            {/* Settings Header */}
            <div className="px-8 py-4 border-b border-gray-200 flex items-center gap-4">
                <button onClick={onBack} className="text-gray-500 hover:text-gray-700">
                    <ChevronLeft size={20} />
                </button>
                <h1 className="text-xl font-semibold text-gray-900">Calendar Settings</h1>
            </div>

            {/* Tabs */}
            <div className="px-8 border-b border-gray-200 flex gap-6">
                {tabs.map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`py-4 text-sm font-medium border-b-2 transition-colors ${activeTab === tab ? 'border-ghl-blue text-ghl-blue' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto bg-gray-50 custom-scrollbar">
                {activeTab === 'Calendars' && renderCalendarsTab()}
                {activeTab === 'Preferences' && renderPreferencesTab()}
                {activeTab === 'Availability' && renderAvailabilityTab()}
                {activeTab === 'Connections' && renderConnectionsTab()}
            </div>
        </div>
    );
};

export default CalendarSettings;

