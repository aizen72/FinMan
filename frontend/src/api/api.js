import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

export const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}/auth/register`, userData);
  return response.data;
};

export const loginUser = async (userData) => {
  const response = await axios.post(`${API_URL}/auth/login`, userData);
  return response.data;
};

export const addExpense = async (expenseData, token) => {
  const response = await axios.post(`${API_URL}/expenses`, expenseData, {
    headers: {
      'x-auth-token': token,
    },
  });
  return response.data;
};

export const getExpenses = async (token) => {
  const response = await axios.get(`${API_URL}/expenses`, {
    headers: {
      'x-auth-token': token,
    },
  });
  return response.data;
};

export const updateExpense = async (id, expenseData, token) => {
  try {
    const response = await axios.put(`http://localhost:8000/api/expenses/${id}`, expenseData, {
      headers: {
        'x-auth-token': token,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating expense:', error);
    throw error;
  }
};

export const deleteExpense = async (id, token) => {
  try {
    const response = await axios.delete(`${API_URL}/expenses/${id}`, {
        headers: {
          'x-auth-token': token,
        },
      });
      return response.data;
  } catch (error) {
    console.error('Error deleting expense:', error); 
    throw error;
  }
};

export const addIncome = async (incomeData, token) => {
  try {
    const response = await axios.post('http://localhost:8000/api/income', incomeData, {
      headers: {
        'x-auth-token': token,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error adding income:', error);
    throw error;
  }
};

export const getIncome = async (token) => {
  try {
    const response = await axios.get('http://localhost:8000/api/income', {
      headers: {
        'x-auth-token': token,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching income:', error);
    throw error;
  }
};

export const deleteIncome = async (id, token) => {
  try {
    const response = await axios.delete(`${API_URL}/income/${id}`, {
      headers: {
        'x-auth-token': token,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting income:', error);
    throw error;
  }
};