
-- Seed Suppliers for ERP
INSERT INTO erp_suppliers (name, contact_name, email, phone, address) VALUES 
('Quantum Electronics', 'Alice Johnson', 'contact@quantum-elec.com', '+1-555-0101', 'San Jose, CA'),
('Zenith Furniture', 'Bob Smith', 'bob@zenithfurn.com', '+1-555-0102', 'Grand Rapids, MI'),
('Apex Software Solutions', 'Charlie Davis', 'charlie@apexsoft.com', '+1-555-0103', 'Seattle, WA'),
('Global Logistics Hub', 'Diana Miller', 'diana@globallog.com', '+1-555-0104', 'Newark, NJ')
ON CONFLICT DO NOTHING;
