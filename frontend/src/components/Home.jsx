import React, { useState, useEffect } from 'react';
import {
  addExpense,
  getExpenses,
  deleteExpense,
  updateExpense,
  addIncome,
  getIncome,
  deleteIncome,
} from '../api/api';
import { useNavigate } from 'react-router-dom';
import IncomeExpenseChart from './IncomeExpenseChart'; 

const Home = ({ isLoggedIn, setIsLoggedIn }) => {
  const [expenses, setExpenses] = useState([]);
  const [income, setIncome] = useState([]);
  const [newExpense, setNewExpense] = useState({
    description: '',
    amount: '',
    date: '',
  });
  const [newIncome, setNewIncome] = useState({
    description: '',
    amount: '',
    date: '',
  });
  const [editingExpense, setEditingExpense] = useState(null);
  const [editingIncome, setEditingIncome] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'income', 'expenses'
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  // Redirect to login if not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  // Fetch expenses and income on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const expensesData = await getExpenses(token);
        const incomeData = await getIncome(token);
        setExpenses(expensesData);
        setIncome(incomeData);
      } catch (error) {
        console.log(error)
      }
    };
    fetchData();
  }, [token]);

  // Calculate totals
  const totalIncome = income.reduce((total, item) => total + item.amount, 0);
  const totalExpenses = expenses.reduce((total, item) => total + item.amount, 0);
  const totalBalance = totalIncome - totalExpenses;

  // Filtered data based on the selected filter
  const filteredData = () => {
    if (filter === 'income') {
      return income.filter((item) =>
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else if (filter === 'expenses') {
      return expenses.filter((item) =>
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      return [...income, ...expenses].filter((item) =>
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  };

  // Add expense
  const handleAddExpense = async (e) => {
    e.preventDefault();
    try {
      const expense = await addExpense(newExpense, token);
      setExpenses([...expenses, expense]);
      setNewExpense({ description: '', amount: '', date: '' });
    } catch (error) {
      alert('Failed to add expense.');
    }
  };

  // Add income
  const handleAddIncome = async (e) => {
    e.preventDefault();
    try {
      const incomeItem = await addIncome(newIncome, token);
      setIncome([...income, incomeItem]);
      setNewIncome({ description: '', amount: '', date: '' });
    } catch (error) {
      alert('Failed to add income.');
    }
  };

  // Delete expense
  const handleDeleteExpense = async (id) => {
    try {
      await deleteExpense(id, token);
      setExpenses(expenses.filter((expense) => expense._id !== id));
    } catch (error) {
      alert('Failed to delete expense.');
    }
  };

  // Delete income
  const handleDeleteIncome = async (id) => {
    try {
      await deleteIncome(id, token);
      setIncome(income.filter((incomeItem) => incomeItem._id !== id));
    } catch (error) {
      alert('Failed to delete income.');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-8">
          <h1 className="mb-4">Expense Tracker</h1>
          <div className="card mb-4">
            <div className="card-body shadow">
              <div className="row">
                <div className="col-md-4">
                  <h5 className="card-title">Total Income</h5>
                  <h2 className="card-text text-success">${totalIncome}</h2>
                </div>
                <div className="col-md-4">
                  <h5 className="card-title">Total Expenses</h5>
                  <h2 className="card-text text-danger">${totalExpenses}</h2>
                </div>
                <div className="col-md-4">
                  <h5 className="card-title">Total Balance</h5>
                  <h2 className="card-text">${totalBalance}</h2>
                </div>
              </div>
            </div>
          </div>

          {/* Chart */}
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">Income and Expenses</h5>
              <IncomeExpenseChart income={totalIncome} expenses={totalExpenses} />
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="mb-3">
            <button
              className={`btn btn-outline-primary me-2 ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All
            </button>
            <button
              className={`btn btn-outline-success me-2 ${filter === 'income' ? 'active' : ''}`}
              onClick={() => setFilter('income')}
            >
              Income
            </button>
            <button
              className={`btn btn-outline-danger ${filter === 'expenses' ? 'active' : ''}`}
              onClick={() => setFilter('expenses')}
            >
              Expenses
            </button>
          </div>

          {/* Search Bar */}
          <div className="mb-3 shadow-sm">
            <input
              type="text"
              className="form-control"
              placeholder="Search by description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <h3 className="mb-3">Recent Transactions</h3>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Description</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Type</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData().map((item) => (
                <tr key={item._id}>
                  <td>{item.description}</td>
                  <td>${item.amount}</td>
                  <td>{new Date(item.date).toLocaleDateString()}</td>
                  <td>{income.includes(item) ? 'Income' : 'Expense'}</td>
                  <td>
                    {income.includes(item) ? (
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDeleteIncome(item._id)}
                      >
                        Delete
                      </button>
                    ) : (
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDeleteExpense(item._id)}
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="col-md-4">
          {/* Add Expense Form */}
          <div className="card mb-4">
            <div className="card-body shadow">
              <h5 className="card-title">Add Expense</h5>
              <form onSubmit={handleAddExpense}>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="description"
                    placeholder="Enter description"
                    value={newExpense.description}
                    onChange={(e) =>
                      setNewExpense({ ...newExpense, description: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="amount" className="form-label">
                    Amount
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="amount"
                    placeholder="Enter amount"
                    value={newExpense.amount}
                    onChange={(e) =>
                      setNewExpense({ ...newExpense, amount: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="date" className="form-label">
                    Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="date"
                    value={newExpense.date}
                    onChange={(e) =>
                      setNewExpense({ ...newExpense, date: e.target.value })
                    }
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Add Expense
                </button>
              </form>
            </div>
          </div>

          {/* Add Income Form */}
          <div className="card">
            <div className="card-body shadow">
              <h5 className="card-title">Add Income</h5>
              <form onSubmit={handleAddIncome}>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="description"
                    placeholder="Enter description"
                    value={newIncome.description}
                    onChange={(e) =>
                      setNewIncome({ ...newIncome, description: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="amount" className="form-label">
                    Amount
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="amount"
                    placeholder="Enter amount"
                    value={newIncome.amount}
                    onChange={(e) =>
                      setNewIncome({ ...newIncome, amount: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="date" className="form-label">
                    Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="date"
                    value={newIncome.date}
                    onChange={(e) =>
                      setNewIncome({ ...newIncome, date: e.target.value })
                    }
                  />
                </div>
                <button type="submit" className="btn btn-success w-100">
                  Add Income
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;