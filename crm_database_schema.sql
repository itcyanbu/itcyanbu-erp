-- =====================================================
-- CRM System Database Schema for Supabase
-- =====================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- 1. CRM LEADS TABLE
-- =====================================================
CREATE TABLE crm_leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_name VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  email VARCHAR(255),
  company VARCHAR(255),
  source VARCHAR(100),
  status VARCHAR(50) DEFAULT 'New Lead',
  assigned_to UUID REFERENCES profiles(id),
  created_by UUID REFERENCES profiles(id),
  follow_up_date TIMESTAMP,
  next_action VARCHAR(255),
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- RLS Policies for crm_leads
ALTER TABLE crm_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read for authenticated users" ON crm_leads
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Enable insert for authenticated users" ON crm_leads
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable update for authenticated users" ON crm_leads
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Enable delete for authenticated users" ON crm_leads
  FOR DELETE USING (auth.role() = 'authenticated');

-- =====================================================
-- 2. CRM FOLLOW-UPS TABLE
-- =====================================================
CREATE TABLE crm_followups (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id UUID REFERENCES crm_leads(id) ON DELETE CASCADE,
  follow_up_date TIMESTAMP NOT NULL,
  notes TEXT,
  status VARCHAR(20) DEFAULT 'Pending',
  assigned_to UUID REFERENCES profiles(id),
  created_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP
);

ALTER TABLE crm_followups ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable all for authenticated users" ON crm_followups
  FOR ALL USING (auth.role() = 'authenticated');

-- =====================================================
-- 3. CRM TICKETS TABLE
-- =====================================================
CREATE TABLE crm_tickets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ticket_number VARCHAR(50) UNIQUE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  priority VARCHAR(20) DEFAULT 'Medium',
  status VARCHAR(20) DEFAULT 'Open',
  category VARCHAR(100),
  assigned_to UUID REFERENCES profiles(id),
  customer_id UUID REFERENCES crm_leads(id),
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMP DEFAULT NOW(),
  resolved_at TIMESTAMP
);

ALTER TABLE crm_tickets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable all for authenticated users" ON crm_tickets
  FOR ALL USING (auth.role() = 'authenticated');

-- =====================================================
-- 4. CRM TASKS TABLE
-- =====================================================
CREATE TABLE crm_tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  due_date DATE,
  priority VARCHAR(20) DEFAULT 'Medium',
  status VARCHAR(20) DEFAULT 'Pending',
  assigned_to UUID REFERENCES profiles(id),
  related_lead UUID REFERENCES crm_leads(id),
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP
);

ALTER TABLE crm_tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable all for authenticated users" ON crm_tasks
  FOR ALL USING (auth.role() = 'authenticated');

-- =====================================================
-- 5. CRM SALES TABLE
-- =====================================================
CREATE TABLE crm_sales (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  deal_name VARCHAR(255) NOT NULL,
  lead_id UUID REFERENCES crm_leads(id),
  amount DECIMAL(12,2),
  stage VARCHAR(50) DEFAULT 'Prospecting',
  probability INTEGER DEFAULT 50,
  expected_close_date DATE,
  actual_close_date DATE,
  assigned_to UUID REFERENCES profiles(id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

ALTER TABLE crm_sales ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable all for authenticated users" ON crm_sales
  FOR ALL USING (auth.role() = 'authenticated');

-- =====================================================
-- 6. CRM QUOTATIONS TABLE
-- =====================================================
CREATE TABLE crm_quotations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  quotation_number VARCHAR(50) UNIQUE,
  lead_id UUID REFERENCES crm_leads(id),
  total_amount DECIMAL(12,2),
  valid_until DATE,
  status VARCHAR(20) DEFAULT 'Draft',
  notes TEXT,
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE crm_quotation_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  quotation_id UUID REFERENCES crm_quotations(id) ON DELETE CASCADE,
  product_name VARCHAR(255),
  description TEXT,
  quantity INTEGER,
  unit_price DECIMAL(10,2),
  total DECIMAL(12,2)
);

ALTER TABLE crm_quotations ENABLE ROW LEVEL SECURITY;
ALTER TABLE crm_quotation_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable all for authenticated users" ON crm_quotations
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Enable all for authenticated users" ON crm_quotation_items
  FOR ALL USING (auth.role() = 'authenticated');

-- =====================================================
-- 7. CRM SALE ORDERS TABLE
-- =====================================================
CREATE TABLE crm_sale_orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_number VARCHAR(50) UNIQUE,
  quotation_id UUID REFERENCES crm_quotations(id),
  lead_id UUID REFERENCES crm_leads(id),
  total_amount DECIMAL(12,2),
  status VARCHAR(20) DEFAULT 'Pending',
  delivery_date DATE,
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMP DEFAULT NOW()
);

ALTER TABLE crm_sale_orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable all for authenticated users" ON crm_sale_orders
  FOR ALL USING (auth.role() = 'authenticated');

-- =====================================================
-- 8. CRM MASTER DATA (Products/Services)
-- =====================================================
CREATE TABLE crm_products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_name VARCHAR(255) NOT NULL,
  category VARCHAR(100),
  price DECIMAL(10,2),
  description TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW()
);

ALTER TABLE crm_products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable all for authenticated users" ON crm_products
  FOR ALL USING (auth.role() = 'authenticated');

-- =====================================================
-- INDEXES for Performance
-- =====================================================
CREATE INDEX idx_leads_status ON crm_leads(status);
CREATE INDEX idx_leads_assigned ON crm_leads(assigned_to);
CREATE INDEX idx_tickets_status ON crm_tickets(status);
CREATE INDEX idx_tasks_status ON crm_tasks(status);
CREATE INDEX idx_sales_stage ON crm_sales(stage);
CREATE INDEX idx_followups_date ON crm_followups(follow_up_date);
CREATE INDEX idx_followups_status ON crm_followups(status);
