// Backend API routes
import axios from 'axios';
import { BASE_API_URL } from './config.js';

const apiUrls = {
  allMessages: BASE_API_URL + '/messages',
  allNews: BASE_API_URL + '/news',
  editProfile: (id) => BASE_API_URL + `/users/${id}`,
  login: BASE_API_URL + '/login',
  logout: BASE_API_URL + '/logout',
};

const login = async (email, password) => {
  return axios.post(apiUrls.login, {
    email,
    password,
  });
};

const logout = async () => {
  return axios.post(apiUrls.logout);
};

const postEditProfile = async (id, name, email, password) => {
  return axios.put(apiUrls.editProfile(id), {
    name,
    email,
    password,
  });
};

const getMessages = async () => {
  return axios.get(apiUrls.allMessages);
};

const getNews = async () => {
  return axios.get(apiUrls.allNews);
};

export default {
  login,
  logout,
  postEditProfile,
  getMessages,
  getNews,
};
