const express = require('express');
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');
const routes = require(path.join(__dirname, 'routes', 'index'));

const app = express();

// Configure app
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('trust proxy', 1) // trust first proxy
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'COMP4711ibbl4u9fdbn',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 6000000 }
}))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(routes);

app.listen(3000, function() {
    console.log('Server started on port 3000');
});