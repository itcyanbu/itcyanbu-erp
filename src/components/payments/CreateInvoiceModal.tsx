import { useState } from 'react';
import { X, Calendar as CalendarIcon, DollarSign, User, Check, RefreshCw } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface CreateInvoiceModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (invoice: any) => void;
    initialType?: 'one-time' | 'recurring';
}

const CreateInvoiceModal = ({ isOpen, onClose, onSave, initialType = 'one-time' }: CreateInvoiceModalProps) => {
    const { t } = useTranslation();
    const [client, setClient] = useState('');
    const [amount, setAmount] = useState('');
    const [status, setStatus] = useState('Pending');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [type, setType] = useState<'one-time' | 'recurring'>(initialType);
    const [frequency, setFrequency] = useState('Monthly');

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newInvoice = {
            id: `INV-${Math.floor(Math.random() * 10000)}`,
            client,
            amount: `$${amount}`,
            status,
            date,
            type
        };
        onSave(newInvoice);
        // Reset and close
        setClient('');
        setAmount('');
        setStatus('Pending');
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-gray-50/50">
                    <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                        {type === 'recurring' ? <RefreshCw size={20} className="text-blue-600" /> : <DollarSign size={20} className="text-green-600" />}
                        {type === 'recurring' ? t('payments.new_recurring_invoice') : t('payments.new_invoice')}
                    </h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-1.5 rounded-lg transition-colors">
                        <X size={20} />
                    </button>
                </div>

                {/* Body */}
                <form onSubmit={handleSubmit} className="p-6 space-y-5">

                    {/* Invoice Type Toggle */}
                    <div className="flex bg-gray-100 p-1 rounded-lg">
                        <button
                            type="button"
                            onClick={() => setType('one-time')}
                            className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-all ${type === 'one-time' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            One-time
                        </button>
                        <button
                            type="button"
                            onClick={() => setType('recurring')}
                            className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-all ${type === 'recurring' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            Recurring
                        </button>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-gray-500 uppercase flex items-center gap-1.5">
                            <User size={14} />
                            {t('payments.client')}
                        </label>
                        <input
                            type="text"
                            required
                            value={client}
                            onChange={(e) => setClient(e.target.value)}
                            placeholder="e.g. Acme Corp"
                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all text-sm"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-gray-500 uppercase flex items-center gap-1.5">
                                <DollarSign size={14} />
                                {t('payments.amount')}
                            </label>
                            <input
                                type="number"
                                required
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="0.00"
                                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all text-sm"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-gray-500 uppercase flex items-center gap-1.5">
                                <CalendarIcon size={14} />
                                {t('payments.date')}
                            </label>
                            <input
                                type="date"
                                required
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all text-sm"
                            />
                        </div>
                    </div>

                    {type === 'recurring' && (
                        <div className="space-y-1.5 animate-in fade-in slide-in-from-top-2">
                            <label className="text-xs font-semibold text-gray-500 uppercase">
                                Frequency
                            </label>
                            <select
                                value={frequency}
                                onChange={(e) => setFrequency(e.target.value)}
                                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all text-sm"
                            >
                                <option>Weekly</option>
                                <option>Monthly</option>
                                <option>Quarterly</option>
                                <option>Yearly</option>
                            </select>
                        </div>
                    )}

                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-gray-500 uppercase">
                            {t('payments.status')}
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                            {['Paid', 'Pending', 'Overdue'].map((s) => (
                                <button
                                    key={s}
                                    type="button"
                                    onClick={() => setStatus(s)}
                                    className={`px-3 py-2 rounded-lg text-sm font-medium border transition-all ${status === s
                                            ? 'bg-blue-50 border-blue-200 text-blue-700 shadow-sm'
                                            : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                                        }`}
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="pt-4 flex items-center justify-end gap-3 border-t border-gray-100">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 bg-ghl-blue text-white text-sm font-bold rounded-lg shadow-lg hover:bg-blue-600 hover:shadow-blue-200/50 transition-all flex items-center gap-2"
                        >
                            <Check size={16} />
                            Create Invoice
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateInvoiceModal;
