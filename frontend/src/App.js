import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import { logout } from './services/api';
import './App.css';

/**
 * Main App Component
 * Manages authentication state and renders either Login or Dashboard
 * Checks for existing token in localStorage on mount
 */
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  /**
   * Check if user is already authenticated on component mount
   */
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Token exists, consider user authenticated
      // In production, you might want to verify token validity
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  /**
   * Handle successful login
   * @param {Object} userData - User data from API
   * @param {string} token - JWT token
   */
  const handleLoginSuccess = (userData, token) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  /**
   * Handle logout
   */
  const handleLogout = () => {
    logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="App min-h-screen bg-gray-50">
      {isAuthenticated ? (
        <>
          {/* Logout Button */}
          <div className="bg-white shadow-sm border-b">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
              <div className="text-sm text-gray-600">
                {user && `Logged in as: ${user.email}`}
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm text-red-600 hover:text-red-800 font-medium"
              >
                Logout
              </button>
            </div>
          </div>
          <Dashboard />
        </>
      ) : (
        <Login onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  );
}

export default App;
