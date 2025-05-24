import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
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

// Auth Service
export const authService = {
  login: async (username, password) => {
    const response = await api.post('/auth/login', { username, password });
    return response.data;
  },

  register: async (username, email, password) => {
    const response = await api.post('/auth/register', { username, email, password });
    return response.data;
  },

  getCurrentUser: async () => {
    const response = await api.get('/users/profile');
    return response.data;
  },

  updateProfile: async (userData) => {
    const response = await api.put('/users/profile', userData);
    return response.data;
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
