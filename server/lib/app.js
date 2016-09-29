const express = require('express');
const app = express();
const cors = require('./cors')('*');

module.exports = app
  .use(express.static(__dirname + '../public'))
  .use(cors);
