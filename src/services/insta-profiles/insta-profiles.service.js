// Initializes the `insta-profiles` service on path `/instagram/profiles`
const createService = require('feathers-nedb');
const createModel = require('../../models/insta-profiles.model');
const hooks = require('./insta-profiles.hooks');
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
  app.use('/instagram/profiles', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('instagram/profiles');
  service.hooks({
    before: {
      find: search()
    }
  })
  service.hooks(hooks);

};
