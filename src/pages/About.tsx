export function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <img 
            src="https://images.unsplash.com/photo-1595341888016-a392ef81b7de?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
            alt="Craftsmanship" 
            className="w-full h-[600px] object-cover"
          />
        </div>
        <div>
          <h2 className="text-sm font-bold tracking-widest text-yellow-600 uppercase mb-4">Our Story</h2>
          <h1 className="text-4xl font-serif text-rose-950 mb-8 leading-tight">Crafting Quality<br />Women's Footwear</h1>
          
          <div className="space-y-6 text-rose-800 font-light leading-relaxed text-lg">
            <p>
              HandcraftedHeels was started with a passion for creating stylish, comfortable, and high-quality women's footwear. As a growing footwear manufacturer, our goal is to provide products that combine elegant designs with reliable craftsmanship.
            </p>
            <p>
              Every pair is carefully made using quality materials and attention to detail. We focus on comfort, durability, and modern styles that women can wear with confidence every day.
            </p>
            <p>
              Whether you're an individual customer or a retailer looking for bulk orders, we are committed to delivering dependable quality, competitive pricing, and excellent service.
            </p>
            <p>
              As we continue to grow, our mission is to earn the trust of our customers through honesty, quality, and continuous improvement.
            </p>
          </div>
          
          <div className="mt-12 pt-12 border-t border-rose-200">
            <h3 className="text-2xl font-serif text-rose-950 mb-4">Our Mission</h3>
            <p className="text-rose-800 font-light leading-relaxed mb-8">
              To manufacture stylish and comfortable women's footwear while delivering quality products and reliable service to customers and wholesale partners across India.
            </p>
            
            <h3 className="text-2xl font-serif text-rose-950 mb-4">Our Vision</h3>
            <p className="text-rose-800 font-light leading-relaxed">
              To grow into a trusted name in women's footwear by consistently providing quality craftsmanship, innovative designs, and customer satisfaction.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
