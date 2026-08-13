import axios from 'axios';

// Get the URL from the .env file, or fallback to localhost just in case
const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api';

// Create a central Axios instance pointing to our FastAPI backend
const api = axios.create({
  baseURL: API_URL, 
});

export const foodItemService = {
  // GET all items
  getAllItems: async () => {
    const response = await api.get('/items/get-all');
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
