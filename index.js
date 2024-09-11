import express from 'express';
import { create } from 'express-handlebars';

const app = express();
const hbs = create({
  defaultLayout: 'main',
  extname: 'hbs',
  partialsDir: 'views',
  layoutsDir: 'layouts',
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', './views');

app.get('/', (req, res) => {
  res.render('home');
});

app.listen(3000);
