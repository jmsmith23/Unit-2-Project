const express = require('express');
const morgan = require('morgan');
const userRoutes = require('./routes/users');
const postRoutes = require('./routes/posts');
const commentRoutes = require('./routes/comments');
const app = express();

app.use(express.json());
app.use(morgan('combined'));
app.use('/users', userRoutes);
app.use('/posts', postRoutes);
app.use('/comments', commentRoutes);

module.exports = app;
