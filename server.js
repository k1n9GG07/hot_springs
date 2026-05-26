const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;
const DB_PATH = path.join(__dirname, 'db.json');

app.use(cors());
app.use(express.json());

// Читаем базу данных
function readDB() {
  return JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
}

// Записываем базу данных
function writeDB(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

// ===== USERS =====
app.get('/users', (req, res) => {
  const db = readDB();
  res.json(db.users);
});

app.post('/users', (req, res) => {
  const db = readDB();
  const newUser = { id: Date.now(), ...req.body };
  db.users.push(newUser);
  writeDB(db);
  res.status(201).json(newUser);
});

// ===== CABINS =====
app.get('/cabins', (req, res) => {
  const db = readDB();
  res.json(db.cabins);
});

// ===== BOOKINGS =====
app.get('/bookings', (req, res) => {
  const db = readDB();
  let bookings = db.bookings;

  // Фильтрация по query-параметрам
  if (req.query.userId) {
    bookings = bookings.filter(b => b.userId == req.query.userId);
  }
  if (req.query.cabinId) {
    bookings = bookings.filter(b => b.cabinId == req.query.cabinId);
  }
  if (req.query.date) {
    bookings = bookings.filter(b => b.date === req.query.date);
  }

  res.json(bookings);
});

app.post('/bookings', (req, res) => {
  const db = readDB();
  const newBooking = { id: Date.now(), ...req.body };
  db.bookings.push(newBooking);
  writeDB(db);
  res.status(201).json(newBooking);
});

app.patch('/bookings/:id', (req, res) => {
  const db = readDB();
  const index = db.bookings.findIndex(b => b.id == req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Not found' });
  db.bookings[index] = { ...db.bookings[index], ...req.body };
  writeDB(db);
  res.json(db.bookings[index]);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});