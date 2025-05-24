const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// Create a new post
router.post('/posts', async (req, res) => {
  try {
    const { title, content, author } = req.body;
    const newPost = new Post({ title, content, author });
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Add a comment to a post
router.post('/posts/:postId/comments', async (req, res) => {
  try {
    const { user, comment } = req.body;
    const post = await Post.findById(req.params.postId);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    post.comments.push({ user, comment });
    await post.save();
    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Like a post
router.post('/posts/:postId/like', async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    post.likes += 1;
    await post.save();
    res.status(200).json({ likes: post.likes });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
