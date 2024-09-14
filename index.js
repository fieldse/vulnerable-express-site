import express from 'express';
import { create } from 'express-handlebars';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import api from './src/api/auth.js';
import { PORT } from './src/config.js';
import { logDebug, logErr } from './src/debug.js';

const app = express();
const hbs = create({
  defaultLayout: 'main',
  extname: '.hbs',
  partialsDir: 'src/views/',
  layoutsDir: 'src/layouts/',
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('tiny'));

// Set view engine to Handlebars
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');
app.set('views', './src/views');
app.use(express.static('public'));

// Home
app.get('/', (req, res) => {
  res.render('home');
});

// News
app.get('/news', (req, res) => {
  res.render('news');
});

// Message board
app.get('/message-board', (req, res) => {
  res.render('message-board');
});

// Employee profile - PRIVATE ROUTE
app.get('/profile', (req, res) => {
  res.render('profile');
});

// GET Edit profile - PRIVATE ROUTE
app.get('/profile/edit', (req, res) => {
  res.render('edit-profile');
});

// POST Edit profile - PRIVATE ROUTE
app.post('/profile/edit', (req, res) => {
  const { id, name, email, password } = req.body;
  // TODO -- make this post somewhere
  logDebug(req, JSON.stringify({ id, name, email, password }));
  res.render('edit-profile');
});

// Support
app.get('/support', (req, res) => {
  res.render('support');
});

// GET Login
app.get('/login', async (req, res) => {
  res.render('login');
});

// POST Login
app.post('/login', async (req, res) => {
  try {
    const result = await api.login(req, res); // TODO -- make this actually post somewhere
    logDebug(req, 'API result:', JSON.stringify(result, null, 2));
    // Fake the login
    app.locals.isLoggedIn = true;

    res.redirect('/profile');
  } catch (err) {
    logErr('post', '/login', err);
    res.redirect('/login');
  }
});

// Logout
app.get('/logout', async (req, res) => {
  try {
    const result = await api.logout(req, res);
    logDebug(req, 'API result:', JSON.stringify(result, null, 2));
    app.locals.isLoggedIn = false;
  } catch (err) {
    logErr(req, err);
  }

  res.redirect('/login');
});

app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`);
});
