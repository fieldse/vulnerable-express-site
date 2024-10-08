import { Router } from 'express';
import {
  auth,
  admin,
  messages,
  news,
  profile,
  render404,
  support,
} from './controllers/index.js';
const routes = Router();

// Home
routes.get('/', (req, res) => res.render('home'));

// Admin
routes.get('/admin', admin.index);

// Admin -- Add message
routes.get('/admin/add-message', admin.addMessage);
routes.post('/admin/add-message', admin.addMessage);

// Admin -- Add news
routes.get('/admin/add-news', admin.addNews);
routes.post('/admin/add-news', admin.addNews);

// Admin -- Add user
routes.get('/admin/add-user', admin.addUser);
routes.post('/admin/add-user', admin.addUser);

// Admin -- Edit news
routes.get('/admin/edit-news/:id', admin.editNews);
routes.post('/admin/edit-news/:id', admin.editNews);

// Admin -- Edit message
routes.get('/admin/edit-message/:id', admin.editMessage);
routes.post('/admin/edit-message/:id', admin.editMessage);

// Admin -- Edit user
routes.get('/admin/edit-user/:id', admin.editUser);
routes.post('/admin/edit-user/:id', admin.editUser);

// Admin -- Delete user
routes.get('/admin/delete-user/:id', admin.deleteUser);

// Admin -- Delete news
routes.get('/admin/delete-news/:id', admin.deleteNews);

// Admin -- Delete message
routes.get('/admin/delete-message/:id', admin.deleteMessage);

// News
routes.get('/news', news.index);

// Message board
routes.get('/message-board', messages.index);

// Post new message
routes.get('/new-message', messages.newMessage);
routes.post('/new-message', messages.newMessage);

// Employee profile - PRIVATE ROUTE
routes.get('/profile', profile.get);

// GET Edit profile - PRIVATE ROUTE
routes.use('/profile/edit', profile.edit);
routes.post('/profile/edit', profile.edit);

// Support
routes.get('/support', support.index);

// Logout
routes.get('/logout', auth.logout);

// GET Login
routes.get('/login', auth.login);

// POST Login
routes.post('/login', auth.login);

// 404
routes.get('/404', render404);

// Catchall / unhandled
routes.all('*', render404);

export default routes;
