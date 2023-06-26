require('dotenv').config();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//User Authentication
exports.auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const data = jwt.verify(token, process.env.SECRET);
    const user = await User.findOne({ _id: data._id });
    if (!user) {
      throw new Error('Invalid User Info');
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

//Create A New User
exports.createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    const token = await user.generateAuthToken();
    res.json({ user, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//Login A User
exports.loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
      throw new Error('Invalid Login Info');
    } else {
      const token = await user.generateAuthToken();
      res.json({ user, token });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//Update User Info
exports.updateUser = async (req, res) => {
  try {
    const keys = Object.keys(req.body);
    keys.forEach((key) => (req.user[key] = req.body[key]));
    await req.user.save();
    res.json(req.user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//Delete User
exports.deleteUser = async (req, res) => {
  try {
    await req.user.deleteOne();
    res.sendStatus(204);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
