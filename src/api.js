// Backend API routes
import axios from 'axios';

import { BASE_API_URL } from './config.js';
const instance = axios.create({
  withCredentials: true,
  baseURL: BASE_API_URL,
});

// Add authorization header to request
const withAuth = (authToken) => {
  return {
    headers: { Authorization: 'Bearer ' + authToken },
  };
};

const login = async (email, password) => {
  return instance.post('/login', {
    email,
    password,
  });
};

const updateProfile = async (id, name, email, password, authToken) => {
  return instance.put(
    `/users/${id}`,
    {
      name,
      email,
      password,
    },
    withAuth(authToken)
  );
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
    withAuth(authToken)
  );
};

const addNews = async (title, content, userId, authToken) => {
  return instance.post(
    '/news',
    {
      title,
      content,
      userId,
    },
    withAuth(authToken)
  );
};

const addMessage = async (title, content, userId) => {
  return instance.post('/messages', {
    title,
    content,
    userId,
  });
};

const deleteUser = async (id, authToken) => {
  return instance.delete(`/users/${id}`, withAuth(authToken));
};

const deleteNews = async (id, authToken) => {
  return instance.delete(`/news/${id}`, withAuth(authToken));
};

const deleteMessage = async (id, authToken) => {
  return instance.delete(`/messages/${id}`, withAuth(authToken));
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

const updateUser = async (id, name, email, password, role, authToken) => {
  return instance.put(
    `/users/${id}`,
    {
      name,
      email,
      password,
      role,
    },
    withAuth(authToken)
  );
};

const updateNews = async (id, title, content, userId, authToken) => {
  return instance.put(
    `/news/${id}`,
    {
      title,
      content,
      userId,
    },
    withAuth(authToken)
  );
};

const updateMessage = async (id, title, content, userId, authToken) => {
  return instance.put(
    `/messages/${id}`,
    {
      title,
      content,
      userId,
    },
    withAuth(authToken)
  );
};

const validateToken = async (authToken) => {
  return instance.get('/validate-token', withAuth(authToken));
};

export default {
  login,
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
  updateUser,
  updateNews,
  updateMessage,
  validateToken,
};
