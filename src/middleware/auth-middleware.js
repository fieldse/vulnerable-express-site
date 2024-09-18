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

// Load current user from cookie if existing
export const loadCookies = (req, res, next) => {
  const cookie = req.cookies?.user;
  const { isLoggedIn } = req.app.locals;
  // Load the current user from cookie if we're not already logged in
  if (cookie && !isLoggedIn) {
    const user = JSON.parse(cookie);
    req.app.locals.isLoggedIn = true;
    req.app.locals.currentUser = user;
    req.app.locals.isAdmin = user?.role == 'admin';
  }
  next();
};
