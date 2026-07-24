const fs = require('fs');

const code = `import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { Product } from './types';
import { useAuth } from './AuthContext';
import api from './api/axios';
import { AnimatePresence, motion } from 'motion/react';
import { Check } from 'lucide-react';

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

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { user } = useAuth();
  const [toast, setToast] = useState<{ message: string; visible: boolean } | null>(null);

  const showToast = (message: string) => {
    setToast({ message, visible: true });
    setTimeout(() => {
      setToast(prev => prev ? { ...prev, visible: false } : null);
    }, 3000);
  };

  useEffect(() => {
    if (user) {
      const loadCart = async () => {
        try {
          const response = await api.get('/cart');
          let loadedCart: CartItem[] = [];
          if (response.data && response.data.success) {
            loadedCart = response.data.items || [];
          }

          const pendingStr = localStorage.getItem('pendingCartItem');
          if (pendingStr) {
            const pendingItem = JSON.parse(pendingStr) as CartItem;
            loadedCart.push(pendingItem);
            await api.post('/cart', { items: loadedCart });
            showToast('Added to Cart');
            localStorage.removeItem('pendingCartItem');
          }
          setItems(loadedCart);
        } catch (error: any) {
          console.error("Error loading cart from server", error);
        }
      };
      loadCart();
    } else {
      setItems([]);
    }
  }, [user]);

  const syncCart = async (newCart: CartItem[]) => {
    if (user) {
      try {
        await api.post('/cart', { items: newCart });
      } catch (error: any) {
        console.error("Error saving cart to server", error);
      }
    }
  };

  const addToCart = useCallback((item: CartItem) => {
    setItems(prev => {
      const newList = [...prev, item];
      syncCart(newList);
      setIsCartOpen(true);
      return newList;
    });
  }, [user]);

  const clearCart = useCallback(() => {
    setItems([]);
    syncCart([]);
  }, [user]);

  const removeFromCart = useCallback((index: number) => {
    setItems(prev => {
      const newList = prev.filter((_, i) => i !== index);
      syncCart(newList);
      return newList;
    });
  }, [user]);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, clearCart, isCartOpen, setIsCartOpen }}>
      {children}
      <AnimatePresence>
        {toast?.visible && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-[200] bg-black text-white px-6 py-3 rounded-md shadow-2xl flex items-center space-x-3 min-w-max"
          >
            <div className="bg-white/20 p-1 rounded-full">
              <Check className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-medium">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>
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
`;

fs.writeFileSync('src/CartContext.tsx', code);
