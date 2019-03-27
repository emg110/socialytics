// Initializes the `instaTags` service on path `/instagram/tags`
const createService = require('feathers-nedb');
const createModel = require('../../models/insta-tags.model');
const hooks = require('./insta-tags.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/instagram/tag', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('instagram/tag');

  service.hooks(hooks);
};
