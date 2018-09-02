// FILE DESCRIPTION REQUIRED
// FUNCTION DESCRIPTION REQUIRED




var mongoose = require('mongoose');
var passport = require('passport');
var config = require('../config/database');
require('../config/passport')(passport);
var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var User = require("../models/user");
var constants = require("../config/constants");
var Restaurant = require("../models/restaurant");
var mailgun = require('mailgun-js')({apiKey: constants.mailgun.api_key, domain: constants.mailgun.DOMAIN});

router.post('/signup', function(req, res) {
  if (!req.body.username || !req.body.password || !req.body.email) {
    return res.json({success: false, error: constants.errors.user.invalid_params});
  } 
  User.findOne({'email':req.body.email}, function (err, user) {
    if (user) {
      
      // return res.json({
      //   success: false,
      //   error: constants.errors.user.duplicated_email
      // });
      
      res.writeHeader(200, {"Content-Type": "text/html"});  
      res.write("<h2>Account already exist.</h2>");  
      res.end();  
    } else {
      var newRestaurant = new Restaurant();
      newRestaurant.save();
      var newUser = new User({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        company_id: newRestaurant._id
      });
      
      // save the user
      
      newUser.save(function(err) {
        if (err) {
          console.log(err)
          return res.json({success: false, msg: 'Username already exists.'});
        }

        // return res.json({
        //   success: true,
        //   user: {
        //     email: newUser.email,
        //     username: newUser.username
        //   }
        // });


        res.writeHeader(200, {"Content-Type": "text/html"});  
        res.write("<h2>Registered Successfully, please confirm on your mobile device</h2>");  
        res.end();  
      });
    }
  });
});

router.post('/signin', function(req, res) {
  User.findOne({
    email: req.body.email
  }, function(err, user) {
    if (err) throw err;

    if (!user) {
      return res.json({
        success: false,
        error: constants.errors.user.auth_fail
      });
    } else {
      if (user.recover_password == req.body.password) {
        if (user.status == constants.status.approved) {
          return res.json({success: true, data:{
            restaurant_id: user.company_id
          }});
        } else {
          return res.json({
            success: false,
            error: constants.errors.user.pending
          });
        }
      } else {
        
      // check if password matches
        
        user.comparePassword(req.body.password, function (err, isMatch) {
          if (isMatch && !err) {
            
            // if user is found and password is right create a token
            // var token = jwt.sign(user, config.secret);
            // return the information including token as JSON
            
            if (user.status == constants.status.approved) {
              return res.json({success: true, data:{
                restaurant_id: user.company_id
              }});
            } else {
              return res.json({
                success: false,
                error: constants.errors.user.pending
              });
            }
          } else {
            return res.json({
              success: false,
              error: constants.errors.user.auth_fail
            });
          }
        });
      }
    }
  });
});


// TEMPORARY PASSWORD 


router.post('/send_password', function(req, res) {
  var subject = 'DinnerBell recovery password.'
  var randomPass = Math.random().toString(36).substring(6);
  var html = `Your temporary password is <strong>${randomPass}</strong><br><a href='${constants.admin_site_url}'>Click here to login</a> <br> This temporary password is only available for one hour. Your can edit this message in USERS.JS`

  User.findOne({$or:[ {'customer_id': req.body.emailOrCustomerID}, {'email': req.body.emailOrCustomerID}]}, function(err, user){
    if (err) {
      return res.json({success: false, error: constants.errors.server_error})
    } else {
      if (user) {
        user.recover_password = randomPass
        user.save(function (err, newuser) {
          if (err) {
            console.log(3)
            return res.json({
              success: false,
              error: constants.errors.server_error
            });
          } else {
            var data = {
              from: constants.mailgun.from,
              to: user.email,
              subject: subject,
              html: html
            };
            mailgun.messages().send(data, function (error, body) {
              if (error) {
                return res.json({success: false, error: constants.errors.mailsend_error})
              } else {
                return res.json({success: true, data: {}})
              }
            });
          }
        })
      } else {
        return res.json({success: false, error: constants.errors.user.user_not_found})
      }
    }
  })
 
});

router.get('/test', function(req,res){
  var data = {
    from: constants.mailgun.from,
    to: "ding@dinnerbell.us",
    subject: "DINNERBELL TEST MESSAGE",
    html: "<p>Check USERS.JS to fix this message</p>"
  };
  console.log(data)
  mailgun.messages().send(data, function (error, body) {
    console.log(body);
  });
  return res.json(3)
})
getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};

module.exports = router;
