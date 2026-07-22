import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { products } from '../data';
import { ArrowLeft, Check, ShoppingBag, Heart } from 'lucide-react';
import { useCart } from '../CartContext';
import { useWishlist } from '../WishlistContext';
import { useAuth } from '../AuthContext';

export function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const product = products.find(p => p.id === id) || products[0];
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const inWishlist = isInWishlist(product.id);
  
  const [selectedSize, setSelectedSize] = useState<number>(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]);
  const [quantity, setQuantity] = useState<number>(1);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart({
      product,
      quantity,
      size: selectedSize,
      color: selectedColor
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const toggleWishlist = () => {
    if (!user) {
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link to="/shop" className="inline-flex items-center text-sm text-rose-700 hover:text-rose-950 transition-colors mb-8">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Shop
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-20">
        {/* Product Image */}
        <div className="aspect-[4/5] bg-rose-50 overflow-hidden relative">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </div>

        {/* Product Info */}
        <div className="flex flex-col pt-4">
          <p className="text-sm font-medium text-yellow-600 uppercase tracking-widest mb-2">{product.category}</p>
          <h1 className="text-3xl sm:text-4xl font-serif text-rose-950 mb-4">{product.name}</h1>
          <p className="text-2xl font-light text-rose-950 mb-6">&#8377;{product.price.toLocaleString('en-IN')}</p>
          
          <p className="text-rose-800 font-light leading-relaxed mb-8">
            {product.description}
          </p>

          <div className="mb-8">
            <h3 className="text-sm font-medium text-rose-950 mb-3">Color: <span className="text-rose-700 font-light">{selectedColor}</span></h3>
            <div className="flex space-x-3">
              {product.colors.map(color => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-4 py-2 text-sm border ${selectedColor === color ? 'border-rose-400 text-rose-950 bg-rose-50' : 'border-rose-200 text-rose-700 hover:border-rose-200'} transition-colors`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm font-medium text-rose-950">Size (UK/India)</h3>
              <a href="#" className="text-sm text-yellow-600 hover:underline">Size Guide</a>
            </div>
            <div className="flex flex-wrap gap-3">
              {product.sizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-12 h-12 flex items-center justify-center text-sm border ${selectedSize === size ? 'border-rose-400 text-white bg-rose-400' : 'border-rose-200 text-rose-950 hover:border-rose-400'} transition-colors`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-sm font-medium text-rose-950 mb-3">Quantity</h3>
            <div className="flex items-center border border-rose-200 w-32 h-12">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-full flex items-center justify-center text-rose-700 hover:text-rose-950 hover:bg-rose-50"
              >
                -
              </button>
              <input 
                type="number" 
                value={quantity}
                readOnly
                className="w-12 h-full text-center border-none focus:ring-0 text-rose-950 font-medium"
              />
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-full flex items-center justify-center text-rose-700 hover:text-rose-950 hover:bg-rose-50"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex flex-col space-y-4">
            <button 
              onClick={handleAddToCart}
              disabled={added}
              className={`w-full py-4 flex items-center justify-center font-medium transition-colors ${added ? 'bg-green-600 text-white' : 'bg-rose-400 text-white hover:bg-rose-500'}`}
            >
              {added ? (
                <><Check className="w-5 h-5 mr-2" /> Added to Bag</>
              ) : (
                <><ShoppingBag className="w-5 h-5 mr-2" /> Add to Bag - &#8377;{(product.price * quantity).toLocaleString('en-IN')}</>
              )}
            </button>
            <button
              onClick={toggleWishlist}
              className={`w-full py-4 flex items-center justify-center font-medium transition-colors border border-rose-950 ${inWishlist ? 'bg-rose-50 text-rose-950' : 'bg-transparent text-rose-950 hover:bg-rose-50'}`}
            >
              <Heart className="w-5 h-5 mr-2" fill={inWishlist ? "currentColor" : "none"} />
              {inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
            </button>
            <div className="text-center text-sm text-rose-700 pt-4 border-t border-rose-100">
              <p>Free shipping on orders over &#8377;10,000.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
