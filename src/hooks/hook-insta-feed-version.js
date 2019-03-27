// eslint-disable-next-line no-unused-vars
const config = require('../../config');
module.exports = function (options = {}) {
  return async context => {
    let account_user = config.username
    var version = context.version || "ig-feed"+"-v-"+ Date.now()+'-acc-'+ account_user;
    context.data.version = version;
    return context;
  };
};
