import { Link } from 'react-router-dom';
import { ShoppingBag, Menu, X, Heart, User } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '../CartContext';
import { useWishlist } from '../WishlistContext';
import { useAuth } from '../AuthContext';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { items, setIsCartOpen } = useCart();
  const { wishlist } = useWishlist();
  const { user, profile } = useAuth();
  
  const getFirstName = () => {
    if (profile?.fullName) {
      return profile.fullName.split(' ')[0];
    }
    return user?.email ? user.email.split('@')[0] : 'User';
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] w-full bg-white/90 backdrop-blur-md border-b border-rose-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center min-w-0 mr-2">
            <Link to="/" className="flex items-center min-w-0">
              <span className="text-2xl sm:text-3xl lg:text-4xl mr-1 lg:mr-2 flex-shrink-0">👣</span>
              <span className="font-serif text-sm sm:text-xl md:text-2xl lg:text-3xl font-bold tracking-tight text-rose-950 truncate">HandcraftedHeels</span>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-10">
            <Link to="/" className="text-rose-800 hover:text-rose-950 font-medium transition-colors text-sm lg:text-base whitespace-nowrap">Home</Link>
            <Link to="/shop" className="text-rose-800 hover:text-rose-950 font-medium transition-colors text-sm lg:text-base whitespace-nowrap">Shop</Link>
            <Link to="/about" className="text-rose-800 hover:text-rose-950 font-medium transition-colors text-sm lg:text-base whitespace-nowrap">About</Link>
            <Link to="/contact" className="text-rose-800 hover:text-rose-950 font-medium transition-colors text-sm lg:text-base whitespace-nowrap">Contact</Link>
            
            <div className="flex items-center space-x-4 lg:space-x-5 border-l border-rose-200 pl-6 lg:pl-8">
            <Link to={user ? "/profile" : "/login"} className="flex flex-col items-center justify-center text-rose-800 hover:text-rose-950 transition-colors">
              <User className="w-5 h-5 lg:w-6 lg:h-6 mb-0.5" strokeWidth={1.5} />
              <span className="text-[10px] uppercase font-medium">{user ? getFirstName() : 'Login'}</span>
            </Link>
              <Link to="/wishlist" className="relative flex flex-col items-center justify-center text-rose-800 hover:text-rose-950 transition-colors">
                <div className="relative">
                  <Heart className="w-5 h-5 lg:w-6 lg:h-6 mb-0.5" strokeWidth={1.5} />
                  {wishlist.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                      {wishlist.length}
                    </span>
                  )}
                </div>
                <span className="text-[10px] uppercase font-medium">Wishlist</span>
              </Link>
              <button onClick={() => setIsCartOpen(true)} className="relative flex flex-col items-center justify-center text-rose-800 hover:text-rose-950 transition-colors">
                <div className="relative">
                  <ShoppingBag className="w-5 h-5 lg:w-6 lg:h-6 mb-0.5" strokeWidth={1.5} />
                  {items.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                      {items.length}
                    </span>
                  )}
                </div>
                <span className="text-[10px] uppercase font-medium">Bag</span>
              </button>
            </div>
          </div>

          <div className="flex items-center flex-shrink-0 md:hidden space-x-2 sm:space-x-4">
            <Link to={user ? "/profile" : "/login"} className="flex flex-col items-center justify-center text-rose-800 hover:text-rose-950">
              <User className="w-5 h-5 sm:w-6 sm:h-6 mb-0.5" strokeWidth={1.5} />
              <span className="text-[9px] sm:text-[10px] uppercase font-medium leading-tight">{user ? getFirstName() : 'Login'}</span>
            </Link>
            <Link to="/wishlist" className="relative flex flex-col items-center justify-center text-rose-800 hover:text-rose-950">
              <div className="relative">
                <Heart className="w-5 h-5 sm:w-6 sm:h-6 mb-0.5" strokeWidth={1.5} />
                {wishlist.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </div>
              <span className="text-[9px] sm:text-[10px] uppercase font-medium leading-tight">Wishlist</span>
            </Link>
            <button onClick={() => setIsCartOpen(true)} className="relative flex flex-col items-center justify-center text-rose-800 hover:text-rose-950">
              <div className="relative">
                <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 mb-0.5" strokeWidth={1.5} />
                {items.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
                    {items.length}
                  </span>
                )}
              </div>
              <span className="text-[9px] sm:text-[10px] uppercase font-medium leading-tight">Bag</span>
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex flex-col items-center justify-center p-1 sm:p-2 rounded-md text-rose-600 hover:text-rose-700 hover:bg-rose-50 focus:outline-none ml-1 sm:ml-0"
            >
              {isOpen ? <X className="block h-5 w-5 sm:h-6 sm:w-6 mb-0.5" strokeWidth={1.5} /> : <Menu className="block h-5 w-5 sm:h-6 sm:w-6 mb-0.5" strokeWidth={1.5} />}
              <span className="text-[9px] sm:text-[10px] uppercase font-medium leading-tight">{isOpen ? 'Close' : 'Menu'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 w-full bg-white border-b border-rose-200 shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium text-rose-950 hover:bg-rose-50">Home</Link>
            <Link to="/shop" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium text-rose-950 hover:bg-rose-50">Shop Retail</Link>
            <Link to="/about" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium text-rose-950 hover:bg-rose-50">About Us</Link>
            <Link to="/contact" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium text-rose-950 hover:bg-rose-50">Contact</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
