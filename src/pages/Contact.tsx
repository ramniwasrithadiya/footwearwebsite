import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react';

export function Contact() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center mb-16 max-w-2xl mx-auto">
        <h1 className="text-4xl font-serif text-rose-950 mb-4">Get in Touch</h1>
        <p className="text-rose-700 text-lg font-light">Whether you're looking for a single pair or want to discuss a large wholesale order, our team is here to assist you.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
        <div className="bg-rose-50 p-8 text-center border border-rose-100">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
            <Phone className="w-6 h-6 text-yellow-600" />
          </div>
          <h3 className="text-lg font-medium text-rose-950 mb-2">Call Us</h3>
          <p className="text-rose-700 mb-4 text-sm">Mon-Sat, 9AM to 6PM</p>
          <a href="tel:+919967285056" className="text-lg font-medium text-rose-950 hover:text-yellow-600">+91 9967285056</a>
        </div>

        <div className="bg-rose-50 p-8 text-center border border-rose-100">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
            <Mail className="w-6 h-6 text-yellow-600" />
          </div>
          <h3 className="text-lg font-medium text-rose-950 mb-2">Email Us</h3>
          <p className="text-rose-700 mb-4 text-sm">For retail & wholesale queries</p>
          <a href="mailto:info@handcraftedheels.com" className="text-lg font-medium text-rose-950 hover:text-yellow-600">info@handcraftedheels.com</a>
        </div>

        <div className="bg-rose-50 p-8 text-center border border-rose-100">
          <div className="w-12 h-12 bg-[#25D366] text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
            <MessageCircle className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-medium text-rose-950 mb-2">WhatsApp</h3>
          <p className="text-rose-700 mb-4 text-sm">Instant replies during business hours</p>
          <a href="https://wa.me/919967285056" target="_blank" rel="noopener noreferrer" className="text-lg font-medium text-[#25D366] hover:underline">Chat with us</a>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <h2 className="text-2xl font-serif text-rose-950 mb-8">Send us a Message</h2>
          <form className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-rose-900 mb-2">Your Name</label>
                <input type="text" id="name" className="w-full px-4 py-3 border border-rose-200 focus:outline-none focus:ring-1 focus:ring-rose-950" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-rose-900 mb-2">Your Email</label>
                <input type="email" id="email" className="w-full px-4 py-3 border border-rose-200 focus:outline-none focus:ring-1 focus:ring-rose-950" />
              </div>
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-rose-900 mb-2">Subject</label>
              <select id="subject" className="w-full px-4 py-3 border border-rose-200 focus:outline-none focus:ring-1 focus:ring-rose-950 bg-white">
                <option>General Enquiry</option>
                <option>Wholesale Order</option>
                <option>Retail Order Tracking</option>
                <option>Become a Dealer</option>
              </select>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-rose-900 mb-2">Message</label>
              <textarea id="message" rows={5} className="w-full px-4 py-3 border border-rose-200 focus:outline-none focus:ring-1 focus:ring-rose-950"></textarea>
            </div>
            <button type="submit" className="px-8 py-4 bg-rose-400 text-white font-medium hover:bg-rose-500 transition-colors">
              Send Message
            </button>
          </form>
        </div>
        
        <div>
          <h2 className="text-2xl font-serif text-rose-950 mb-8">Visit Our Factory</h2>
          <div className="bg-rose-50 h-64 w-full mb-8 relative">
            <iframe
              src="https://maps.google.com/maps?q=GALLI+NO+35,INDIRA+NAGAR+-+2,+THAKKAR+BAPPA+COLONY,SG+BARVE+MARG,+Chembur,+MUMBAI,+400071&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0"
              title="Factory Location"
            ></iframe>
          </div>
          <div className="flex items-start">
            <MapPin className="w-6 h-6 text-yellow-600 mr-4 flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-medium text-rose-950 mb-2">HandcraftedHeels Manufacturing Facility</h4>
              <p className="text-rose-800 leading-relaxed text-sm">
                GALLI NO 35, INDIRA NAGAR - 2, THAKKAR BAPPA COLONY,<br />
                SG BARVE MARG, Chembur,<br />
                MUMBAI (M. CORP), MUMBAI, 400071<br />
                GST: 27BYEPR8640A1ZE
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
