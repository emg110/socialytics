//const InstagramAuth = require('../../backend-social/api/instagram/instagram-auth');
const Instagram = require('../../backend-social/api/instagram/instagram');
const config = require('../../config')
const instagram = new Instagram();
async function getUser(uoi){
  const userData = await instagram.getUserDataByUsername(uoi).then(t => {
    return t;
  }).catch(e =>
  {
    console.log(e);
  })
  var userId = instagram.getUserIdByUserName(userData);
  config.userid = userId;
  return userId
}

module.exports =  function (options = {}) {
  return async function mwInstaAuth(req, res, next) {
    let expr = req.originalUrl;
    switch (expr) {
      case '/authenticate':
        if(req.body.username){
          config.username =req.body.username;
          var uoi = config.username;
          /*//let username = req.body.username;
          //let password = req.body.password;
          req.params.user = await instagram.getCsrfToken().then((csrf) =>
          {
            instagram.csrfToken = csrf;
            return csrf;
          }).catch(console.error);
          req.params.user = await InstagramAuth.login(username, password).then((output)=>{
            return output
          });*/

          const csrf = await instagram.getCsrfToken().then((csrf) =>
          {
            instagram.csrfToken = csrf;
            return csrf;
          }).catch(console.error);
          if(!(instagram.sessionId && instagram.sessionId.length > 3)){
            instagram.sessionId = config.SESSION_ID;
            instagram.userId = req.body.username;
            req.body.sessionid  = config.SESSION_ID;
          }
          req.body.sessionid = instagram.sessionId;
          req.body.csrfToken = instagram.csrfToken;
          config.sessionid = instagram.sessionId;
          config.csrftoken = instagram.csrfToken;
          var userId = "";
          if(config.userid){
            userId = config.userid;
            instagram.cookieValues.ds_user_id = userId;
          }else{
            userId = await getUser(uoi).then(userId=>userId);
            config.userid = userId;
          }
          console.log('Authenticated! Now rendering home page');
          next();
        }
        break;
      default:
        next();
    }
  }
};
