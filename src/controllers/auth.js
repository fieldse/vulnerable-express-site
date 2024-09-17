// Auth methods
import { logSuccess, logErr } from '../logging.js';
import api from '../api.js';

// Login handler
export async function login(req, res) {
  // Handle POST login
  if (req.method === 'POST') {
    try {
      const { email, password } = req.body;
      const result = await api.login(email, password);
      const data = result.data;
      if (result.status !== 200) {
        throw new Error('login failed: ' + result?.message || 'unknown error');
      }
      if (!data?.user) {
        throw new Error('login failed: user data empty');
      }

      logSuccess(req, 'login success', data);
      req.app.locals.isLoggedIn = true;
      req.app.locals.currentUser = data.user;
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
  } catch (err) {
    logErr(req, err);
  }
  res.redirect('/');
}
