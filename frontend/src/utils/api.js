// frontend/src/utils/api.js
import axios from 'axios';

// Create an axios instance with default config
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5005', // adjust the port to match your backend
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;