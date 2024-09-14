// Profile methods
import axios from 'axios';

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
  if (req.method === 'post') {
    const { id, name, email, password } = req.body;
    const result = await axios.post(aoiUrls.editProfile(id), {
      name,
      email,
      password,
    });
    if (result.status === 200) {
      const prevUser = req.app.locals.currentUser;
      req.app.locals.currentUser = { ...prevUser, name, email };
      logSuccess('updated user profile');
      return true;
    }
  }

  return res.render('edit-profile');
}
