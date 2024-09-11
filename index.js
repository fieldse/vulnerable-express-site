import express from 'express';
import { create } from 'express-handlebars';
import path from 'path';

const app = express();
const hbs = create({
  defaultLayout: 'main',
  extname: '.hbs',
  partialsDir: 'views/',
  layoutsDir: 'layouts/',
});

app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');
app.set('views', './views');

app.get('/', (req, res) => {
  res.render('home');
});

app.listen(3000, () => {
  console.log('listening on port 3000');
});
