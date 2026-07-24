import { X, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../CartContext';
import { Link } from 'react-router-dom';

export function CartSidebar() {
  const { items, isCartOpen, setIsCartOpen, removeFromCart } = useCart();

  if (!isCartOpen) return null;

  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm"
        onClick={() => setIsCartOpen(false)}
      />
      <div className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white z-[70] shadow-2xl flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-rose-100">
          <h2 className="text-xl font-serif text-rose-950 flex items-center">
            <ShoppingBag className="w-5 h-5 mr-2" /> Shopping Bag ({items.length})
          </h2>
          <button 
            onClick={() => setIsCartOpen(false)}
            className="text-gray-500 hover:text-rose-950 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <ShoppingBag className="w-12 h-12 mb-4 text-rose-200" />
              <p>Your bag is empty.</p>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="mt-6 px-6 py-3 bg-rose-400 text-white font-medium hover:bg-rose-500 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item, index) => (
                <div key={index} className="flex gap-4 border-b border-rose-100 pb-6">
                  <img src={item.product.image} alt={item.product.name} className="w-20 h-24 object-cover" />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="text-sm font-medium text-rose-950">{item.product.name}</h3>
                      <button 
                        onClick={() => removeFromCart(index)}
                        className="text-gray-400 hover:text-rose-600 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-xs text-rose-700 mt-1">Size: {item.size} | Color: {item.color}</p>
                    <div className="flex justify-between items-center mt-3">
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      <p className="text-sm font-medium text-rose-950">
                        &#8377;{(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t border-rose-100 bg-rose-50/50">
            <div className="flex justify-between items-center mb-4 text-rose-950">
              <span className="font-medium">Subtotal</span>
              <span className="text-lg font-medium">&#8377;{total.toLocaleString('en-IN')}</span>
            </div>
            <p className="text-xs text-rose-700 mb-6">Shipping and taxes calculated at checkout.</p>
            <Link 
              to="/checkout"
              onClick={() => setIsCartOpen(false)}
              className="w-full py-4 bg-rose-950 text-white font-medium hover:bg-rose-900 transition-colors flex justify-center items-center"
            >
              Checkout
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
