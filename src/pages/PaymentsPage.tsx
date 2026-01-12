import { CreditCard, DollarSign, TrendingUp, Download } from 'lucide-react';

const PaymentsPage = () => {
    const recentPayments = [
        { id: 'INV-001', client: 'Acme Corp', amount: '$5,000', status: 'Paid', date: 'Jan 10, 2026' },
        { id: 'INV-002', client: 'Tech Solutions', amount: '$3,500', status: 'Pending', date: 'Jan 9, 2026' },
        { id: 'INV-003', client: 'Local Business', amount: '$1,200', status: 'Paid', date: 'Jan 8, 2026' },
    ];

    return (
        <div className="flex-1 flex flex-col h-screen overflow-hidden bg-gray-50">
            <div className="px-8 py-6 bg-white border-b border-gray-200">
                <div className="flex items-center gap-3 mb-2">
                    <CreditCard className="text-ghl-blue" size={28} />
                    <h1 className="text-2xl font-semibold text-gray-900">Payments</h1>
                </div>
                <p className="text-gray-500">Manage invoices and transactions</p>
            </div>

            <div className="flex-1 overflow-y-auto p-8">
                <div className="max-w-7xl mx-auto space-y-6">
                    {/* Payment Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-gray-500 text-sm font-medium">Total Revenue</span>
                                <DollarSign className="text-green-500" size={20} />
                            </div>
                            <p className="text-3xl font-bold text-gray-900">$45,200</p>
                            <p className="text-green-600 text-sm mt-1">+12% this month</p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-gray-500 text-sm font-medium">Pending Payments</span>
                                <TrendingUp className="text-orange-500" size={20} />
                            </div>
                            <p className="text-3xl font-bold text-gray-900">$8,500</p>
                            <p className="text-gray-500 text-sm mt-1">5 invoices</p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-gray-500 text-sm font-medium">This Month</span>
                                <CreditCard className="text-blue-500" size={20} />
                            </div>
                            <p className="text-3xl font-bold text-gray-900">$12,300</p>
                            <p className="text-green-600 text-sm mt-1">18 transactions</p>
                        </div>
                    </div>

                    {/* Recent Payments */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-semibold text-gray-900">Recent Payments</h2>
                            <button className="text-ghl-blue hover:text-blue-700 text-sm font-medium flex items-center gap-2">
                                <Download size={16} />
                                Export
                            </button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-gray-200">
                                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Invoice ID</th>
                                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Client</th>
                                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Amount</th>
                                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Status</th>
                                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentPayments.map((payment, i) => (
                                        <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                                            <td className="py-3 px-4 text-sm font-medium text-gray-900">{payment.id}</td>
                                            <td className="py-3 px-4 text-sm text-gray-900">{payment.client}</td>
                                            <td className="py-3 px-4 text-sm font-semibold text-gray-900">{payment.amount}</td>
                                            <td className="py-3 px-4">
                                                <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${payment.status === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                                                    }`}>
                                                    {payment.status}
                                                </span>
                                            </td>
                                            <td className="py-3 px-4 text-sm text-gray-600">{payment.date}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentsPage;
