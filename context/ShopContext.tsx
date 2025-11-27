import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CartItem, UserProfile } from '../types';

interface ShopContextType {
  cart: CartItem[];
  user: UserProfile;
  isCartOpen: boolean;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  toggleCart: () => void;
  clearCart: () => void;
  getCartTotal: () => number;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [user] = useState<UserProfile>({
    name: 'Guest',
    points: 0,
    tier: 'Guest'
  });

  const addToCart = (item: CartItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, item];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(i => i.id !== id));
  };

  const toggleCart = () => setIsCartOpen(!isCartOpen);
  
  const clearCart = () => setCart([]);

  const getCartTotal = () => cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <ShopContext.Provider value={{ cart, user, isCartOpen, addToCart, removeFromCart, toggleCart, clearCart, getCartTotal }}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) throw new Error('useShop must be used within a ShopProvider');
  return context;
};