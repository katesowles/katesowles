const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const user = new Schema({
  name: {
    type: String
    // required: true
  },
  email: {
    type: String
    // required: true
  },
  password: {
    type: String
    // required: true
  },
  role: {
    type: String,
    default: 'user'
  }
});

user.methods.generateHash = function(password){
  return this.password = bcrypt.hashSync(password, 8);
};

user.methods.compareHash = function(password){
  return bcrypt.compareSync(password, this.password);
};


module.exports = mongoose.model('User', user);
