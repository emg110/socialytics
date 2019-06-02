// Initializes the `instaFeed` service on path `/instagram/feed`
const createService = require('feathers-nedb');
const createModel = require('../../models/insta-search.model');
const hooks = require('./insta-search.hooks');
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
  app.use('/instagram/search', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('instagram/search');

  service.hooks(hooks);
  service.hooks({
    before: {
      find: search()
    }
  })
};
