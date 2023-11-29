const express = require('express');
const morgan = require('morgan');
const userRoutes = require('./routes/users');
const postRoutes = require('./routes/posts');
const HttpError = require('./errors/http-error');
const session = require('express-session');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();

app.use(cors({ origin: ['http://localhost:5173'], credentials: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: true,
  })
);
app.use(express.json());
app.use(morgan('combined'));
app.use('/users', userRoutes);
app.use('/posts', postRoutes);

// NOTE: 4 parameters are required for express error handler
app.use((error, req, res, next) => {
  if (error instanceof HttpError) {
    res.status(error.status).json({ message: error.message });
    return;
  }

  console.error(error);
  res.status(500).json({ message: 'Something went wrong. Please try again.' });
});

module.exports = app;
