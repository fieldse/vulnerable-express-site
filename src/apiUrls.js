// API urls
import { BASE_API_URL } from './config.js';

export default {
  allMessages: BASE_API_URL + '/messages',
  allNews: BASE_API_URL + '/news',
  editProfile: (id) => BASE_API_URL + `/users/${id}`,
  login: BASE_API_URL + '/login',
  logout: BASE_API_URL + '/logout',
};
