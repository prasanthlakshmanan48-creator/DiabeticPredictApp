import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('auth_user');
    return saved ? JSON.parse(saved) : {
      name: 'Dr. Sarah Jenkins',
      email: 'sarah.jenkins@aihealth.org',
      role: 'Senior Clinical Specialist',
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=250&auto=format&fit=crop',
      isAuthenticated: true
    };
  });

  const login = (email, password, rememberMe = true) => {
    const userData = {
      name: email.split('@')[0].replace('.', ' ').replace(/^./, str => str.toUpperCase()) || 'Dr. Medical Clinician',
      email,
      role: 'Clinical AI Specialist',
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=250&auto=format&fit=crop',
      isAuthenticated: true
    };
    setUser(userData);
    if (rememberMe) {
      localStorage.setItem('auth_user', JSON.stringify(userData));
    }
    return true;
  };

  const googleLogin = () => {
    const userData = {
      name: 'Dr. Alex Mercer',
      email: 'alex.mercer@googlehealth.com',
      role: 'AI Health Researcher',
      avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=250&auto=format&fit=crop',
      isAuthenticated: true
    };
    setUser(userData);
    localStorage.setItem('auth_user', JSON.stringify(userData));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('auth_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, googleLogin, logout, isAuthenticated: !!user?.isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
