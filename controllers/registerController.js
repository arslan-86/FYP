const User = require('../models/User');
const bcrypt = require('bcryptjs');

const getRegister = (req, res) => {
   res.render('register');
}

const postRegister = async (req, res) => {

   const { firstName, lastName, email, password, password2 } = req.body;
   let isTeacher = req.body.isTeacher;
   let errors = [];
   if (isTeacher == 'true') {
      isTeacher = true;
   } else {
      isTeacher = false;
   }
   //Validation

   if (password.length < 6) {
      errors.push({ msg: "Password should be atleast 6 character long" });
      return res.render('register', {
         errors,
         firstName,
         lastName,
         email,
         password,
         password2
      });
   }
   else if (password != password2) {
      errors.push({ msg: 'Passwords Do Not Match' });
      return res.render('register', {
         errors,
         firstName,
         lastName,
         email,
         password,
         password2
      })
   }
   else {

      try {
         let user = await User.findOne({ email: email })
         if (user) {
            errors.push({ msg: 'Email already exist' })
            return res.render('register', {
               errors,
               firstName,
               lastName,
               email,
               password,
               password2
            })
         }

         const hash = await bcrypt.hash(req.body.password, 10);

         const newUser = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hash,
            isTeacher: isTeacher
         })

         await newUser.save();
         if (isTeacher) {
            console.log("Teacher saved");
         }
         else {
            console.log("student Saved");
         }


         req.flash('success_msg', 'You are now registered and can log in')
         res.redirect('/login')
      }
      catch (error) {
         console.log(error);
      }

   }


}

module.exports = { getRegister, postRegister};