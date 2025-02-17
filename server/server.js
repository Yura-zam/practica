const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
const port = 8080;
const secretKey = '20252025';

app.use(bodyParser.json());
app.use(cors());

// Підключення до бази даних
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Zamyra_18',
  database: 'auto_parts_store'
});

db.connect((err) => {
  if (err) {
    console.error('Помилка з\'єднання з БД:', err);
    return;
  }
  console.log('Підключено до бази даних MySQL');
});

// Реєстрація користувача
app.post('/api/register', async (req, res) => {
  const { username, email, password, full_name, phone, address } = req.body;

  // Хешування пароля
  const hashedPassword = await bcrypt.hash(password, 10);

  // Вставка нового користувача в базу даних
  const query = 'INSERT INTO users (username, email, password_hash, full_name, phone, address) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(query, [username, email, hashedPassword, full_name, phone, address], (err, results) => {
    if (err) {
      console.error('Помилка при реєстрації:', err);
      res.status(500).json({ message: 'Помилка при реєстрації' });
    } else {
      res.status(200).json({ message: 'Користувач успішно зареєстрований' });
    }
  });
});

// Вхід користувача
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], async (err, results) => {
    if (err) {
      console.error('Помилка при вході:', err);
      res.status(500).json({ message: 'Помилка при вході' });
      return;
    }
    if (results.length === 0) {
      res.status(401).json({ message: 'Невірний email або пароль' });
      return;
    }
    const user = results[0];
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      res.status(401).json({ message: 'Невірний email або пароль' });
      return;
    }
    const token = jwt.sign({ id: user.id, username: user.username, email: user.email }, secretKey, { expiresIn: '1h' });
    res.json({ token });
  });
});

// Отримання даних користувача
app.get('/api/user', (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      res.status(401).json({ message: 'Невірний токен' });
      return;
    }
    const query = 'SELECT id, username, email, full_name, phone, address FROM users WHERE id = ?';
    db.query(query, [decoded.id], (err, results) => {
      if (err) {
        console.error('Помилка при отриманні даних користувача:', err);
        res.status(500).json({ message: 'Помилка при отриманні даних користувача' });
        return;
      }
      res.json(results[0]);
    });
  });
});
// Додавання нового продукту
app.post('/api/products', (req, res) => {
  const { name, description, price, image, category_id, manufacturer_id } = req.body;
  const query = 'INSERT INTO products (name, description, price, image, category_id, manufacturer_id) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(query, [name, description, price, image, category_id, manufacturer_id], (err, results) => {
    if (err) {
      console.error('Помилка при додаванні продукту:', err);
      res.status(500).json({ message: 'Помилка при додаванні продукту' });
      return;
    }
    res.status(200).json({ message: 'Продукт успішно додано' });
  });
});

// Отримання категорій
app.get('/api/categories', (req, res) => {
  const query = 'SELECT * FROM categories';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Помилка при отриманні категорій:', err);
      res.status(500).json({ message: 'Помилка при отриманні категорій' });
      return;
    }
    res.json(results);
  });
});

// Отримання виробників
app.get('/api/manufacturers', (req, res) => {
  const query = 'SELECT * FROM manufacturers';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Помилка при отриманні виробників:', err);
      res.status(500).json({ message: 'Помилка при отриманні виробників' });
      return;
    }
    res.json(results);
  });
});

// Отримання продуктів
app.get('/api/products', (req, res) => {
  const query = 'SELECT * FROM products';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Помилка при отриманні продуктів:', err);
      res.status(500).json({ message: 'Помилка при отриманні продуктів' });
      return;
    }
    res.json(results);
  });
});

// Додавання продукту до кошика
app.post('/api/cart', (req, res) => {
  const { user_id, product_id, quantity } = req.body;
  const query = 'INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)';
  db.query(query, [user_id, product_id, quantity], (err, results) => {
    if (err) {
      console.error('Помилка при додаванні до кошика:', err);
      res.status(500).json({ message: 'Помилка при додаванні до кошика' });
      return;
    }
    res.status(200).json({ message: 'Продукт додано до кошика' });
  });
});

// Отримання продуктів з кошика
app.get('/api/cart/:user_id', (req, res) => {
  const { user_id } = req.params;
  const query = `
    SELECT products.id, products.name, products.price, cart.quantity
    FROM cart
    JOIN products ON cart.product_id = products.id
    WHERE cart.user_id = ?
  `;
  db.query(query, [user_id], (err, results) => {
    if (err) {
      console.error('Помилка при отриманні кошика:', err);
      res.status(500).json({ message: 'Помилка при отриманні кошика' });
      return;
    }
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Сервер працює на порту ${port}`);
});