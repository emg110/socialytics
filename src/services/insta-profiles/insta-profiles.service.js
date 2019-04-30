// Initializes the `instaProfiles` service on path `/instagram/profiles`
const createService = require('feathers-nedb');
const createModel = require('../../models/insta-profiles.model');
const hooks = require('./insta-profiles.hooks');
const search = require('../../feathers-nedb-search')
module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    id:'id',
    whitelist: [ '$regex','$where' ],
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/instagram/profiles', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('instagram/profiles');

  service.hooks(hooks);
  service.hooks({
    before: {
      find: search()
    }
  })
};
