const config = require('../../config');
module.exports = function (options = {}) {
    return async context => {
      if(config.versioning === true){
        let account_user = config.userid;
        var version = context.version || context.path+"-v-"+ Date.now()+'-acc-'+ account_user;
        context.data.version = version;
      }
      return context;
    };
};
