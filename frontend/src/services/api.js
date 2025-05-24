import axios from 'axios';

// Use Vite's proxy for development
const API_BASE_URL = '/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  // Don't use withCredentials since we're using token auth
  withCredentials: false,
});

// Add custom debugging for API calls
api.interceptors.request.use(request => {
  console.log('API Request:', request.method, request.url);
  return request;
});

// Add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('workflow_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear auth data and redirect to login
      localStorage.removeItem('workflow_token');
      localStorage.removeItem('workflow_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth Service with enhanced debugging
export const authService = {
  login: async (username, password) => {
    console.log(`Attempting login API call to ${API_BASE_URL}/auth/login`);
    try {
      const requestData = { username, password };
      console.log('Request payload:', requestData);
      
      const response = await api.post('/auth/login', requestData);
      console.log('Login API response:', response.data);
      
      // Validate response format
      if (!response.data || !response.data.token) {
        console.error('Invalid response format:', response.data);
        throw new Error('Server returned an invalid response format');
      }
      
      return response.data;
    } catch (error) {
      console.error('Login API error:', error);
      
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Error status:', error.response.status);
        console.error('Error data:', error.response.data);
        throw new Error(error.response.data?.message || `Login failed (${error.response.status})`);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
        throw new Error('No response from server. Please check your network connection.');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Request setup error:', error.message);
        throw error;
      }
    }
  },

  register: async (username, email, password) => {
    console.log(`Attempting registration API call to ${API_BASE_URL}/auth/register`);
    try {
      const response = await api.post('/auth/register', { username, email, password });
      console.log('Registration API response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Registration API error:', error);
      if (error.response) {
        throw new Error(error.response.data?.message || `Registration failed (${error.response.status})`);
      }
      throw error;
    }
  },

  getCurrentUser: async () => {
    try {
      const response = await api.get('/users/profile');
      return response.data;
    } catch (error) {
      console.error('Get user profile error:', error);
      throw error;
    }
  },

  updateProfile: async (userData) => {
    try {
      const response = await api.put('/users/profile', userData);
      return response.data;
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  }
};

// Workflow Service
export const workflowApiService = {
  getAll: async () => {
    const response = await api.get('/workflows');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/workflows/${id}`);
    return response.data;
  },

  create: async (workflowData) => {
    const response = await api.post('/workflows', workflowData);
    return response.data;
  },

  update: async (id, workflowData) => {
    const response = await api.put(`/workflows/${id}`, workflowData);
    return response.data;
  },

  delete: async (id) => {
    await api.delete(`/workflows/${id}`);
  },

  execute: async (id) => {
    const response = await api.post(`/workflows/${id}/execute`);
    return response.data;
  },

  activate: async (id) => {
    const response = await api.post(`/workflows/${id}/activate`);
    return response.data;
  },

  deactivate: async (id) => {
    const response = await api.post(`/workflows/${id}/deactivate`);
    return response.data;
  }
};

// Task Service
export const taskApiService = {
  getAll: async () => {
    const response = await api.get('/tasks');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/tasks/${id}`);
    return response.data;
  },

  getByWorkflowId: async (workflowId) => {
    const response = await api.get(`/tasks/workflow/${workflowId}`);
    return response.data;
  },

  execute: async (id) => {
    const response = await api.post(`/tasks/${id}/execute`);
    return response.data;
  },

  cancel: async (id) => {
    const response = await api.post(`/tasks/${id}/cancel`);
    return response.data;
  }
};

// User Service
export const userApiService = {
  getAll: async () => {
    const response = await api.get('/users');
    return response.data;
  },

  getProfile: async () => {
    const response = await api.get('/users/profile');
    return response.data;
  },

  updateProfile: async (userData) => {
    const response = await api.put('/users/profile', userData);
    return response.data;
  }
};

// Webhook Service
export const webhookApiService = {
  getStatus: async () => {
    const response = await api.get('/webhooks/status');
    return response.data;
  },

  triggerWorkflow: async (workflowId, payload = {}) => {
    const response = await api.post(`/webhooks/generic/trigger/${workflowId}`, payload);
    return response.data;
  }
};

export default api;
