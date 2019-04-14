const Instagram = require('../backend-social/api/instagram/instagram');
const config = require('../../config')
const instagram = new Instagram();
const fs = require('fs');
async function writeConfig(){
  if(config.sessionid){

    let configString = JSON.stringify(config);
    configString = configString.replace(/\"([^(\")"]+)\":/g,"$1:");
    configString = 'module.exports = '+configString;
    let writeConfig = await fs.writeFile("./config/index.js", configString, 'utf8', function (err) {
      if (err) {
        console.log("An error occured while writing configurations back to config/index.js File.");
        return console.log(err);
      }

      console.log("Configurations have been saved.");
    });
  }
}
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
        if(req.body.username && req.body.password && !config.sessionid){
          config.username =req.body.username;
          let username = req.body.username || config.userid;
          let password = req.body.password;
          let csrftoken = await instagram.getCsrfToken().then((csrf) =>
          {
            instagram.csrftoken = csrf;
            config.csrftoken = csrf;
            return csrf;
          }).catch(console.error);
          var sessionid = await instagram.auth(username, password).then((sessionid)=>{
            instagram.sessionid = sessionid;
            config.sessionid = sessionid;
            return sessionid
          }).catch(console.error);
          req.body.sessionid = sessionid;
          req.body.csrftoken = csrftoken;
          config.sessionid = sessionid;
          config.csrftoken = csrftoken;
          if(!(instagram.sessionid && instagram.sessionid.length > 3)){
            instagram.sessionid = config.sessionid;
            instagram.userid = req.body.username;
            req.body.sessionid  = config.sessionid;
          }
          req.body.sessionid = instagram.sessionid;
          req.body.csrftoken = instagram.csrftoken;
          config.sessionid = instagram.sessionid;
          config.csrftoken = instagram.csrftoken;
          var userId = "";
          if(config.userid){
            userId = config.userid;
            instagram.cookieValues.ds_user_id = userId;
          }else{
            userId = await getUser(username).then(userId=>userId);
            config.userid = userId;
          }
          //writeConfig();
          console.log('Authenticated! Now rendering home page');
          next();
        }
        else if(req.body.username && config.sessionid){
          let csrftoken = await instagram.getCsrfToken().then((csrf) =>
          {
            instagram.csrftoken = csrf;
            config.csrftoken = csrf;
            return csrf;
          }).catch(console.error);
          req.body.sessionid = config.sessionid;
          req.body.csrftoken = csrftoken;
          req.body.userid = req.body.username;
          instagram.userid = req.body.username;
          instagram.sessionid = config.sessionid;
          instagram.csrftoken = csrftoken;
          config.sessionid = config.sessionid;
          config.csrftoken = csrftoken;
          config.userid = req.body.username;
          //writeConfig();
          console.log('Authenticated via config session ID! Now rendering home page');
          next();
        }
        else next();
        break;
      default:
        next();
    }
  }
};
