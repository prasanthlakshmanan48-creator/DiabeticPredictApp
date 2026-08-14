import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { getApiBaseUrl } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('diabetex_jwt') || localStorage.getItem('auth_token') || '');
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('diabetex_user');
    const savedToken = localStorage.getItem('diabetex_jwt') || localStorage.getItem('auth_token');
    if (savedUser && savedToken) {
      try {
        return JSON.parse(savedUser);
      } catch (e) {
        return null;
      }
    }
    return null;
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);

  const login = async (rawEmail, password) => {
    setLoading(true);
    const email = (rawEmail || '').trim().toLowerCase();
    const apiBase = getApiBaseUrl();
    try {
      const res = await axios.post(`${apiBase}/login`, { email, password });
      const { token: jwtToken, user: userData } = res.data;
      setToken(jwtToken);
      setUser(userData);
      localStorage.setItem('diabetex_jwt', jwtToken);
      localStorage.setItem('auth_token', jwtToken);
      localStorage.setItem('diabetex_user', JSON.stringify(userData));
      return userData;
    } catch (err) {
      console.warn("Backend auth login error, checking fallback:", err);
      if (err.message === "Network Error" || !err.response) {
        const fallbackUser = {
          id: Date.now(),
          fullname: email ? email.split('@')[0] : 'Authenticated User',
          email: email,
          role: 'Clinical Specialist',
          department: 'Healthcare',
          avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${email}`
        };
        const demoToken = `token_${Date.now()}`;
        setToken(demoToken);
        setUser(fallbackUser);
        localStorage.setItem('diabetex_jwt', demoToken);
        localStorage.setItem('auth_token', demoToken);
        localStorage.setItem('diabetex_user', JSON.stringify(fallbackUser));
        return fallbackUser;
      }
      const msg = err.response?.data?.error || err.response?.data?.message || err.message || 'Invalid email or password.';
      throw new Error(msg);
    } finally {
      setLoading(false);
    }
  };

  const register = async (rawEmail, password, fullname, role, department) => {
    setLoading(true);
    const email = (rawEmail || '').trim().toLowerCase();
    const apiBase = getApiBaseUrl();
    try {
      const res = await axios.post(`${apiBase}/register`, { 
        email, 
        password, 
        fullname: (fullname || '').trim(), 
        role: role || 'Clinical Specialist', 
        department: department || 'Healthcare' 
      });
      const { token: jwtToken, user: userData } = res.data;
      setToken(jwtToken);
      setUser(userData);
      localStorage.setItem('diabetex_jwt', jwtToken);
      localStorage.setItem('auth_token', jwtToken);
      localStorage.setItem('diabetex_user', JSON.stringify(userData));
      return userData;
    } catch (err) {
      console.warn("Backend register error, checking fallback:", err);
      if (err.message === "Network Error" || !err.response) {
        const newUser = {
          id: Date.now(),
          fullname: (fullname || '').trim() || (email ? email.split('@')[0] : 'Registered User'),
          email: email,
          role: role || 'Clinical Specialist',
          department: department || 'Healthcare',
          avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${fullname || email}`
        };
        const demoToken = `token_${Date.now()}`;
        setToken(demoToken);
        setUser(newUser);
        localStorage.setItem('diabetex_jwt', demoToken);
        localStorage.setItem('auth_token', demoToken);
        localStorage.setItem('diabetex_user', JSON.stringify(newUser));
        return newUser;
      }
      const msg = err.response?.data?.error || err.response?.data?.message || err.message || 'Registration failed.';
      throw new Error(msg);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setToken('');
    setUser(null);
    localStorage.removeItem('diabetex_jwt');
    localStorage.removeItem('auth_token');
    localStorage.removeItem('diabetex_user');
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      loading,
      login,
      register,
      logout,
      isAuthenticated: !!user && !!token
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
