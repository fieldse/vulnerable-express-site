import express from 'express';
import { create } from 'express-handlebars';
import { isLoggedIn } from './src/auth/auth-middleware.js';

const app = express();
const hbs = create({
  defaultLayout: 'main',
  extname: '.hbs',
  partialsDir: 'src/views/',
  layoutsDir: 'src/layouts/',
});

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

// Login
app.get('/login', (req, res) => {
  res.render('login');
});

app.listen(3000, () => {
  console.log('listening on http://localhost:3000');
});
