require('dotenv').config();
const express = require('express');
const { join } = require('path');
const session = require('express-session');
const mongoose = require('mongoose');

const mongoString = process.env.MongoUri;
const flash = require('connect-flash');
const passport = require('passport');
const dbConnect = require('./config/db.js');
const MongoStore = require('connect-mongo');
require('./config/userAuth.js')(passport);


const app = express();
const port = process.env.PORT || 5000;

// EJS as view engine
// app.use(expressLayouts);
app.set('view engine', 'ejs');

// dbConnect();

const sessionStore =MongoStore.create({ mongoUrl: 'mongodb://127.0.0.1:27017/smart_quiz', collection: 'sessions' })
app.use(
   session({
      secret: "heoo sfj",
      resave: false,
      saveUninitialized: false,
      store: sessionStore,
      cookie:{
         maxAge: 24 * 60 * 60 * 1000
      }
   })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Serving Static Files
app.use(express.static(join(__dirname, 'public')));
app.use('/s', express.static(join(__dirname, 'public')));
app.use('/result', express.static(join(__dirname, 'public')));
app.use('/s/exam', express.static(join(__dirname, 'public')));
app.use('/t', express.static(join(__dirname, 'public')));

//Global Variables
app.use((req, res, next) =>{
   res.locals.success_msg = req.flash('success_msg');
   res.locals.error_msg = req.flash('error_msg');
   res.locals.error = req.flash('error'); 
   next();
})


// Routes
app.use('/', require('./routes/index.js'));





async function connect() {
   try {
      const options = {
         // newUrlParser: true,
         useUnifiedTopology: true,
         dbName: 'smart_quiz'
      }
      mongoose.set('strictQuery', false);
      await mongoose.connect(mongoString, options)
      
      console.log("Database Connection Established.");
      app.listen(port, console.log(`Server listening on http://localhost:${port}`))
   } catch (error) {
      console.log(error);
   }
}


