import Model from '../model/models.js';
import fs from 'fs';
import path from 'path';

const htController = {};

htController.searchHT = (request, response) => {
console.log(request.body.hashtag);
  const exists = Model.htWall.findAll({
    where: {
      hashtag: request.body.hashtag
    }
  }).then( (res) => {

    if (res.length > 0) {
      return (response.json({redirect: '/' + request.body.hashtag}));
    }
    return (response.json({newHashtag: true}));
  });
};

htController.postNewHT = (req,res) => {

  const hashtag = req.body.hashtag;
  const admin = ['james'];

  const newHashtag = {
    hashtag,
    admin,
  };

  Model.htWall.create(newHashtag).then(() => {
    /* res.redirect('/' + hashtag );*/
  }).catch(function (error) {
    console.log(error);
    req.flash('error', 'Please, choose a different hashtag.');
  });
};

htController.postNewPost = (req, res) => {

  const username = 'james';
  const url = '../../src/' + 'test.jpg';
  const type = 'i';
  const newPost = {
    username,
    url,
    type,
  };

  fs.writeFile(path.join(__dirname, '../../src/test.jpg'), req.files.file[0].buffer, (err) => {
    if (err) {console.log(err);}

    console.log('It\'s saved!');
  });

  Model.UserPost.create(newPost).then(() => {
    /* res.redirect('/' + hashtag );*/
  }).catch(function (error) {
    console.log(error);
    req.flash('error', 'Please, something went wrong with your post.');
  });

  // const hashtag = req.body.hashtag;
  // const admin = ['james'];
  //
  // const newHashtag = {
  //   hashtag,
  //   admin,
  // };
  //
  // Model.htWall.create(newHashtag).then(() => {
  //   /*res.redirect('/' + hashtag );*/
  // }).catch(function (error) {
  //   console.log(error);
  //   req.flash('error', 'Please, choose a different hashtag.');
  // });
};


// htController.idGet = (request, response, next) => {
//   MyMoviesModel.findById(request.params._id).exec()
//   .then((data) => {
//     return response.json(data);
//   })
//   .catch(error => {
//     next(error);
//   });
// };
//
// htController.idDelete = (request, response, next) => {
//   MyMoviesModel.findByIdAndRemove(request.params._id).exec()
//   .then((data) => {
//     return response.json(data);
//   })
//   .catch(error => {
//     next(error);
//   });
// };
//
//
// htController.put = (request, response, next) => {
//   MyMoviesModel.findById(request.params._id)
//     .then(movie => {
//       movie.name = request.body.name || movie.name;
//       movie.occupation = request.body.occupation || movie.occupation;
//       movie.avatar = request.body.avatar || movie.avatar;
//
//       return movie.save();
//     })
//     .then(contact => {
//       return response.json(contact);
//     })
//     .catch(error => {
//       next(error);
//     });
// };
//
// htController.update = (request, response, next) => {
//   MyMoviesModel.findByIdAndUpdate(request.params._id, { $set:
//   {
//     _id: request.body._id,
//     movieTitle: request.body.movieTitle,
//     moviePosterPath: request.body.moviePosterPath,
//   }
//   })
//   .exec()
//   .then((data) => {
//     return response.json(data);
//   })
//   .catch(error => {
//     next(error);
//   });
// };
//


export default htController;
