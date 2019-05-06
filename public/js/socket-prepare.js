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
      var feathersClient = feathers().configure(feathers.socketio(socket));
      startListening(feathersClient);
      console.log('info: Socket IO connection authenticated and listening to Socialytics on URL: ' + socketUri + ' by account: ' + email); // message will be null
    }
  });
}
