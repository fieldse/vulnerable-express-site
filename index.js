import express from 'express';
import { create } from 'express-handlebars';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import { login, getIsLoggedIn } from './src/api/auth.js';
import { isLoggedIn } from './src/middleware/auth-middleware.js';

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
app.get('/profile', isLoggedIn, (req, res) => {
  res.render('profile');
});

// GET Login
app.get('/login', async (req, res) => {
  const loggedInStatus = await getIsLoggedIn(req);
  res.render('login', { isLoggedIn: loggedInStatus });
});

// POST Login
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await login(req, res);
    console.log(
      '=== debug: POST /login -- result:',
      JSON.stringify(result, null, 2)
    );
    res.redirect('/profile');
  } catch (err) {
    console.log('=== POST login error:', err.message);
    res.redirect('/login');
  }
});

// POST Logout
app.post('/logout', async (req, res) => {
  try {
    const result = await logout(req, res);
    console.log(
      '=== debug: POST /logout -- result:',
      JSON.stringify(result, null, 2)
    );
  } catch (err) {
    console.log('=== POST logout error:', err.message);
  }
  res.redirect('/login');
});

app.listen(3000, () => {
  console.log('listening on http://localhost:3000');
});
