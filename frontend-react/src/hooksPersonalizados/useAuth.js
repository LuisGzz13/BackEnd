import { useState, useEffect } from 'react';

const API_URL = process.env.REACT_APP_API_URL;

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }
      try {
        const response = await fetch(API_URL + '/login/check', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setIsAuthenticated(response.ok);
      } catch {
        setIsAuthenticated(false);
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return { isAuthenticated, loading, logout };
} 