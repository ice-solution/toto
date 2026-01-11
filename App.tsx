import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ShopProvider, useShop } from './context/ShopContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ChatBot from './components/ChatBot';
import Home from './pages/Home';
import About from './pages/About';
import Membership from './pages/Membership';
import Services from './pages/Services';
import Products from './pages/Products';
import Courses from './pages/Courses';
import Blog from './pages/Blog';
import BlogPostDetail from './pages/BlogPostDetail';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import Payment from './pages/Payment';
import { X, Trash2, ShoppingBag } from 'lucide-react';
import { Button } from './components/UIComponents';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const CartDrawer = () => {
  const { cart, isCartOpen, toggleCart, removeFromCart, getCartTotal, clearCart } = useShop();

  const handleCheckout = () => {
    if (cart.length === 0) return;
    
    // Construct WhatsApp Message
    const itemsList = cart.map(item => `- ${item.name} (${item.type === 'product' ? '靈物' : '服務'}) x${item.quantity} ($${item.price * item.quantity})`).join('%0A');
    const total = getCartTotal();
    const text = `你好，我想預約/購買以下項目：%0A%0A${itemsList}%0A%0A總計: HK$${total}%0A%0A請協助安排付款及送貨/預約詳情。`;
    
    window.open(`https://wa.me/85212345678?text=${text}`, '_blank');
  };

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 z-[60] transition-opacity duration-300 ${isCartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={toggleCart}
      />
      
      {/* Drawer */}
      <div className={`fixed top-0 right-0 h-full w-[100%] md:w-[400px] bg-white z-[70] shadow-2xl transform transition-transform duration-300 flex flex-col ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-xl font-serif">您的預約/購物清單</h2>
          <button onClick={toggleCart} className="hover:rotate-90 transition-transform"><X className="w-6 h-6" /></button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400">
              <ShoppingBag className="w-12 h-12 mb-4 opacity-20" />
              <p>清單暫時為空</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="flex gap-4">
                <div className="w-20 h-20 bg-gray-100 overflow-hidden shrink-0">
                  {/* Simplistic placeholder for now, ideally pass image url in cart item */}
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center text-xs text-gray-400 font-serif">
                    {item.type === 'service' ? 'SERVICE' : item.type === 'course' ? 'COURSE' : 'PRODUCT'}
                  </div>
                </div>
                <div className="flex-grow">
                  <h4 className="font-serif text-sm mb-1 line-clamp-2">{item.name}</h4>
                  <p className="text-[10px] text-gray-500 mb-2 uppercase tracking-wide">{item.type}</p>
                  <div className="flex justify-between items-center">
                    <span className="font-bold">HK${item.price.toLocaleString()}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-500">x{item.quantity}</span>
                      <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-500">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-6 border-t border-gray-100 bg-gray-50">
           <div className="flex justify-between mb-4 text-lg font-bold">
             <span>總計</span>
             <span>HK${getCartTotal().toLocaleString()}</span>
           </div>
           <div className="flex gap-4">
             <Button variant="outline" className="flex-1 text-xs" onClick={clearCart}>清空</Button>
             <Button variant="primary" className="flex-[2]" onClick={handleCheckout}>WhatsApp 結帳</Button>
           </div>
           <p className="text-[10px] text-center text-gray-400 mt-4">
             點擊結帳將轉跳至 WhatsApp 進行人工確認
           </p>
        </div>
      </div>
    </>
  );
};

const App = () => {
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith('/admin');

  return (
    <div className="min-h-screen bg-white text-black font-serif flex flex-col">
      {!isAdmin && <Navbar />}
      {!isAdmin && <CartDrawer />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/membership" element={<Membership />} />
          <Route path="/services" element={<Services />} />
          <Route path="/products" element={<Products />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPostDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/payment/:id" element={<Payment />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
      {!isAdmin && <Footer />}
      {!isAdmin && <ChatBot />}
    </div>
  );
};

const AppWrapper = () => (
  <ShopProvider>
    <Router>
      <ScrollToTop />
      <App />
    </Router>
  </ShopProvider>
);

export default AppWrapper;