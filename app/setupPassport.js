import passport from 'passport';
import bcrypt from 'bcrypt';
import Model from './model/models.js';
import {Strategy} from 'passport-local';

const LocalStrategy = Strategy;

module.exports = function (app) {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(new LocalStrategy(
    function (username, password, done) {
      Model.User.findOne({
        where: {
          username
        }
      }).then(function (user) {
        if (user == null) {
          return done(null, false, { message: 'Incorrect credentials.' });
        }

        const hashedPassword = bcrypt.hashSync(password, user.salt);

        if (user.password === hashedPassword) {
          return done(null, user);
        }

        return done(null, false, { message: 'Incorrect credentials.' });
      });
    }
  ));

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    Model.User.findOne({
      where: {
        id
      }
    }).then(function (user) {
      if (user == null) {
        done(new Error('Wrong user id.'));
      }

      done(null, user);
    });
  });
};
