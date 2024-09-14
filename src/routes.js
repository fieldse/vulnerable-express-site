import { Router } from 'express';
const routes = Router();
import api from './api/auth.js';
import { logDebug, logErr } from './debug.js';

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
  res.render('profile');
});

// GET Edit profile - PRIVATE ROUTE
routes.get('/profile/edit', (req, res) => {
  res.render('edit-profile');
});

// POST Edit profile - PRIVATE ROUTE
routes.post('/profile/edit', (req, res) => {
  const { id, name, email, password } = req.body;
  // TODO -- make this post somewhere
  logDebug(req, JSON.stringify({ id, name, email, password }));
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
    const result = await api.login(req, res); // TODO -- make this actually post somewhere
    logDebug(req, 'API result:', JSON.stringify(result, null, 2));
    // Fake the login
    routes.locals.isLoggedIn = true;

    res.redirect('/profile');
  } catch (err) {
    logErr('post', '/login', err);
    res.redirect('/login');
  }
});

// Logout
routes.get('/logout', async (req, res) => {
  try {
    const result = await api.logout(req, res);
    logDebug(req, 'API result:', JSON.stringify(result, null, 2));
    routes.locals.isLoggedIn = false;
  } catch (err) {
    logErr(req, err);
  }

  res.redirect('/login');
});

export default routes;
