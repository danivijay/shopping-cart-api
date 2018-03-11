const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/user')

const jwtKey = process.env.JWT_KEY || 'secret'

exports.user_signup = (req, res, next) => {
  User.find({email: req.body.email})
    .exec()
    .then(user => {
      if(user.length >=1) {
        res.status(409).json({
          message: 'Mail already exists'
        })
      } else {
        bcrypt.hash(req.body.password, 10, function(err, hash) {
          if (err) {
            return res.status(500).json({
              error: err
            })
          } else {
            const user = new User({
              email: req.body.email,
              password: hash
            })
            user.save()
              .then(result => {
                console.log(result)
                res.status(200).json({
                  message: 'User created'
                })
              })
              .catch(err => {
                res.status(500).json({
                  error: err
                })
              })
          }
        })
      }
    })
    .catch(err => {
      res.status(500).json({
        error: err
      })
    })
}

exports.user_login = (req, res, next) => {
  User.find({email: req.body.email})
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(404).json({
          message: 'Auth failed'
        })
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
          if (result) {
            const token = jwt.sign({
                email: user[0].email,
                userid: user[0]._id,
              }, 
              jwtKey,
              {
                expiresIn: "1h"
              })
            return res.status(200).json({
              message: 'Auth success',
              token: token
            })
          } else {
            return res.status(404).json({
              message: 'Auth failed'
            })
          }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      })
    })
}

exports.user_delete = (req, res, next) => {
  User.remove({_id: req.params.userId})
  .exec()
  .then(result => {
      res.status(200).json({
        message: 'User deleted'
      })
    })
    .catch(err => {
      res.status(500).json({
        error: err
      })
    })
}
