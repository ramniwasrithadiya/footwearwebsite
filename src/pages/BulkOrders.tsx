import { useState } from 'react';
import { Package, Truck, ShieldCheck, Factory, Download } from 'lucide-react';

export function BulkOrders() {
  const [formData, setFormData] = useState({
    businessName: '',
    contactPerson: '',
    phone: '',
    email: '',
    city: '',
    products: '',
    quantity: '',
    requirements: ''
  });

  const handleChange = (e: import('react').ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: import('react').FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    alert('Thank you for your enquiry. Our wholesale team will contact you shortly.');
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-rose-100 text-rose-950 py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src="https://images.unsplash.com/photo-1595341888016-a392ef81b7de?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" alt="Factory" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-serif mb-6">Wholesale & B2B Orders</h1>
          <p className="text-xl text-rose-800 max-w-3xl mx-auto font-light leading-relaxed mb-10">
            Partner with HandcraftedHeels to bring premium handcrafted footwear to your customers. We offer flexible manufacturing, competitive wholesale pricing, and custom branding options.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
             <a href="#enquiry-form" className="px-8 py-4 bg-yellow-600 text-white font-medium hover:bg-yellow-500 transition-colors">
              Request Wholesale Price
            </a>
            <button className="px-8 py-4 border border-rose-950 text-rose-950 font-medium hover:bg-rose-950 hover:text-white transition-colors flex items-center justify-center">
              <Download className="w-5 h-5 mr-2" /> Product Catalog (PDF)
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-rose-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif text-rose-950 mb-4">Why Partner With Us</h2>
            <div className="w-16 h-0.5 bg-yellow-600 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-12">
            <div className="bg-white p-8 border border-rose-100 hover:shadow-lg transition-shadow">
              <Package className="w-10 h-10 text-yellow-600 mb-6" />
              <h3 className="text-xl font-medium text-rose-950 mb-3">Low MOQ</h3>
              <p className="text-rose-800 text-sm leading-relaxed">Start with a Minimum Order Quantity of just 50 pairs across assorted sizes and colors.</p>
            </div>
            <div className="bg-white p-8 border border-rose-100 hover:shadow-lg transition-shadow">
              <Factory className="w-10 h-10 text-yellow-600 mb-6" />
              <h3 className="text-xl font-medium text-rose-950 mb-3">High Capacity</h3>
              <p className="text-rose-800 text-sm leading-relaxed">Our manufacturing facility can scale to produce up to 10,000 pairs monthly without compromising quality.</p>
            </div>
            <div className="bg-white p-8 border border-rose-100 hover:shadow-lg transition-shadow">
              <ShieldCheck className="w-10 h-10 text-yellow-600 mb-6" />
              <h3 className="text-xl font-medium text-rose-950 mb-3">Custom Branding</h3>
              <p className="text-rose-800 text-sm leading-relaxed">Private label options available. Emboss your own brand logo for bulk orders over 200 pairs.</p>
            </div>
            <div className="bg-white p-8 border border-rose-100 hover:shadow-lg transition-shadow">
              <Truck className="w-10 h-10 text-yellow-600 mb-6" />
              <h3 className="text-xl font-medium text-rose-950 mb-3">Fast Delivery</h3>
              <p className="text-rose-800 text-sm leading-relaxed">Standard bulk orders delivered within 15-20 business days across major Indian cities.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section id="enquiry-form" className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif text-rose-950 mb-4">Bulk Order Enquiry</h2>
            <p className="text-rose-700">Fill out the form below and our B2B team will provide you with a customized quotation.</p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white p-8 md:p-12 border border-rose-200 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <label htmlFor="businessName" className="block text-sm font-medium text-rose-900 mb-2">Business/Company Name *</label>
                <input required type="text" id="businessName" name="businessName" value={formData.businessName} onChange={handleChange} className="w-full px-4 py-3 border border-rose-200 focus:outline-none focus:ring-1 focus:ring-rose-950 focus:border-rose-400" />
              </div>
              <div>
                <label htmlFor="contactPerson" className="block text-sm font-medium text-rose-900 mb-2">Contact Person *</label>
                <input required type="text" id="contactPerson" name="contactPerson" value={formData.contactPerson} onChange={handleChange} className="w-full px-4 py-3 border border-rose-200 focus:outline-none focus:ring-1 focus:ring-rose-950 focus:border-rose-400" />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-rose-900 mb-2">Phone Number *</label>
                <input required type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-3 border border-rose-200 focus:outline-none focus:ring-1 focus:ring-rose-950 focus:border-rose-400" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-rose-900 mb-2">Email Address *</label>
                <input required type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 border border-rose-200 focus:outline-none focus:ring-1 focus:ring-rose-950 focus:border-rose-400" />
              </div>
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-rose-900 mb-2">City/State *</label>
                <input required type="text" id="city" name="city" value={formData.city} onChange={handleChange} className="w-full px-4 py-3 border border-rose-200 focus:outline-none focus:ring-1 focus:ring-rose-950 focus:border-rose-400" />
              </div>
              <div>
                <label htmlFor="quantity" className="block text-sm font-medium text-rose-900 mb-2">Estimated Quantity Required *</label>
                <select required id="quantity" name="quantity" value={formData.quantity} onChange={handleChange} className="w-full px-4 py-3 border border-rose-200 focus:outline-none focus:ring-1 focus:ring-rose-950 focus:border-rose-400 bg-white">
                  <option value="">Select quantity</option>
                  <option value="50-100">50 - 100 pairs</option>
                  <option value="101-500">101 - 500 pairs</option>
                  <option value="501-1000">501 - 1000 pairs</option>
                  <option value="1000+">1000+ pairs</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label htmlFor="products" className="block text-sm font-medium text-rose-900 mb-2">Products Interested In *</label>
                <input required type="text" id="products" name="products" placeholder="e.g., Stiletto Heels, Leather Flats" value={formData.products} onChange={handleChange} className="w-full px-4 py-3 border border-rose-200 focus:outline-none focus:ring-1 focus:ring-rose-950 focus:border-rose-400" />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="requirements" className="block text-sm font-medium text-rose-900 mb-2">Additional Requirements / Custom Branding Details</label>
                <textarea id="requirements" name="requirements" rows={4} value={formData.requirements} onChange={handleChange} className="w-full px-4 py-3 border border-rose-200 focus:outline-none focus:ring-1 focus:ring-rose-950 focus:border-rose-400"></textarea>
              </div>
            </div>
            
            <div className="text-center">
              <button type="submit" className="w-full md:w-auto px-10 py-4 bg-rose-400 text-white font-medium hover:bg-rose-500 transition-colors">
                Submit Enquiry
              </button>
              <p className="mt-4 text-xs text-rose-700">We typically respond to wholesale enquiries within 24 hours.</p>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
