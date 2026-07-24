import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-rose-100 text-rose-950 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-6 sm:gap-12 mb-12">
          <div className="space-y-4 lg:col-span-4">
            <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-rose-950 flex items-center flex-wrap">
              <span className="text-2xl mr-2">👣</span>
              <span>HandcraftedHeels</span>
            </span>
            <p className="text-rose-800 text-sm leading-relaxed">
              Handcrafted luxury footwear, combining traditional techniques with contemporary design for every step of your journey.
            </p>
            <div className="flex items-center space-x-4 pt-2">
              <span className="text-sm font-medium">Follow Us:</span>
              <a href="https://instagram.com/handcraftedheels" target="_blank" rel="noopener noreferrer" className="text-rose-800 hover:text-yellow-600 transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="https://facebook.com/priyankamanufacturer" target="_blank" rel="noopener noreferrer" className="text-rose-800 hover:text-yellow-600 transition-colors"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="text-rose-800 hover:text-yellow-600 transition-colors"><Twitter className="w-5 h-5" /></a>
            </div>
          </div>
          
          <div className="lg:col-span-2">
            <h4 className="text-lg font-medium mb-4">Shop</h4>
            <ul className="space-y-2 text-sm text-rose-800">
              <li><Link to="/shop?filter=new-arrivals" onClick={() => window.scrollTo(0, 0)} className="hover:text-yellow-600 transition-colors">New Arrivals</Link></li>
              <li><Link to="/shop?filter=best-sellers" onClick={() => window.scrollTo(0, 0)} className="hover:text-yellow-600 transition-colors">Best Sellers</Link></li>
              <li><Link to="/shop?filter=heels-flats" onClick={() => window.scrollTo(0, 0)} className="hover:text-yellow-600 transition-colors">Heels & Flats</Link></li>
              <li><Link to="/shop?filter=boots-sandals" onClick={() => window.scrollTo(0, 0)} className="hover:text-yellow-600 transition-colors">Boots & Sandals</Link></li>
            </ul>
          </div>
          
          <div className="lg:col-span-3">
            <h4 className="text-lg font-medium mb-4">Business</h4>
            <ul className="space-y-2 text-sm text-rose-800">
              <li><Link to="/bulk-orders" className="hover:text-yellow-600 transition-colors">Wholesale Portal</Link></li>
              <li><Link to="/faq" className="hover:text-yellow-600 transition-colors">FAQ</Link></li>
              <li><a href="#" className="hover:text-yellow-600 transition-colors text-yellow-500">Download Catalog (PDF)</a></li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-lg font-medium mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm text-rose-800">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 flex-shrink-0 mt-0.5" />
                <span className="flex-1">GALLI NO 35, INDIRA NAGAR - 2, THAKKAR BAPPA COLONY,<br />SG BARVE MARG, Chembur,<br />MUMBAI (M. CORP), MUMBAI, 400071<br />GST: 27BYEPR8640A1ZE</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-3 flex-shrink-0" />
                <span>+91 9967285056</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-3 flex-shrink-0" />
                <a href="mailto:info@handcraftedheels.com" className="hover:text-yellow-600 transition-colors">info@handcraftedheels.com</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-rose-300 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-rose-700">
          <p>&copy; {new Date().getFullYear()} HandcraftedHeels. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-yellow-600">Privacy Policy</a>
            <a href="#" className="hover:text-yellow-600">Terms of Service</a>
            <a href="#" className="hover:text-yellow-600">Shipping & Returns</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
