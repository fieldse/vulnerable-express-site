import { Router } from 'express';
const routes = Router();
import axios from 'axios';
import aoiUrls from './apiUrls.js';
import { logErr, logSuccess } from './logging.js';

// Home
routes.get('/', (req, res) => {
  res.render('home');
});

// News
routes.get('/news', (req, res) => {
  res.render('news');
});

// Message board
routes.get('/message-board', (req, res) => {
  res.render('message-board');
});

// Employee profile - PRIVATE ROUTE
routes.get('/profile', (req, res) => {
  try {
    res.render('profile');
  } catch (err) {
    logErr(req, err, 'get profile data failed');
    res.redirect('/404');
  }
});

// GET Edit profile - PRIVATE ROUTE
routes.get('/profile/edit', (req, res) => {
  res.render('edit-profile');
});

// POST Edit profile - PRIVATE ROUTE
routes.post('/profile/edit', async (req, res) => {
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
  }
  res.render('edit-profile');
});

// Support
routes.get('/support', (req, res) => {
  res.render('support');
});

// Logout
routes.get('/logout', async (req, res) => {
  try {
    req.app.locals.isLoggedIn = false;
  } catch (err) {
    logErr(req, err);
  }
  res.redirect('/');
});

// GET Login
routes.get('/login', async (req, res) => {
  res.render('login');
});

// POST Login
routes.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await axios.post(aoiUrls.login(), { email, password });
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
    res.redirect('/profile');
  } catch (err) {
    logErr(req, err);
    res.redirect('/404');
  }
});

// 404
routes.get(['/404', '*'], (req, res) => {
  var message;
  if (req.path === '/404') {
    message = req.params.message || 'An unknown error occurred';
  }
  res.render('404', { message: message || 'That page is not found.' });
});

export default routes;
