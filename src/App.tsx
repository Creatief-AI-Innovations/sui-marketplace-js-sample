import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/AuthContext';
import { PrivateRoute } from './components/auth/PrivateRoute';
import { Login } from './pages/Login';
import { Products } from './pages/Products';
import { MyProducts } from './pages/MyProducts';

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/products"
            element={
              <PrivateRoute>
                <Products />
              </PrivateRoute>
            }
          />
          <Route
            path="/my-products"
            element={
              <PrivateRoute>
                <MyProducts />
              </PrivateRoute>
            }
          />
          {/*<Route*/}
          {/*  path="/user/:userId/products"*/}
          {/*  element={*/}
          {/*    <PrivateRoute>*/}
          {/*      <UserProducts />*/}
          {/*    </PrivateRoute>*/}
          {/*  }*/}
          {/*/>*/}
          <Route path="/" element={<Navigate to="/products" replace />} />
        </Routes>
        <ToastContainer />
      </AuthProvider>
    </Router>
  );
};

export default App;