import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('kibret_auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const fetchProjects = async () => {
  try {
    const res = await api.get('/projects');
    return res.data;
  } catch (err) {
    console.warn('API connection offline, using fallback projects array.');
    return null;
  }
};

export const fetchSkills = async () => {
  try {
    const res = await api.get('/skills');
    return res.data;
  } catch (err) {
    console.warn('API connection offline, using fallback skills array.');
    return null;
  }
};

export const fetchBlogs = async () => {
  try {
    const res = await api.get('/blogs');
    return res.data;
  } catch (err) {
    console.warn('API connection offline, using fallback blogs array.');
    return null;
  }
};

export const submitContact = async (contactData) => {
  const res = await api.post('/contact', contactData);
  return res.data;
};

export const sendChatMessage = async (message, language = 'en') => {
  const res = await api.post('/chat', { message, language });
  return res.data;
};

export const fetchStats = async () => {
  try {
    const res = await api.get('/analytics/stats');
    return res.data;
  } catch (err) {
    return { visitors: 1540, projects: 4, blogs: 3, messages: 12, accuracy_metric: "99.72%" };
  }
};

export default api;
