import User from '../model/User';
import bcrypt from 'bcrypt';
import passport from 'passport';
import signupController from '../controllers/signupController';
import jwt from 'jwt-simple';
require('../services/Passport');

module.exports = function (express) {
  const router = express.Router();

  const signinStrategy = passport.authenticate('signinStrategy', { session: false });


  router.post('/api/signup', signupController.signup );
  router.post('/api/signin', signinStrategy, signupController.signin );

  return router;
};
