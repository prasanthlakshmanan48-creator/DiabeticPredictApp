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
    // Validate stored token on startup
    const verifyStoredSession = async () => {
      const storedToken = localStorage.getItem('auth_token') || localStorage.getItem('diabetex_jwt');
      if (!storedToken || storedToken.startsWith('token_') || storedToken.startsWith('demo_')) {
        logout();
        return;
      }
      try {
        const apiBase = getApiBaseUrl();
        const res = await axios.get(`${apiBase}/me`, {
          headers: { Authorization: `Bearer ${storedToken}` },
          timeout: 5000
        });
        if (res.data && res.data.user) {
          setUser(res.data.user);
          localStorage.setItem('diabetex_user', JSON.stringify(res.data.user));
        }
      } catch (err) {
        if (err.response?.status === 401 || err.response?.status === 403) {
          // Token expired or invalid, log out cleanly
          logout();
        }
      }
    };

    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      verifyStoredSession();
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
      if (!jwtToken) {
        throw new Error("Server did not return a valid authentication token.");
      }
      setToken(jwtToken);
      setUser(userData);
      localStorage.setItem('diabetex_jwt', jwtToken);
      localStorage.setItem('auth_token', jwtToken);
      localStorage.setItem('diabetex_user', JSON.stringify(userData));
      return userData;
    } catch (err) {
      const msg = err.response?.data?.error || err.response?.data?.message || (err.message === "Network Error" ? "Cannot connect to server. Please ensure backend is running." : err.message) || 'Invalid email or password.';
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
      if (!jwtToken) {
        throw new Error("Server did not return a valid authentication token.");
      }
      setToken(jwtToken);
      setUser(userData);
      localStorage.setItem('diabetex_jwt', jwtToken);
      localStorage.setItem('auth_token', jwtToken);
      localStorage.setItem('diabetex_user', JSON.stringify(userData));
      return userData;
    } catch (err) {
      const msg = err.response?.data?.error || err.response?.data?.message || (err.message === "Network Error" ? "Cannot connect to server. Please ensure backend is running." : err.message) || 'Registration failed.';
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
