// Auth middleware for login/logout
import { getIsLoggedIn } from '../api/auth.js';

// Middleware for login-required pages
export const isLoggedIn = async (req, res, next) => {
  var isLoggedIn = await getIsLoggedIn(req, res); // this currently just checks for a cookie
  if (!isLoggedIn) {
    res.redirect(301, '/login');
  }
  next();
};
