import express from 'express';
import { create } from 'express-handlebars';

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

app.get('/', (req, res) => {
  res.render('home');
});

app.listen(3000, () => {
  console.log('listening on http://localhost:3000');
});
