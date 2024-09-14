// API methods for Vulnerable REST API backend

import { BASE_API_URL } from './config.js';
import { logDebug } from './debug.js';
// import axios from 'axios';

// Login
const login = async (req, res) => {
  const { email, password } = req.body;
  const apiPath = BASE_API_URL + '/login';
  logDebug(
    req,
    `placeholder: API request to ${apiPath}`,
    JSON.stringify({ email, password })
  ); // TODO -- make this actually post somewhere
};

// Logout
const logout = async (req, res) => {
  const apiPath = BASE_API_URL + '/logout';
  logDebug(req, `=== placeholder: API request to ${apiPath}`); // TODO -- make this actually post somewhere
};

// Placeholder for getting logged in status
const isLoggedIn = async (req, res) => {
  return !!req.cookies.user; // This simply checks if _any_ cookie named 'user' exists
};

export default {
  login,
  logout,
  isLoggedIn,
};
