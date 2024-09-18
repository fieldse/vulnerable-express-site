// Admin controller
import { logDebug, logErr, logSuccess } from '../logging.js';
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

// Admin -- Edit news
export async function adminEditNews(req, res) {
  res.render('admin/edit-news');
}

// Admin -- Edit message
export async function adminEditMessage(req, res) {
  res.render('admin/edit-message');
}

// Admin -- Add user
export async function adminAddUser(req, res) {
  try {
    if (req.method === 'POST') {
      const { name, email, password, role } = req.body;
      if (!name || !email || !password || !role) {
        throw new Error('name, email, password, role fields must not be empty');
      }
      const userId = await api.addUser(name, email, password, role);
      logSuccess(req, 'created user: ' + userId);
      return res.redirect('/admin');
    }
    res.render('admin/add-user');
  } catch (err) {
    logErr(req, err);
    return res.redirect('/404');
  }
}

// Admin -- Edit user
export async function adminEditUser(req, res) {
  try {
    // Handle POST login
    if (req.method === 'POST') {
      // FIXME: do something here
    } else {
      const { id } = req.params;
      const { data } = await api.getUser(id);
      if (!data?.user) {
        throw new Error('user not found');
      }
      res.render('admin/edit-user', { user: data.user });
    }
  } catch (err) {
    logErr(req, err);
    return res.redirect('/404');
  }
}

// Admin -- Delete user action
export async function adminDeleteUser(req, res) {
  try {
    const { id } = req.params;
    const result = await api.deleteUser(id);
    logDebug(req, 'result status: ', result.status);
    logSuccess(req, `deleted user ${id}`);
    res.redirect('/admin');
  } catch (err) {
    logErr(req, err);
    return res.redirect('/404');
  }
}
