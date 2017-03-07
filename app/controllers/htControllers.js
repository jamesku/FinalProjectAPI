import Model from '../model/models.js';

const htController = {};

// htController.get = (request, response) => {
//   MyMoviesModel.find({}).exec()
//   .then((data) => {
//     return response.json(data);
//   })
//   .catch(error => {
//     console.log('there is an error: ' + error);
//   });
// };

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
console.log(req);
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
