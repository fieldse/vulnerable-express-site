// API methods for Vulnerable REST API backend

import { BASE_API_URL } from '../config.js';

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
