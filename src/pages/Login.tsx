import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Eye, EyeOff } from 'lucide-react';
import { auth } from '../lib/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { useAuth } from '../AuthContext';
import api from '../api/axios';

export function Login() {
  const [view, setView] = useState<'login' | 'signup' | 'forgot'>('login');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  
  // Signup specific
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
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

        if (cleanMobile.length !== 10) {
          setError('Please enter a valid 10-digit mobile number.');
          setLoading(false);
          return;
        }

        try {
          const response = await api.get(`/auth/mobile_lookup?mobile=${cleanMobile}`);
          if (response.data && response.data.success && response.data.email) {
            loginEmail = response.data.email;
          } else {
            throw new Error('No account found with this mobile number.');
          }
        } catch (apiError: any) {
          throw new Error('No account found with this mobile number.');
        }
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
    
    if (!firstName.trim() || !lastName.trim()) {
      setError('First name and last name are required.');
      setLoading(false);
      return;
    }

    const cleanMobile = mobile.replace(/\D/g, '');
    if (cleanMobile.length !== 10) {
      setError('Mobile number must be exactly 10 digits.');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Password should be at least 6 characters.');
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      // 1. Create the user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const fullName = `${firstName.trim()} ${lastName.trim()}`;

      // 2. Save the user's profile in the Hostinger MySQL database
      try {
        await api.post('/auth/register', {
          firebase_uid: user.uid,
          first_name: firstName.trim(),
          last_name: lastName.trim(),
          mobile: cleanMobile,
          email: email
        });
      } catch (apiError) {
        console.error("API Registration Error:", apiError);
        // Continue anyway since Firebase succeeded
      }

      // 3. User is logged in automatically by Firebase Auth
      setMessage('Account created successfully!');
      setTimeout(() => {
        navigate('/'); // 4. Automatically redirect the user to the Home page
      }, 1500);
    } catch (err: any) {
      console.error("Signup Error:", err);
      if (err.code === 'auth/operation-not-allowed') {
        setError('Email/Password authentication is disabled in Firebase.');
      } else if (err.code === 'auth/email-already-in-use') {
        setError('An account with this email already exists.');
      } else if (err.code === 'auth/weak-password') {
        setError('Password should be at least 6 characters.');
      } else {
        setError(err.message || 'Failed to create account.');
      }
    } finally {
      if (!message) {
        setLoading(false);
      }
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
    <div className="bg-gray-50/50 min-h-[100dvh] flex flex-col justify-center py-4 px-4 sm:px-6 lg:px-8 overflow-hidden box-border">
      <div className={`sm:mx-auto w-full transition-all duration-300 ${view === 'signup' ? 'max-w-[420px] md:max-w-[660px] lg:max-w-[700px]' : 'max-w-[420px] sm:max-w-[440px]'}`}>
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl overflow-hidden border border-gray-200">
          {/* Header */}
          <div className="bg-white/90 backdrop-blur-md border-b border-rose-200 px-4 sm:px-6 py-4 sm:py-5 relative overflow-hidden">
            <button 
              onClick={() => navigate(-1)} 
              className="absolute top-3 left-4 text-rose-800 hover:text-rose-950 transition-colors z-10"
            >
              <div className="bg-rose-50 rounded-full p-1.5 hover:bg-rose-100 transition-colors">
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            </button>
            <div className="flex flex-row items-center justify-center relative z-10 space-x-2 text-center px-6 sm:px-0 mt-0">
              <span className="text-xl sm:text-2xl">👣</span>
              <h1 className="text-rose-950 font-serif text-lg sm:text-2xl font-bold tracking-tight truncate">
                HandcraftedHeels
              </h1>
            </div>
          </div>
          
          {/* Body */}
          <div className="px-5 sm:px-8 py-5 sm:py-6">
            <div className="text-center mb-4 sm:mb-5">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
                {view === 'login' ? 'Log In' : view === 'signup' ? 'Sign Up' : 'Reset Password'}
              </h2>
              <p className="text-[13px] sm:text-[15px] text-gray-500">
                {view === 'login' ? 'Welcome back! Please enter your details.' : 
                 view === 'signup' ? 'Create an account to get started.' : 
                 'Enter your email to receive a password reset link.'}
              </p>
            </div>

            {error && <div className="mb-3 p-2.5 bg-red-50 text-red-700 rounded-md text-sm text-center">{error}</div>}
            {message && <div className="mb-3 p-2.5 bg-green-50 text-green-700 rounded-md text-sm text-center">{message}</div>}

            {view === 'login' && (
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="bg-gray-100/60 pt-2.5 pb-1.5 px-4 relative rounded-t-sm">
                  <label className="block text-[11px] sm:text-xs text-gray-500 mb-0.5">Email or Mobile Number</label>
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
                    className="block w-full bg-transparent text-sm sm:text-base text-gray-900 focus:outline-none focus:ring-0"
                    placeholder="Enter email or mobile no."
                    required
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-black"></div>
                </div>

                <div className="bg-gray-100/60 pt-2.5 pb-1.5 px-4 relative rounded-t-sm">
                  <label className="block text-[11px] sm:text-xs text-gray-500 mb-0.5">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full bg-transparent text-sm sm:text-base text-gray-900 focus:outline-none focus:ring-0"
                    placeholder="Enter password"
                    required
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-black"></div>
                </div>

                <div className="flex justify-end">
                  <button type="button" onClick={() => setView('forgot')} className="text-[13px] font-medium text-yellow-600 hover:text-yellow-700">
                    Forgot Password?
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={loading || !identifier || !password}
                  className="w-full py-3 sm:py-3.5 mt-1 text-[14px] sm:text-[15px] font-semibold text-center transition-colors bg-yellow-600 text-white hover:bg-yellow-500 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
                >
                  {loading ? 'Logging in...' : 'Log In'}
                </button>

                <div className="relative my-5">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-xs sm:text-sm">
                    <span className="px-2 bg-white text-gray-500">OR</span>
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-[14px] sm:text-[15px] text-gray-600">
                    Don't have an account?{' '}
                    <button type="button" onClick={() => setView('signup')} className="text-yellow-600 font-medium hover:underline">
                      Sign Up
                    </button>
                  </p>
                </div>
              </form>
            )}

            {view === 'signup' && (
              <form onSubmit={handleSignup} className="flex flex-col gap-3 sm:gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  <div className="bg-gray-100/60 pt-2 pb-1 px-3 sm:pt-2.5 sm:pb-1.5 sm:px-4 relative rounded-t-sm">
                    <label className="block text-[11px] sm:text-xs text-gray-500 mb-0.5">First Name</label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="block w-full bg-transparent text-sm sm:text-base text-gray-900 focus:outline-none focus:ring-0"
                      placeholder="First Name"
                      required
                    />
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-black"></div>
                  </div>
                  <div className="bg-gray-100/60 pt-2 pb-1 px-3 sm:pt-2.5 sm:pb-1.5 sm:px-4 relative rounded-t-sm">
                    <label className="block text-[11px] sm:text-xs text-gray-500 mb-0.5">Last Name</label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="block w-full bg-transparent text-sm sm:text-base text-gray-900 focus:outline-none focus:ring-0"
                      placeholder="Last Name"
                      required
                    />
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-black"></div>
                  </div>

                  <div className="bg-gray-100/60 pt-2 pb-1 px-3 sm:pt-2.5 sm:pb-1.5 sm:px-4 relative rounded-t-sm">
                    <label className="block text-[11px] sm:text-xs text-gray-500 mb-0.5">Mobile Number</label>
                    <input
                      type="tel"
                      value={mobile}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, '');
                        setMobile(val.slice(0, 10)); // Limit to 10 digits
                      }}
                      className="block w-full bg-transparent text-sm sm:text-base text-gray-900 focus:outline-none focus:ring-0"
                      placeholder="Enter 10-digit mobile no."
                      required
                    />
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-black"></div>
                  </div>

                  <div className="bg-gray-100/60 pt-2 pb-1 px-3 sm:pt-2.5 sm:pb-1.5 sm:px-4 relative rounded-t-sm">
                    <label className="block text-[11px] sm:text-xs text-gray-500 mb-0.5">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full bg-transparent text-sm sm:text-base text-gray-900 focus:outline-none focus:ring-0"
                      placeholder="Enter email"
                      required
                    />
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-black"></div>
                  </div>

                  <div className="bg-gray-100/60 pt-2 pb-1 px-3 sm:pt-2.5 sm:pb-1.5 sm:px-4 relative rounded-t-sm">
                    <label className="block text-[11px] sm:text-xs text-gray-500 mb-0.5">Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="block w-full bg-transparent text-sm sm:text-base text-gray-900 focus:outline-none focus:ring-0 pr-10"
                        placeholder="Create a password"
                        required
                      />
                      <button 
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" /> : <Eye className="w-4 h-4 sm:w-5 sm:h-5" />}
                      </button>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-black"></div>
                  </div>

                  <div className="bg-gray-100/60 pt-2 pb-1 px-3 sm:pt-2.5 sm:pb-1.5 sm:px-4 relative rounded-t-sm">
                    <label className="block text-[11px] sm:text-xs text-gray-500 mb-0.5">Confirm Password</label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="block w-full bg-transparent text-sm sm:text-base text-gray-900 focus:outline-none focus:ring-0 pr-10"
                        placeholder="Confirm your password"
                        required
                      />
                      <button 
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" /> : <Eye className="w-4 h-4 sm:w-5 sm:h-5" />}
                      </button>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-black"></div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading || !firstName || !lastName || !email || !mobile || !password || !confirmPassword || !!message}
                  className="w-full py-3 sm:py-3.5 mt-1 text-[14px] sm:text-[15px] font-semibold text-center transition-colors bg-yellow-600 text-white hover:bg-yellow-500 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
                >
                  {loading ? 'Signing up...' : 'Sign Up'}
                </button>

                <div className="text-center mt-1 sm:mt-2">
                  <p className="text-[14px] sm:text-[15px] text-gray-600">
                    Already have an account?{' '}
                    <button type="button" onClick={() => setView('login')} className="text-yellow-600 font-medium hover:underline">
                      Log In
                    </button>
                  </p>
                </div>
              </form>
            )}

            {view === 'forgot' && (
              <form onSubmit={handleForgot} className="space-y-4">
                <div className="bg-gray-100/60 pt-2.5 pb-1.5 px-4 relative rounded-t-sm">
                  <label className="block text-[11px] sm:text-xs text-gray-500 mb-0.5">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full bg-transparent text-sm sm:text-base text-gray-900 focus:outline-none focus:ring-0"
                    placeholder="Enter your registered email"
                    required
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-black"></div>
                </div>

                <button
                  type="submit"
                  disabled={loading || !email}
                  className="w-full py-3 sm:py-3.5 mt-1 text-[14px] sm:text-[15px] font-semibold text-center transition-colors bg-yellow-600 text-white hover:bg-yellow-500 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
                >
                  {loading ? 'Sending...' : 'Send Reset Link'}
                </button>

                <div className="text-center mt-3">
                  <button type="button" onClick={() => setView('login')} className="text-[14px] sm:text-[15px] text-gray-600 hover:text-gray-900 font-medium">
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
