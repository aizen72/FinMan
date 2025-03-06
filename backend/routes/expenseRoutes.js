const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { addExpense, getExpenses, deleteExpense, updateExpense } = require('../controllers/expenseController');

const router = express.Router();

router.post('/', authMiddleware, addExpense);
router.get('/', authMiddleware, getExpenses);
router.delete('/:id', authMiddleware, deleteExpense);
router.put('/:id', authMiddleware, updateExpense); // Add this line

module.exports = router;