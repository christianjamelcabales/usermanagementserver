// src/routes/usersAPI.js

const express = require('express');
const router = express.Router();
const User = require('../models/usersModel');
const upload = require('../../config/upload')

// Create a new user
router.post('/users', upload.single('file'), async (req, res) => {
  const newUser = new User({
      firstName: req.body.firstname,
      lastName: req.body.lastname,
      email: req.body.email,
      birthDate: req.body.birthdate,
      userName: req.body.username,
      password: req.body.password,
      contactNumber: req.body.contactnumber,
      fileName: req.file ? req.file.filename : 'default.png'
  });

  try {
      await newUser.save();
      res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
      console.error('Error creating user:', err);
      res.status(500).json({ error: 'Failed to create user' });
  }
});
  
  // Retrieve all users
  router.get('/users', async (req, res) => {
    try {
      const data = await User.find({});
      res.json(data);
    } catch (err) {
      console.error('Error retrieving users:', err);
      res.status(500).json({ error: 'Failed to retrieve users' });
    }
  });


//Get by ID Method
router.get('/users/:id', async (req, res) => {
    const id = req.params.id;
  
    try {
      const data = await User.findById(id);
      
      if (!data) {
        res.status(404).json({ error: 'User not found' });
      } else {
        res.json(data);
      }
    } catch (err) {
      console.error('Error retrieving user:', err);
      res.status(500).json({ error: 'Failed to retrieve user' });
    }
  });
  


//Update by ID Method
router.patch('/users/:id', async (req, res) => {
    const id = req.params.id;
    const updateFields = req.body; // Fields to be updated
  
    try {
      const data = await User.findByIdAndUpdate(id, updateFields, { new: true });
  
      if (!data) {
        res.status(404).json({ error: 'User not found' });
      } else {
        res.json(data);
      }
    } catch (err) {
      console.error('Error updating user:', err);
      res.status(500).json({ error: 'Failed to update user' });
    }
  });
  
  

  const fs = require('fs');
const path = require('path');

// Assuming your User model has a fileName property for the image filename

// Delete a user
router.delete('/users/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findOneAndDelete({ _id: id });

    if (!user) {
      res.status(404).json({ error: 'User not found' });
    } else {
      // Delete the associated file
      const filePath = path.join(__dirname, '../../public/uploads', user.fileName);

      // Check if the file exists before attempting to delete it
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log(`Deleted file: ${user.fileName}`);
      }

      res.json({ message: 'User deleted successfully' });
    }
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({ error: 'Failed to delete user' });
  }
});


  module.exports = router;
  
  