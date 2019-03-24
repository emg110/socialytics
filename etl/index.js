const { HOST, PORT } = require("../config");

const application = require("./app");
const instagram = require('./api/instagram/index').instagramClient;


console.log('The csrf token: '+instagram.csrfToken, 'session ID: '+instagram.sessionId  + "  Are configured statically from config file");
console.log('**************************************');
application
  .listen(PORT, () => console.log(`Listening on ${HOST}:${PORT}`));
module.exports = application;


/*
const loginCli = function (callback){
  const readline = require('readline');

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  console.log('Starting CLI login process on etl side...');
  rl.question('Instagram username:', (user) => {
    // TODO: Log the answer in a database
    rl.question('Instagram password:', (pass) => {
      // TODO: Log the answer in a database
      console.log(`Instagram username used: ${user}`);
      console.log(`Instagram password used: ${pass}`);
      callback(user,pass);
      rl.close();
    });
  });
};
const instagramLogin = function (username, password){
  instagram.getCsrfToken().then((csrf) =>
  {
    instagram.csrfToken = csrf;
  }).then(() =>
  {
    console.log("Starting autheticating on Instagram...");
    return instagram.auth(username, password).then(sessionId =>
    {
      instagram.sessionId = sessionId;
      console.log("You have logged into Instagram, successfully");
      console.log('The csrf token: '+instagram.csrfToken, 'session ID: '+instagram.sessionId);
      console.log('');
      application
        .listen(PORT, () => console.log(`Listening on ${HOST}:${PORT}`));

    })
  }).catch(console.error);
};
if(LOGIN_MODE.toLowerCase()=== 'cli'){
  //todo check for sessionid freshness & if fresh then do not authenticate again
  loginCli(function(user,pass){
    instagramLogin(user,pass);
  });
}else if(LOGIN_MODE.toLowerCase()=== 'none' || LOGIN_MODE.toLowerCase()=== 'api'){
  console.log("The authentication mode is configured as --" + LOGIN_MODE + "-- Hence:");
  instagram.csrfToken = CSRF_TOKEN;
  instagram.sessionId = SESSION_ID;
  console.log('The csrf token: '+instagram.csrfToken, 'session ID: '+instagram.sessionId  + "  Are configured statically from config file");
  console.log('**************************************');
  application
    .listen(PORT, () => console.log(`Listening on ${HOST}:${PORT}`));
}
*/
//console.log("The authentication mode is configured as --" + LOGIN_MODE + "-- Hence:");
