import { Link, Copy, Plus, Trash2, Edit2 } from 'lucide-react';
import { useState } from 'react';

const TriggerLinksTab = () => {
    const [links] = useState([
        { id: 1, name: 'Summer Promo', url: 'https://mysite.com/promo/summer', clicks: 145, lastClicked: '2 mins ago' },
        { id: 2, name: 'Webinar Registration', url: 'https://mysite.com/webinar/register', clicks: 89, lastClicked: '1 hour ago' },
        { id: 3, name: 'eBook Download', url: 'https://mysite.com/resources/ebook', clicks: 1205, lastClicked: 'Yesterday' },
    ]);

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        // Toast logic would go here
    };

    return (
        <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-semibold text-gray-900">Trigger Links</h2>
                    <p className="text-sm text-gray-500">Track clicks and fire automations when these links are clicked.</p>
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center gap-2 shadow-sm shadow-blue-200">
                    <Plus size={16} />
                    Add Link
                </button>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4 font-semibold text-gray-700">Link Name</th>
                            <th className="px-6 py-4 font-semibold text-gray-700">URL</th>
                            <th className="px-6 py-4 font-semibold text-gray-700">Total Clicks</th>
                            <th className="px-6 py-4 font-semibold text-gray-700">Last Clicked</th>
                            <th className="px-6 py-4 font-semibold text-gray-700 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {links.map((link) => (
                            <tr key={link.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 font-medium text-gray-900 flex items-center gap-2">
                                    <div className="p-1.5 bg-blue-50 text-blue-600 rounded">
                                        <Link size={14} />
                                    </div>
                                    {link.name}
                                </td>
                                <td className="px-6 py-4 font-mono text-xs text-gray-500 max-w-xs truncate">{link.url}</td>
                                <td className="px-6 py-4 text-gray-900 font-semibold">{link.clicks}</td>
                                <td className="px-6 py-4 text-gray-500 text-xs">{link.lastClicked}</td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <button onClick={() => copyToClipboard(link.url)} className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors" title="Copy URL">
                                            <Copy size={16} />
                                        </button>
                                        <button className="p-1.5 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors" title="Edit">
                                            <Edit2 size={16} />
                                        </button>
                                        <button className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors" title="Delete">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {links.length === 0 && (
                    <div className="p-12 text-center text-gray-500">
                        No links yet.
                    </div>
                )}
            </div>
        </div>
    );
};

export default TriggerLinksTab;
