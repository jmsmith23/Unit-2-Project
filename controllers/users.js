require('dotenv').config();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const HttpError = require('../errors/http-error');

//User Authentication
exports.auth = async (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  const data = jwt.verify(token, process.env.SECRET);
  const user = await User.findOne({ _id: data._id });
  if (!user) {
    throw new HttpError(400, 'Invalid User Info');
  }
  req.user = user;
  next();
};

//Create A New User
// exports.createUser = async (req, res) => {
//   try {
//     const user = new User(req.body);
//     await user.save();
//     const token = await user.generateAuthToken();
//     res.json({ user, token });
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// Create A New User
exports.signupUser = async (req, res) => {
  if (req.session.token) {
    throw new HttpError(400, 'User is logged in.');
  }

  // Is the email already in use?
  if (await User.findOne({ email: req.body.email })) {
    throw new HttpError(400, 'Email is already in use.');
  }

  // Is the username taken?
  if (await User.findOne({ username: req.body.username })) {
    throw new HttpError(400, 'Username is already in use.');
  }

  const newUser = new User(req.body);

  // Is the password too weak (short)?
  if (newUser.password.length < 8) {
    throw new HttpError(400, 'Password must be at least 8 characters.');
  }
  // Is the username too short?
  if (newUser.username.length < 6) {
    throw new HttpError(400, 'Username must be at least 6 characters.');
  }

  await newUser.save();
  const token = await newUser.generateAuthToken();
  req.session.token = token;
  res.json({ user: newUser });
};

//Login A User
exports.loginUser = async (req, res) => {
  if (req.session.token) {
    throw new HttpError(400, 'User is logged in.');
  }

  const user = await User.findOne({ email: req.body.email });
  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    throw new HttpError(400, 'Invalid Login Info');
  } else {
    const token = await user.generateAuthToken();
    req.session.token = token;
    res.json({ user });
  }
};

//Logout A User
exports.logoutUser = async (req, res) => {
  // try {
  const user = req.user;
  req.user.isLoggedIn = false;
  req.user.save();
  res.json({ user, message: 'You are successfully logged out' });
  // } catch (error) {
  //   response.status(421).json({ message: error.message });
  // }
};

//Update User Info
exports.updateUser = async (req, res) => {
  // try {
  const keys = Object.keys(req.body);
  keys.forEach((key) => (req.user[key] = req.body[key]));
  await req.user.save();
  res.json(req.user);
  // } catch (error) {
  //   res.status(400).json({ message: error.message });
  // }
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
