const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  birthDate: Date,
  contactNumber:String,
  userName: String,
  password: String,
  fileName: String,
  dateCreated: {
    type: Date,
    default: Date.now
  }
});

// Create and export the User model for the existing "users" collection
module.exports = mongoose.model('User', userSchema, 'users');
