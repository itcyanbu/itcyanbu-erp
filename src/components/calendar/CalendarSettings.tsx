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
            <div className="flex-1 overflow-hidden bg-gray-50">
                {activeTab === 'Calendars' && renderCalendarsTab()}
                {activeTab === 'Preferences' && renderPreferencesTab()}
                {activeTab === 'Availability' && <div className="p-8 text-gray-500">Availability settings coming soon...</div>}
                {activeTab === 'Connections' && <div className="p-8 text-gray-500">Calendar connections coming soon...</div>}
            </div>
        </div>
    );
};

export default CalendarSettings;
