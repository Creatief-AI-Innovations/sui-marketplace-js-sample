import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export const Header: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-gray-900 shadow">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-xl font-bold text-indigo-400">
                Collections
              </Link>
            </div>
            {isAuthenticated && (
              <div className="ml-6 flex space-x-8">
                <Link
                  to="/my-products"
                  className="inline-flex items-center px-1 pt-1 text-gray-100"
                >
                  Owned
                </Link>
              </div>
            )}
          </div>
          <div className="flex items-center">
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="ml-4 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};