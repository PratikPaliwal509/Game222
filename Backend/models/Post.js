const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  user: String,
  comment: String,
  date: { type: Date, default: Date.now }
});

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: String,
  author: String,
  likes: { type: Number, default: 0 },
  comments: [commentSchema],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Post', postSchema);
