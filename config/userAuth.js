// const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = require('../models/User.js');

module.exports = function (passport) {
   passport.use( 'local',
      new LocalStrategy(
         {
            usernameField: 'email'
         },
         (email, password, done) => {
            User.findOne({ email: email })
               .then(user => {
                  if (!user) {
                     done(null, false, { message: 'Invalid Email or Password' });
                  }

                  bcrypt.compare(password, user.password, (err, isMatch) => {
                     if (err) throw err;
                     if (isMatch) {
                        done(null, user)
                     }
                     else {
                        done(null, false, { message: "Inavalid Password" })
                     }
                  });
               })
               .catch(error => console.log(error))


         }
      )
   );




   passport.serializeUser(function (user, done) {
      done(null, user.id);
   })

   passport.deserializeUser(function (id, done) {
      User.findById(id, function (err, user) {
         done(err, user)
      })
   })

}



