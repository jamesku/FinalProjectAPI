// application

import express from 'express';


import setupPassport from './app/setupPassport';
import flash from 'connect-flash';
import session from 'express-session';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

const appRouter = require('./app/routers/appRouter.js')(express);
const jsonParser = bodyParser.json();
const app = express();
const setupHandlebars = require('./app/setupHandlebars.js')(app);
const port = process.env.PORT || 8080;

app.use(cookieParser());
app.use(session({ secret: '4564f6s4fdsfdfd', resave: false, saveUninitialized: false }));

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use('/styles', express.static(__dirname + '/styles'));

app.use(flash());
app.use(function (req, res, next) {
  res.locals.errorMessage = req.flash('error');
  next();
});

app.use(jsonParser);
app.use(bodyParser.urlencoded({
  extended: true
}));

setupPassport(app);

app.use('/', appRouter);

// start app
app.listen(port);
console.log('Server started on port ' + port);

module.exports.getApp = app;
