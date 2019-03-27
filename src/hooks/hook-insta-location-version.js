// eslint-disable-next-line no-unused-vars
const config = require('../../config');
module.exports = function (options = {}) {
  return async context => {
    let id = context.data.id;
    let account_user = config.username
    let location = config.activelocation
    var version = context.version || "ig-loc-"+location+"-id-"+id+"-v-"+ Date.now()+'-acc-'+ account_user;
    context.data.version = version;
    return context;
  };
};
