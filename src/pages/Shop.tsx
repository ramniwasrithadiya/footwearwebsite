import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products } from '../data';
import { ProductCard } from '../components/ProductCard';
import { Filter, SlidersHorizontal, ChevronDown } from 'lucide-react';

export function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialFilter = searchParams.get('filter') || 'all';
  const [filter, setFilter] = useState<string>(initialFilter);
  const [sortBy, setSortBy] = useState<string>('featured');

  useEffect(() => {
    const filterParam = searchParams.get('filter');
    if (filterParam) {
      setFilter(filterParam);
    } else {
      setFilter('all');
    }
  }, [searchParams]);

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    if (newFilter === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ filter: newFilter });
    }
  };

  const filteredProducts = filter === 'all' 
    ? products 
    : filter === 'heels-flats'
      ? products.filter(p => p.category === 'heels' || p.category === 'flats')
      : filter === 'boots-sandals'
        ? products.filter(p => p.category === 'boots' || p.category === 'sandals')
        : filter === 'new-arrivals' || filter === 'best-sellers'
          ? products // In a real app, this would filter based on actual tags or date
          : products.filter(p => p.category === filter);

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'newest':
        return parseInt(b.id) - parseInt(a.id);
      case 'featured':
      default:
        return 0;
    }
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12 text-center max-w-3xl mx-auto">
        <h1 className="text-4xl font-serif text-rose-950 mb-4">Retail Collection</h1>
        <p className="text-rose-700 text-lg font-light">
          Explore our complete range of handcrafted footwear. For bulk purchases and wholesale pricing, please visit our <a href="/bulk-orders" className="text-yellow-600 underline underline-offset-4">Wholesale portal</a>.
        </p>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center mb-8 pb-4 border-b border-rose-200">
        <div className="flex items-center space-x-2 mb-4 md:mb-0 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 hide-scrollbar">
          <button 
            onClick={() => handleFilterChange('all')}
            className={`px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors ${filter === 'all' ? 'bg-rose-400 text-white' : 'text-rose-800 hover:bg-rose-50'}`}
          >
            All Footwear
          </button>
          <button 
            onClick={() => handleFilterChange('heels')}
            className={`px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors ${filter === 'heels' ? 'bg-rose-400 text-white' : 'text-rose-800 hover:bg-rose-50'}`}
          >
            Heels
          </button>
          <button 
            onClick={() => handleFilterChange('flats')}
            className={`px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors ${filter === 'flats' ? 'bg-rose-400 text-white' : 'text-rose-800 hover:bg-rose-50'}`}
          >
            Flats
          </button>
          <button 
            onClick={() => handleFilterChange('sandals')}
            className={`px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors ${filter === 'sandals' ? 'bg-rose-400 text-white' : 'text-rose-800 hover:bg-rose-50'}`}
          >
            Sandals
          </button>
          <button 
            onClick={() => handleFilterChange('boots')}
            className={`px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors ${filter === 'boots' ? 'bg-rose-400 text-white' : 'text-rose-800 hover:bg-rose-50'}`}
          >
            Boots
          </button>
        </div>

        <div className="flex items-center text-sm text-rose-700 w-full md:w-auto justify-between md:justify-end gap-6 border-t md:border-t-0 border-rose-100 pt-4 md:pt-0">
          <span>{sortedProducts.length} Products</span>
          <div className="relative flex items-center">
            <SlidersHorizontal className="w-4 h-4 mr-2 text-rose-500" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-transparent outline-none pr-6 py-1 cursor-pointer text-rose-950 font-medium hover:text-rose-700 transition-colors focus:ring-2 focus:ring-rose-200 rounded-sm"
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
            <ChevronDown className="w-4 h-4 text-rose-500 absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 sm:gap-x-8 gap-y-8 sm:gap-y-12">
        {sortedProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
