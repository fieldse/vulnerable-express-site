// Profile methods
import { logErr, logSuccess } from '../logging.js';
import api from '../api.js';

// Get profile for the logged in user
export async function get(req, res) {
  try {
    res.render('profile');
  } catch (err) {
    logErr(req, err, 'get profile data failed');
    res.redirect('/404');
  }
}

// GET/POST edit profile
export async function edit(req, res) {
  if (req.method === 'POST') {
    const { id, name, email, password } = req.body; // Insecure: ID could be modified in the request body by the user
    const authToken = req.cookies?.token;
    if (!authToken) {
      throw new Error('login required');
    }
    const result = await api.updateProfile(
      id,
      name,
      email,
      password,
      authToken
    );
    if (result.status === 200) {
      const prevUser = req.app.locals.currentUser;
      req.app.locals.currentUser = { ...prevUser, name, email };
      logSuccess(req, 'updated user profile');
      return res.redirect('/profile');
    } else {
      logErr(req, new Error('edit profile failed'));
      res.redirect('/404');
    }
  }

  return res.render('edit-profile');
}
