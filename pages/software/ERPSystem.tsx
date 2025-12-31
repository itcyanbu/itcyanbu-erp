import React, { useState, useEffect } from 'react';
import { Package, TrendingUp, ShoppingCart, FileText, Plus, Search, X, Loader2, Truck } from 'lucide-react';
import { supabase } from '../../services/supabase';
import { CardSkeleton, TableSkeleton } from '../../components/ui/Skeleton';

interface ERPProduct {
    id: string;
    name: string;
    sku: string;
    description: string;
    category_id: string;
    unit_price: number;
    cost_price: number;
    current_stock: number;
    status: string;
    erp_categories?: { name: string };
}

interface ERPOrder {
    id: string;
    order_number: string;
    customer_name: string;
    total_amount: number;
    status: string;
    order_date: string;
}

interface ERPCategory {
    id: string;
    name: string;
}

interface ERPSupplier {
    id: string;
    name: string;
    contact_name: string;
}

interface ERPPurchase {
    id: string;
    purchase_number: string;
    supplier_id: string;
    total_amount: number;
    status: string;
    created_at: string;
    erp_suppliers?: ERPSupplier;
}

const ERPSystem = () => {
    const [activeTab, setActiveTab] = useState('inventory');
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState<ERPProduct[]>([]);
    const [orders, setOrders] = useState<ERPOrder[]>([]);
    const [categories, setCategories] = useState<ERPCategory[]>([]);
    const [suppliers, setSuppliers] = useState<ERPSupplier[]>([]);
    const [purchases, setPurchases] = useState<ERPPurchase[]>([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Form states
    const [newProduct, setNewProduct] = useState({
        name: '',
        sku: '',
        description: '',
        category_id: '',
        unit_price: 0,
        cost_price: 0,
        current_stock: 0
    });

    useEffect(() => {
        fetchERPData();
    }, []);

    const fetchERPData = async () => {
        setLoading(true);
        try {
            // Fetch Products
            const { data: prodData } = await supabase
                .from('erp_products')
                .select('*, erp_categories(name)')
                .order('created_at', { ascending: false });

            // Fetch Orders
            const { data: ordData } = await supabase
                .from('erp_orders')
                .select('*')
                .order('order_date', { ascending: false });

            // 3. Fetch Categories
            const { data: cats } = await supabase.from('erp_categories').select('*').order('name');
            if (cats) setCategories(cats);

            // 4. Fetch Suppliers
            const { data: sups } = await supabase.from('erp_suppliers').select('*').order('name');
            if (sups) setSuppliers(sups);

            // 5. Fetch Purchases
            const { data: purchs } = await supabase
                .from('erp_purchases')
                .select('*, erp_suppliers(name)')
                .order('created_at', { ascending: false });
            if (purchs) setPurchases(purchs);

            if (prodData) setProducts(prodData);
            if (ordData) setOrders(ordData);
            // The original catData fetch is replaced by 'cats'
            // if (catData) setCategories(catData); // This line is now redundant or should be removed if 'cats' is used.
        } catch (error) {
            console.error('Error fetching ERP data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddProduct = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const { error } = await supabase
                .from('erp_products')
                .insert([newProduct]);

            if (error) throw error;

            setShowAddModal(false);
            setNewProduct({
                name: '',
                sku: '',
                description: '',
                category_id: '',
                unit_price: 0,
                cost_price: 0,
                current_stock: 0
            });
            fetchERPData();
        } catch (error) {
            console.error('Error adding product:', error);
            alert('Failed to add product. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const [showPurchaseModal, setShowPurchaseModal] = useState(false);
    const [purchaseItems, setPurchaseItems] = useState<{ product_id: string, quantity: number, cost: number }[]>([]);

    const [purchaseForm, setPurchaseForm] = useState({
        supplier_id: '',
        purchase_number: `PUR-${Date.now().toString().slice(-6)}`,
    });

    const handleAddPurchase = async (e: React.FormEvent) => {
        e.preventDefault();
        if (purchaseItems.length === 0) return alert('Add at least one item');
        if (!purchaseForm.supplier_id) return alert('Select a supplier');

        setIsSubmitting(true);
        try {
            const total = purchaseItems.reduce((acc, item) => acc + (item.quantity * item.cost), 0);

            // 1. Create Purchase
            const { data: purchase, error: purchErr } = await supabase
                .from('erp_purchases')
                .insert([{
                    purchase_number: purchaseForm.purchase_number,
                    supplier_id: purchaseForm.supplier_id,
                    total_amount: total,
                    status: 'received' // Mark as received immediately for this demo to update stock
                }])
                .select()
                .single();

            if (purchErr) throw purchErr;

            // 2. Add Purchase Items
            const itemsToInsert = purchaseItems.map(item => ({
                purchase_id: purchase.id,
                product_id: item.product_id,
                quantity: item.quantity,
                cost_price: item.cost
            }));

            const { error: itemsErr } = await supabase
                .from('erp_purchase_items')
                .insert(itemsToInsert);

            if (itemsErr) throw itemsErr;

            // 3. Update Stock (Increase)
            for (const item of purchaseItems) {
                const product = products.find(p => p.id === item.product_id);
                if (product) {
                    await supabase
                        .from('erp_products')
                        .update({
                            current_stock: product.current_stock + item.quantity,
                            cost_price: item.cost // Optional: update cost price to latest
                        })
                        .eq('id', item.product_id);
                }
            }

            setShowPurchaseModal(false);
            setPurchaseItems([]);
            setPurchaseForm({ supplier_id: '', purchase_number: `PUR-${Date.now().toString().slice(-6)}` });
            fetchERPData();
            alert('Inventory restocked successfully!');
        } catch (error) {
            console.error('Purchase error:', error);
            alert('Failed to record purchase.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const addToPurchase = (productId: string) => {
        const product = products.find(p => p.id === productId);
        if (!product) return;

        const existing = purchaseItems.find(i => i.product_id === productId);
        if (existing) {
            setPurchaseItems(purchaseItems.map(i => i.product_id === productId ? { ...i, quantity: i.quantity + 1 } : i));
        } else {
            setPurchaseItems([...purchaseItems, { product_id: productId, quantity: 1, cost: product.cost_price }]);
        }
    };

    const [showOrderModal, setShowOrderModal] = useState(false);
    const [orderItems, setOrderItems] = useState<{ product_id: string, quantity: number, price: number }[]>([]);

    // Order form states
    const [orderForm, setOrderForm] = useState({
        customer_name: '',
        order_number: `ORD-${Date.now().toString().slice(-6)}`,
    });

    const handleAddOrder = async (e: React.FormEvent) => {
        e.preventDefault();
        if (orderItems.length === 0) return alert('Add at least one item');
        setIsSubmitting(true);
        try {
            const total = orderItems.reduce((acc, item) => acc + (item.quantity * item.price), 0);

            // 1. Create Order
            const { data: order, error: orderErr } = await supabase
                .from('erp_orders')
                .insert([{
                    order_number: orderForm.order_number,
                    customer_name: orderForm.customer_name,
                    total_amount: total,
                    status: 'processing'
                }])
                .select()
                .single();

            if (orderErr) throw orderErr;

            // 2. Add Order Items
            const itemsToInsert = orderItems.map(item => ({
                order_id: order.id,
                product_id: item.product_id,
                quantity: item.quantity,
                unit_price: item.price
            }));

            const { error: itemsErr } = await supabase
                .from('erp_order_items')
                .insert(itemsToInsert);

            if (itemsErr) throw itemsErr;

            // 3. Update Stock
            for (const item of orderItems) {
                const product = products.find(p => p.id === item.product_id);
                if (product) {
                    await supabase
                        .from('erp_products')
                        .update({ current_stock: product.current_stock - item.quantity })
                        .eq('id', item.product_id);
                }
            }

            setShowOrderModal(false);
            setOrderItems([]);
            setOrderForm({ customer_name: '', order_number: `ORD-${Date.now().toString().slice(-6)}` });
            fetchERPData();
            alert('Order processed successfully!');
        } catch (error) {
            console.error('Order error:', error);
            alert('Failed to process order.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const addToOrder = (productId: string) => {
        const product = products.find(p => p.id === productId);
        if (!product) return;
        if (product.current_stock <= 0) return alert('Out of stock');

        const existing = orderItems.find(i => i.product_id === productId);
        if (existing) {
            if (existing.quantity >= product.current_stock) return alert('Insufficient stock');
            setOrderItems(orderItems.map(i => i.product_id === productId ? { ...i, quantity: i.quantity + 1 } : i));
        } else {
            setOrderItems([...orderItems, { product_id: productId, quantity: 1, price: product.unit_price }]);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status?.toLowerCase()) {
            case 'delivered': case 'received': return 'bg-green-100 text-green-700';
            case 'processing': case 'shipped': return 'bg-blue-100 text-blue-700';
            case 'pending': case 'ordered': return 'bg-amber-100 text-amber-700';
            case 'cancelled': return 'bg-red-100 text-red-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto pb-12">
                <div className="mb-8 flex justify-between items-end">
                    <div className="w-1/3 h-10 bg-slate-200 animate-pulse rounded-lg" />
                    <div className="w-48 h-10 bg-slate-200 animate-pulse rounded-lg" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <CardSkeleton />
                    <CardSkeleton />
                    <CardSkeleton />
                    <CardSkeleton />
                </div>
                <div className="bg-white rounded-xl border border-slate-200 p-6">
                    <TableSkeleton />
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto pb-12">
            {/* Header */}
            <div className="mb-8 flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">ERP System</h1>
                    <p className="text-slate-500 mt-1">Manage inventory, orders, and business operations</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all font-medium shadow-sm hover:shadow-md"
                    >
                        <Plus size={20} />
                        Add Product
                    </button>
                    <button
                        onClick={() => setShowOrderModal(true)}
                        className="flex items-center gap-2 bg-slate-800 text-white px-4 py-2 rounded-lg hover:bg-slate-900 transition-all font-medium shadow-sm hover:shadow-md"
                    >
                        <ShoppingCart size={20} />
                        New Order
                    </button>
                    <button
                        onClick={() => setShowPurchaseModal(true)}
                        className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-all font-medium shadow-sm hover:shadow-md"
                    >
                        <Truck size={20} />
                        Restock
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                    <div className="bg-blue-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-blue-600">
                        <Package size={24} />
                    </div>
                    <p className="text-sm text-slate-500 font-medium">Total Products</p>
                    <h3 className="text-2xl font-bold text-slate-800">{products.length}</h3>
                </div>
                <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                    <div className="bg-green-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-green-600">
                        <TrendingUp size={24} />
                    </div>
                    <p className="text-sm text-slate-500 font-medium">Global Valuation</p>
                    <h3 className="text-2xl font-bold text-slate-800">
                        ₹{products.reduce((acc, p) => acc + (p.current_stock * p.unit_price), 0).toLocaleString()}
                    </h3>
                </div>
                <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                    <div className="bg-purple-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-purple-600">
                        <ShoppingCart size={24} />
                    </div>
                    <p className="text-sm text-slate-500 font-medium">Active Orders</p>
                    <h3 className="text-2xl font-bold text-slate-800">{orders.filter(o => o.status !== 'delivered').length}</h3>
                </div>
                <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                    <div className="bg-amber-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-amber-600">
                        <FileText size={24} />
                    </div>
                    <p className="text-sm text-slate-500 font-medium">Low Stock Items</p>
                    <h3 className="text-2xl font-bold text-slate-800">{products.filter(p => p.current_stock < 10).length}</h3>
                </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="border-b border-slate-200 flex p-1 bg-slate-50">
                    {['inventory', 'orders', 'purchases', 'settings'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-6 py-3 font-semibold capitalize rounded-lg transition-all ${activeTab === tab
                                ? 'bg-white text-blue-600 shadow-sm'
                                : 'text-slate-500 hover:text-slate-700'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                <div className="p-6">
                    {activeTab === 'inventory' && (
                        <div>
                            <div className="flex justify-between items-center mb-6">
                                <div className="relative flex-1 max-w-md">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                                    <input
                                        type="text"
                                        placeholder="Search products by name or SKU..."
                                        className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="bg-slate-50 border-y border-slate-200">
                                            <th className="px-4 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Product Info</th>
                                            <th className="px-4 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">SKU</th>
                                            <th className="px-4 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Category</th>
                                            <th className="px-4 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Stock Level</th>
                                            <th className="px-4 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Unit Price</th>
                                            <th className="px-4 py-4 text-right text-xs font-bold text-slate-600 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {products.length === 0 ? (
                                            <tr>
                                                <td colSpan={6} className="px-4 py-12 text-center text-slate-400">
                                                    No products found. Start by adding one!
                                                </td>
                                            </tr>
                                        ) : (
                                            products.map((item) => (
                                                <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                                                    <td className="px-4 py-4">
                                                        <div className="font-semibold text-slate-800">{item.name}</div>
                                                        <div className="text-xs text-slate-500 truncate max-w-[200px]">{item.description}</div>
                                                    </td>
                                                    <td className="px-4 py-4 text-slate-600 font-mono text-xs">{item.sku}</td>
                                                    <td className="px-4 py-4">
                                                        <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs font-medium">
                                                            {item.erp_categories?.name || 'Uncategorized'}
                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-4">
                                                        <div className="flex items-center gap-2">
                                                            <span className={`font-semibold ${item.current_stock < 10 ? 'text-red-500' : 'text-slate-800'}`}>
                                                                {item.current_stock}
                                                            </span>
                                                            <span className="text-xs text-slate-500">units</span>
                                                        </div>
                                                        {item.current_stock < 10 && <div className="text-[10px] text-red-400 font-bold uppercase mt-1">Low Stock</div>}
                                                    </td>
                                                    <td className="px-4 py-4 font-bold text-slate-800">₹{item.unit_price.toLocaleString()}</td>
                                                    <td className="px-4 py-4 text-right">
                                                        <button
                                                            onClick={() => addToOrder(item.id)}
                                                            className="bg-blue-50 text-blue-600 px-3 py-1 rounded-lg text-xs font-bold hover:bg-blue-600 hover:text-white transition-all"
                                                        >
                                                            + Add to Order
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {activeTab === 'orders' && (
                        <div>
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-bold text-slate-800">Recent ERP Orders</h3>
                                <button
                                    onClick={() => setShowOrderModal(true)}
                                    className="flex items-center gap-2 bg-slate-800 text-white px-4 py-2 rounded-lg hover:bg-slate-900 font-medium transition-all"
                                >
                                    <Plus size={20} />
                                    New Order
                                </button>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="bg-slate-50 border-y border-slate-200">
                                            <th className="px-4 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Order ID</th>
                                            <th className="px-4 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Customer</th>
                                            <th className="px-4 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Total</th>
                                            <th className="px-4 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Status</th>
                                            <th className="px-4 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Date</th>
                                            <th className="px-4 py-4 text-right text-xs font-bold text-slate-600 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {orders.length === 0 ? (
                                            <tr>
                                                <td colSpan={6} className="px-4 py-12 text-center text-slate-400">
                                                    No orders recorded yet.
                                                </td>
                                            </tr>
                                        ) : (
                                            orders.map((order) => (
                                                <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                                                    <td className="px-4 py-4 font-mono text-sm text-blue-600 font-bold">{order.order_number}</td>
                                                    <td className="px-4 py-4 font-semibold text-slate-800">{order.customer_name}</td>
                                                    <td className="px-4 py-4 font-bold text-slate-800">₹{order.total_amount.toLocaleString()}</td>
                                                    <td className="px-4 py-4">
                                                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${getStatusColor(order.status)}`}>
                                                            {order.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-4 text-slate-500 text-sm">{new Date(order.order_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                                                    <td className="px-4 py-4 text-right">
                                                        <button className="text-slate-600 hover:text-slate-900 text-sm font-bold">Details</button>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {activeTab === 'purchases' && (
                        <div>
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-bold text-slate-800">Procurement History</h3>
                                <button
                                    onClick={() => setShowPurchaseModal(true)}
                                    className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 font-medium transition-all"
                                >
                                    <Plus size={20} />
                                    New Purchase
                                </button>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="bg-slate-50 border-y border-slate-200">
                                            <th className="px-4 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Purchase #</th>
                                            <th className="px-4 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Supplier</th>
                                            <th className="px-4 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Total Cost</th>
                                            <th className="px-4 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Status</th>
                                            <th className="px-4 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Date</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {purchases.length === 0 ? (
                                            <tr>
                                                <td colSpan={5} className="px-4 py-12 text-center text-slate-400">
                                                    No purchase records found.
                                                </td>
                                            </tr>
                                        ) : (
                                            purchases.map((p) => (
                                                <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                                                    <td className="px-4 py-4 font-mono text-sm text-emerald-600 font-bold">{p.purchase_number}</td>
                                                    <td className="px-4 py-4 font-semibold text-slate-800">{(p as any).erp_suppliers?.name || 'Unknown Supplier'}</td>
                                                    <td className="px-4 py-4 font-bold text-slate-800">₹{p.total_amount.toLocaleString()}</td>
                                                    <td className="px-4 py-4">
                                                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-[10px] font-bold uppercase tracking-wider">
                                                            {p.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-4 text-slate-500 text-sm">{new Date(p.created_at).toLocaleDateString('en-IN')}</td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {activeTab === 'settings' && (
                        <div className="text-center py-20 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                            <h3 className="text-lg font-bold text-slate-800 mb-1">ERP Settings</h3>
                            <p className="text-slate-500 max-w-xs mx-auto text-sm">
                                Configuration options for inventory thresholds and order prefixes will be available here.
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Modals follow ... */}

            {/* Add Product Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl animate-in fade-in zoom-in duration-200">
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                            <div>
                                <h2 className="text-xl font-bold text-slate-800">Add New Inventory Item</h2>
                                <p className="text-sm text-slate-500 mt-1">Register a new product to your ERP inventory</p>
                            </div>
                            <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleAddProduct} className="p-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="col-span-2">
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Product Name</label>
                                    <input
                                        required
                                        type="text"
                                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                        placeholder="e.g. High Performance Server Rack"
                                        value={newProduct.name}
                                        onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">SKU Code</label>
                                    <input
                                        required
                                        type="text"
                                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                        placeholder="IT-SRV-001"
                                        value={newProduct.sku}
                                        onChange={e => setNewProduct({ ...newProduct, sku: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Category</label>
                                    <select
                                        required
                                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                        value={newProduct.category_id}
                                        onChange={e => setNewProduct({ ...newProduct, category_id: e.target.value })}
                                    >
                                        <option value="">Select Category</option>
                                        {categories.map(cat => (
                                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Cost Price (₹)</label>
                                    <input
                                        required
                                        type="number"
                                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                        value={newProduct.cost_price}
                                        onChange={e => setNewProduct({ ...newProduct, cost_price: parseFloat(e.target.value) })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Sale Price (₹)</label>
                                    <input
                                        required
                                        type="number"
                                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                        value={newProduct.unit_price}
                                        onChange={e => setNewProduct({ ...newProduct, unit_price: parseFloat(e.target.value) })}
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Opening Stock</label>
                                    <input
                                        required
                                        type="number"
                                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                        value={newProduct.current_stock}
                                        onChange={e => setNewProduct({ ...newProduct, current_stock: parseInt(e.target.value) })}
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Notes / Description</label>
                                    <textarea
                                        rows={3}
                                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                        placeholder="Add any specific details about this item..."
                                        value={newProduct.description}
                                        onChange={e => setNewProduct({ ...newProduct, description: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="mt-8 flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setShowAddModal(false)}
                                    className="flex-1 px-6 py-3 border border-slate-200 rounded-xl text-slate-600 font-bold hover:bg-slate-50 transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    disabled={isSubmitting}
                                    type="submit"
                                    className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-200 disabled:opacity-50 flex items-center justify-center gap-2"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 size={20} className="animate-spin" />
                                            Saving...
                                        </>
                                    ) : 'Complete Registration'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* New Order Modal */}
            {showOrderModal && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl w-full max-w-4xl shadow-2xl flex h-[80vh] overflow-hidden">
                        {/* Left: Product Selector */}
                        <div className="flex-1 border-r border-slate-100 flex flex-col">
                            <div className="p-6 border-b border-slate-100">
                                <h3 className="font-bold text-lg text-slate-800">Select Products</h3>
                                <div className="mt-4 relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                    <input type="text" placeholder="Search inventory..." className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none" />
                                </div>
                            </div>
                            <div className="flex-1 overflow-y-auto p-4 space-y-2">
                                {products.map(p => (
                                    <div key={p.id} className="p-3 border border-slate-100 rounded-xl hover:border-blue-200 hover:bg-blue-50 transition-all cursor-pointer group flex justify-between items-center" onClick={() => addToOrder(p.id)}>
                                        <div>
                                            <div className="font-bold text-slate-800">{p.name}</div>
                                            <div className="text-xs text-slate-500">Stock: {p.current_stock} | ₹{p.unit_price.toLocaleString()}</div>
                                        </div>
                                        <Plus size={18} className="text-blue-500 opacity-0 group-hover:opacity-100" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right: Order Summary */}
                        <div className="w-[400px] flex flex-col bg-slate-50">
                            <div className="p-6 border-b border-slate-200 bg-white flex justify-between items-center">
                                <h3 className="font-bold text-lg text-slate-800">Order Summary</h3>
                                <button onClick={() => setShowOrderModal(false)}><X size={24} className="text-slate-400" /></button>
                            </div>

                            <form onSubmit={handleAddOrder} className="flex-1 flex flex-col p-6 overflow-hidden">
                                <div className="space-y-4 mb-6">
                                    <div>
                                        <label className="text-xs font-bold text-slate-500 uppercase">Customer Name</label>
                                        <input required className="w-full mt-1 px-3 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" value={orderForm.customer_name} onChange={e => setOrderForm({ ...orderForm, customer_name: e.target.value })} />
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-slate-500 uppercase">Order #</label>
                                        <input disabled className="w-full mt-1 px-3 py-2 bg-slate-100 border border-slate-200 rounded-lg text-slate-500 font-mono" value={orderForm.order_number} />
                                    </div>
                                </div>

                                <div className="flex-1 overflow-y-auto space-y-3 mb-6">
                                    <label className="text-xs font-bold text-slate-500 uppercase">Items ({orderItems.length})</label>
                                    {orderItems.length === 0 ? (
                                        <div className="text-center py-8 text-slate-400 text-sm">No items added yet</div>
                                    ) : (
                                        orderItems.map(item => {
                                            const p = products.find(prod => prod.id === item.product_id);
                                            return (
                                                <div key={item.product_id} className="flex justify-between items-center bg-white p-3 rounded-lg shadow-sm">
                                                    <div>
                                                        <div className="font-bold text-xs text-slate-800">{p?.name}</div>
                                                        <div className="text-[10px] text-slate-500">Qty: {item.quantity} x ₹{item.price.toLocaleString()}</div>
                                                    </div>
                                                    <div className="font-bold text-xs">₹{(item.quantity * item.price).toLocaleString()}</div>
                                                </div>
                                            );
                                        })
                                    )}
                                </div>

                                <div className="mt-auto pt-6 border-t border-slate-200">
                                    <div className="flex justify-between items-center mb-6">
                                        <span className="font-bold text-slate-600">Total Amount</span>
                                        <span className="text-2xl font-black text-slate-800">₹{orderItems.reduce((acc, i) => acc + (i.quantity * i.price), 0).toLocaleString()}</span>
                                    </div>
                                    <button disabled={isSubmitting || orderItems.length === 0} className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 shadow-xl shadow-blue-200 transition-all flex items-center justify-center gap-2">
                                        {isSubmitting ? <Loader2 size={24} className="animate-spin" /> : 'Confirm Order & Deduct Stock'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
            {/* New Purchase Modal */}
            {showPurchaseModal && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl w-full max-w-4xl shadow-2xl flex h-[80vh] overflow-hidden">
                        <div className="flex-1 border-r border-slate-100 flex flex-col">
                            <div className="p-6 border-b border-slate-100">
                                <h3 className="font-bold text-lg text-slate-800">Select Products to Restock</h3>
                            </div>
                            <div className="flex-1 overflow-y-auto p-4 space-y-2">
                                {products.map(p => (
                                    <div key={p.id} className="p-3 border border-slate-100 rounded-xl hover:border-emerald-200 hover:bg-emerald-50 transition-all cursor-pointer group flex justify-between items-center" onClick={() => addToPurchase(p.id)}>
                                        <div>
                                            <div className="font-bold text-slate-800">{p.name}</div>
                                            <div className="text-xs text-slate-500">Current Stock: {p.current_stock} | Cost: ₹{p.cost_price.toLocaleString()}</div>
                                        </div>
                                        <Plus size={18} className="text-emerald-500 opacity-0 group-hover:opacity-100" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="w-[400px] flex flex-col bg-slate-50">
                            <div className="p-6 border-b border-slate-200 bg-white flex justify-between items-center">
                                <h3 className="font-bold text-lg text-slate-800">Purchase Order</h3>
                                <button onClick={() => setShowPurchaseModal(false)}><X size={24} className="text-slate-400" /></button>
                            </div>

                            <form onSubmit={handleAddPurchase} className="flex-1 flex flex-col p-6 overflow-hidden">
                                <div className="space-y-4 mb-6">
                                    <div>
                                        <label className="text-xs font-bold text-slate-500 uppercase">Supplier</label>
                                        <select required className="w-full mt-1 px-3 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500" value={purchaseForm.supplier_id} onChange={e => setPurchaseForm({ ...purchaseForm, supplier_id: e.target.value })}>
                                            <option value="">Select Supplier</option>
                                            {suppliers.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-slate-500 uppercase">Purchase #</label>
                                        <input disabled className="w-full mt-1 px-3 py-2 bg-slate-100 border border-slate-200 rounded-lg text-slate-500 font-mono" value={purchaseForm.purchase_number} />
                                    </div>
                                </div>

                                <div className="flex-1 overflow-y-auto space-y-3 mb-6">
                                    <label className="text-xs font-bold text-slate-500 uppercase">Items ({purchaseItems.length})</label>
                                    {purchaseItems.length === 0 ? (
                                        <div className="text-center py-8 text-slate-400 text-sm">No items selected</div>
                                    ) : (
                                        purchaseItems.map(item => {
                                            const p = products.find(prod => prod.id === item.product_id);
                                            return (
                                                <div key={item.product_id} className="bg-white p-3 rounded-lg shadow-sm">
                                                    <div className="flex justify-between items-start mb-2">
                                                        <div className="font-bold text-xs text-slate-800">{p?.name}</div>
                                                        <button type="button" onClick={() => setPurchaseItems(purchaseItems.filter(i => i.product_id !== item.product_id))} className="text-red-400 hover:text-red-600"><X size={14} /></button>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <div className="flex-1">
                                                            <label className="text-[10px] text-slate-400 block">Qty</label>
                                                            <input type="number" min="1" className="w-full text-xs border rounded px-1" value={item.quantity} onChange={e => setPurchaseItems(purchaseItems.map(i => i.product_id === item.product_id ? { ...i, quantity: parseInt(e.target.value) } : i))} />
                                                        </div>
                                                        <div className="flex-1">
                                                            <label className="text-[10px] text-slate-400 block">Unit Cost</label>
                                                            <input type="number" className="w-full text-xs border rounded px-1" value={item.cost} onChange={e => setPurchaseItems(purchaseItems.map(i => i.product_id === item.product_id ? { ...i, cost: parseFloat(e.target.value) } : i))} />
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })
                                    )}
                                </div>

                                <div className="mt-auto pt-6 border-t border-slate-200">
                                    <div className="flex justify-between items-center mb-6">
                                        <span className="font-bold text-slate-600">Total Investment</span>
                                        <span className="text-2xl font-black text-slate-800">₹{purchaseItems.reduce((acc, i) => acc + (i.quantity * i.cost), 0).toLocaleString()}</span>
                                    </div>
                                    <button disabled={isSubmitting || purchaseItems.length === 0} className="w-full py-4 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 shadow-xl shadow-emerald-200 transition-all flex items-center justify-center gap-2">
                                        {isSubmitting ? <Loader2 size={24} className="animate-spin" /> : 'Confirm Stock Intake'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ERPSystem;
