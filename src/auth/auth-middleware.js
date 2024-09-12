// Auth middleware for login/logout

// Placeholder for getting logged in status
export const getIsLoggedIn = (req, res) => {
  return !!req.cookies.user; // This simply checks if _any_ cookie named 'user' exists
};

// Middleware for login-required pages
export const isLoggedIn = (req, res, next) => {
  if (!getIsLoggedIn()) {
    res.redirect(301, '/login');
  }
  next();
};
