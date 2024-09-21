// Backend API routes
import axios from 'axios';

import { BASE_API_URL } from './config.js';
const instance = axios.create({
  withCredentials: true,
  baseURL: BASE_API_URL,
});

const login = async (email, password) => {
  return instance.post('/login', {
    email,
    password,
  });
};

const logout = async () => {
  return instance.post('/logout');
};

const updateProfile = async (id, name, email, password) => {
  return instance.put(`/users/${id}`, {
    name,
    email,
    password,
  });
};

const addUser = async (name, email, password, role, authToken) => {
  return instance.post(
    '/users',
    {
      name,
      email,
      password,
      role,
    },
    {
      headers: {
        Authorization: authToken,
      },
    }
  );
};

const addNews = async (title, content, userId) => {
  return instance.post('/news', {
    title,
    content,
    userId,
  });
};

const addMessage = async (title, content, userId) => {
  return instance.post('/messages', {
    title,
    content,
    userId,
  });
};

const deleteUser = async (id) => {
  return instance.delete(`/users/${id}`);
};

const deleteNews = async (id) => {
  return instance.delete(`/news/${id}`);
};

const deleteMessage = async (id) => {
  return instance.delete(`/messages/${id}`);
};

const getMessages = async () => {
  return instance.get('/messages');
};

const getNews = async () => {
  return instance.get('/news');
};

const getUsers = async () => {
  return instance.get('/users');
};

// Get single user
const getUser = async (id) => {
  return instance.get(`/users/${id}`);
};

const validateToken = async (authToken) => {
  return instance.get('/validate-token', {
    headers: { Authorization: 'Bearer ' + authToken },
  });
};

export default {
  login,
  logout,
  updateProfile,
  addUser,
  addNews,
  addMessage,
  deleteUser,
  deleteNews,
  deleteMessage,
  getMessages,
  getNews,
  getUser,
  getUsers,
  validateToken,
};
