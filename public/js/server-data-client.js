var socket = io('http://localhost:8080');

//var app = feathers();
//app.configure(feathers.socketio(socket));
/*app.service('instagram/posts').find({
  query: {
    $limit: 20,
    $sort: {
      createdAt: -1
    }
  }
}).then(messages => console.log(messages));*/
function getServiceData(service,filters, limit, sort){
  var options = { $limit: limit, $sort: sort };
  for (i in filters){
    options[i]= filters[i];
  }
  socket.emit('find', service, options, (error, data) => {
    console.log('Found all messages', data);
  });
}
function getServiceSample(service){
  var options = { $limit: 1, $sort: { createdAt: -1} };
  socket.emit('find', service, options, (error, data) => {
    console.log('Found all messages', data);
  });
}
/*socket.emit('find', 'instagram/posts', { $limit: 20, $sort: { createdAt: -1},$search: 'BwE-N5mFizR',$fields:['shortcode'],$deep:false }, (error, data) => {
  console.log('Found all messages', data);
});*/

