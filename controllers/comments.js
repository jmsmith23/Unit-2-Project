require('dotenv').config();
const Comment = require('../models/Comment');

// Create a new comment on a post

exports.createComment = async function (req, res) {
  try {
    req.body.user = req.user._id;
    const comment = await Comment.create(req.body);
    await comment.save();
    res.json(comment);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};
