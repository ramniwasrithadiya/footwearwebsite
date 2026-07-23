import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { auth, db } from '../lib/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { collection, doc, setDoc, query, where, getDocs } from 'firebase/firestore';
import { useAuth } from '../AuthContext';

export function Login() {
  const [view, setView] = useState<'login' | 'signup' | 'forgot'>('login');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  
  // Signup specific
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    if (user && !authLoading) {
      navigate('/wishlist');
    }
  }, [user, authLoading, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      let loginEmail = identifier;
      
      // Check if identifier is mobile number (no @ symbol)
      const isMobile = !identifier.includes('@');
      
      if (isMobile) {
        // Clean mobile number for lookup (remove non-digits, take last 10 to ignore country code)
        const cleanMobile = identifier.replace(/\D/g, '').slice(-10);

        console.log("Login - Entered mobile by user:", identifier);
        console.log("Login - Cleaned mobile number:", cleanMobile);
        console.log("Login - Searching Firestore collection 'users' where mobile == ", cleanMobile);

        if (cleanMobile.length !== 10) {
          setError('Please enter a valid 10-digit mobile number.');
          setLoading(false);
          return;
        }

        const q = query(collection(db, 'users'), where('mobile', '==', cleanMobile));
        const querySnapshot = await getDocs(q);
        
        console.log("Login - Number of documents found:", querySnapshot.size);

        if (querySnapshot.empty) {
          throw new Error('No account found with this mobile number.');
        }
        
        // Get the email associated with this mobile number
        loginEmail = querySnapshot.docs[0].data().email;
        console.log("Login - Retrieved email:", loginEmail);
      } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(identifier)) {
          setError('Please enter a valid email address.');
          setLoading(false);
          return;
        }
      }

      await signInWithEmailAndPassword(auth, loginEmail, password);
      navigate('/wishlist');
    } catch (err: any) {
      console.error("Login Error:", err);
      if (err.message === 'No account found with this mobile number.') {
        setError(err.message);
      } else if (err.code === 'auth/operation-not-allowed') {
        setError('Email/Password authentication is disabled in Firebase. Please enable it in the Firebase Console under Authentication > Sign-in method.');
      } else if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        setError('Invalid credentials or account not found.');
      } else if (err.code === 'auth/too-many-requests') {
        setError('Too many failed login attempts. Please try again later.');
      } else {
        setError(err.message || 'An error occurred during login.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const cleanMobile = mobile.replace(/\D/g, '').slice(-10);
      
      // Check if mobile already exists
      const q = query(collection(db, 'users'), where('mobile', '==', cleanMobile));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        throw new Error('Mobile number already in use.');
      }

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save user profile
      await setDoc(doc(db, 'users', user.uid), {
        fullName,
        email,
        mobile: cleanMobile,
        createdAt: new Date().toISOString()
      });

      navigate('/wishlist');
    } catch (err: any) {
      console.error("Signup Error:", err);
      if (err.code === 'auth/operation-not-allowed') {
        setError('Email/Password authentication is disabled in Firebase. Please enable it in the Firebase Console under Authentication > Sign-in method.');
      } else if (err.code === 'auth/email-already-in-use') {
        setError('An account with this email already exists.');
      } else if (err.code === 'auth/weak-password') {
        setError('Password should be at least 6 characters.');
      } else {
        setError(err.message || 'Failed to create account.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleForgot = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('Password reset email sent. Check your inbox.');
    } catch (err: any) {
      console.error("Forgot Password Error:", err);
      if (err.code === 'auth/user-not-found') {
        setError('No account found with this email.');
      } else if (err.code === 'auth/invalid-email') {
        setError('Please enter a valid email address.');
      } else {
        setError(err.message || 'Failed to send password reset email.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50/50 min-h-[80vh] flex flex-col justify-center py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto w-full sm:max-w-[440px]">
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl overflow-hidden border border-gray-200">
          {/* Header */}
          <div className="bg-white/90 backdrop-blur-md border-b border-rose-200 px-4 sm:px-6 py-6 sm:py-8 relative overflow-hidden">
            <button 
              onClick={() => navigate(-1)} 
              className="absolute top-4 left-4 text-rose-800 hover:text-rose-950 transition-colors z-10"
            >
              <div className="bg-rose-50 rounded-full p-1 sm:p-1.5 hover:bg-rose-100 transition-colors">
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            </button>
            <div className="flex flex-row items-center justify-center relative z-10 space-x-2 text-center px-6 sm:px-0 mt-1 sm:mt-0">
              <span className="text-xl sm:text-3xl">👣</span>
              <h1 className="text-rose-950 font-serif text-lg sm:text-3xl font-bold tracking-tight truncate">
                HandcraftedHeels
              </h1>
            </div>
          </div>
          
          {/* Body */}
          <div className="px-5 sm:px-8 py-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {view === 'login' ? 'Log In' : view === 'signup' ? 'Sign Up' : 'Reset Password'}
              </h2>
              <p className="text-[15px] text-gray-500">
                {view === 'login' ? 'Welcome back! Please enter your details.' : 
                 view === 'signup' ? 'Create an account to get started.' : 
                 'Enter your email to receive a password reset link.'}
              </p>
            </div>

            {error && <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm text-center">{error}</div>}
            {message && <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-md text-sm text-center">{message}</div>}

            {view === 'login' && (
              <form onSubmit={handleLogin} className="space-y-5">
                <div className="bg-gray-100/60 pt-3 pb-2 px-4 relative rounded-t-sm">
                  <label className="block text-xs text-gray-500 mb-1">Email or Mobile Number</label>
                  <input
                    type="text"
                    value={identifier}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (!val.includes('@') && /^[\d\s+]*$/.test(val) && val.replace(/\D/g, '').length > 10) {
                        return;
                      }
                      setIdentifier(val);
                    }}
                    className="block w-full bg-transparent text-base text-gray-900 focus:outline-none focus:ring-0"
                    placeholder="Enter email or mobile no."
                    required
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-black"></div>
                </div>

                <div className="bg-gray-100/60 pt-3 pb-2 px-4 relative rounded-t-sm">
                  <label className="block text-xs text-gray-500 mb-1">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full bg-transparent text-base text-gray-900 focus:outline-none focus:ring-0"
                    placeholder="Enter password"
                    required
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-black"></div>
                </div>

                <div className="flex justify-end">
                  <button type="button" onClick={() => setView('forgot')} className="text-sm font-medium text-yellow-600 hover:text-yellow-700">
                    Forgot Password?
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={loading || !identifier || !password}
                  className="w-full py-4 mt-2 text-[15px] font-semibold text-center transition-colors bg-yellow-600 text-white hover:bg-yellow-500 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
                >
                  {loading ? 'Logging in...' : 'Log In'}
                </button>

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">OR</span>
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-[15px] text-gray-600">
                    Don't have an account?{' '}
                    <button type="button" onClick={() => setView('signup')} className="text-yellow-600 font-medium hover:underline">
                      Sign Up
                    </button>
                  </p>
                </div>
              </form>
            )}

            {view === 'signup' && (
              <form onSubmit={handleSignup} className="space-y-5">
                <div className="bg-gray-100/60 pt-3 pb-2 px-4 relative rounded-t-sm">
                  <label className="block text-xs text-gray-500 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="block w-full bg-transparent text-base text-gray-900 focus:outline-none focus:ring-0"
                    placeholder="Enter full name"
                    required
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-black"></div>
                </div>

                <div className="bg-gray-100/60 pt-3 pb-2 px-4 relative rounded-t-sm">
                  <label className="block text-xs text-gray-500 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full bg-transparent text-base text-gray-900 focus:outline-none focus:ring-0"
                    placeholder="Enter email"
                    required
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-black"></div>
                </div>

                <div className="bg-gray-100/60 pt-3 pb-2 px-4 relative rounded-t-sm">
                  <label className="block text-xs text-gray-500 mb-1">Mobile Number</label>
                  <input
                    type="tel"
                    value={mobile}
                    onChange={(e) => {
                      let val = e.target.value.replace(/\D/g, '');
                      // If it has country code prefix like 91 and total length > 10, extract the last 10
                      if (val.length > 10) {
                        val = val.slice(-10);
                      }
                      setMobile(val);
                    }}
                    className="block w-full bg-transparent text-base text-gray-900 focus:outline-none focus:ring-0"
                    placeholder="Enter 10-digit mobile no."
                    required
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-black"></div>
                </div>

                <div className="bg-gray-100/60 pt-3 pb-2 px-4 relative rounded-t-sm">
                  <label className="block text-xs text-gray-500 mb-1">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full bg-transparent text-base text-gray-900 focus:outline-none focus:ring-0"
                    placeholder="Create a password"
                    required
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-black"></div>
                </div>

                <div className="bg-gray-100/60 pt-3 pb-2 px-4 relative rounded-t-sm">
                  <label className="block text-xs text-gray-500 mb-1">Confirm Password</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="block w-full bg-transparent text-base text-gray-900 focus:outline-none focus:ring-0"
                    placeholder="Confirm your password"
                    required
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-black"></div>
                </div>

                <button
                  type="submit"
                  disabled={loading || !fullName || !email || !mobile || !password || !confirmPassword}
                  className="w-full py-4 mt-2 text-[15px] font-semibold text-center transition-colors bg-yellow-600 text-white hover:bg-yellow-500 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
                >
                  {loading ? 'Signing up...' : 'Sign Up'}
                </button>

                <div className="text-center mt-4">
                  <p className="text-[15px] text-gray-600">
                    Already have an account?{' '}
                    <button type="button" onClick={() => setView('login')} className="text-yellow-600 font-medium hover:underline">
                      Log In
                    </button>
                  </p>
                </div>
              </form>
            )}

            {view === 'forgot' && (
              <form onSubmit={handleForgot} className="space-y-5">
                <div className="bg-gray-100/60 pt-3 pb-2 px-4 relative rounded-t-sm">
                  <label className="block text-xs text-gray-500 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full bg-transparent text-base text-gray-900 focus:outline-none focus:ring-0"
                    placeholder="Enter your registered email"
                    required
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-black"></div>
                </div>

                <button
                  type="submit"
                  disabled={loading || !email}
                  className="w-full py-4 mt-2 text-[15px] font-semibold text-center transition-colors bg-yellow-600 text-white hover:bg-yellow-500 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
                >
                  {loading ? 'Sending...' : 'Send Reset Link'}
                </button>

                <div className="text-center mt-4">
                  <button type="button" onClick={() => setView('login')} className="text-[15px] text-gray-600 hover:text-gray-900 font-medium">
                    Back to Log In
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
