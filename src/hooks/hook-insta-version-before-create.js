const config = require('../../config');
module.exports = function (options = {}) {
    return async context => {
      if(config.VERSIONING === true){
        //let account_user = config.users[0].username;
        let account_user = context.data.account || '-';
        var version = context.version || context.path+"-v-"+ Date.now()+'-acc-'+ account_user;
        context.data.version = version;
      }
      return context;
    };
};
