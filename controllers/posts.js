const Post = require('../models/Post');
const User = require('../models/User');
const Comment = require('../models/Comment');

//Create New Post
exports.createPost = async function (req, res) {
  try {
    req.body.user = req.user._id;
    const post = await Post.create(req.body);
    req.user.post
      ? req.user.post.addToSet({ _id: post._id })
      : (req.user.post = [{ _id: post._id }]);
    await req.user.save();
    res.json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//Show A Specific Post
exports.showPost = async function (req, res) {
  try {
    const post = await Post.findOne({ _id: req.params.id }).populate(
      'comments'
    );

    res.json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//Update A Post
exports.updatePost = async function (req, res) {
  try {
    const post = await Post.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
    });
    res.json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//Delete A Post
exports.deletePost = async function (req, res) {
  try {
    const post = await Post.findOneAndDelete({ _id: req.params.id });
    res.sendStatus(204);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//Show All Posts
exports.showAllPosts = async (req, res) => {
  try {
    const showAllPosts = await Post.find({});
    res.json(showAllPosts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//Like A Post

exports.likePost = async (req, res) => {
  try {
    const updatedPost = await Post.findOneAndUpdate(
      { _id: req.params.post_id },
      { $addToSet: { likeUserIds: req.user._id } },
      { new: true }
    );
    res.send(updatedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Create A Comment

exports.commentOnPost = async function (req, res) {
  try {
    req.body.commenter = req.user._id;
    const comment = await Comment.create(req.body);
    await comment.save();
    await Post.findByIdAndUpdate(req.params.post_id, {
      $addToSet: { comments: comment.id },
    });
    res.json(comment);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};
