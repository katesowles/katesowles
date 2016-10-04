const express = require('express');
const app = module.exports = express();
const users = require('./routes/users');
const posts = require('./routes/posts');
const auth = require('./routes/auth');
// const errors = require('./errHandle');
const cors = require('./cors')('*');
// const confirmAuth = require('./auth/confirmAuth');

app.use(express.static(__dirname + '/public'));
app.use(cors);

app.use('/api/auth', auth);
app.use('/api/users', users);
app.use('/api/posts', posts);
// app.use('/api/users', confirmAuth, users);
// app.use('/api/posts', confirmAuth, posts);

// app.use(errors);
