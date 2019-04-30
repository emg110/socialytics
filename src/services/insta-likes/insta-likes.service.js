// Initializes the `instaLikes` service on path `/instagram/likes`
const createService = require('feathers-nedb');
const createModel = require('../../models/insta-likes.model');
const hooks = require('./insta-likes.hooks');
const search = require('../../feathers-nedb-search')
module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    whitelist: [ '$regex','$where' ],
    paginate,
    multi:true
  };

  // Initialize our service with any options it requires
  app.use('/instagram/likes', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('instagram/likes');

  service.hooks(hooks);
  service.hooks({
    before: {
      find: search()
    }
  })
};
