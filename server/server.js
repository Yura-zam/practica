const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 8081;
const secretKey = '20252025';

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '../public')));

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

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/api/user/profile_image', upload.single('image'), (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      res.status(401).json({ message: 'Невірний токен' });
      return;
    }
    const imageBuffer = req.file.buffer;
    const query = 'UPDATE users SET profile_image = ? WHERE id = ?';
    db.query(query, [imageBuffer, decoded.id], (err, results) => {
      if (err) {
        console.error('Помилка при завантаженні фото профілю:', err);
        res.status(500).json({ message: 'Помилка при завантаженні фото профілю' });
        return;
      }
      res.status(200).json({ message: 'Фото профілю успішно завантажено' });
    });
  });
});

app.get('/api/user/profile_image', (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      res.status(401).json({ message: 'Невірний токен' });
      return;
    }
    const query = 'SELECT profile_image FROM users WHERE id = ?';
    db.query(query, [decoded.id], (err, results) => {
      if (err) {
        console.error('Помилка при отриманні фото профілю:', err);
        res.status(500).json({ message: 'Помилка при отриманні фото профілю' });
        return;
      }
      if (results.length === 0 || !results[0].profile_image) {
        res.status(404).json({ message: 'Фото профілю не знайдено' });
        return;
      }
      res.set('Content-Type', 'image/jpeg');
      res.send(results[0].profile_image);
    });
  });
});

app.post('/api/register', async (req, res) => {
  const { username, email, password, full_name, phone, address } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
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

app.post('/api/products', (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      res.status(401).json({ message: 'Невірний токен' });
      return;
    }
    if (decoded.role !== 'manager' && decoded.role !== 'admin') {
      res.status(403).json({ message: 'Недостатньо прав для додавання продукту' });
      return;
    }
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
});

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

app.post('/api/carts', (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      res.status(401).json({ message: 'Невірний токен' });
      return;
    }
    const { product_id, quantity } = req.body;
    const query = 'INSERT INTO carts (user_id, product_id, quantity) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE quantity = quantity + ?';
    db.query(query, [decoded.id, product_id, quantity, quantity], (err, results) => {
      if (err) {
        console.error('Помилка при додаванні товару до кошика:', err);
        res.status(500).json({ message: 'Помилка при додаванні товару до кошика' });
        return;
      }
      res.status(200).json({ message: 'Товар успішно додано до кошика' });
    });
  });
});

app.get('/api/carts', (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      res.status(401).json({ message: 'Невірний токен' });
      return;
    }
    const query = 'SELECT carts.id, products.name, products.price, carts.quantity FROM carts JOIN products ON carts.product_id = products.id WHERE carts.user_id = ?';
    db.query(query, [decoded.id], (err, results) => {
      if (err) {
        console.error('Помилка при отриманні товарів з кошика:', err);
        res.status(500).json({ message: 'Помилка при отриманні товарів з кошика' });
        return;
      }
      res.json(results);
    });
  });
});

app.get('/api/purchase-history', (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      res.status(401).json({ message: 'Невірний токен' });
      return;
    }
    const query = 'SELECT orders.id, products.name, products.price, order_items.quantity, orders.created_at FROM orders JOIN order_items ON orders.id = order_items.order_id JOIN products ON order_items.product_id = products.id WHERE orders.user_id = ? ORDER BY orders.created_at DESC';
    db.query(query, [decoded.id], (err, results) => {
      if (err) {
        console.error('Помилка при отриманні історії покупок:', err);
        res.status(500).json({ message: 'Помилка при отриманні історії покупок' });
        return;
      }
      res.json(results);
    });
  });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Сервер працює на порту ${port}`);
});