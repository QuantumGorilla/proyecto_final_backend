const express = require('express');

require('dotenv').config();
const ErrorSerializer = require('./src/serializers/BaseSerializer');
const usersRouter = require('./src/routes/users');
const tweetRouter = require('./src/routes/tweet');
const commentRouter = require('./src/routes/comment');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/users', usersRouter);
app.use('/tweets', tweetRouter);
app.use('/comments', commentRouter);

app.use((req, res, next) => {
  res.status(404);
  res.json(new ErrorSerializer('Not found', null).toJSON());
});

app.use((err, req, res, next) => {
  const {
    statusCode = 500,
    message,
  } = err;

  res.status(statusCode);
  res.json(new ErrorSerializer(message, null).toJSON());
});

module.exports = app;
