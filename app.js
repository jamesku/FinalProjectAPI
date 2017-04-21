// application

import express from 'express';
import passport from 'passport';

import Passport from './app/services/Passport';
import flash from 'connect-flash';
import session from 'express-session';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';


// const authenticationRoutes = require('./app/routers/AuthenticationRoutes.js')(express);
const appRouter = require('./app/routers/appRouter.js')(express);
const jsonParser = bodyParser.json();
const app = express();
const port = process.env.PORT || 8080;


//app.use(authenticationRoutes);

app.use(cookieParser());
app.use(session({ secret: 'adfsjwf120a!@e021as219fv12121', resave: false, saveUninitialized: false }));

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, JWToken');
  next();
});

app.use('/styles', express.static( __dirname + '/styles'));

app.use(flash());
app.use(function (req, res, next) {
  res.locals.errorMessage = req.flash('error');
  next();
});

app.use(jsonParser);
app.use(bodyParser.urlencoded({
  extended: true
}));

Passport(app);

const authStrategy = passport.authenticate('authStrategy', { session: false });

app.get('/api/secret', authStrategy, function (req, res) {
  console.log(`The current user is ${req.user.username}`);
  res.send(`The current user is ${req.user.username}`);
});

app.use('/', appRouter);

// start app
app.listen(port);
console.log('Server started on port ' + port);

module.exports.getApp = app;
