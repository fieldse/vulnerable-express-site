// Auth middleware for login/logout

// Middleware for login-required pages
export const isLoggedIn = async (req, res, next) => {
  // Placeholder for getting logged in status
  const isLoggedIn = !!req.cookies.user; // This simply checks if _any_ cookie named 'user' exists
  if (!isLoggedIn) {
    res.redirect(301, '/login');
  }
  next();
};
