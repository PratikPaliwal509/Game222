const express = require('express');
const router = express.Router();
const User = require('../models/User');
// const dummyUsers = require('../data/dummyUsers');

// Create dummy users
// router.post('/create-dummy', async (req, res) => {
//   try {
//     await User.deleteMany(); // optional: clear existing users
//     const created = await User.insertMany(dummyUsers);
//     res.status(201).json({ message: 'Dummy users created', data: created });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a single user
router.post('/', async (req, res) => {
  try {
    const user = new User(req.body);
    const saved = await user.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
