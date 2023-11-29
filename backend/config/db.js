/* This code is defining a function called `connectDB` that connects to a MongoDB database using the
Mongoose library. */
const mongoose = require('mongoose')
require('dotenv').config()
const connectDB = async () => {
  await mongoose.connect(process.env.MONGODB_URI, {
    // useNewurlparser: true,
    // useUnifiedTopology: true
  })
    .then(() => {
      console.log('MongoDB Connected')
    }).catch((error) => {
      console.error('Errueur de connexion à MongoDB:', error)
    })
}

module.exports = connectDB
