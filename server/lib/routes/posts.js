const express = require('express');
const router = express.Router();
const parser = require('body-parser').json();
const Post = require('../models/post');

module.exports = router
  .get('', (request, response, next) => {
    Post.find()
    .lean()
    // .populate('title date content keyword')
    .then(posts => response.send(posts))
    .catch(error => {
      console.log('ERROR: We had trouble getting the post list', error);
      next(error);
    });
  })

  .get('/:id', (request, response, next) => {
    Post.findById(request.params.id)
    // .populate('title date content keyword')
    .lean()
    .then(post => response.send(post))
    .catch(error => {
      console.log('ERROR: We had trouble getting the post by id', error);
      next(error);
    });
  })

  .post('/:userId', parser, (request, response, next) => {
    request.body.user = request.params.userId;
    new Post(request.body)
    .save()
    .then(post => response.send(post))
    .catch(error => {
      console.log('ERROR: We had trouble posting a new post', error);
      next(error);
    });
  })

  .put('/:id', parser, (request, response, next) => {
    Post.findByIdAndUpdate(request.params.id, request.body, {new:true, runvalidators:true})
    .then(post => response.send(post))
    .catch(error => {
      console.log('ERROR: We had trouble updating the post', error);
      next(error);
    });
  })

  .delete('/:id', (resquest, response, next) => {
    Post.find()
    .remove()
    .then(post => response.send(post))
    .catch(error => {
      console.log('ERROR: We had trouble deleting the post', error);
      next(error);
    });
  });
