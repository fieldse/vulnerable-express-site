// Profile methods
import axios from 'axios';
import { BASE_API_URL } from '../config.js';
import { logErr, logSuccess } from '../logging.js';

// Get profile for the logged in user
export async function getProfile(req, res) {
  try {
    res.render('profile');
  } catch (err) {
    logErr(req, err, 'get profile data failed');
    res.redirect('/404');
  }
}

// GET/POST edit profile
export async function editProfile(req, res) {
  if (req.method === 'POST') {
    const { id, name, email, password } = req.body; // Insecure: ID could be modified in the request body by the user
    const result = await axios.put(BASE_API_URL + `/users/${id}`, {
      name,
      email,
      password,
    });
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
