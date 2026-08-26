import { createContext, useContext, useEffect, useState } from 'react';
import api from '../api/axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('pulse_user');
    if (stored) setUser(JSON.parse(stored));
    setLoading(false);
  }, []);

  const persist = (data) => {
    localStorage.setItem('pulse_user', JSON.stringify(data));
    setUser(data);
  };

  const login = async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    persist(data);
    return data;
  };

  const register = async (payload) => {
    const { data } = await api.post('/auth/register', payload);
    persist(data);
    return data;
  };

  const logout = () => {
    localStorage.removeItem('pulse_user');
    setUser(null);
  };

  const updateUserInStorage = (partial) => {
    const merged = { ...user, ...partial };
    localStorage.setItem('pulse_user', JSON.stringify(merged));
    setUser(merged);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateUserInStorage }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
