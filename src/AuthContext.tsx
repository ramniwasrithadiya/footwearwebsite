import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './lib/firebase';
import api from './api/axios';

interface UserProfile {
  fullName?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  mobile: string;
}

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        localStorage.setItem('auth_token', user.uid);
        try {
          const response = await api.get(`/auth/profile?firebase_uid=${user.uid}`);
          if (response.data && response.data.success) {
            const data = response.data.profile;
            setProfile({
              fullName: data.full_name,
              firstName: data.first_name,
              lastName: data.last_name,
              email: data.email,
              mobile: data.mobile,
            });
          } else {
            setProfile(null);
          }
        } catch (error: any) {
          console.error("Error fetching user profile from MySQL:", error);
          setProfile(null);
        }
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const logout = async () => {
    localStorage.removeItem('auth_token');
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
