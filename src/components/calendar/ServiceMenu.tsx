import { useState } from 'react';
import { useCalendars } from '../../context/CalendarContext';
import { Clock, ChevronRight, Info } from 'lucide-react';

const ServiceMenu = () => {
    const { calendars, groups } = useCalendars();
    const [activeGroupId, setActiveGroupId] = useState<string | null>(() => {
        return groups.length > 0 ? groups[0].id : null;
    });

    const serviceCalendars = calendars.filter((c: any) => c.type === 'service');

    // If no groups, show all service calendars in one list
    const displayedCalendars = activeGroupId
        ? serviceCalendars.filter((c: any) => c.groupId === activeGroupId)
        : serviceCalendars;

    return (
        <div className="max-w-5xl mx-auto p-8 animate-in fade-in duration-500">
            <div className="text-center mb-12">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Our Services</h1>
                <p className="text-gray-500">Select a service to book your appointment</p>
            </div>

            {/* Category Tabs */}
            {groups.length > 0 && (
                <div className="flex justify-center gap-4 mb-12 overflow-x-auto pb-4">
                    <button
                        onClick={() => setActiveGroupId(null)}
                        className={`px-6 py-2 rounded-full text-sm font-semibold transition-all shadow-sm ${!activeGroupId ? 'bg-ghl-blue text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                    >
                        All Services
                    </button>
                    {groups.map((group: any) => (
                        <button
                            key={group.id}
                            onClick={() => setActiveGroupId(group.id)}
                            className={`px-6 py-2 rounded-full text-sm font-semibold transition-all shadow-sm ${activeGroupId === group.id ? 'bg-ghl-blue text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                        >
                            {group.name}
                        </button>
                    ))}
                </div>
            )}

            {serviceCalendars.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-16 text-center">
                    <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center text-ghl-blue mx-auto mb-4">
                        <Info size={32} />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No services available yet</h3>
                    <p className="text-gray-500">Enable "Service Menu" and create your first Service Calendar in Settings.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {displayedCalendars.map((service: any) => (
                        <div key={service.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow group flex flex-col">
                            <div className="aspect-video bg-gray-100 relative">
                                {service.color && (
                                    <div className="absolute inset-0 opacity-10" style={{ backgroundColor: service.color }} />
                                )}
                                <div className="absolute inset-0 flex items-center justify-center text-gray-300">
                                    {/* Placeholder for Service Logo/Cover */}
                                    <div className="w-12 h-12 rounded-lg border-2 border-dashed border-gray-300" />
                                </div>
                            </div>
                            <div className="p-6 flex-1 flex flex-col">
                                <h3 className="text-lg font-bold text-gray-900 mb-2">{service.name}</h3>
                                <p className="text-sm text-gray-500 line-clamp-2 mb-4 flex-1">{service.description || "Professional service tailored to your needs."}</p>

                                <div className="flex items-center justify-between mt-auto">
                                    <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
                                        <Clock size={16} className="text-gray-400" />
                                        <span>{service.duration} mins</span>
                                    </div>
                                    <button className="flex items-center gap-1 py-1.5 px-4 bg-ghl-blue text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition-colors shadow-sm">
                                        Book <ChevronRight size={14} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ServiceMenu;
