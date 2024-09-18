// Admin controller
import { logDebug } from '../logging.js';
import api from '../api.js';

// Admin dashboard
export async function adminIndex(req, res) {
  const messageData = await api.getMessages();
  const newsData = await api.getNews();
  const usersData = await api.getUsers();
  logDebug(
    req,
    'admin data: ',
    JSON.stringify({
      messages: messageData?.data.rows,
      news: newsData?.data.rows,
      users: usersData?.data.rows,
    })
  );
  res.render('admin/admin', {
    messages: messageData?.data.rows,
    news: newsData?.data.rows,
    users: usersData?.data.rows,
  });
}

// Admin -- Edit news view
export async function adminEditNews(req, res) {
  res.render('admin/edit-news');
}

// Admin -- Edit message view
export async function adminEditMessage(req, res) {
  res.render('admin/edit-message');
}

// Admin -- Edit user view
export async function adminEditUser(req, res) {
  res.render('admin/edit-user');
}
