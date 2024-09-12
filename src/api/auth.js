// API methods for Vulnerable REST API backend

import { BASE_API_URL } from '../config.js';
// import axios from 'axios';

// Login
export const login = async (req, res) => {
  const apiPath = BASE_API_URL + '/login';
  console.log(`=== placeholder: login request to ${apiPath}`);
};

// Logout
export const logout = async (req, res) => {
  const apiPath = BASE_API_URL + '/logout';
  console.log(`=== placeholder: logout request to ${apiPath}`);
};

// Placeholder for getting logged in status
export const getIsLoggedIn = async (req, res) => {
  return !!req.cookies.user; // This simply checks if _any_ cookie named 'user' exists
};
