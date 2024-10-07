const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Add your routes here
const indexController = require('./controllers/indexController');
const authController = require('./controllers/authController');
const projectsRouter = require('./routers/projectsRouter');
const usersRouter = require('./routers/usersRouter');


app.use('/', indexController);
app.use('/projects', projectsRouter);
app.use('/users', usersRouter);
app.use('/auth', authController);
// Error handler
app.use((err, req, res, next) => {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.json({ error: err.message });
});

module.exports = app;
