import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

import * as rTracer from 'cls-rtracer';
import { getHttpLogger } from './middlewares/winston.js';

import indexRouter from './routes/index.js';
import usersRouter from './routes/users.mjs';

let app = express();

// view engine setup
const dirname = path.resolve();
app.set('views', path.join(dirname, 'views'));
app.set('view engine', 'pug');

// create request uuid for issue tracking - 1 uuid for 1 request
app.use(rTracer.expressMiddleware());

//set logger
/**
 * TODOS: log test위해 dev일 때 log 찍도록 수정해둠. 완료 후 변경할 것
 */
if (process.env.NODE_ENV !== 'production') { 
  app.use(morgan('combined', {
    stream: getHttpLogger().stream
  })); // production enveronment
} else {
  app.use(morgan('dev')); // development enveronmet
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
