import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Admin from './pages/Admin';

// Simple components for pages not fully implemented in this demo
const Blog = () => <div className="min-h-screen bg-brand-black text-white flex items-center justify-center">Blog Index (Coming Soon)</div>;
const About = () => <div className="min-h-screen bg-brand-black text-white flex items-center justify-center">About Page (Coming Soon)</div>;

const App: React.FC = () => {
  return (
    <HashRouter>
      <CartProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="men" element={<Shop category="Men" />} />
            <Route path="women" element={<Shop category="Women" />} />
            <Route path="best-selling" element={<Shop bestSellersOnly />} />
            <Route path="product/:slug" element={<ProductDetail />} />
            <Route path="cart" element={<Cart />} />
            <Route path="blog" element={<Blog />} />
            <Route path="about" element={<About />} />
            
            {/* Catch-all and redirects */}
            <Route path="contact" element={<About />} />
            <Route path="faq" element={<About />} />
          </Route>
          
          {/* Admin Route (Separate Layout usually, but kept simple here) */}
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </CartProvider>
    </HashRouter>
  );
};

export default App;