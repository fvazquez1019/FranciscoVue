// src/services/api.js
import axios from 'axios';

// Create an axios instance with the base URL of your Flask API
const apiClient = axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials: true,  // Important for cookies/session
  headers: {
    'Content-Type': 'application/json',
  }
});

export default {
  getScatterData(timeRange = 'medium_term') {
    return apiClient.get(`/api/scatter-data?time_range=${timeRange}`);
  },
  
  login() {
    // Redirect to the Flask login endpoint
    window.location.href = 'http://localhost:5000/login';
  },
  
  checkAuth() {
    return apiClient.get('/api/check-auth');
  }
}