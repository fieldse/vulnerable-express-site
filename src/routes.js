import { Router } from 'express';
const routes = Router();
import {
  login,
  logout,
  adminIndex,
  adminAddUser,
  adminAddNews,
  adminAddMessage,
  adminEditMessage,
  adminEditNews,
  adminEditUser,
  adminDeleteUser,
  editProfile,
  getMessageBoard,
  getProfile,
  getSupport,
  newsIndex,
  render404,
} from './controllers/index.js';

// Home
routes.get('/', (req, res) => res.render('home'));

// Admin
routes.get('/admin', adminIndex);

// Admin -- Add message
routes.get('/admin/add-message', adminAddMessage);

// Admin -- Add news
routes.get('/admin/add-news', adminAddNews);

// Admin -- Add user
routes.get('/admin/add-user', adminAddUser);

// Admin -- Edit news
routes.get('/admin/edit-news/:id', adminEditNews);

// Admin -- Edit message
routes.get('/admin/edit-message/:id', adminEditMessage);

// Admin -- POST Add user
routes.post('/admin/add-user', adminAddUser);

// Admin -- Edit user
routes.get('/admin/edit-user/:id', adminEditUser);

// Admin -- POST Edit user
routes.post('/admin/edit-user/:id', adminEditUser);

// Admin -- Delete user
routes.get('/admin/delete-user/:id', adminDeleteUser);

// News
routes.get('/news', newsIndex);

// Message board
routes.get('/message-board', getMessageBoard);

// Employee profile - PRIVATE ROUTE
routes.get('/profile', getProfile);

// GET Edit profile - PRIVATE ROUTE
routes.use('/profile/edit', editProfile);

// POST Edit profile - PRIVATE ROUTE
routes.post('/profile/edit', editProfile);

// Support
routes.get('/support', getSupport);

// Logout
routes.get('/logout', logout);

// GET Login
routes.get('/login', login);

// POST Login
routes.post('/login', login);

// 404
routes.get('/404', render404);

// Catchall / unhandled
routes.all('*', render404);

export default routes;
