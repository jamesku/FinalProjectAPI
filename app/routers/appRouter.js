import passport from 'passport';
import signupController from '../controllers/signupController.js';
import htControllers from '../controllers/htControllers.js';
import multer from 'multer';

const upload = multer();

module.exports = function (express) {
  const router = express.Router();

  const isAuthenticated = function (req, res, next) {
    console.log(req);

    if (passport.authenticate('authStrategy', {session: false})) {
    console.log('isAuthenticated');
      return next();
    }
    req.return('User is not authorized!');
  };


// ###################################
// # routes for the Hashtag controllers
  router.post('/hashtags', htControllers.searchHT);

  router.post('/signup', signupController.signup);

  router.post('/login', signupController.login);

  router.get('/', function (req, res) {
    res.render('home');
  });

  router.get('/dashboard', isAuthenticated, function (req, res) {
    console.log(' got to dashboard ok');
  });

  router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
  });

  router.post('/newhashtag', htControllers.postNewHT);



  const cpUpload = upload.fields([{ name: 'file', maxCount: 50 }, { name: 'hashtag', maxCount: 1 }]);
  router.post('/newpost', isAuthenticated, cpUpload, htControllers.postNewPost);

  return router;
};
