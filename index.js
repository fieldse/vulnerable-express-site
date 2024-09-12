import express from 'express';
import { create } from 'express-handlebars';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import api from './src/api/auth.js';

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

// Support
app.get('/support', (req, res) => {
  res.render('support');
});

// GET Login
app.get('/login', async (req, res) => {
  // const loggedInStatus = await api.isLoggedIn(req);
  // app.locals.isLoggedIn = loggedInStatus;
  res.render('login');
});

// POST Login
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await api.login(req, res);
    console.log(
      `=== debug: POST /login: email: ${email} -- password: ${password}`
    );
    console.log('=== debug: POST /login: result: ', JSON.stringify(result));

    // Fake the login
    app.locals.isLoggedIn = true;

    res.redirect('/profile');
  } catch (err) {
    console.log('=== POST login error:', err.message);
    res.redirect('/login');
  }
});

// Logout
app.get('/logout', async (req, res) => {
  try {
    const result = await api.logout(req, res);
    console.log(
      '=== debug: POST /logout -- result:',
      JSON.stringify(result, null, 2)
    );
    app.locals.isLoggedIn = false;
  } catch (err) {
    console.log('=== POST logout error:', err.message);
  }

  res.redirect('/login');
});

app.listen(3000, () => {
  console.log('listening on http://localhost:3000');
});
