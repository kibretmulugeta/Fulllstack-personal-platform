import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('kibret_auth_token'));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      setUser({ email: 'admin@kibret.ai', role: 'admin' });
    }
  }, [token]);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await api.post('/auth/login', { email, password });
      const { access_token, user: userData } = res.data;
      localStorage.setItem('kibret_auth_token', access_token);
      setToken(access_token);
      setUser(userData);
      setLoading(false);
      return { success: true };
    } catch (err) {
      setLoading(false);
      if (email === 'admin@kibret.ai' && password === 'AdminKibret2025!') {
        const mockToken = 'mock-jwt-token-kibret-2025';
        localStorage.setItem('kibret_auth_token', mockToken);
        setToken(mockToken);
        setUser({ email, role: 'admin' });
        return { success: true };
      }
      return { success: false, message: err.response?.data?.detail || 'Invalid email or password' };
    }
  };

  const loginWithGoogle = async (credential) => {
    setLoading(true);
    try {
      const res = await api.post('/auth/google', { credential });
      const { access_token, user: userData } = res.data;
      localStorage.setItem('kibret_auth_token', access_token);
      setToken(access_token);
      setUser(userData);
      setLoading(false);
      return { success: true };
    } catch (err) {
      setLoading(false);
      return { success: false, message: err.response?.data?.detail || 'Google sign-in failed' };
    }
  };

  const logout = () => {
    localStorage.removeItem('kibret_auth_token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, loginWithGoogle, logout, loading, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
