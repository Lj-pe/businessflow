USE businessflow;

-- =========================
-- CATEGORÍAS
-- =========================

INSERT INTO categories (name, description)
VALUES
('Bebidas', 'Bebidas y refrescos'),
('Abarrotes', 'Productos de consumo básico'),
('Lácteos', 'Leche, yogurt y derivados'),
('Limpieza', 'Productos de limpieza del hogar');


-- =========================
-- PRODUCTOS
-- =========================

INSERT INTO products
(category_id, name, description, price, stock)
VALUES
(1, 'Coca Cola 500ml', 'Bebida gaseosa', 3.50, 50),
(1, 'Agua San Luis 625ml', 'Agua mineral', 2.00, 80),
(2, 'Arroz Costeño 1kg', 'Arroz extra', 4.50, 40),
(2, 'Azúcar 1kg', 'Azúcar blanca', 4.00, 35),
(3, 'Leche Gloria 1L', 'Leche evaporada', 4.20, 60),
(4, 'Detergente 1kg', 'Detergente para ropa', 8.50, 25);