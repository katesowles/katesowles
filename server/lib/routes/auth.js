const express = require('express');
const router = express.Router();
const parser = require('body-parser').json();

const confirmAuth = require('../auth/confirmAuth');
const token = require('../auth/token');
const User = require('../models/user');

module.exports = router
  .get('/verify', confirmAuth, (request, response) => {
    response.status(200).send({success:true, role:request.user.role});
  })

  .post('/signup', parser, (request, response, next) => {
    const {name, email, password} = request.body;
    delete request.body.password;

    if (!email || !password || !name) {
      return response.status(400).json({message: 'All fields are required, please fill out each field and try again.'});
    }

    // else
    User.findOne({email})
      .then(existing => {
        if (existing) return response.status(500).json({message:'That email is already in use, please sign in with that email or select another and complete signup.'});

        const user = new User(request.body);
        user.generateHash(password);
        return user.save()
          .then(user => {
            return token.sign(user);
          })
          .then(token => {
            response.json({token});
          });
      })
      .catch(error => {
        console.log('ERROR: We ahd trouble signing you up', error);
        next(error);
      });
  })

  .post('/signin', parser, (request, response, next) => {
    const {email, password} = request.body;
    delete request.body;

    User.findOne({email})
      .then(user => {
        if (!user || !user.compareHash(password)) return response.status(400).json({message:'Invalid email or password. Please retry your login or create a new account.'});
        return token.sign(user)
          .then(token => {
            response.json({token});
          });
      })
      .catch(error => {
        console.log('ERROR: We had trouble logging you in', error);
        next(error);
      });
  });
