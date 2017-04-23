import bcrypt from 'bcrypt';
import Model from '../model/models.js';
import jwt from 'jwt-then';
import models from '../model/models.js';
import fs from 'fs';


const signupController = {};
const cert = 'TEMP CERT';

signupController.signup = (req, res, next) => {
  // Grab the username and password from our request body

    console.log(req.body);
  const { FirstName, LastName, Password, Email } = req.body;

  // If no username or password was supplied return an error
  if (!FirstName || !Password || !Email || !LastName) {
    return res
      .json({ error: 'You must provide all the info!' });
  }

  Model.User.findOne({ where: { email: Email } })
      .then((existingUser) => {
        // If the user exist return an error on sign up
        if (existingUser) {
          return res.json({ error: 'Username is in use' });
        }

        const timestamp = new Date().getTime();

        const tokenObj = {};

        console.log(tokenObj);
        jwt.sign(Email, cert).then((token) => {
          generateNewUser(token);
        }
        );
      });

function generateNewUser(token) {
        bcrypt.genSalt(10, (err, salt) => {
          if (err) {return res.json({error: 'Salt failed.'});}
          bcrypt.hash(Password, salt, (erro, hash) => {
            if (erro) {return res.json({error: 'Hash failed.'});}
            const newUser = { firstName: FirstName, lastName: LastName, email: Email, password: hash, jwt: token };
            console.log(newUser);
            console.log('things are ok');

            Model.User.create(newUser).then((user) => {
              res.json({token, userId: user.dataValues.id});

            }).catch(function (error) {
              console.log(error);
            });
          });
        });
    };
};

signupController.login = (req, res, next) => {

console.log('singupcontroler');

  Model.User.findOne({ where: { email: req.body.creds.email } })
    .then((user) => {
      console.log(user);
      // If the user exist return an error on sign up
      if (!user) {
        return res.json({ error: 'Email doesn\'t match a known account!' });
      }

      return (bcrypt.compare(req.body.creds.password, user.password, function (err, bool) {
        console.log(bool);
        if (bool) {
          jwt.sign(req.body.creds.email, cert).then((token) => {
            console.log("succes");
            return (res.json({
              user,
              token
            }));
          });
        } else {
          return res.json({error: 'Password doesn\'t match our files'});
        }
      }));

    });



  // User
  // .findOne({username: req.body.username})
  // .exec(function(err, user) {
  //       if (err) throw err;
  //       if (!user) {
  //           return res.status(404).json({
  //              error: true,
  //              message: 'Username or Password is Wrong'
  //            });
  //          }
  //     bcrypt.compare(req.body.password, user.password,
  //       function(err, valid) {
  //         if (!valid) {
  //          return res.status(404).json({
  //                  error: true,
  //                  message: 'Username or Password is Wrong'
  //            });
  //         }
  //
  //       var token = utils.generateToken(user);
  //       user = utils.getCleanUser(user);
  //       res.json({
  //          user: user,
  //          token: token
  //        });
  //      });
  //  });
};

export default signupController;

//
//
//
//
//
//
//
// module.exports.show = function (req, res) {
//   res.render('signup');
// };
//
// module.exports.signup = function (req, res) {
//   const username = req.body.username;
//   const password = req.body.password;
//   const password2 = req.body.password2;
//
//   if (!username || !password || !password2) {
//     req.flash('error', 'Please, fill in all the fields.');
//     res.redirect('signup');
//   }
//
//   if (password !== password2) {
//     req.flash('error', 'Please, enter the same password twice.');
//     res.redirect('signup');
//   }
//
//   const salt = bcrypt.genSaltSync(10);
//   const hashedPassword = bcrypt.hashSync(password, salt);
//
//   const newUser = {
//     username,
//     salt,
//     password: hashedPassword
//   };
//
//   Model.User.create(newUser).then(() => {
//     res.redirect('/');
//   }).catch(function (error) {
//     req.flash('error', 'Please, choose a different username.');
//     res.redirect('/signup');
//   });
// };
//
//
// router.post('/api/signup', function (req, res, next) {
//   // Grab the username and password from our request body
//   const { username, password } = req.body;
//
//   // If no username or password was supplied return an error
//   if (!username || !password) {
//     return res.status(422)
//       .json({ error: 'You must provide an username and password' });
//   }
//
//   // Look for a user with the current user name
//   User.findOne({ username }).exec()
//     .then((existingUser) => {
//       // If the user exist return an error on sign up
//       if (existingUser) {
//         return res.status(422).json({ error: 'Username is in use' });
//       }
//
//       // If the user does not exist create the user
//       // User bcrypt to has their password, remember, we never save plain text passwords!
//       bcrypt.hash(password, 10, function (err, hashedPassword) {
//         if (err) {
//           return next(err);
//         }
//
//         // Create a new user with the supplied username, and the hashed password
//         const user = new User({ username, password: hashedPassword });
//
//         // Save and return the user
//         user.save()
//           .then( user => res.json(user));
//       });
//     })
//     .catch(err => next(err));
// });
//
