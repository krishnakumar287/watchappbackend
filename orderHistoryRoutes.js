const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const HISTORY_FILE = path.join(__dirname, '../orderHistory.json');

// Helper to read/write order history
function readHistory() {
  if (!fs.existsSync(HISTORY_FILE)) return [];
  return JSON.parse(fs.readFileSync(HISTORY_FILE, 'utf-8'));
}
function writeHistory(history) {
  fs.writeFileSync(HISTORY_FILE, JSON.stringify(history, null, 2));
}

// Get all order history
router.get('/', (req, res) => {
  res.json(readHistory());
});

// Add a new order (expects array of orders)
router.post('/', (req, res) => {
  const orders = req.body;
  if (!Array.isArray(orders)) return res.status(400).json({ message: 'Invalid order data' });
  const history = readHistory();
  orders.forEach(order => {
    history.unshift({ ...order, date: new Date().toISOString() });
  });
  writeHistory(history);
  res.json({ message: 'Order(s) saved', count: orders.length });
});

module.exports = router;
