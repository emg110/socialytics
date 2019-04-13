// Initializes the `instaPosts` service on path `/instagram/posts`
const createService = require('feathers-nedb');
const createModel = require('../../models/insta-posts.model');
const hooks = require('./insta-posts.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    id:'id',
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/instagram/posts', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('instagram/posts');

  service.hooks(hooks);
};
