const express = require('express');
const router = express.Router();
const parser = require('body-parser').json();
const Post = require('../models/post');

module.exports = router
  .get('', (request, response, next) => {
    Post.find()
    .lean()
    .populate('xxx')
    .then(posts => response.send(posts))
    .catch(error => {
      console.log('ERROR: We had trouble getting the post list', error);
      next(error);
    });
  })

  .get('/:id', (request, response, next) => {
    Post.findById(request.params.id)
    .populate('xxx')
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
    .then(post => return Post.populate())
  })
