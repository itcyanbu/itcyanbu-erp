
-- ERP Purchase Items Table
CREATE TABLE IF NOT EXISTS erp_purchase_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    purchase_id UUID REFERENCES erp_purchases(id) ON DELETE CASCADE,
    product_id UUID REFERENCES erp_products(id),
    quantity INTEGER NOT NULL DEFAULT 1,
    cost_price DECIMAL(12, 2) NOT NULL,
    total_price DECIMAL(12, 2) GENERATED ALWAYS AS (quantity * cost_price) STORED
);

ALTER TABLE erp_purchase_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY \
Enable
all
for
authenticated
users\ ON erp_purchase_items FOR ALL TO authenticated USING (true);

