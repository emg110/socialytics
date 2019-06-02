// Initializes the `instaFollowing` service on path `/instagram/following`
const createService = require('feathers-nedb');
const createModel = require('../../models/insta-following.model');
const hooks = require('./insta-following.hooks');
const search = require('../../hooks/hook-feathers-nedb-search')
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
  app.use('/instagram/following', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('instagram/following');

  service.hooks(hooks);
  service.hooks({
    before: {
      find: search()
    }
  })
};
