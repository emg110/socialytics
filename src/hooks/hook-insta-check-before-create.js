// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
const config = require('../../config');
module.exports = function (options = {}) {
  return async context => {
    //let id = context.data.id;
    //let profile_user = context.data.username;
    //let account_user = config.username
    //var version = context.version || "ig-profile"+"-id-"+id+"-un-"+profile_user+"-v-"+ Date.now()+'-acc-'+ account_user;
    //context.data.version = version;
    //console.log(context.data);
    var id = context.data.id;
   /* if(!config.VERSIONING_DATA && !!config.UPSERT_DATA){
      context.app.service(context.path).find({ id:id , limit:1}).then(page => {
        if (page.total === 0) {
          console.info(`No existing record found in service: ${context.path} with key: 'id:${id}'`)
          return context
        } else {
          console.info(`Existing record found in service: ${context.path} with key: '${context.path}:${id}, updating...'`)
          context.app.service(context.path).update(page.data[0]._id, context.data)
          context.result = page.data[0];
          return Promise.resolve(context)
        }

      })
    }*/
    if (!!config.VERSIONING_DATA) {
      if (context.data['_id']) {
        delete context.data['_id']
      }
      return context
    }
    else {
      if (context.data.id) {
        context.data['_id'] = context.data.id
      }
      return context
    }
  };
};
