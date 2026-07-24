import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { CartSidebar } from './components/CartSidebar';
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { BulkOrders } from './pages/BulkOrders';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { FAQ } from './pages/FAQ';
import { ProductDetail } from './pages/ProductDetail';
import { Login } from './pages/Login';
import { Wishlist } from './pages/Wishlist';
import { Profile } from './pages/Profile';
import { Checkout } from './pages/Checkout';
import { CartProvider } from './CartContext';
import { AuthProvider } from './AuthContext';
import { WishlistProvider } from './WishlistContext';
import { ProductsProvider } from './ProductsContext';
import { AdminDashboard } from './pages/admin/AdminDashboard';

function AppContent() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <div className="min-h-screen flex flex-col font-sans text-rose-950">
      <Navbar />
      <CartSidebar />
      <main className="flex-grow pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:id" element={<ProductDetail />} />
          <Route path="/bulk-orders" element={<BulkOrders />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/login" element={<Login />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </main>
      {!isLoginPage && <Footer />}
      <WhatsAppButton />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <ProductsProvider>
        <WishlistProvider>
          <CartProvider>
            <Router>
              <AppContent />
            </Router>
          </CartProvider>
        </WishlistProvider>
      </ProductsProvider>
    </AuthProvider>
  );
}

export default App;
