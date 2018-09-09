const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const axios = require('axios');

module.exports = {
  register: function(req,res) {
    User.create({
      name: req.body.name,
      password: req.body.password,
      email: req.body.email,
      isRegisterViaFB: false
    })
      .then(user => {
        res.status(200).json({
          message: `registration success!`,
          data: user
        })
      })
      .catch(err => {
        res.status(500).json({
          error: err.message
        })
      })
  },
  login: function(req,res) {
    User.find({ email: req.body.email }, function (err, user) {
      if (!err) {
        if (user.length !== 0) {
          if (user[0].isRegisterViaFB) {
            res.status(200).json({
              status: 'please log in via Facebook'
            })
          } else {
            if (bcrypt.compareSync(req.body.password, user[0].password)) {
              jwt.sign({id: user[0]._id, name: user[0].name, email:user[0].email}, process.env.JWT_KEY, function(err, token) {
                if (!err) {
                  res.status(200).json({
                    user: user[0].name,
                    token: token
                  })
                } else {
                  res.status(500).json({
                    message: 'jwt.sign error'
                  })
                }
              });
            } else {
              res.status(500).json({
                message: 'wrong password!'
              })
            }
          }
        } else {
          res.status(500).json({
            message: 'you have not registered!'
          })
        }
      } else {
        res.status(500).json({
          message: err
        })
      }
    });
  },
  loginfb: function(req,res) {
    axios({
      method:'get',
      url:`https://graph.facebook.com/me?fields=id,name,email&access_token=${req.headers.token_fb}`,
    })
      .then(function(response) {
        User.find({email: response.data.email}, function(err, userData) {
          if (!err) {
            if(userData.length === 0) {
              User.create({
                name: response.data.name,
                password: 'default',
                email: response.data.email,
                isRegisterViaFB: true
              })
                .then(user => {
                  jwt.sign({id: user[0]._id, name: user.name, email: user.email}, process.env.JWT_KEY, (err, token) => {
                    res.status(200).json({
                      user: user.name,
                      token: token
                    })
                  })                  
                })
                .catch(err => {
                  res.status(500).json({
                    message: err
                  })
                })
            } else {
              jwt.sign({id: userData[0]._id, name: userData[0].name, email: userData[0].email}, process.env.JWT_KEY, (err, token) => {
                res.status(200).json({
                  user: userData[0].name,
                  token: token
                })
              })
            }
          } else {
            res.status(500).json({
              message: err
            });
          }
        })
      })
      .catch(err => {
        res.status(500).json({
          message: err
        })
      })
  }
}