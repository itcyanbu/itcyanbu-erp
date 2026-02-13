import React from 'react';
import { History, Search, Download } from 'lucide-react';

const AuditLogsSettings = () => {
    return (
        <div className="max-w-6xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-semibold text-gray-900">Audit Logs</h2>
                    <p className="text-sm text-gray-500">Track activity and changes within your account</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors font-medium text-sm">
                    <Download size={18} />
                    Export CSV
                </button>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-4 border-b border-gray-200">
                    <div className="relative max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search logs..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-ghl-blue outline-none"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-gray-50 text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                    <div className="col-span-3">User</div>
                    <div className="col-span-3">Action</div>
                    <div className="col-span-3">Module</div>
                    <div className="col-span-3 text-right">Date</div>
                </div>

                <div className="divide-y divide-gray-200">
                    {[
                        { user: 'Abdullah (You)', action: 'Updated Settings', module: 'Business Profile', date: 'Just now' },
                        { user: 'Abdullah (You)', action: 'Created Contact', module: 'Contacts', date: '2 hours ago' },
                        { user: 'System', action: 'Workflow Triggered', module: 'Automation', date: '5 hours ago' },
                    ].map((log, i) => (
                        <div key={i} className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-gray-50">
                            <div className="col-span-3 font-medium text-gray-900">{log.user}</div>
                            <div className="col-span-3 text-gray-700">{log.action}</div>
                            <div className="col-span-3">
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                                    {log.module}
                                </span>
                            </div>
                            <div className="col-span-3 text-right text-gray-500 text-sm">{log.date}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AuditLogsSettings;
