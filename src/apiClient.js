import axios from 'axios';
import { API_URL } from './config';

// Admin login করার পর token localStorage-এ থাকে।
// এখানে সব axios request-এ নিজে থেকে "Authorization: Bearer <token>" যোগ হয়,
// তাই প্রতিটা admin পেজে আলাদা করে লিখতে হয় না।
// শুধু আমাদের নিজের backend-এ token পাঠানো হয়, অন্য কোনো website-এ নয়।
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token && config.url && config.url.startsWith(API_URL)) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Token-এর মেয়াদ শেষ হলে (401) admin-কে আবার login পেজে পাঠানো হয়।
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const url = error.config?.url || '';
    const isLoginRequest = url.endsWith('/api/auth/login');

    if (status === 401 && !isLoginRequest && window.location.pathname.startsWith('/admin')) {
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminData');
      if (window.location.pathname !== '/admin/login') {
        window.location.assign('/admin/login');
      }
    }
    return Promise.reject(error);
  }
);
