
-- Default Categories for ERP
INSERT INTO erp_categories (name, description) VALUES 
('Electronics', 'Technical hardware and devices'),
('Furniture', 'Office and warehouse furniture'),
('Services', 'Professional and maintenance services'),
('Softwares', 'Licenses and digital products')
ON CONFLICT DO NOTHING;
