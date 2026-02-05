import { Search, Package, MoreHorizontal, Image as ImageIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const ProductsTab = () => {
    const { t } = useTranslation();

    const products = [
        { name: 'Core Consulting', price: '$150.00', type: 'Service', sales: 24, revenue: '$3,600' },
        { name: 'Basic Widget', price: '$29.99', type: 'Physical', sales: 142, revenue: '$4,258' },
        { name: 'Pro Subscription', price: '$49.00 / mo', type: 'Digital', sales: 89, revenue: '$4,361' },
        { name: 'Setup Fee', price: '$500.00', type: 'Service', sales: 5, revenue: '$2,500' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center rtl:flex-row-reverse">
                <div className="flex items-center gap-3 rtl:flex-row-reverse">
                    <h2 className="text-xl font-semibold text-gray-900">{t('payments.tabs.products')}</h2>
                </div>
                <button className="bg-ghl-blue text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors flex items-center gap-2 rtl:flex-row-reverse">
                    <Package size={16} />
                    Create Product
                </button>
            </div>

            {/* Search */}
            <div className="flex items-center gap-3 bg-white p-4 rounded-lg border border-gray-200 shadow-sm rtl:flex-row-reverse">
                <div className="relative flex-1">
                    <Search className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="w-full pl-10 pr-4 rtl:pl-4 rtl:pr-10 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-ghl-blue text-sm text-left rtl:text-right"
                    />
                </div>
            </div>

            {/* List Layout for Products */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left rtl:text-right">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="py-3 px-6 text-xs font-bold text-gray-500 uppercase">Product Name</th>
                                <th className="py-3 px-6 text-xs font-bold text-gray-500 uppercase">Type</th>
                                <th className="py-3 px-6 text-xs font-bold text-gray-500 uppercase">Price</th>
                                <th className="py-3 px-6 text-xs font-bold text-gray-500 uppercase">Sales</th>
                                <th className="py-3 px-6 text-xs font-bold text-gray-500 uppercase">Total Revenue</th>
                                <th className="py-3 px-4 w-10"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {products.map((product, i) => (
                                <tr key={i} className="hover:bg-gray-50 transition-colors group">
                                    <td className="py-4 px-6 text-sm font-medium text-gray-900">
                                        <div className="flex items-center gap-3 rtl:flex-row-reverse">
                                            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                                                <ImageIcon size={20} />
                                            </div>
                                            <span>{product.name}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 text-sm text-gray-600">
                                        <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-medium border border-blue-100">
                                            {product.type}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 text-sm font-semibold text-gray-900">{product.price}</td>
                                    <td className="py-4 px-6 text-sm text-gray-600">{product.sales}</td>
                                    <td className="py-4 px-6 text-sm font-semibold text-gray-900">{product.revenue}</td>
                                    <td className="py-4 px-4 text-center">
                                        <button className="text-gray-400 hover:text-gray-600">
                                            <MoreHorizontal size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ProductsTab;
