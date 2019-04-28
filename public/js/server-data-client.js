/*
var socket = io(window.location.protocol+window.location.host);
*/

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
//method: 'find'
//service: 'instagram/posts'
//limit: 20
//sort: true
//filters: {isVerified:true, shortcode:'MSD-BxFGs'}
// getServiceData('find', 'instagram/posts',{$search: 'BwE-N5mFizR',$fields:['shortcode'],$deep:false }, 20, { createdAt: -1})
function getServiceData(method, service,filters, limit, sort){
  var options = {};
  if(limit && limit !== undefined){
    options.$limit = limit;
  }
  if(sort && sort !== undefined){
    options.$sort = sort;
  }
  console.log(method, service,filters, limit, sort)
  for (i in filters){
    options[i]= filters[i];
  }
  return new Promise((resolve, reject)=>{
    socket.emit(method, service, options, (error, data) => {
      if(error){
        reject(error);
      }
      if(data){
        resolve(data);
      }
    });
  })

}
function getServiceSample(method, service){
  var options = { $limit: 1, $sort: { createdAt: -1} };
  socket.emit(method, service, options, (error, data) => {
    console.log('Found all messages', data);
  });
}
/*socket.emit('find', 'instagram/posts', { $limit: 20, $sort: { createdAt: -1},$search: 'BwE-N5mFizR',$fields:['shortcode'],$deep:false }, (error, data) => {
  console.log('Found all messages', data);
});*/

