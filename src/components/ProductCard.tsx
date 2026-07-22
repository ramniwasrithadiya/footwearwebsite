import { Product } from '../types';
import { Link, useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useWishlist } from '../WishlistContext';
import { useAuth } from '../AuthContext';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { user } = useAuth();
  const navigate = useNavigate();

  const inWishlist = isInWishlist(product.id);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user) {
      // Store intended product addition in local storage
      localStorage.setItem('pendingWishlistProduct', JSON.stringify(product));
      navigate('/login');
      return;
    }
    
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div className="group flex flex-col relative">
      <button 
        onClick={toggleWishlist}
        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/70 hover:bg-white transition-colors text-rose-600"
      >
        <Heart className="w-5 h-5" fill={inWishlist ? "currentColor" : "none"} />
      </button>
      <Link to={`/shop/${product.id}`} className="relative block overflow-hidden aspect-[4/5] bg-rose-50">
        <img
          src={product.image}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {product.isNewArrival && (
          <div className="absolute top-4 left-4 bg-white px-3 py-1 text-xs font-medium uppercase tracking-wider">
            New
          </div>
        )}
        {product.isBestSeller && !product.isNewArrival && (
          <div className="absolute top-4 left-4 bg-rose-400 text-white px-3 py-1 text-xs font-medium uppercase tracking-wider">
            Best Seller
          </div>
        )}
      </Link>
      <div className="pt-4 flex flex-col flex-grow">
        <h3 className="text-sm font-medium text-rose-950 group-hover:underline underline-offset-4 decoration-1">
          <Link to={`/shop/${product.id}`}>{product.name}</Link>
        </h3>
        <p className="mt-1 text-sm text-rose-700 capitalize">{product.category}</p>
        <p className="mt-2 text-sm font-medium text-rose-950">&#8377;{product.price.toLocaleString('en-IN')}</p>
      </div>
    </div>
  );
}
