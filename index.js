import express from 'express';
import { create } from 'express-handlebars';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import { PORT, DEBUG } from './src/config.js';
import routes from './src/routes.js';

const app = express();
const hbs = create({
  defaultLayout: 'main',
  extname: '.hbs',
  partialsDir: 'src/views/partials/',
  layoutsDir: 'src/layouts/',
  helpers: {
    // equality helper
    eq(a, b) {
      return a == b;
    },
  },
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('tiny'));
app.locals.isDebug = DEBUG;

// Set view engine to Handlebars
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');
app.set('views', './src/views');
app.use(express.static('public'));

// Use router
app.use('/', routes);

// error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`);
});
