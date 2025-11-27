import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useShop } from '../context/ShopContext';

const NAV_LINKS = [
  { path: '/', label: '首頁' },
  { path: '/membership', label: '會員制度' },
  { path: '/services', label: '玄學服務' },
  { path: '/products', label: '靈物加持' }, // New Link
  { path: '/courses', label: '靈修課程' },
  { path: '/blog', label: '命運專題' }, // New Link
  { path: '/about', label: '關於師傅' },
  { path: '/contact', label: '聯絡我們' },
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cart, toggleCart } = useShop();
  const location = useLocation();

  return (
    <nav className="fixed w-full z-50 bg-white shadow-sm py-4 transition-all duration-300">
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-serif tracking-widest font-bold z-50 text-black">
          杜乾彰<span className="text-xs block font-sans font-normal tracking-[0.3em]">MASTER DU</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
          {NAV_LINKS.map(link => (
            <Link 
              key={link.path}
              to={link.path} 
              className={`text-xs xl:text-sm tracking-widest uppercase text-black hover:text-accent transition-colors ${location.pathname === link.path ? 'border-b border-black' : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-6 z-50">
          <button onClick={toggleCart} className="relative group">
            <ShoppingBag className="w-5 h-5 text-black" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </button>
          
          <button className="lg:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="w-6 h-6 text-black" /> : <Menu className="w-6 h-6 text-black" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-white z-40 flex flex-col items-center justify-center space-y-6 lg:hidden">
          {NAV_LINKS.map(link => (
            <Link 
              key={link.path}
              to={link.path} 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-lg font-serif tracking-widest"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;