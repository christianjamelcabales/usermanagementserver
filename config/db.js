require('dotenv').config();
const mongoose = require('mongoose');

const dbUrl = process.env.DB_CONNECTION_STRING; // Replace with your MongoDB connection URL

const connectDB = async () => {
  try {
    await mongoose.connect(dbUrl);

    console.log('Connected to the database');

  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1); // Exit the process with failure
  }
};

module.exports = connectDB;
