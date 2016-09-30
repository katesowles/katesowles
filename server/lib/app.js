const express = require('express');
const app = module.exports = express();
const users = require('./routers/users');
const posts = require('./routers/posts');

app.use(express.static(__dirname + '/public'));

app.use((request, response, next) => {
  const url = '*';
  response.header('Access-Control-Allow-Origin', url);
  response.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE');
  response.header('Access-Controll-Allow-Headers', 'Origin, X-Requsted-With, Content-Tyle, Accept');
  next();
});

// TODO : set up auth, confirmAuth
app.use('/api/', auth);
app.use('/api/users', confirmAuth, users);
app.use('/api/posts', confirmAuth, posts);

app.use((error, request, response) => {
  response.status(error.code || 500)
  .send({error: error.error || error.message || error});
});
