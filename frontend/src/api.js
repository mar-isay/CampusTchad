// frontend/src/api.js
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const registerUser = async (userData) => {
  try {
    const response = await api.post('/register', userData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.detail || "REGISTER_FAILED";
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await api.post('/login', userData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.detail || "LOGIN_FAILED";
  }
};

// Yapay Zeka Sohbet Fonksiyonu (Düzeltildi)
export const chatWithAI = async (prompt, lang) => {
  try {
    // API'ye prompt ve lang verilerini query parametresi olarak güvenle gönderiyoruz
    const response = await api.post(`/ai/chat?prompt=${encodeURIComponent(prompt)}&lang=${lang}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.detail || "UNKNOWN_ERROR";
  }
};

export default api;