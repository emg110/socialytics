// eslint-disable-next-line no-unused-vars
const config = require('../../config');
module.exports = function (options = {}) {
  return async context => {
    let id = context.data.id;
    let account_user = config.username
    var version = context.version || "ig-post"+"-uid-"+id+"-v-"+ Date.now()+'-acc-'+ account_user;
    context.data.version = version;
    return context;
  };
};
