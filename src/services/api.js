import axios from 'axios';

// ✅ Correct API base URL
const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Request interceptor for debugging
api.interceptors.request.use(
  (config) => {
    console.log(`🔄 API Call: ${config.method?.toUpperCase()} ${config.url}`);
    console.log('📦 Request Data:', config.data);
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for debugging
api.interceptors.response.use(
  (response) => {
    console.log(`✅ API Success: ${response.status} ${response.config.url}`);
    console.log('📦 Response Data:', response.data);
    return response;
  },
  (error) => {
    console.error('❌ API Error:', error.response?.data || error.message);
    console.log('🔧 Error Details:', {
      status: error.response?.status,
      statusText: error.response?.statusText,
      url: error.response?.config?.url,
      method: error.response?.config?.method,
    });
    return Promise.reject(error);
  }
);

export const productAPI = {
  getProducts: () => api.get('/products'),
};

export const cartAPI = {
  getCart: () => api.get('/cart'),
  addToCart: (productId, quantity) =>
    api.post('/cart', { productId, quantity }),
  removeFromCart: (productId) => api.delete(`/cart/${productId}`),
  checkout: (cartItems, customerInfo) =>
    api.post('/cart/checkout', { cartItems, customerInfo }),
};

// Helper function for images/icons
export const getImageUrl = (image) => {
  if (image.startsWith('http')) {
    return image;
  }
  if (image.length <= 3) {
    return image; // Emoji icon
  }
  return `http://localhost:5000${image}`; // Local image
};

export default api;
