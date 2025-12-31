-- ERP Database Schema for itcyanbu
-- This schema handles inventory, orders, and procurement.

-- 1. ERP Categories
CREATE TABLE IF NOT EXISTS erp_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. ERP Products (Inventory)
CREATE TABLE IF NOT EXISTS erp_products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    sku TEXT UNIQUE NOT NULL,
    description TEXT,
    category_id UUID REFERENCES erp_categories(id),
    unit_price DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
    cost_price DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
    current_stock INTEGER NOT NULL DEFAULT 0,
    min_stock_level INTEGER DEFAULT 5,
    status TEXT DEFAULT 'active', -- active, discontinued, out_of_stock
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. ERP Suppliers (Vendors)
CREATE TABLE IF NOT EXISTS erp_suppliers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    contact_name TEXT,
    email TEXT,
    phone TEXT,
    address TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. ERP Orders (Sales fulfillment)
CREATE TABLE IF NOT EXISTS erp_orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_number TEXT UNIQUE NOT NULL,
    customer_id UUID, -- Links to CRM customers if integrated, otherwise generic
    customer_name TEXT, 
    total_amount DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
    status TEXT DEFAULT 'pending', -- pending, processing, shipped, delivered, cancelled
    payment_status TEXT DEFAULT 'unpaid', -- unpaid, partial, paid
    order_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. ERP Order Items
CREATE TABLE IF NOT EXISTS erp_order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID REFERENCES erp_orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES erp_products(id),
    quantity INTEGER NOT NULL DEFAULT 1,
    unit_price DECIMAL(12, 2) NOT NULL,
    total_price DECIMAL(12, 2) GENERATED ALWAYS AS (quantity * unit_price) STORED
);

-- 6. ERP Purchase Orders (Procurement)
CREATE TABLE IF NOT EXISTS erp_purchases (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    purchase_number TEXT UNIQUE NOT NULL,
    supplier_id UUID REFERENCES erp_suppliers(id),
    total_amount DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
    status TEXT DEFAULT 'ordered', -- ordered, received, cancelled
    expected_delivery DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE erp_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE erp_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE erp_suppliers ENABLE ROW LEVEL SECURITY;
ALTER TABLE erp_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE erp_order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE erp_purchases ENABLE ROW LEVEL SECURITY;

-- RLS Policies (Simplified for now - Admin/Auth access)
CREATE POLICY "Enable all for authenticated users" ON erp_categories FOR ALL TO authenticated USING (true);
CREATE POLICY "Enable all for authenticated users" ON erp_products FOR ALL TO authenticated USING (true);
CREATE POLICY "Enable all for authenticated users" ON erp_suppliers FOR ALL TO authenticated USING (true);
CREATE POLICY "Enable all for authenticated users" ON erp_orders FOR ALL TO authenticated USING (true);
CREATE POLICY "Enable all for authenticated users" ON erp_order_items FOR ALL TO authenticated USING (true);
CREATE POLICY "Enable all for authenticated users" ON erp_purchases FOR ALL TO authenticated USING (true);

-- 7. CRM Leads
CREATE TABLE IF NOT EXISTS crm_leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lead_name TEXT NOT NULL,
    company_name TEXT,
    email TEXT,
    phone TEXT,
    source TEXT, -- 'Website', 'Referral', 'Cold Call'
    status TEXT DEFAULT 'New', -- 'New', 'Contacted', 'Qualified', 'Proposal', 'Negotiation'
    assigned_to UUID, -- References auth.users or a generic users table
    address TEXT,
    city TEXT,
    country TEXT,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. CRM Sales (Deals)
CREATE TABLE IF NOT EXISTS crm_sales (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lead_id UUID REFERENCES crm_leads(id),
    deal_name TEXT NOT NULL,
    amount DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
    stage TEXT NOT NULL, -- 'Prospecting', 'Qualification', 'Proposal', 'Negotiation', 'Closed Won', 'Closed Lost'
    probability INTEGER DEFAULT 0,
    expected_close_date DATE,
    sales_rep_id UUID, -- References auth.users
    
    -- Extended fields for View Sales Report
    project_value DECIMAL(12, 2) DEFAULT 0.00,
    advance_payment DECIMAL(12, 2) DEFAULT 0.00,
    total_paid DECIMAL(12, 2) DEFAULT 0.00,
    balance_amount DECIMAL(12, 2) GENERATED ALWAYS AS (project_value - total_paid) STORED,
    payment_details TEXT,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 9. CRM Sales Targets (Performance)
CREATE TABLE IF NOT EXISTS crm_sales_targets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sales_rep_id UUID NOT NULL,
    target_amount DECIMAL(12, 2) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    achieved_amount DECIMAL(12, 2) DEFAULT 0.00,
    status TEXT DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 10. CRM Activity Logs (Tracking)
CREATE TABLE IF NOT EXISTS crm_activity_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    action_type TEXT NOT NULL, -- 'deal_closed', 'lead_added', 'meeting', 'check_in'
    description TEXT,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    location_name TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 11. User Notepad
CREATE TABLE IF NOT EXISTS user_notepad (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    content TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for New Tables
ALTER TABLE crm_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE crm_sales ENABLE ROW LEVEL SECURITY;
ALTER TABLE crm_sales_targets ENABLE ROW LEVEL SECURITY;
ALTER TABLE crm_activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_notepad ENABLE ROW LEVEL SECURITY;

-- Add Policies
CREATE POLICY "Enable all for authenticated users" ON crm_leads FOR ALL TO authenticated USING (true);
CREATE POLICY "Enable all for authenticated users" ON crm_sales FOR ALL TO authenticated USING (true);
CREATE POLICY "Enable all for authenticated users" ON crm_sales_targets FOR ALL TO authenticated USING (true);
CREATE POLICY "Enable all for authenticated users" ON crm_activity_logs FOR ALL TO authenticated USING (true);
CREATE POLICY "Enable all for authenticated users" ON user_notepad FOR ALL TO authenticated USING (true);
