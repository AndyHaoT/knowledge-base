require("./util/env");
const express = require('express');
const session = require('express-session');
const path = require('path');
const expressHbs = require('express-handlebars');
const bodyParser = require('body-parser');
const routes = require(path.join(__dirname, 'routes', 'index'));

const app = express();

// Configure app
// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));
app.engine(
  'hbs',
  expressHbs({
    layoutsDir: 'views/layouts/',
    defaultLayout: 'main-layout',
    extname: 'hbs'
  })
);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.set('trust proxy', 1) // trust first proxy
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 6000000 }
}))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(routes);

app.listen(3000, () => console.log('Server ready'));