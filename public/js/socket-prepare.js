var email = ls.getItem('email');
var username = ls.getItem('username');
var accesstoken = ls.getItem('accesstoken');
if (accesstoken) {
  var socketUri = window.location.protocol + '//' + window.location.host;
  socket = io(socketUri);
  console.log('info: Socket IO connection is started for Socialytics client App on URL: ' + socketUri);
  console.log('info: Trying to authenticate socket for account: ' + email);
  socket.emit('authenticate', {
    strategy: 'jwt',
    accessToken: accesstoken
  }, function (err, data) {
    if (err) console.log('info: Authentication on socket IO has failed with error: ' + err); // message will be null
    else if (data) {
      app = feathers();
      var options = {
        header: 'Authorization', // the default authorization header for REST
        prefix: '', // if set will add a prefix to the header value. for example if prefix was 'JWT' then the header would be 'Authorization: JWT eyJ0eXAiOiJKV1QiLCJhbGciOi...'
        path: '/authentication', // the server-side authentication service path
        jwtStrategy: 'jwt', // the name of the JWT authentication strategy
        entity: 'user', // the entity you are authenticating (ie. a users)
        service: 'users', // the service to look up the entity
        cookie: 'feathers-jwt', // the name of the cookie to parse the JWT from when cookies are enabled server side
        storageKey: 'feathers-jwt', // the key to store the accessToken in localstorage or AsyncStorage on React Native
        storage: ls // Passing a WebStorage-compatible object to enable automatic storage on the client.
      }
      app.configure(feathers.socketio(socket));
      app.configure(feathers.authentication(options));
      app.authenticate({
        strategy: 'jwt',
        accessToken: data.accessToken
      }).then(() => {
        startListening(app);

        console.log('info: Socket IO connection authenticated and listening to Socialytics on URL: ' + socketUri + ' by account: ' + email); // message will be null
      }).catch(e => {
        console.error('Authentication error', e);
        // Show login page
      });


    }
  });
}
