// Admin controller
import { logErr, logSuccess } from '../logging.js';
import api from '../api.js';

// Admin dashboard
export async function index(req, res) {
  const messageData = await api.getMessages();
  const newsData = await api.getNews();
  const usersData = await api.getUsers();
  res.render('admin/admin', {
    messages: messageData?.data.rows,
    news: newsData?.data.rows,
    users: usersData?.data.rows,
  });
}

// Admin -- Add news
// FIXME: test this
export async function addNews(req, res) {
  try {
    if (req.method === 'POST') {
      const { title, content, userId } = req.body;
      if (!title || !content || !userId) {
        throw new Error('title, content, userId fields must not be empty');
      }
      const authToken = req.cookies?.token;
      const result = await api.addNews(title, content, userId, authToken);
      logSuccess(req, `updated ${result} rows`);
      return res.redirect('/admin');
    }
    res.render('admin/add-news');
  } catch (err) {
    res.redirect('/404');
  }
}

// Admin -- Add message
// FIXME: test this
export async function addMessage(req, res) {
  try {
    if (req.method === 'POST') {
      const { title, content, userId } = req.body;
      if (!title || !content || !userId) {
        throw new Error('title, content, userId fields must not be empty');
      }
      const authToken = req.cookies?.token;
      const result = await api.addMessage(title, content, userId, authToken);
      logSuccess(req, `updated ${result} rows`);
      return res.redirect('/admin');
    }
    res.render('admin/add-message');
  } catch (err) {
    res.redirect('/404');
  }
}

// Admin -- Edit news
export async function editNews(req, res) {
  try {
    const { id } = req.params;
    // Handle POST news
    if (req.method === 'POST') {
      // FIXME: test this
      const { title, content, userId } = req.body;
      if (!title || !content || !userId) {
        throw new Error('title, content, userId fields must not be empty');
      }
      const authToken = req.cookies?.token;
      const result = await api.updateMessage(
        id,
        title,
        content,
        userId,
        authToken
      );
      logSuccess(req, `updated ${result} rows`);
      return res.redirect('/admin');
    }
    const { data } = await api.getNewsItem(id);
    res.render('admin/edit-news', { news: data?.news });
  } catch (err) {
    res.redirect('/404');
  }
}

// Admin -- Edit message
export async function editMessage(req, res) {
  try {
    const { id } = req.params;
    // Handle POST message
    if (req.method === 'POST') {
      // FIXME: test this
      const { title, content, userId } = req.body;
      if (!title || !content || !userId) {
        throw new Error('title, content, userId fields must not be empty');
      }
      const authToken = req.cookies?.token;
      const result = await api.updateMessage(
        id,
        title,
        content,
        userId,
        authToken
      );
      logSuccess(req, `updated ${result} rows`);
      return res.redirect('/admin');
    }
    const { data } = await api.getMessage(id);
    res.render('admin/edit-message', { message: data?.message });
  } catch (err) {
    res.redirect('/404');
  }
}

// Admin -- Add user
export async function addUser(req, res) {
  try {
    if (req.method === 'POST') {
      const { name, email, password, role } = req.body;
      if (!name || !email || !password || !role) {
        throw new Error('name, email, password, role fields must not be empty');
      }
      const authToken = req.cookies?.token;
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
export async function editUser(req, res) {
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
export async function deleteUser(req, res) {
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

// Admin -- Delete News action
export async function deleteNews(req, res) {
  try {
    const { id } = req.params;
    const authToken = req.cookies?.token;
    const result = await api.deleteNews(id, authToken);
    logSuccess(req, `deleted ${result} rows`);
    res.redirect('/admin');
  } catch (err) {
    logErr(req, err);
    return res.redirect('/404');
  }
}

// Admin -- Delete Message action
export async function deleteMessage(req, res) {
  try {
    const { id } = req.params;
    const authToken = req.cookies?.token;
    const result = await api.deleteMessage(id, authToken);
    logSuccess(req, `deleted ${result} rows`);
    res.redirect('/admin');
  } catch (err) {
    logErr(req, err);
    return res.redirect('/404');
  }
}
