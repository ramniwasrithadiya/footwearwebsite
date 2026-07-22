import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Truck, Clock, Award, Check } from 'lucide-react';
import { products } from '../data';
import { ProductCard } from '../components/ProductCard';
import { motion } from 'motion/react';

export function Home() {
  const bestSellers = products.filter(p => p.isBestSeller).slice(0, 4);
  const newArrivals = products.filter(p => p.isNewArrival).slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-black">
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          <img 
            src="https://images.unsplash.com/photo-1502781252888-9143ba7f074e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
            alt="Luxury Women's Footwear" 
            className="w-full h-full object-cover"
          />
        </motion.div>
        
        {/* Dark overlay: 60% black transparent */}
        <div className="absolute inset-0 bg-black/60 z-0" />
        
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto pt-24 md:pt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-4 sm:mb-6 leading-tight tracking-wide">
              Luxury Women's Footwear
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl font-serif text-white/90 mb-6 sm:mb-8 italic">
              Handcrafted Elegance for Every Step
            </p>
            <p className="text-xs sm:text-sm md:text-base text-gray-200 mb-10 sm:mb-12 uppercase tracking-widest font-light">
              Premium Handmade Footwear • Retail & Bulk Orders Across India
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-12 sm:mb-16"
          >
            <Link 
              to="/shop" 
              className="w-full sm:w-auto px-8 sm:px-10 py-3 sm:py-4 bg-[#D4AF37] text-black font-medium hover:bg-[#F3E5AB] transition-all duration-300 transform hover:-translate-y-1"
            >
              Shop Collection
            </Link>
            <Link 
              to="/bulk-orders" 
              className="w-full sm:w-auto px-8 sm:px-10 py-3 sm:py-4 bg-transparent border border-white text-white font-medium hover:bg-white hover:text-black transition-all duration-300 transform hover:-translate-y-1"
            >
              Bulk Enquiry
            </Link>
          </motion.div>

          {/* Trust Badges */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-12 text-xs sm:text-sm text-gray-300 uppercase tracking-wider font-light"
          >
            <div className="flex items-center">
              <Check className="w-4 h-4 mr-2 text-[#D4AF37]" /> Handmade in India
            </div>
            <div className="flex items-center">
              <Check className="w-4 h-4 mr-2 text-[#D4AF37]" /> Premium Quality
            </div>
            <div className="flex items-center">
              <Check className="w-4 h-4 mr-2 text-[#D4AF37]" /> Wholesale Available
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-rose-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif text-rose-950">Why Choose HandcraftedHeels</h2>
            <div className="w-16 h-0.5 bg-yellow-600 mx-auto mt-4"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-12">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center shadow-sm mb-6">
                <Award className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-lg font-medium text-rose-950 mb-2">Master Craftsmanship</h3>
              <p className="text-rose-700 text-sm">Handcrafted by artisans with decades of experience using traditional techniques.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center shadow-sm mb-6">
                <ShieldCheck className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-lg font-medium text-rose-950 mb-2">Premium Materials</h3>
              <p className="text-rose-700 text-sm">We source only the finest full-grain leathers and high-grade materials.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center shadow-sm mb-6">
                <Truck className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-lg font-medium text-rose-950 mb-2">Pan India Delivery</h3>
              <p className="text-rose-700 text-sm">Reliable shipping across India for both retail and wholesale orders.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center shadow-sm mb-6">
                <Clock className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-lg font-medium text-rose-950 mb-2">Timely Manufacturing</h3>
              <p className="text-rose-700 text-sm">Strict adherence to delivery timelines for all bulk and custom orders.</p>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-serif text-rose-950">New Arrivals</h2>
              <p className="mt-2 text-rose-700">The latest additions to our handcrafted collection.</p>
            </div>
            <Link to="/shop" className="hidden sm:flex items-center text-sm font-medium text-rose-950 hover:text-yellow-600 transition-colors">
              View All <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 sm:gap-x-8 gap-y-8 sm:gap-y-12">
            {newArrivals.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="mt-10 sm:hidden">
            <Link to="/shop" className="block w-full text-center px-4 py-3 border border-rose-200 text-sm font-medium text-rose-950 hover:bg-rose-50 transition-colors">
              View All
            </Link>
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-serif text-rose-950">Best Sellers</h2>
              <p className="mt-2 text-rose-700">Our most loved and sought-after designs.</p>
            </div>
            <Link to="/shop" className="hidden sm:flex items-center text-sm font-medium text-rose-950 hover:text-yellow-600 transition-colors">
              Shop Collection <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 sm:gap-x-8 gap-y-8 sm:gap-y-12">
            {bestSellers.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
