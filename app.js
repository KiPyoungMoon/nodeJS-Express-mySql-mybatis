import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { createWriteStream } from 'fs';

import indexRouter from './routes/index.js';
import usersRouter from './routes/users.mjs';

let app = express();

// view engine setup
const dirname = path.resolve();
app.set('views', path.join(dirname, 'views'));
app.set('view engine', 'pug');

// access log to txt
app.use(logger('combined', {
  stream: createWriteStream('./log/access.log', { flags: 'a' })
}));

//set logger 
if (process.env.NODE_ENV === 'production') { 
  app.use(logger('combined')); // production enveronment
} else {
  app.use(logger('dev')); // development enveronmet
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
  // next();
});

export default app;
