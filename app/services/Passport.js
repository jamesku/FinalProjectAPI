import passport from 'passport';
import bcrypt from 'bcrypt';
import Model from '../model/models.js';
import {Strategy} from 'passport-local';

const LocalStrategy = Strategy;

module.exports = function (app) {
  app.use(passport.initialize());
  app.use(passport.session());

  const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');

  const signinStrategy = new LocalStrategy(function (username, password, done) {
    Model.User.findOne({
      where: {
        username
      }
    }).then(function (user) {
      if (user === null) {
        return done(null, false, { message: 'Incorrect credentials.' });
      }

      const hashedPassword = bcrypt.hashSync(password, user.salt);

      if (user.password === hashedPassword) {
        return done(null, user);
      }

      return done(null, false, { message: 'Incorrect credentials.' });
    });
  });

  // Setup options for JwtStrategy
  const jwtOptions = {
    // Get the secret from our environment process.env.SECRET
    secretOrKey: 'jhjaeaerjae',
    // Tell our strategy where to find our token in the request
    jwtFromRequest: ExtractJwt.fromHeader('authorization')
  };

  // Create JWT strategy
  // This will take our token and decode it to
  // extract the information we have stored in it
  const authStrategy = new JwtStrategy(jwtOptions, function (payload, done) {
    Model.User.findById(payload.userId, function (err, user) {
      if (err) { return done(err, false); }
      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    });
  });

  // Tell passport to use this strategy
  passport.use('authStrategy', authStrategy);
  passport.use('signinStrategy', signinStrategy);

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    Model.User.findOne({
      where: {
        id
      }
    }).then(function (user) {
      if (user === null) {
        done(new Error('Wrong user id.'));
      }

      done(null, user);
    });
  });
};
