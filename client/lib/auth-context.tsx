"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { setAccessToken, getAccessToken, logout as apiLogout } from './api';

interface User {
  id: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (accessToken: string, refreshToken: string, user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/auth/refresh`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refreshToken }),
          });

          if (response.ok) {
            const data = await response.json();
            setAccessToken(data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken);
            
            const profileResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/auth/profile`, {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${data.accessToken}`,
                'Content-Type': 'application/json',
              },
            });

            if (profileResponse.ok) {
              const userData = await profileResponse.json();
              setUser(userData);
            }
          } else {
            localStorage.removeItem('refreshToken');
          }
        } catch (error) {
          localStorage.removeItem('refreshToken');
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const login = (accessToken: string, refreshToken: string, userData: User) => {
    setAccessToken(accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    setUser(userData);
  };

  const logout = () => {
    apiLogout();
    setUser(null);
  };

  const isAuthenticated = !!user || !!getAccessToken();

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
