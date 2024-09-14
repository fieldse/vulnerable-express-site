import { Router } from 'express';
const routes = Router();
import axios from 'axios';
import urls from './apiUrls.js';
import { logDebug, logErr, logSuccess } from './logging.js';

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
    // Assumes the current user is logged in, and trust the cookie to accurately identify the user by ID
    const cookie = req.cookies.user;
    if (!cookie) {
      throw new Error('not logged in!');
    }
    const cookieData = JSON.parse(cookie);
    const userId = cookieData?.user?.id; // maybe don't need to do this here, since we store the data at login
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
  const result = await axios.post(urls.editProfile, {
    // TODO -- validate this API route
    id,
    name,
    email,
    password,
  });
  logDebug(req, 'result:', result);
  res.render('edit-profile');
});

// Support
routes.get('/support', (req, res) => {
  res.render('support');
});

// GET Login
routes.get('/login', async (req, res) => {
  res.render('login');
});

// POST Login
routes.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await axios.post(urls.login, { email, password });
    const data = result.data;
    if (result.status !== 200) {
      throw new Error('login failed: ' + result?.message || 'unknown error');
    }
    if (!data?.user) {
      throw new Error('login failed: user data empty');
    }

    logSuccess(req, 'login success', result);
    req.app.locals.isLoggedIn = true;
    req.app.currentUser = data.user;
    res.redirect('/profile');
  } catch (err) {
    logErr(req, err);
    res.redirect('/404');
  }
});

// Logout
routes.get('/logout', async (req, res) => {
  try {
    const result = await axios.post(urls.logout);
    logDebug(req, 'API result:', result);
    req.app.locals.isLoggedIn = false;
  } catch (err) {
    logErr(req, err);
  }

  res.redirect('/login');
});

// 404
routes.get(['/404'], (req, res) => {
  const message = req.params.message || 'unknown error';
  res.render('404', { message });
});

// Catch-all
routes.get(['*'], (req, res) => {
  const message = req.params.message || 'That page is not found.';
  res.render('404', { message });
});

export default routes;
