// Auth methods
import { logSuccess, logErr, logDebug } from '../logging.js';
import api from '../api.js';

// Login handler
export async function login(req, res) {
  // Handle POST login
  if (req.method === 'POST') {
    try {
      const { email, password } = req.body;
      const result = await api.login(email, password);
      if (result.status !== 200) {
        throw new Error('login failed: ' + result?.message || 'unknown error');
      }
      const { user, token } = result.data;
      if (!user) {
        throw new Error('login failed: user data empty');
      }
      if (!token) {
        throw new Error('login failed: token empty');
      }

      // Store to cookie
      res.cookie('user', JSON.stringify(user));
      res.cookie('token', token);

      // Store locals
      req.app.locals.isLoggedIn = true;
      req.app.locals.currentUser = user;
      req.app.locals.isAdmin = user?.role == 'admin';

      logSuccess(req, 'login success', user);
      return res.redirect('/profile');
    } catch (err) {
      logErr(req, err);
      return res.redirect('/404');
    }
  }
  res.render('login');
}

// Log out and redirect to home
export async function logout(req, res) {
  try {
    await api.logout();
    req.app.locals.isLoggedIn = false;
    req.app.locals.currentUser = undefined;
    req.app.locals.isAdmin = undefined;
    res.clearCookie('user');
    res.clearCookie('token');
  } catch (err) {
    logErr(req, err);
  }
  res.redirect('/');
}
