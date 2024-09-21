// Admin controller
import { logDebug, logErr, logSuccess } from '../logging.js';
import api from '../api.js';

// Admin dashboard
export async function adminIndex(req, res) {
  const messageData = await api.getMessages();
  const newsData = await api.getNews();
  const usersData = await api.getUsers();
  var debugData;
  try {
    const authToken = req.cookies?.token;
    const validateResult = await api.validateToken(authToken);
    debugData = JSON.stringify(validateResult?.data);
  } catch (err) {
    logErr(req, err);
  }
  res.render('admin/admin', {
    messages: messageData?.data.rows,
    news: newsData?.data.rows,
    users: usersData?.data.rows,
    debugData,
  });
}

// Admin -- Edit news
export async function adminEditNews(req, res) {
  try {
    if (req.method === 'POST') {
      // FIXME: do something
    }
    res.render('admin/edit-news');
  } catch (err) {
    res.redirect('/404');
  }
}

// Admin -- Edit message
export async function adminEditMessage(req, res) {
  try {
    if (req.method === 'POST') {
      // FIXME: do something
    }
    res.render('admin/edit-message');
  } catch (err) {
    res.redirect('/404');
  }
}

// Admin -- Add user
export async function adminAddUser(req, res) {
  try {
    if (req.method === 'POST') {
      const { name, email, password, role } = req.body;
      if (!name || !email || !password || !role) {
        throw new Error('name, email, password, role fields must not be empty');
      }
      const authToken = req.cookies?.user;
      logDebug(req, 'authToken: ', authToken);
      const userId = await api.addUser(name, email, password, role, authToken);
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
    const { id } = req.params;
    // Handle POST route
    if (req.method === 'POST') {
      const { name, email, password, role } = req.body;
      const authToken = req.cookies?.token;

      if (!name || !email || !role) {
        throw new Error('name, email, role fields must not be empty');
      }
      const result = await api.updateUser(
        id,
        name,
        email,
        password,
        role,
        authToken
      );
      logSuccess(req, `modified ${result} rows`);
      return res.redirect('/admin');
    }
    const { data } = await api.getUser(id);
    if (!data?.user) {
      throw new Error('user not found');
    }
    res.render('admin/edit-user', { user: data.user });
  } catch (err) {
    logErr(req, err);
    return res.redirect('/404');
  }
}

// Admin -- Delete user action
export async function adminDeleteUser(req, res) {
  try {
    const { id } = req.params;
    const authToken = req.cookies?.token;
    const result = await api.deleteUser(id, authToken);
    logSuccess(req, `deleted ${result} rows`);
    res.redirect('/admin');
  } catch (err) {
    logErr(req, err);
    return res.redirect('/404');
  }
}
