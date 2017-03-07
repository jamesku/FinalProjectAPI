import passport from 'passport';
import signupController from '../controllers/signupController.js';
import htControllers from '../controllers/htControllers.js';

module.exports = function (express) {
  const router = express.Router();


  const isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash('error', 'You have to be logged in to access the page.');
    res.redirect('/');
  };

  router.get('/signup', signupController.show);
  router.post('/signup', signupController.signup);

  router.post('/login', passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/',
    failureFlash: true
  }));

  router.get('/', function (req, res) {
    res.render('home');
  });

  router.get('/dashboard', isAuthenticated, function (req, res) {
    res.render('dashboard');
  });

  router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
  });

  router.post('/newhashtag', htControllers.postNewHT);
  router.post('/newpost', htControllers.postNewPost);

  return router;
};
