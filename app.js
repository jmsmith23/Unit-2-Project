const express = require('express');
const morgan = require('morgan');
const userRoutes = require('./routes/users');
const postRoutes = require('./routes/posts');
const HttpError = require('./errors/http-error');
const app = express();

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
