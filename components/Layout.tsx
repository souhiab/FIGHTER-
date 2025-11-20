import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, User as UserIcon, Shield } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { api } from '../services/api';

const Layout: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { itemCount } = useCart();
  const location = useLocation();
  const currentUser = api.auth.getCurrentUser();

  const navLinks = [
    { name: 'Men', path: '/men' },
    { name: 'Women', path: '/women' },
    { name: 'Best Selling', path: '/best-selling' },
    { name: 'Blog', path: '/blog' },
    { name: 'About', path: '/about' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-brand-black text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-brand-gray bg-brand-black/95 backdrop-blur">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Mobile Menu Button */}
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden p-2 text-white">
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <Shield className="h-8 w-8 text-brand-gold group-hover:text-white transition-colors" />
            <span className="text-2xl font-heading font-bold tracking-tighter">FIGHTER</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-bold uppercase tracking-wider hover:text-brand-gold transition-colors ${location.pathname === link.path ? 'text-brand-gold' : 'text-gray-300'}`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
             {currentUser?.role === 'admin' && (
                <Link to="/admin" className="hidden md:block text-xs font-bold bg-brand-gray px-2 py-1 rounded text-brand-gold">
                  ADMIN
                </Link>
             )}
            <Link to="/contact" className="hidden md:block text-gray-400 hover:text-white">
              <UserIcon size={20} />
            </Link>
            <Link to="/cart" className="relative p-2 hover:text-brand-gold transition-colors">
              <ShoppingBag size={22} />
              {itemCount > 0 && (
                <span className="absolute top-0 right-0 bg-brand-gold text-brand-black text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 w-full bg-brand-black border-b border-brand-gray py-4 px-4 flex flex-col gap-4 shadow-2xl">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-bold uppercase tracking-wider py-2 border-b border-brand-gray"
              >
                {link.name}
              </Link>
            ))}
             {currentUser?.role === 'admin' && (
                <Link to="/admin" onClick={() => setIsMobileMenuOpen(false)} className="text-brand-gold font-bold py-2">
                  Admin Dashboard
                </Link>
             )}
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-brand-dark border-t border-brand-gray pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Shield className="h-6 w-6 text-brand-gold" />
                <span className="text-xl font-heading font-bold">FIGHTER</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Premium performance wear designed for calisthenics athletes and bodybuilders. No days off.
              </p>
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg mb-4">Shop</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link to="/men" className="hover:text-brand-gold">Men</Link></li>
                <li><Link to="/women" className="hover:text-brand-gold">Women</Link></li>
                <li><Link to="/best-selling" className="hover:text-brand-gold">Best Sellers</Link></li>
                <li><Link to="/size-guide" className="hover:text-brand-gold">Size Guide</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link to="/faq" className="hover:text-brand-gold">FAQ</Link></li>
                <li><Link to="/shipping" className="hover:text-brand-gold">Shipping & Returns</Link></li>
                <li><Link to="/contact" className="hover:text-brand-gold">Contact Us</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg mb-4">Stay Updated</h3>
              <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Enter email"
                  className="bg-brand-black border border-brand-gray px-4 py-2 text-sm w-full focus:border-brand-gold outline-none transition-colors"
                />
                <button className="bg-white text-brand-black font-bold px-4 py-2 text-sm hover:bg-brand-gold transition-colors">
                  JOIN
                </button>
              </form>
            </div>
          </div>
          <div className="border-t border-brand-gray pt-8 text-center text-gray-500 text-xs">
            © {new Date().getFullYear()} Fighter Brand. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;