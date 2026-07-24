import React, { createContext, useContext, useState } from 'react';
import { Product } from './types';

interface CartItem {
  product: Product;
  quantity: number;
  size: number;
  color: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (index: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (item: CartItem) => {
    setItems(prev => [...prev, item]);
    setIsCartOpen(true);
  };

  const clearCart = () => setItems([]);
  const removeFromCart = (index: number) => {
    setItems(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, clearCart, isCartOpen, setIsCartOpen }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
