import { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Truck, Clock, Award, Star, Instagram, ChevronLeft, ChevronRight } from 'lucide-react';
import { useProducts } from '../ProductsContext';
import { ProductCard } from '../components/ProductCard';
import { motion } from 'motion/react';

const heroImages = [
  "https://images.unsplash.com/photo-1562183241-b937e95585b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
  "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
  "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
  "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
];

export function Home() {
  const { products } = useProducts();
  const bestSellers = products.filter(p => p.isBestSeller).slice(0, 4);
  const newArrivals = products.filter(p => p.isNewArrival).slice(0, 4);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === heroImages.length - 1 ? 0 : prev + 1));
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? heroImages.length - 1 : prev - 1));
  }, []);

  useEffect(() => {
    if (!isHovered) {
      const slideInterval = setInterval(nextSlide, 4000);
      return () => clearInterval(slideInterval);
    }
  }, [isHovered, nextSlide]);

  useEffect(() => {
    const nextIndex = currentSlide === heroImages.length - 1 ? 0 : currentSlide + 1;
    const img = new Image();
    img.src = heroImages[nextIndex];
  }, [currentSlide]);

  const instaScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = instaScrollRef.current;
    if (!el) return;
    
    let animationFrameId: number;
    let isDown = false;
    let startX: number;
    let scrollLeft: number;
    let scrollAccumulator = 0;

    const scroll = () => {
      if (!isDown) {
        scrollAccumulator += 0.3; // Adjusted for slower speed
        if (scrollAccumulator >= 1) {
          el.scrollLeft += Math.floor(scrollAccumulator);
          scrollAccumulator -= Math.floor(scrollAccumulator);
          
          // Simple infinite scroll effect by resetting if we reach the cloned end
          if (el.scrollLeft >= el.scrollWidth / 2) {
            el.scrollLeft = 0;
          }
        }
      }
      animationFrameId = requestAnimationFrame(scroll);
    };
    
    animationFrameId = requestAnimationFrame(scroll);
    
    const handleMouseDown = (e: MouseEvent) => {
      isDown = true;
      startX = e.pageX - el.offsetLeft;
      scrollLeft = el.scrollLeft;
      el.style.cursor = 'grabbing';
    };
    const handleMouseLeave = () => {
      isDown = false;
      el.style.cursor = 'grab';
    };
    const handleMouseUp = () => {
      isDown = false;
      el.style.cursor = 'grab';
    };
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - el.offsetLeft;
      const walk = (x - startX) * 2;
      el.scrollLeft = scrollLeft - walk;
    };

    const handleTouchStart = (e: TouchEvent) => {
      isDown = true;
      startX = e.touches[0].pageX - el.offsetLeft;
      scrollLeft = el.scrollLeft;
    };
    const handleTouchEnd = () => {
      isDown = false;
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (!isDown) return;
      const x = e.touches[0].pageX - el.offsetLeft;
      const walk = (x - startX) * 2;
      el.scrollLeft = scrollLeft - walk;
    };

    el.addEventListener('mousedown', handleMouseDown);
    el.addEventListener('mouseleave', handleMouseLeave);
    el.addEventListener('mouseup', handleMouseUp);
    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('touchstart', handleTouchStart, { passive: true });
    el.addEventListener('touchend', handleTouchEnd);
    el.addEventListener('touchmove', handleTouchMove, { passive: true });
    el.style.cursor = 'grab';

    return () => {
      cancelAnimationFrame(animationFrameId);
      el.removeEventListener('mousedown', handleMouseDown);
      el.removeEventListener('mouseleave', handleMouseLeave);
      el.removeEventListener('mouseup', handleMouseUp);
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('touchstart', handleTouchStart);
      el.removeEventListener('touchend', handleTouchEnd);
      el.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  const categories = [
    { name: 'Heels', image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&q=80', link: '/shop?filter=heels' },
    { name: 'Flats', image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&q=80', link: '/shop?filter=flats' },
    { name: 'Boots', image: 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=600&q=80', link: '/shop?filter=boots' },
    { name: 'Sandals', image: 'https://images.unsplash.com/photo-1603487742131-4160ec999306?w=600&q=80', link: '/shop?filter=sandals' }
  ];

  const reviews = [
    { name: 'Aisha K.', rating: 5, text: 'Absolutely in love with my new heels. The craftsmanship is impeccable and they are surprisingly comfortable!' },
    { name: 'Priya S.', rating: 5, text: 'The quality of the leather is top-notch. These are my go-to shoes for every special occasion.' },
    { name: 'Meera T.', rating: 5, text: 'Beautiful design and perfect fit. I receive compliments every time I wear them.' }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans text-rose-950">
      {/* Hero Section */}
      <section className="relative w-full mt-20 h-[340px] md:h-[420px] lg:h-[500px] bg-rose-50 flex items-center overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full h-full flex items-center justify-between">
          
          {/* Text Content */}
          <div className="w-[55%] md:w-1/2 pr-4 md:pr-8 lg:pr-12 z-10 flex flex-col justify-center text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-rose-950 mb-3 md:mb-6 leading-tight tracking-wide">
                Made with Precision & Style
              </h1>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl font-light font-sans text-rose-800 mb-6 md:mb-10 tracking-wide">
                Where Craft Meets Comfort.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-3 md:gap-4"
            >
              <Link 
                to="/shop" 
                className="w-full sm:w-auto px-5 py-2.5 md:px-8 md:py-3.5 bg-yellow-600 text-white font-medium hover:bg-yellow-700 transition-all duration-300 tracking-wider uppercase text-[10px] sm:text-xs md:text-sm shadow-md text-center"
              >
                Shop Collection
              </Link>
              <Link 
                to="/bulk-orders" 
                className="w-full sm:w-auto px-5 py-2.5 md:px-8 md:py-3.5 bg-transparent border border-rose-950 text-rose-950 font-medium hover:bg-rose-100 transition-all duration-300 tracking-wider uppercase text-[10px] sm:text-xs md:text-sm text-center"
              >
                Become a Dealer
              </Link>
            </motion.div>
          </div>

          {/* Slider Content */}
          <div 
            className="w-[45%] md:w-1/2 h-[75%] md:h-[80%] relative group overflow-hidden rounded-sm md:rounded-md shadow-lg"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {heroImages.map((image, index) => (
              <div 
                key={index}
                className={`absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
              >
                <motion.div 
                  initial={{ scale: 1.05 }}
                  animate={{ scale: index === currentSlide ? 1 : 1.05 }}
                  transition={{ duration: 4, ease: "linear" }}
                  className="w-full h-full"
                >
                  <img 
                    src={image} 
                    alt={`Luxury Women's Footwear Slide ${index + 1}`} 
                    className="w-full h-full object-cover object-center"
                  />
                </motion.div>
              </div>
            ))}
            
            {/* Navigation Arrows */}
            <button 
              onClick={prevSlide}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-20 p-1 md:p-2 rounded-full bg-white/70 text-rose-950 hover:bg-white transition-all opacity-0 group-hover:opacity-100 hidden sm:block"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
            </button>
            <button 
              onClick={nextSlide}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-20 p-1 md:p-2 rounded-full bg-white/70 text-rose-950 hover:bg-white transition-all opacity-0 group-hover:opacity-100 hidden sm:block"
              aria-label="Next slide"
            >
              <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
            </button>

            {/* Pagination Dots */}
            <div className="absolute bottom-3 left-0 right-0 z-20 flex justify-center space-x-1.5 md:space-x-2">
              {heroImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide ? 'bg-white scale-110' : 'bg-white/50 hover:bg-white/90'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
          
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif text-rose-950 mb-4">Best Sellers</h2>
            <div className="w-12 h-0.5 bg-yellow-600 mx-auto"></div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 sm:gap-x-8 gap-y-8 sm:gap-y-12">
            {bestSellers.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
          <div className="mt-16 text-center">
            <Link to="/shop?filter=best-sellers" className="inline-flex items-center text-sm font-medium text-rose-950 hover:text-yellow-600 transition-colors tracking-widest uppercase pb-1 border-b border-yellow-600">
              View All Best Sellers <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Shop by Category */}
      <section className="py-24 bg-rose-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif text-rose-950 mb-4">Shop by Category</h2>
            <div className="w-12 h-0.5 bg-yellow-600 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative overflow-hidden aspect-[3/4] cursor-pointer"
              >
                <Link to={category.link}>
                  <img src={category.image} alt={category.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-serif text-white tracking-widest uppercase drop-shadow-md">{category.name}</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif text-rose-950 mb-4">New Arrivals</h2>
            <div className="w-12 h-0.5 bg-yellow-600 mx-auto"></div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 sm:gap-x-8 gap-y-8 sm:gap-y-12">
            {newArrivals.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-rose-50 text-rose-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif mb-4">The Handcrafted Difference</h2>
            <div className="w-12 h-0.5 bg-yellow-600 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { icon: Award, title: 'Master Craftsmanship', desc: 'Handcrafted by artisans with decades of experience using traditional techniques.' },
              { icon: ShieldCheck, title: 'Premium Materials', desc: 'We source only the finest full-grain leathers and high-grade materials.' },
              { icon: Truck, title: 'Pan India Delivery', desc: 'Reliable shipping across India for both retail and wholesale orders.' },
              { icon: Clock, title: 'Timely Manufacturing', desc: 'Strict adherence to delivery timelines for all bulk and custom orders.' }
            ].map((feature, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="w-20 h-20 mx-auto bg-white rounded-full flex items-center justify-center mb-6 shadow-sm">
                  <feature.icon className="w-8 h-8 text-yellow-600" />
                </div>
                <h3 className="text-lg font-serif mb-3 tracking-wide">{feature.title}</h3>
                <p className="text-rose-700 text-sm font-light leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif text-rose-950 mb-4">Client Testimonials</h2>
            <div className="w-12 h-0.5 bg-yellow-600 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-rose-50 p-8 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex text-yellow-600 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-rose-800 font-light mb-6 italic">"{review.text}"</p>
                <h4 className="font-serif text-rose-950 tracking-wide">— {review.name}</h4>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram Gallery */}
      <section className="py-24 bg-rose-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
          <a href="https://instagram.com/handcraftedheels" target="_blank" rel="noopener noreferrer" className="inline-block hover:opacity-80 transition-opacity">
            <Instagram className="w-8 h-8 text-rose-950 mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-serif text-rose-950 mb-2">@HandcraftedHeels</h2>
          </a>
          <p className="text-rose-700 font-light">Follow us on Instagram for the latest styles</p>
        </div>
        <div 
          ref={instaScrollRef}
          className="flex flex-nowrap gap-4 overflow-x-hidden pb-8 no-scrollbar px-4 md:px-8"
        >
          {[
            'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500&q=80',
            'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&q=80',
            'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=500&q=80',
            'https://images.unsplash.com/photo-1515347619362-e64e9a3b2b8d?w=500&q=80',
            'https://images.unsplash.com/photo-1603487742131-4160ec999306?w=500&q=80',
            // Duplicate array for infinite scroll
            'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500&q=80',
            'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&q=80',
            'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=500&q=80',
            'https://images.unsplash.com/photo-1515347619362-e64e9a3b2b8d?w=500&q=80',
            'https://images.unsplash.com/photo-1603487742131-4160ec999306?w=500&q=80',
            // Duplicate one more time to ensure smooth drag at edges
            'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500&q=80',
            'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&q=80',
            'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=500&q=80',
            'https://images.unsplash.com/photo-1515347619362-e64e9a3b2b8d?w=500&q=80',
            'https://images.unsplash.com/photo-1603487742131-4160ec999306?w=500&q=80'
          ].map((src, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ scale: 1.05 }}
              className="flex-none w-64 h-64 md:w-80 md:h-80 relative overflow-hidden"
            >
              <img src={src} className="w-full h-full object-cover pointer-events-none" alt="Instagram Post" />
              <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors flex items-center justify-center pointer-events-none">
                <Instagram className="w-8 h-8 text-white opacity-0 transition-opacity" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
