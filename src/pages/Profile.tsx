import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { db } from '../lib/firebase';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { User as UserIcon, Package, Mail, Phone, Calendar, LogOut, Info } from 'lucide-react';

interface Order {
  id: string;
  orderId: string;
  productName: string;
  productImage: string;
  quantity: number;
  orderDate: string;
  status: string;
  totalAmount: number;
}

export function Profile() {
  const { user, profile, loading: authLoading, logout } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchOrders() {
      if (!user) return;
      try {
        const q = query(
          collection(db, 'orders'),
          where('userId', '==', user.uid),
          orderBy('createdAt', 'desc')
        );
        const querySnapshot = await getDocs(q);
        const fetchedOrders: Order[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          // Assuming structure, adapt if different
          fetchedOrders.push({
            id: doc.id,
            orderId: data.orderId || doc.id.slice(0, 8).toUpperCase(),
            productName: data.productName || 'Product',
            productImage: data.productImage || 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80',
            quantity: data.quantity || 1,
            orderDate: data.createdAt ? new Date(data.createdAt).toLocaleDateString() : 'Unknown Date',
            status: data.status || 'Processing',
            totalAmount: data.totalAmount || 0,
          });
        });
        setOrders(fetchedOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoadingOrders(false);
      }
    }

    if (user && !authLoading) {
      fetchOrders();
    }
  }, [user, authLoading]);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  if (authLoading) {
    return <div className="min-h-[80vh] flex items-center justify-center">Loading profile...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-3xl font-serif font-bold text-rose-950">My Account</h1>
          <button
            onClick={handleLogout}
            className="inline-flex items-center justify-center px-4 py-2 border border-rose-200 rounded-md shadow-sm text-sm font-medium text-rose-700 bg-white hover:bg-rose-50 transition-colors"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Profile & Support */}
          <div className="space-y-8 lg:col-span-1">
            
            {/* Profile Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center text-rose-800 flex-shrink-0">
                    <UserIcon className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{profile?.fullName || 'User'}</h2>
                    <p className="text-sm text-gray-500">Customer</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3 text-sm">
                    <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">Email Address</p>
                      <p className="text-gray-600">{user.email}</p>
                    </div>
                  </div>
                  
                  {profile?.mobile && (
                    <div className="flex items-start space-x-3 text-sm">
                      <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900">Mobile Number</p>
                        <p className="text-gray-600">+91 {profile.mobile}</p>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-start space-x-3 text-sm">
                    <Info className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">User ID</p>
                      <p className="text-gray-600 text-xs font-mono break-all">{user.uid}</p>
                    </div>
                  </div>
                  
                  {user.metadata.creationTime && (
                    <div className="flex items-start space-x-3 text-sm">
                      <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900">Member Since</p>
                        <p className="text-gray-600">{new Date(user.metadata.creationTime).toLocaleDateString()}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Support Card */}
            <div className="bg-rose-50 rounded-xl shadow-sm border border-rose-100 overflow-hidden">
              <div className="p-6">
                <h3 className="text-lg font-bold text-rose-950 mb-2">Need help?</h3>
                <p className="text-sm text-rose-800 mb-4">
                  Contact our support team for any queries regarding your orders or account.
                </p>
                <a 
                  href="mailto:info@handcraftedheels.com"
                  className="inline-flex items-center text-rose-700 font-medium hover:text-rose-900 transition-colors"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  info@handcraftedheels.com
                </a>
              </div>
            </div>
            
          </div>

          {/* Right Column: Orders */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden h-full">
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900 flex items-center">
                  <Package className="w-5 h-5 mr-2 text-rose-600" />
                  My Orders
                </h2>
              </div>
              
              <div className="p-6">
                {loadingOrders ? (
                  <div className="flex justify-center items-center py-12">
                    <div className="animate-pulse flex flex-col items-center">
                      <div className="h-8 w-8 bg-gray-200 rounded-full mb-4"></div>
                      <div className="h-4 w-24 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                ) : orders.length > 0 ? (
                  <div className="space-y-6">
                    {orders.map((order) => (
                      <div key={order.id} className="border border-gray-100 rounded-lg p-4 sm:p-6 hover:shadow-md transition-shadow">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 pb-4 border-b border-gray-50">
                          <div>
                            <p className="text-sm text-gray-500">Order ID: <span className="font-mono text-gray-900 font-medium">{order.orderId}</span></p>
                            <p className="text-sm text-gray-500">Placed on: <span className="text-gray-900 font-medium">{order.orderDate}</span></p>
                          </div>
                          <div className="mt-2 sm:mt-0">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              order.status.toLowerCase() === 'delivered' ? 'bg-green-100 text-green-800' :
                              order.status.toLowerCase() === 'processing' ? 'bg-blue-100 text-blue-800' :
                              order.status.toLowerCase() === 'shipped' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {order.status}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          <img 
                            src={order.productImage} 
                            alt={order.productName} 
                            className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-md bg-gray-50 border border-gray-100"
                          />
                          <div className="ml-4 sm:ml-6 flex-1">
                            <h4 className="text-base font-medium text-gray-900">{order.productName}</h4>
                            <p className="text-sm text-gray-500 mt-1">Qty: {order.quantity}</p>
                            <p className="text-base font-bold text-gray-900 mt-2">&#8377;{order.totalAmount.toLocaleString('en-IN')}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Package className="w-8 h-8 text-gray-300" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
                    <p className="text-gray-500 max-w-sm mx-auto mb-6">
                      When you place an order, it will appear here. Start exploring our collection!
                    </p>
                    <button 
                      onClick={() => navigate('/shop')}
                      className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-rose-950 hover:bg-rose-900 transition-colors"
                    >
                      Start Shopping
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
