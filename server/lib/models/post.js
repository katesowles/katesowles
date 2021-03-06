const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const post = new Schema({
  title: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  keywords: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Post', post);
