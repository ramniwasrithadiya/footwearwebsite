import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../CartContext';
import { useAuth } from '../AuthContext';
import { auth } from '../lib/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { ShoppingBag, ChevronRight, Lock, User, MapPin, Phone, Mail } from 'lucide-react';
import api from '../api/axios';

export function Checkout() {
  const { items, clearCart } = useCart();
  const { user, profile } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    address: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Post checkout account creation
  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const [tempUid, setTempUid] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  useEffect(() => {
    if (profile) {
      setFormData(prev => ({
        ...prev,
        firstName: profile.firstName || '',
        lastName: profile.lastName || '',
        email: profile.email || '',
        mobile: profile.mobile || ''
      }));
    }
  }, [profile]);

  if (items.length === 0 && !showCreateAccount) {
    return (
      <div className="min-h-screen bg-rose-50 flex flex-col justify-center items-center py-20 px-4">
        <ShoppingBag className="w-16 h-16 text-rose-200 mb-6" />
        <h2 className="text-2xl font-serif text-rose-950 mb-4">Your bag is empty</h2>
        <p className="text-rose-700 mb-8">Add items to your bag to proceed to checkout.</p>
        <button
          onClick={() => navigate('/shop')}
          className="px-8 py-3 bg-rose-950 text-white font-medium hover:bg-rose-900 transition-colors"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.mobile || !formData.address) {
      setError('Please fill out all fields.');
      return;
    }
    setError('');
    setLoading(true);

    const res = await loadRazorpayScript();
    if (!res) {
      setError("Razorpay SDK failed to load. Are you online?");
      setLoading(false);
      return;
    }

    try {
      const { data } = await api.post('/create-razorpay-order', { amount: total });
      
      if (data.error) {
        setError(data.error);
        setLoading(false);
        return;
      }

      if (data.isMock) {
        // Proceed directly with mock payment success
        await processOrderSuccess(data.id);
        return;
      }

      const options = {
        key: data.keyId,
        amount: data.amount,
        currency: data.currency,
        name: "HandcraftedHeels",
        description: "Order Checkout",
        order_id: data.id,
        handler: async function (response: any) {
          const verifyData = await api.post('/verify-razorpay-payment', response);
          if (verifyData.data.success) {
            await processOrderSuccess(data.id);
          } else {
            setError("Payment verification failed");
            setLoading(false);
          }
        },
        theme: {
          color: "#4c0519"
        }
      };

      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.open();
    } catch (err: any) {
      console.error(err);
      setError("Error initializing payment.");
      setLoading(false);
    }
  };

  const processOrderSuccess = async (razorpayOrderId: string) => {
    try {
      const orderData = {
        firebase_uid: user?.uid,
        guestInfo: formData,
        totalAmount: total,
        items: items,
        paymentStatus: 'paid'
      };

      const { data } = await api.post('/orders', orderData);
      
      if (data.success) {
        clearCart();
        
        if (data.isNewUser && data.tempUid) {
          setTempUid(data.tempUid);
          setShowCreateAccount(true);
        } else {
          // If logged in or guest matching existing account
          navigate('/profile');
        }
      }
    } catch (err: any) {
      console.error("Order creation failed", err);
      setError("Order created but failed to save properly. Please contact support.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, password);
      const newFirebaseUid = userCredential.user.uid;
      
      // Update MySQL with real uid
      await api.post('/auth/register', {
        firebase_uid: newFirebaseUid,
        tempUid: tempUid,
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        mobile: formData.mobile
      });
      
      navigate('/profile');
    } catch (err: any) {
      console.error("Account creation error", err);
      setError(err.message || "Failed to create account.");
    } finally {
      setLoading(false);
    }
  };

  if (showCreateAccount) {
    return (
      <div className="min-h-screen bg-rose-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white p-8 shadow-sm">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-serif text-rose-950">Order Successful!</h2>
            <p className="text-rose-700 mt-2">Create an account to track your order and save your details for future purchases.</p>
          </div>

          <form onSubmit={handleCreateAccount} className="space-y-6">
            {error && (
              <div className="bg-red-50 text-red-600 p-3 text-sm">{error}</div>
            )}
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  disabled
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 text-gray-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-rose-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-rose-500"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-rose-950 text-white font-medium hover:bg-rose-900 transition-colors disabled:opacity-50"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
            
            <div className="text-center">
              <button
                type="button"
                onClick={() => navigate('/profile')}
                className="text-sm text-rose-600 hover:text-rose-800"
              >
                Skip for now
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-rose-50 min-h-screen pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex items-center text-sm text-rose-600 mb-8">
          <span className="hover:text-rose-900 cursor-pointer" onClick={() => navigate('/shop')}>Shop</span>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="font-medium text-rose-950">Checkout</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Column: Form */}
          <div className="lg:w-2/3">
            <div className="bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-serif text-rose-950 mb-6">Delivery Details</h2>
              
              {error && (
                <div className="mb-6 bg-red-50 text-red-600 p-4 text-sm">{error}</div>
              )}

              <form onSubmit={handleCheckout} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="pl-10 w-full px-4 py-3 border border-gray-300 focus:ring-rose-500 focus:border-rose-500 outline-none transition-colors"
                        placeholder="First name"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 focus:ring-rose-500 focus:border-rose-500 outline-none transition-colors"
                      placeholder="Last name"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="pl-10 w-full px-4 py-3 border border-gray-300 focus:ring-rose-500 focus:border-rose-500 outline-none transition-colors"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="tel"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleInputChange}
                        required
                        className="pl-10 w-full px-4 py-3 border border-gray-300 focus:ring-rose-500 focus:border-rose-500 outline-none transition-colors"
                        placeholder="+91"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Complete Delivery Address</label>
                  <div className="relative">
                    <div className="absolute top-3 left-3 pointer-events-none">
                      <MapPin className="h-5 w-5 text-gray-400" />
                    </div>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      rows={3}
                      className="pl-10 w-full px-4 py-3 border border-gray-300 focus:ring-rose-500 focus:border-rose-500 outline-none transition-colors"
                      placeholder="Street address, city, state, pin code"
                    />
                  </div>
                </div>

                <div className="pt-6">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-rose-950 text-white py-4 font-medium hover:bg-rose-900 transition-colors disabled:opacity-50 flex justify-center items-center"
                  >
                    {loading ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      <>
                        <Lock className="w-4 h-4 mr-2" /> Proceed to Payment
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white p-6 shadow-sm sticky top-24">
              <h2 className="text-xl font-serif text-rose-950 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6 max-h-96 overflow-y-auto pr-2">
                {items.map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <img src={item.product.image} alt={item.product.name} className="w-16 h-20 object-cover" />
                    <div className="flex-1 text-sm">
                      <h4 className="font-medium text-rose-950">{item.product.name}</h4>
                      <p className="text-gray-500 mt-1">Size: {item.size} | Color: {item.color}</p>
                      <div className="flex justify-between mt-2">
                        <span className="text-gray-500">Qty: {item.quantity}</span>
                        <span className="font-medium text-rose-950">&#8377;{(item.product.price * item.quantity).toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-rose-100 pt-4 space-y-3 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>&#8377;{total.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
                <div className="flex justify-between text-lg font-medium text-rose-950 pt-3 border-t border-rose-100">
                  <span>Total</span>
                  <span>&#8377;{total.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
