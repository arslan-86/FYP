require('dotenv').config();
const mongoose = require('mongoose');
const mongoString = process.env.MongoUri;


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
   } catch (error) {
      console.log(error);
   }
}

module.exports = connect;