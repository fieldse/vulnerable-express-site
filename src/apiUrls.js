// API urls for Vulnerable REST API backend

import { BASE_API_URL } from './config.js';

export default {
  login: () => BASE_API_URL + '/login',
  logout: () => BASE_API_URL + '/logout',
  getProfile: () => BASE_API_URL + '/profile', // TODO: should probably include methods with these
  editProfile: (userId) => BASE_API_URL + `/users/${userId}`,
};
