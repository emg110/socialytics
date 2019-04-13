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
    if (config.VERSIONING_DATA=== false) {
      if (context.data['_id']) {
        delete context.data['_id'];
      }
      if (context.data.id) {
        context.data['_id'] = id;
      }
    }
    return context
    /*if(!config.VERSIONING_DATA && !!config.UPSERT_DATA){
      var check = await context.app.service(context.path).get(id).then(page => {
        if (!page.id) {
          console.info(`Record checked: No existing record found in service: ${context.path} with key: 'id:${id}'`)
          return false
        } else {
          console.info(`Record checked: Existing record found in service: ${context.path} with key: '${context.path}:${id}, updating...'`)
          context.app.service(context.path).update(page.data[0]._id, context.data)
          context.result = page.data[0];
          return true
          //return Promise.resolve(context)
        }

      })
      if(!!check){
        return context
      }else{
        return Promise.reject(new Error(`Item with id:  ${page.data[0]._id} already exists in db`))
      }

    }else{
      return context
    }*/


  };
};
