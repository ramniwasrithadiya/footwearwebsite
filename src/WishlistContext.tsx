import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { Product } from './types';
import { useAuth } from './AuthContext';
import { db } from './lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { AnimatePresence, motion } from 'motion/react';
import { Check } from 'lucide-react';

interface WishlistContextType {
  wishlist: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const { user } = useAuth();
  
  const [toast, setToast] = useState<{ message: string; visible: boolean } | null>(null);

  const showToast = (message: string) => {
    setToast({ message, visible: true });
    setTimeout(() => {
      setToast(prev => prev ? { ...prev, visible: false } : null);
    }, 3000);
  };

  // Load wishlist from Firestore
  useEffect(() => {
    if (user) {
      const loadWishlist = async () => {
        try {
          const docRef = doc(db, 'wishlists', user.uid);
          const docSnap = await getDoc(docRef);
          let loadedWishlist: Product[] = [];
          
          if (docSnap.exists()) {
            loadedWishlist = docSnap.data().items || [];
          }
          
          const pendingStr = localStorage.getItem('pendingWishlistProduct');
          if (pendingStr) {
            const pendingProduct = JSON.parse(pendingStr) as Product;
            if (!loadedWishlist.find(p => p.id === pendingProduct.id)) {
              loadedWishlist.push(pendingProduct);
              await setDoc(docRef, { items: loadedWishlist, updatedAt: new Date().toISOString() });
              showToast('Added to Wishlist');
            }
            localStorage.removeItem('pendingWishlistProduct');
          }

          setWishlist(loadedWishlist);
        } catch (error) {
          console.error("Error loading wishlist", error);
        }
      };
      loadWishlist();
    } else {
      setWishlist([]);
    }
  }, [user]);

  // Sync wishlist to Firestore
  const syncWishlist = async (newWishlist: Product[]) => {
    if (user) {
      try {
        await setDoc(doc(db, 'wishlists', user.uid), {
          items: newWishlist,
          updatedAt: new Date().toISOString()
        });
      } catch (error) {
        console.error("Error saving wishlist", error);
      }
    }
  };

  const addToWishlist = useCallback((product: Product) => {
    setWishlist(prev => {
      if (prev.find(p => p.id === product.id)) return prev;
      const newList = [...prev, product];
      syncWishlist(newList);
      showToast('Added to Wishlist');
      return newList;
    });
  }, [user]);

  const removeFromWishlist = useCallback((productId: string) => {
    setWishlist(prev => {
      const newList = prev.filter(p => p.id !== productId);
      syncWishlist(newList);
      showToast('Removed from Wishlist');
      return newList;
    });
  }, [user]);

  const isInWishlist = useCallback((productId: string) => {
    return wishlist.some(p => p.id === productId);
  }, [wishlist]);

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist }}>
      {children}
      {/* Toast Notification */}
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
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
