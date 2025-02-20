-- Створення бази даних для магазину авто-запчастин
CREATE DATABASE IF NOT EXISTS  auto_parts_store;
USE auto_parts_store;

-- Таблиця користувачів
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255),
    phone VARCHAR(20),
    address VARCHAR(255),
    role ENUM('user', 'manager', 'admin') DEFAULT 'user',
    profile_image longblob
);


-- Таблиця виробників (брендів)
CREATE TABLE IF NOT EXISTS  manufacturers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    country VARCHAR(50),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблиця категорій автозапчастин
CREATE TABLE IF NOT EXISTS  categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    description TEXT
);

-- Таблиця автозапчастин (продуктів)
CREATE TABLE IF NOT EXISTS  products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    category_id INT,
    manufacturer_id INT,
    name VARCHAR(150) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    stock INT DEFAULT 0,
    image_url VARCHAR(255),
    -- Специфічні поля для авто-запчастин:
    vehicle_make VARCHAR(50),    -- марка автомобіля
    vehicle_model VARCHAR(50),   -- модель автомобіля
    year_from INT,               -- сумісність з авто від року
    year_to INT,                 -- сумісність з авто до року
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id),
    FOREIGN KEY (manufacturer_id) REFERENCES manufacturers(id)
);

-- Таблиця кошиків (один кошик на користувача)
CREATE TABLE carts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);


-- Таблиця елементів кошика (запчастини в кошику)
CREATE TABLE IF NOT EXISTS  cart_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    cart_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (cart_id) REFERENCES carts(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Таблиця замовлень
CREATE TABLE IF NOT EXISTS  orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'pending', -- наприклад: pending, paid, shipped, completed, cancelled
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Таблиця елементів замовлення (запчастини в замовленні)
CREATE TABLE IF NOT EXISTS  order_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,  -- Фіксована ціна на момент замовлення
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Додаткові індекси для оптимізації пошуку
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_manufacturer ON products(manufacturer_id);

select *from users;
select *from manufacturers;
select *from products;
select *from categories;
select *from carts;
select *from cart_items;
select *from orders;
select *from order_items;

INSERT INTO manufacturers (name, country, description) VALUES
('Bosch', 'Germany', 'High-quality automotive parts'),
('Brembo', 'Italy', 'Brake systems and components'),
('Denso', 'Japan', 'Automotive electrical components'),
('Valeo', 'France', 'Automotive lighting and electronics'),
('Delphi', 'USA', 'Automotive fuel systems and components'),
('ATE', 'Germany', 'Brake systems and components'),
('TRW', 'USA', 'Automotive safety systems'),
('Hella', 'Germany', 'Automotive lighting and electronics');

INSERT INTO categories (name, description) VALUES
('Двигун', 'Engine components and parts'),
('Підвіска', 'Suspension components and parts'),
('Гальмівна система', 'Brake system components and parts'),
('Електрика', 'Electrical components and parts'),
('Кузовні деталі', 'Body parts and components'),
('Вихлопна система', 'Exhaust system components and parts'),
('Трансмісія', 'Transmission components and parts'),
('Охолоджувальна система', 'Cooling system components and parts');

INSERT INTO products (category_id, manufacturer_id, name, description, price, stock, image_url, vehicle_make, vehicle_model, year_from, year_to)
VALUES
(1, 1, 'Тормозні колодки Bosch', 'Тормозні колодки Bosch для автомобілей BMW і Audi', 450.00, 50, 'https://autoprotect.ua/pics/prod/big/36848_66726.jpg', 'BMW', '3 Series', 2015, 2020),
(2, 2, 'Масляний фільтр Mann', 'Масляний фільтр Mann для дизельних двигунів Volkswagen', 250.00, 120, 'https://asfilter.com.ua/upload/iblock/f89/MANN_FILTER-W671.jpg', 'Volkswagen', 'Passat', 2010, 2018),
(3, 3, 'Амортизатор KYB', 'Амортизатор KYB для легкових автомобілей Toyota', 650.00, 30, 'https://kyb.biz.ua/image/amortizatori-kyb-agx.jpg', 'Toyota', 'Corolla', 2008, 2015),
(4, 4, 'Свічка зажигания NGK', 'Комплект свічків зажигания NGK для автомобілей Hyundai и Kia', 320.00, 75, 'https://oregon.com.ua/image/cache/catalog/oregon/8/parts-com-v-vspfiles-photos-CMR6A-2-1000x1000.jpg', 'Hyundai', 'Elantra', 2011, 2021),
(5, 1, 'Тормозні диски ATE', 'Тормозні диски ATE для автомобілей Audi A4', 780.00, 20, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOtSUaRSlsxZ8Eft3VNKUb7p9klj4JTleDow&s', 'Audi', 'A4', 2013, 2020),
(2, 2, 'Фільтр салона Bosch', 'Фільтр салона Bosch для автомобілей Mercedes-Benz', 300.00, 100, 'https://vinkod.com.ua/imgs/bosch/0986628540_460x330.jpg', 'Mercedes-Benz', 'C-Class', 2016, 2023);

