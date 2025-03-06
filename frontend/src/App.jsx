import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Track login status
  const navigate = useNavigate();

  // Check if the user is logged in on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true); // User is logged in
    } else {
      setIsLoggedIn(false); // User is not logged in
    }
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token
    setIsLoggedIn(false); // Update login status
    navigate('/login'); // Redirect to login page
  };

  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
        <div className="container">
          <Link className="navbar-brand" to="/">
            💸 FinMan App
          </Link>
          <div className="navbar-nav">
            { isLoggedIn && (
              <button className="btn btn-danger" onClick={handleLogout}>
                Logout
              </button>
            ) }
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/register" element={<Register setIsLoggedIn={setIsLoggedIn} />} />
      </Routes>
    </div>
  );
};

// Wrap App with Router
const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
