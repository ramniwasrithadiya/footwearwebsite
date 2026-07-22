import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useWishlist } from '../WishlistContext';
import { useAuth } from '../AuthContext';
import { useCart } from '../CartContext';
import { Heart, X } from 'lucide-react';

export function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { user, logout } = useAuth();
  const { addToCart } = useCart();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="bg-white py-12 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 pb-4 border-b border-gray-200">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              My Wishlist <span className="font-normal text-gray-500 text-lg">({wishlist.length} items)</span>
            </h1>
          </div>
          <button 
            onClick={logout}
            className="mt-4 md:mt-0 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
          >
            Logout
          </button>
        </div>

        {wishlist.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-32 h-32 mb-6">
              <Heart className="w-full h-full text-gray-200" strokeWidth={1} />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Your wishlist is empty</h2>
            <p className="text-gray-500 mb-8 text-center max-w-sm">Save items that you like in your wishlist. Review them anytime and easily move them to the cart.</p>
            <Link to="/shop" className="px-10 py-3.5 border border-black text-black font-semibold rounded-sm hover:bg-black hover:text-white transition-colors">
              CONTINUE SHOPPING
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
            {wishlist.map(product => (
              <div key={product.id} className="group flex flex-col relative border border-gray-200 hover:shadow-md transition-shadow bg-white rounded-sm overflow-hidden">
                <button 
                  onClick={() => removeFromWishlist(product.id)}
                  className="absolute top-2 right-2 z-10 p-1.5 rounded-full bg-white/80 hover:bg-white text-gray-400 hover:text-gray-900 transition-colors shadow-sm"
                  aria-label="Remove from wishlist"
                >
                  <X className="w-4 h-4" />
                </button>
                <Link to={`/shop/${product.id}`} className="relative block overflow-hidden aspect-[3/4] bg-gray-50">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {product.isNewArrival && (
                    <div className="absolute top-3 left-0 bg-yellow-600 text-white px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                      New
                    </div>
                  )}
                </Link>
                <div className="p-3 sm:p-4 flex flex-col flex-grow">
                  <h3 className="text-sm font-medium text-gray-900 truncate" title={product.name}>
                    <Link to={`/shop/${product.id}`}>{product.name}</Link>
                  </h3>
                  <div className="mt-1 flex items-baseline space-x-2">
                    <span className="text-sm font-bold text-gray-900">&#8377;{product.price.toLocaleString('en-IN')}</span>
                  </div>
                </div>
                <div className="border-t border-gray-200">
                  <button 
                    onClick={() => {
                      removeFromWishlist(product.id);
                      addToCart({
                        product,
                        quantity: 1,
                        size: product.sizes[0],
                        color: product.colors[0]
                      });
                    }}
                    className="w-full py-3 text-sm font-bold text-yellow-600 hover:bg-yellow-50 hover:text-yellow-700 transition-colors"
                  >
                    MOVE TO CART
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
