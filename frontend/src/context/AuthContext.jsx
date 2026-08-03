import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginUser, registerUser, logoutUser, getCurrentUser } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('auth_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(true);

  // Initialize and verify session on app load
  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem('auth_token');
      if (token) {
        try {
          const res = await getCurrentUser();
          if (res && res.user) {
            const userData = { ...res.user, name: res.user.fullname, isAuthenticated: true };
            setUser(userData);
            localStorage.setItem('auth_user', JSON.stringify(userData));
          }
        } catch (err) {
          console.warn('Session expired or invalid JWT token.');
          setUser(null);
          localStorage.removeItem('auth_token');
          localStorage.removeItem('auth_user');
        }
      } else {
        setUser(null);
        localStorage.removeItem('auth_user');
      }
      setLoading(false);
    };

    checkAuthStatus();
  }, []);

  const login = async (email, password) => {
    const res = await loginUser(email, password);
    if (res && res.token) {
      localStorage.setItem('auth_token', res.token);
      const userData = { ...res.user, name: res.user.fullname, isAuthenticated: true };
      setUser(userData);
      localStorage.setItem('auth_user', JSON.stringify(userData));
      return userData;
    }
    throw new Error(res?.error || 'Login failed.');
  };

  const register = async (email, password, fullname) => {
    const res = await registerUser(fullname, email, password);
    if (res && res.token) {
      localStorage.setItem('auth_token', res.token);
      const userData = { ...res.user, name: res.user.fullname, isAuthenticated: true };
      setUser(userData);
      localStorage.setItem('auth_user', JSON.stringify(userData));
      return userData;
    }
    throw new Error(res?.error || 'Registration failed.');
  };

  const logout = async () => {
    try {
      await logoutUser();
    } catch (e) {}
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    setUser(null);
  };

  const resetPassword = async (email) => {
    return true;
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      login, 
      register, 
      logout, 
      resetPassword, 
      isAuthenticated: !!user && (!!user.isAuthenticated || !!user.id)
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
