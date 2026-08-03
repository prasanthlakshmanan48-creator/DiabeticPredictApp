import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user] = useState({
    id: 1,
    name: 'Dr. Sarah Jenkins',
    fullname: 'Dr. Sarah Jenkins',
    email: 'sarah.jenkins@aihealth.org',
    role: 'Senior Clinical Specialist',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=250&auto=format&fit=crop',
    isAuthenticated: true
  });

  const login = async () => true;
  const register = async () => true;
  const logout = () => {};
  const resetPassword = async () => true;

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading: false, 
      login, 
      register, 
      logout, 
      resetPassword, 
      isAuthenticated: true 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
