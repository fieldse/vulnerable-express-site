// Controller methods for messages
import { logDebug, logErr, logSuccess } from '../logging.js';
import api from '../api.js';

// Render message board view
export async function index(req, res) {
  const { data } = await api.getMessages();
  logDebug(req, 'data', JSON.stringify(data));
  res.render('message-board', { messages: data?.rows });
}

// POST new message
export async function newMessage(req, res) {
  try {
    if (!req.app.locals.isLoggedIn) {
      logDebug(req, 'login required');
      return res.redirect('/login');
    }

    if (req.method === 'POST') {
      const { userId, title, content } = req.body;
      const authToken = req.cookies?.token;
      if (!authToken) {
        throw new Error('login required');
      }
      if (!userId || !title || !content) {
        throw new Error('userId, title, and content parameters are required');
      }
      const result = await api.addMessage(title, content, userId, authToken);
      logSuccess(req, `updated ${result} rows`);
      return res.redirect('/message-board');
    }
    res.render('new-message', { formAction: '/new-message' });
  } catch (err) {
    logErr(req, err);
    res.redirect('/404');
  }
}
