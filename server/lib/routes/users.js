const express = require('express');
const router = express.Router();
const parser = require('body-parser').json();
const User = require('../models/user');

module.exports = router
  .get('', (request, response, next) => {
    User.find()
    .lean()
    .select('-password')
    .then(data => response.send(data))
    .catch(error => {
      console.log('ERROR: We had trouble getting the user list', error);
      next(error);
    });
  })

  .get('/:id', (request, response, next) => {
    User.findById(request.params.id)
    .lean()
    .select('-password')
    .then(data => response.send(data))
    .catch(error => {
      console.log('ERROR: We had trouble getting the user by id', error);
      next(error);
    });
  })

  .post('', parser, (request, response, next) => {
    const newUser = new User(request.body);
    newUser.generateHash(request.body.password);
    newUser.save()
    .then(user => response.send(user))
    .catch(error => {
      console.log('ERROR: We had trouble posting a new user', error);
      next(error);
    });
  })

  .put('/:id', parser, (request, response, next) => {
    User.findByIdAndUpdate(request.params.id, request.body, {new:true})
    .lean()
    .select('-password')
    .then(user => response.send(user))
    .catch(error => {
      console.log('ERROR: We had trouble updating the user by id', error);
      next(error);
    });
  })

  .delete('/:id', (request, response, next) => {
    User.findByIdAndRemove(request.params.id)
    .lean()
    .then(data => {
      if (!data) return Promise.reject(data);
      response.send(data);
    })
    .catch(error => {
      console.log('ERROR: We had trouble deleting the user by id', error);
      next(error);
    });
  });
