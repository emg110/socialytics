const config = require('../../config');
module.exports = function (options = {}) {
  return async context => {
    var id = context.data.id;
    if (config.versioning=== false) {
      if (context.data['_id']) {
        delete context.data['_id'];
      }
      if (context.data.id) {
        context.data['_id'] = id;
      }
    }
    return context

  };
};
