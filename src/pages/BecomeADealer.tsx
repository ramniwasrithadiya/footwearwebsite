import { useState } from 'react';
import { Briefcase, TrendingUp, Package, ShieldCheck, Factory } from 'lucide-react';

export function BecomeADealer() {
  const [formData, setFormData] = useState({
    name: '',
    mobileNumber: '',
    city: '',
    businessName: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        mobileNumber: '',
        city: '',
        businessName: '',
        message: ''
      });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="bg-rose-100 text-rose-950 py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 -left-10 w-40 h-40 rounded-full bg-rose-400 blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-60 h-60 rounded-full bg-yellow-600 blur-3xl"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-serif mb-6">Partner with HandcraftedHeels</h1>
          <p className="text-xl text-rose-800 max-w-3xl mx-auto font-light leading-relaxed mb-10">
            Join us as a dealer and grow your footwear business with our premium women's footwear collection.
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-rose-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif text-rose-950 mb-4">Benefits of Partnering With Us</h2>
            <div className="w-16 h-0.5 bg-yellow-600 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-12">
            <div className="bg-white p-8 border border-rose-100 shadow-sm text-center">
              <div className="flex justify-center mb-6">
                <Briefcase className="w-10 h-10 text-yellow-600" />
              </div>
              <h3 className="text-xl font-medium text-rose-950 mb-3">Direct manufacturer pricing</h3>
            </div>
            
            <div className="bg-white p-8 border border-rose-100 shadow-sm text-center">
              <div className="flex justify-center mb-6">
                <TrendingUp className="w-10 h-10 text-yellow-600" />
              </div>
              <h3 className="text-xl font-medium text-rose-950 mb-3">New designs regularly</h3>
            </div>
            
            <div className="bg-white p-8 border border-rose-100 shadow-sm text-center">
              <div className="flex justify-center mb-6">
                <Package className="w-10 h-10 text-yellow-600" />
              </div>
              <h3 className="text-xl font-medium text-rose-950 mb-3">Bulk order support</h3>
            </div>
            
            <div className="bg-white p-8 border border-rose-100 shadow-sm text-center">
              <div className="flex justify-center mb-6">
                <ShieldCheck className="w-10 h-10 text-yellow-600" />
              </div>
              <h3 className="text-xl font-medium text-rose-950 mb-3">Quality footwear supply</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Private Label Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-rose-500 font-medium tracking-widest uppercase text-sm mb-3">Private Label & Custom Manufacturing</p>
            <h2 className="text-3xl md:text-4xl font-serif mb-6 text-rose-950">Build Your Own Footwear Brand With Us</h2>
            <div className="w-20 h-0.5 bg-yellow-600 mx-auto mb-8"></div>
            <p className="text-rose-700 max-w-3xl mx-auto text-lg font-light leading-relaxed">
              Launch your own footwear brand with our private label manufacturing services. We provide high-quality footwear production with complete branding and packaging solutions.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
            {[
              {
                icon: <Briefcase className="w-12 h-12 text-yellow-600 group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />,
                title: "Custom Footwear Designs",
                desc: "Turn your ideas into reality with our expert design and prototyping team."
              },
              {
                icon: <ShieldCheck className="w-12 h-12 text-yellow-600 group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />,
                title: "Your Brand Logo Printing",
                desc: "High-quality embossing, foil stamping, and printing of your logo."
              },
              {
                icon: <Package className="w-12 h-12 text-yellow-600 group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />,
                title: "Customized Box Packaging",
                desc: "Premium packaging options designed specifically for your brand identity."
              },
              {
                icon: <TrendingUp className="w-12 h-12 text-yellow-600 group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />,
                title: "Custom Labels & Tags",
                desc: "Complete branding solutions including woven labels, size tags, and hangtags."
              },
              {
                icon: <Factory className="w-12 h-12 text-yellow-600 group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />,
                title: "Bulk Manufacturing",
                desc: "Scalable production runs ensuring consistent quality and timely delivery."
              }
            ].map((feature, i) => (
              <div key={i} className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.4rem)] bg-rose-50 p-8 rounded-2xl border border-rose-100 hover:border-rose-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-center group">
                <div className="flex justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-medium mb-3 text-rose-950">{feature.title}</h3>
                <p className="text-sm text-rose-700 font-light leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <button onClick={() => {
              document.getElementById('enquire-form')?.scrollIntoView({ behavior: 'smooth' });
            }} className="px-10 py-4 bg-rose-400 text-white font-medium hover:bg-rose-500 transition-all duration-300 shadow-md hover:shadow-lg inline-flex items-center tracking-wide">
              Submit Request
            </button>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section id="enquire-form" className="py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif text-rose-950 mb-4">Interested in becoming a dealer?</h2>
            <p className="text-rose-700">Fill out your details and our team will contact you.</p>
          </div>
          
          {submitted ? (
            <div className="bg-green-50 border border-green-200 text-green-800 p-8 rounded-lg text-center">
              <h3 className="text-2xl font-serif mb-2">Thank you!</h3>
              <p>Your request has been submitted successfully. We will get in touch with you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white p-8 md:p-12 border border-rose-200 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-rose-900 mb-2">Name *</label>
                  <input required type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-3 border border-rose-200 focus:outline-none focus:ring-1 focus:ring-rose-950 focus:border-rose-400" />
                </div>
                <div>
                  <label htmlFor="mobileNumber" className="block text-sm font-medium text-rose-900 mb-2">Mobile Number *</label>
                  <input required type="tel" id="mobileNumber" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} className="w-full px-4 py-3 border border-rose-200 focus:outline-none focus:ring-1 focus:ring-rose-950 focus:border-rose-400" />
                </div>
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-rose-900 mb-2">City *</label>
                  <input required type="text" id="city" name="city" value={formData.city} onChange={handleChange} className="w-full px-4 py-3 border border-rose-200 focus:outline-none focus:ring-1 focus:ring-rose-950 focus:border-rose-400" />
                </div>
                <div>
                  <label htmlFor="businessName" className="block text-sm font-medium text-rose-900 mb-2">Business Name</label>
                  <input type="text" id="businessName" name="businessName" value={formData.businessName} onChange={handleChange} className="w-full px-4 py-3 border border-rose-200 focus:outline-none focus:ring-1 focus:ring-rose-950 focus:border-rose-400" />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="message" className="block text-sm font-medium text-rose-900 mb-2">Message (Optional)</label>
                  <textarea id="message" name="message" rows={4} value={formData.message} onChange={handleChange} className="w-full px-4 py-3 border border-rose-200 focus:outline-none focus:ring-1 focus:ring-rose-950 focus:border-rose-400"></textarea>
                </div>
              </div>
              
              <div className="text-center">
                <button type="submit" className="w-full md:w-auto px-10 py-4 bg-rose-400 text-white font-medium hover:bg-rose-500 transition-colors">
                  Submit Request
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
