import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { User as UserIcon, Package, Mail, Phone, Calendar, LogOut, Info } from 'lucide-react';
import api from '../api/axios';

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
        const response = await api.get(`/orders?firebase_uid=${user.uid}`);
        if (response.data && response.data.success) {
          setOrders(response.data.orders);
        }
      } catch (error: any) {
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

  const firstName = profile?.firstName || profile?.fullName?.split(' ')[0] || 'User';
  const lastName = profile?.lastName || profile?.fullName?.split(' ').slice(1).join(' ') || '';
  const fullName = profile?.firstName ? `${profile.firstName} ${lastName}`.trim() : profile?.fullName || 'User';

  if (authLoading) {
    return <div className="min-h-[80vh] flex items-center justify-center">Loading profile...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-3xl font-serif font-bold text-rose-950">My Profile</h1>
        </div>

        {/* 1. Profile Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 sm:p-6">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-rose-100 rounded-full flex items-center justify-center text-rose-800 flex-shrink-0">
                <UserIcon className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-gray-900">{firstName}</h2>
                <p className="text-sm text-rose-600 font-medium">Customer</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3 text-sm">
                <UserIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Name</p>
                  <p className="text-gray-600">{fullName}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 text-sm">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Email Address</p>
                  <p className="text-gray-600 break-all">{user.email}</p>
                </div>
              </div>
              
              {profile?.mobile && (
                <div className="flex items-start space-x-3 text-sm">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Mobile Number</p>
                    <p className="text-gray-600">+91 {profile.mobile}</p>
                  </div>
                </div>
              )}
              
              {user.metadata.creationTime && (
                <div className="flex items-start space-x-3 text-sm">
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Member Since</p>
                    <p className="text-gray-600">{new Date(user.metadata.creationTime).toLocaleDateString()}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 2. My Orders */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 sm:p-6 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900 flex items-center">
              <Package className="w-5 h-5 mr-2 text-rose-600" />
              My Orders
            </h2>
          </div>
          
          <div className="p-4 sm:p-6">
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
                  className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-rose-200 rounded-md shadow-sm text-base font-medium text-rose-700 bg-white hover:bg-rose-50 transition-colors"
                >
                  Start Shopping
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 3. Logout Button */}
        <div>
          <button
            onClick={handleLogout}
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-rose-200 rounded-md shadow-sm text-base font-medium text-rose-700 bg-white hover:bg-rose-50 transition-colors"
          >
            <LogOut className="w-5 h-5 mr-2" />
            Logout
          </button>
        </div>

        {/* 4. Support Card */}
        <div className="bg-rose-50 rounded-xl shadow-sm border border-rose-100 overflow-hidden">
          <div className="p-4 sm:p-6">
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
    </div>
  );
}
