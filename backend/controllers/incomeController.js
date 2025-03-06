const Income = require('../models/Income');

// Add a new income
const addIncome = async (req, res) => {
  const { description, amount, date } = req.body;

  try {
    const income = new Income({
      description,
      amount,
      date,
      user: req.user.id,
    });

    await income.save();
    res.status(201).json(income);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all income for a user
const getIncome = async (req, res) => {
  try {
    const income = await Income.find({ user: req.user.id });
    res.json(income);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete an income
const deleteIncome = async (req, res) => {
  try {
    const income = await Income.findById(req.params.id);
    if (!income) {
      return res.status(404).json({ message: 'Income not found' });
    }

    // Check if the income belongs to the user
    if (income.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await income.deleteOne();
    res.json({ message: 'Income deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { addIncome, getIncome, deleteIncome };