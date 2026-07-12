// frontend/src/api.js
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Kayıt Olma Fonksiyonu
export const registerUser = async (userData) => {
  try {
    const response = await api.post('/register', userData);
    return response.data;
  } catch (error) {
    // Sabit Türkçe kaldırıldı, i18n anahtarı fırlatılıyor
    throw error.response?.data?.detail || "REGISTER_FAILED";
  }
};

// Giriş Yapma Fonksiyonu
export const loginUser = async (userData) => {
  try {
    const response = await api.post('/login', userData);
    return response.data;
  } catch (error) {
    // Sabit Türkçe kaldırıldı, i18n anahtarı fırlatılıyor
    throw error.response?.data?.detail || "LOGIN_FAILED";
  }
};

// Yapay Zeka Sohbet Fonksiyonu
export const chatWithAI = async (prompt, lang) => {
  try {
    const response = await api.post(`/ai/chat?prompt=${encodeURIComponent(prompt)}&lang=${lang}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.detail || "AI_ERROR";
  }
};

export default api;