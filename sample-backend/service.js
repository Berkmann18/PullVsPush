/* eslint-env node, es6 */
const express = require('express');
const logger = require('pino-http');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();

app.use(logger);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(__dirname));
const API = 'https://randomuser.me/api/';

app.get('/', (req, res) => {
  req.log.info('GET /');
  res.send('Welcome');
});

app.get('/user', async (req, res) => {
  req.log.info('GET /user');
  try {
    const user = await axios.get(API);
    req.log.info('Got a random user');
    res.send(user);
  } catch (err) {
    req.log.error('Axios error:', err);
  }
});

app.get('/users', async (req, res) => {
  req.log.info('GET /users');
  try {
    const user = await axios.get(`${API}?results=10`);
    req.log.info('Got random users');
    res.send(user);
  } catch (err) {
    req.log.error('Axios error:', err);
  }
});

//Catch 404 and forward to error handler
app.use((req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
