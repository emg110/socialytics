// Initializes the `instaPosts` service on path `/instagram/posts`
const createService = require('feathers-nedb');
const createModel = require('../../models/insta-postsb.model');
const hooks = require('./insta-postsb.hooks');
//const search = require('../../feathers-nedb-regex-search')
const search = require('../../feathers-nedb-search')
const aggr = require('../../feathers-nedb-aggr')
const cube = require('../../feathers-nedb-cube')
module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    whitelist: [ '$regex','$where' ],
    paginate,
    multi:true,
  };

  // Initialize our service with any options it requires
  app.use('/instagram/postsb', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('instagram/postsb');

  service.hooks(hooks);
  service.hooks({
    before: {
      find: search()
    },
    after: {
      find: aggr()
    }
  })
};
