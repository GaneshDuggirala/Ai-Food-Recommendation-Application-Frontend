import axios from 'axios';

// Get the URL from the .env file, or fallback to localhost just in case
const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api';

// Create a central Axios instance pointing to our FastAPI backend
const api = axios.create({
  baseURL: API_URL, 
});

// Add a request interceptor to attach the JWT token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  }
};

export const foodItemService = {
  // GET all items
  getAllItems: async () => {
    const response = await api.get('/items/get-all');
    return response.data;
  },
  
  // GET items via AI Search
  searchItems: async (query) => {
    const response = await api.get(`/items/search?q=${encodeURIComponent(query)}`);
    return response.data;
  },
  
  // POST new item
  addItem: async (itemData) => {
    const response = await api.post('/items/add', itemData);
    return response.data;
  },

  // PUT update item
  updateItem: async (itemId, itemData) => {
    const response = await api.put(`/items/update/${itemId}`, itemData);
    return response.data;
  },

  // DELETE item
  deleteItem: async (itemId) => {
    const response = await api.delete(`/items/delete/${itemId}`);
    return response.data;
  }
};

export default api;
