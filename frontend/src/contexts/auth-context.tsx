"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { GoogleUser } from '@/lib/google-auth';

interface AuthContextType {
  user: GoogleUser | null;
  isLoading: boolean;
  signIn: (user: GoogleUser) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<GoogleUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already signed in (from localStorage)
    const savedUser = localStorage.getItem('resumeai_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('resumeai_user');
      }
    }
    setIsLoading(false);
  }, []);

  const signIn = (userData: GoogleUser) => {
    setUser(userData);
    localStorage.setItem('resumeai_user', JSON.stringify(userData));
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('resumeai_user');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signOut }}>
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