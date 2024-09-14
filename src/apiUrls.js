// API urls for Vulnerable REST API backend

import { BASE_API_URL } from './config.js';

const urls = {
  login: BASE_API_URL + '/login',
  logout: BASE_API_URL + '/logout',
  getProfile: BASE_API_URL + '/profile', // TODO: should probably include methods with these
  editProfile: BASE_API_URL + '/profile',
};

export default urls;
