import React, { createContext, useState, useEffect } from 'react';
import { authService } from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Check for existing token on app load
    const savedToken = localStorage.getItem('workflow_token');
    const savedUser = localStorage.getItem('workflow_user');
    
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
    
    setIsLoading(false);
  }, []);

  const login = async (username, password) => {
    console.log('AuthContext: login attempt started');
    try {
      setIsLoading(true);
      setIsAuthenticated(false);
      
      // Clear any existing tokens/data
      localStorage.removeItem('workflow_token');
      localStorage.removeItem('workflow_user');
      
      const response = await authService.login(username, password);
      console.log('AuthContext: received login response', response);
      
      if (!response || !response.token || !response.user) {
        console.error('AuthContext: Invalid response format', response);
        throw new Error('Invalid response from server');
      }
      
      const { user: userData, token: userToken } = response;
      
      // Save to localStorage
      localStorage.setItem('workflow_token', userToken);
      localStorage.setItem('workflow_user', JSON.stringify(userData));
      console.log('AuthContext: saved auth data to localStorage');
      
      // Update state
      setToken(userToken);
      setUser(userData);
      setIsAuthenticated(true);
      console.log('AuthContext: authentication successful');
      
      return response;
    } catch (error) {
      console.error('AuthContext: login error:', error);
      
      // Clear any partial data that might have been set
      localStorage.removeItem('workflow_token');
      localStorage.removeItem('workflow_user');
      setToken(null);
      setUser(null);
      setIsAuthenticated(false);
      
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (username, email, password) => {
    try {
      setIsLoading(true);
      const response = await authService.register(username, email, password);
      
      const { user: userData, token: userToken } = response;
      
      // Save to localStorage
      localStorage.setItem('workflow_token', userToken);
      localStorage.setItem('workflow_user', JSON.stringify(userData));
      
      // Update state
      setToken(userToken);
      setUser(userData);
      setIsAuthenticated(true);
      
      return response;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    // Clear localStorage
    localStorage.removeItem('workflow_token');
    localStorage.removeItem('workflow_user');
    
    // Clear state
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem('workflow_user', JSON.stringify(userData));
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    token,
    login,
    register,
    logout,
    updateUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
