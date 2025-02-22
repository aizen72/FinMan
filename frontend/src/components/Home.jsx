import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
  const [expenses, setExpenses] = useState([
    { id: 1, description: 'Groceries', amount: 50, date: '2023-10-01' },
    { id: 2, description: 'Transport', amount: 20, date: '2023-10-02' },
    { id: 3, description: 'Entertainment', amount: 30, date: '2023-10-03' },
  ]);

  const [newExpense, setNewExpense] = useState({
    description: '',
    amount: '',
    date: '',
  });

  const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setNewExpense({ ...newExpense, [id]: value });
  };

  const handleAddExpense = (e) => {
    e.preventDefault();

    if (!newExpense.description || !newExpense.amount || !newExpense.date) {
      alert('Please fill in all fields.');
      return;
    }

    const expense = {
      id: expenses.length + 1, 
      description: newExpense.description,
      amount: parseFloat(newExpense.amount), 
      date: newExpense.date,
    };

    setExpenses([...expenses, expense]);

    setNewExpense({ description: '', amount: '', date: '' });
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-8">
          <h1 className="mb-4">Expense Tracker</h1>
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">Total Expenses</h5>
              <h2 className="card-text">${totalExpenses}</h2>
            </div>
          </div>

          <h3 className="mb-3">Recent Expenses</h3>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Description</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense) => (
                <tr key={expense.id}>
                  <td>{expense.description}</td>
                  <td>${expense.amount}</td>
                  <td>{expense.date}</td>
                  <td>
                    <button className="btn btn-sm btn-danger me-2">Delete</button>
                    <button className="btn btn-sm btn-warning">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Add New Expense</h5>
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
                    onChange={handleInputChange}
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
                    onChange={handleInputChange}
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
                    onChange={handleInputChange}
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Add Expense
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