import { Router } from 'express';
const routes = Router();
import {
  login,
  logout,
  editProfile,
  getMessageBoard,
  getProfile,
  getSupport,
  newsIndex,
} from './controllers';

// Home
routes.get('/', (req, res) => res.render('home'));

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
routes.get(['/404', '*'], render404);

export default routes;
