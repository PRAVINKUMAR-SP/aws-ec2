import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Loader from './components/Loader';
import './index.css';

// Lazy loaded components for code splitting
const Login = lazy(() => import('./Login'));
const Register = lazy(() => import('./Register'));
const Home = lazy(() => import('./Home'));
const AdminDashboard = lazy(() => import('./AdminDashboard'));
const ProductForm = lazy(() => import('./ProductForm'));
const ProductDetail = lazy(() => import('./ProductDetail'));
const Cart = lazy(() => import('./Cart'));
const Checkout = lazy(() => import('./Checkout'));
const OrderSuccess = lazy(() => import('./OrderSuccess'));
const Profile = lazy(() => import('./Profile'));
const Orders = lazy(() => import('./Orders'));
const NotFound = lazy(() => import('./NotFound'));

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-page text-gray-900 font-sans">
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-page">
                <Loader size="lg" message="Loading A2Z~cart..." />
            </div>
        }>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/main" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-success" element={<OrderSuccess />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/add" element={<ProductForm />} />
            <Route path="/admin/edit/:id" element={<ProductForm />} />
            {/* Catch-all 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
