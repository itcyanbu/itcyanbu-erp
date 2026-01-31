import { useState } from 'react';
import { RotateCw, Info } from 'lucide-react';

const WebinarPage = () => {
    const [isRecurring, setIsRecurring] = useState(false);
    const [frequency, setFrequency] = useState('Weekly');
    const [repeatEvery, setRepeatEvery] = useState(1);
    const [selectedDays, setSelectedDays] = useState<string[]>(['Mon']);
    const [monthlyType, setMonthlyType] = useState('date'); // 'date' or 'day'
    const [endCondition, setEndCondition] = useState('never'); // 'never', 'date', 'after'

    const weekDays = [
        { key: 'Sun', label: 'Sun' },
        { key: 'Mon', label: 'Mon' },
        { key: 'Tue', label: 'Tue' },
        { key: 'Wed', label: 'Wed' },
        { key: 'Thu', label: 'Thu' },
        { key: 'Fri', label: 'Fri' },
        { key: 'Sat', label: 'Sat' },
    ];

    const toggleDay = (day: string) => {
        if (selectedDays.includes(day)) {
            setSelectedDays(selectedDays.filter(d => d !== day));
        } else {
            setSelectedDays([...selectedDays, day]);
        }
    };

    return (
        <div className="p-8 h-full overflow-y-auto">
            <div className="max-w-4xl mx-auto">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">Webinar Settings</h1>
                    <p className="text-gray-500 mt-1">Configure your webinar schedule and recurrence.</p>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-6 border-b border-gray-100">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                                    <RotateCw size={24} />
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900">Recurring Webinar</h2>
                                    <p className="text-sm text-gray-500">Enable to schedule multiple sessions.</p>
                                </div>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="sr-only peer"
                                    checked={isRecurring}
                                    onChange={() => setIsRecurring(!isRecurring)}
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                        </div>
                    </div>

                    {isRecurring && (
                        <div className="p-6 space-y-8 animate-in fade-in slide-in-from-top-4 duration-300">

                            {/* Frequency Selector */}
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                {['Daily', 'Weekly', 'Monthly', 'No Fixed Time'].map((freq) => (
                                    <button
                                        key={freq}
                                        onClick={() => setFrequency(freq)}
                                        className={`px-4 py-3 rounded-lg border text-sm font-medium transition-all ${frequency === freq
                                            ? 'border-blue-500 bg-blue-50 text-blue-700 ring-1 ring-blue-500'
                                            : 'border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                                            }`}
                                    >
                                        {freq}
                                    </button>
                                ))}
                            </div>

                            {/* Dynamic Settings */}
                            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 space-y-6">

                                {frequency === 'Daily' && (
                                    <div className="flex items-center gap-3">
                                        <span className="text-sm font-medium text-gray-700">Repeat every</span>
                                        <input
                                            type="number"
                                            min="1"
                                            value={repeatEvery}
                                            onChange={(e) => setRepeatEvery(parseInt(e.target.value))}
                                            className="w-20 p-2 text-center border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        />
                                        <span className="text-sm font-medium text-gray-700">day(s)</span>
                                    </div>
                                )}

                                {frequency === 'Weekly' && (
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3">
                                            <span className="text-sm font-medium text-gray-700">Repeat every</span>
                                            <input
                                                type="number"
                                                min="1"
                                                value={repeatEvery}
                                                onChange={(e) => setRepeatEvery(parseInt(e.target.value))}
                                                className="w-20 p-2 text-center border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                            />
                                            <span className="text-sm font-medium text-gray-700">week(s) on:</span>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {weekDays.map(day => (
                                                <button
                                                    key={day.key}
                                                    onClick={() => toggleDay(day.key)}
                                                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${selectedDays.includes(day.key)
                                                        ? 'bg-blue-600 text-white'
                                                        : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                                                        }`}
                                                >
                                                    {day.label[0]}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {frequency === 'Monthly' && (
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3">
                                            <span className="text-sm font-medium text-gray-700">Repeat every</span>
                                            <input
                                                type="number"
                                                min="1"
                                                value={repeatEvery}
                                                onChange={(e) => setRepeatEvery(parseInt(e.target.value))}
                                                className="w-20 p-2 text-center border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                            />
                                            <span className="text-sm font-medium text-gray-700">month(s) on:</span>
                                        </div>
                                        <div className="flex flex-col gap-3">
                                            <label className="flex items-center gap-3">
                                                <input
                                                    type="radio"
                                                    name="monthlyType"
                                                    checked={monthlyType === 'date'}
                                                    onChange={() => setMonthlyType('date')}
                                                    className="text-blue-600 focus:ring-blue-500"
                                                />
                                                <span className="text-sm text-gray-700">Day <span className="font-semibold">14</span> of the month</span>
                                            </label>
                                            <label className="flex items-center gap-3">
                                                <input
                                                    type="radio"
                                                    name="monthlyType"
                                                    checked={monthlyType === 'day'}
                                                    onChange={() => setMonthlyType('day')}
                                                    className="text-blue-600 focus:ring-blue-500"
                                                />
                                                <span className="text-sm text-gray-700">The <span className="font-semibold">Second Monday</span> of the month</span>
                                            </label>
                                        </div>
                                    </div>
                                )}

                                {frequency === 'No Fixed Time' && (
                                    <div className="flex items-start gap-3 p-4 bg-blue-50 text-blue-700 rounded-md border border-blue-100">
                                        <Info className="shrink-0 mt-0.5" size={18} />
                                        <div className="text-sm">
                                            <p className="font-semibold mb-1">Evergreen / On-Demand Mode</p>
                                            <p>This webinar will be available to watch anytime. Registrants will get immediate access to the replay video.</p>
                                        </div>
                                    </div>
                                )}

                            </div>

                            {/* End Condition */}
                            {frequency !== 'No Fixed Time' && (
                                <div className="space-y-4 pt-4 border-t border-gray-100">
                                    <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Ends</h3>
                                    <div className="space-y-3">
                                        <label className="flex items-center gap-3">
                                            <input
                                                type="radio"
                                                name="endCondition"
                                                checked={endCondition === 'never'}
                                                onChange={() => setEndCondition('never')}
                                                className="text-blue-600 focus:ring-blue-500"
                                            />
                                            <span className="text-sm text-gray-700">Never</span>
                                        </label>
                                        <label className="flex items-center gap-3">
                                            <input
                                                type="radio"
                                                name="endCondition"
                                                checked={endCondition === 'date'}
                                                onChange={() => setEndCondition('date')}
                                                className="text-blue-600 focus:ring-blue-500"
                                            />
                                            <span className="text-sm text-gray-700">On</span>
                                            <input type="date" disabled={endCondition !== 'date'} className="p-1.5 border border-gray-300 rounded text-sm disabled:bg-gray-100" />
                                        </label>
                                        <label className="flex items-center gap-3">
                                            <input
                                                type="radio"
                                                name="endCondition"
                                                checked={endCondition === 'after'}
                                                onChange={() => setEndCondition('after')}
                                                className="text-blue-600 focus:ring-blue-500"
                                            />
                                            <span className="text-sm text-gray-700">After</span>
                                            <input type="number" min="1" defaultValue="10" disabled={endCondition !== 'after'} className="w-16 p-1.5 border border-gray-300 rounded text-sm disabled:bg-gray-100" />
                                            <span className="text-sm text-gray-700">occurrences</span>
                                        </label>
                                    </div>
                                </div>
                            )}

                        </div>
                    )}
                </div>

                <div className="flex justify-end gap-3 mt-6">
                    <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                        Cancel
                    </button>
                    <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WebinarPage;
