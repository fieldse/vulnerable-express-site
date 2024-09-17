// Backend API routes
import axios from 'axios';
import { BASE_API_URL } from './config.js';

const urls = {
  messages: BASE_API_URL + '/messages',
  news: BASE_API_URL + '/news',
  users: BASE_API_URL + '/users',
  login: BASE_API_URL + '/login',
  logout: BASE_API_URL + '/logout',
  message: (id) => BASE_API_URL + `/messages/${id}`,
  user: (id) => BASE_API_URL + `/users/${id}`,
  newsItem: (id) => BASE_API_URL + `/news/${id}`,
};

const login = async (email, password) => {
  return axios.post(urls.login, {
    email,
    password,
  });
};

const logout = async () => {
  return axios.post(urls.logout);
};

const updateProfile = async (id, name, email, password) => {
  return axios.put(urls.user(id), {
    name,
    email,
    password,
  });
};

const addUser = async (name, email, password, role) => {
  return axios.post(urls.users, {
    name,
    email,
    password,
    role,
  });
};

const addNews = async (title, content, userId) => {
  return axios.post(urls.news, {
    title,
    content,
    userId,
  });
};

const addMessage = async (title, content, userId) => {
  return axios.post(urls.messages, {
    title,
    content,
    userId,
  });
};

const deleteUser = async (id) => {
  return axios.delete(urls.user(id));
};

const deleteNews = async (id) => {
  return axios.delete(urls.newsItem(id));
};

const deleteMessage = async (id) => {
  return axios.delete(urs.message(id));
};

const getMessages = async () => {
  return axios.get(urls.messages);
};

const getNews = async () => {
  return axios.get(urls.news);
};

const getUsers = async () => {
  return axios.get(urls.users);
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
  getUsers,
};
