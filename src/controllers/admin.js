// Admin controller
import { logDebug } from '../logging.js';
import api from '../api.js';

// Render news view
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
  res.render('admin', {
    messages: messageData?.data.rows,
    news: newsData?.data.rows,
    users: usersData?.data.rows,
  });
}
