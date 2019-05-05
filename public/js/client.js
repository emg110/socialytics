function openNav(id) {
  //document.getElementById(id).style.backgroundColor = "#111";
  document.getElementById(id).style.width = "35%";
}
/* Set the width of the sidebar to 0 (hide it) */
function closeNav(id) {
  document.getElementById(id).style.width = "0";
}

function backNav() {
  var html = undefined;
  var currentFreeIndex = parseInt(ls.getItem('currentFreeIndex'));
  var results = JSON.parse(ls.getItem('results'));
  if (currentFreeIndex < 2) {
    $("#backbtn").hide();
  } else if (currentFreeIndex >= 2) {
    $("#backbtn").show();
    html = results[currentFreeIndex - 2].html;
    results = results.slice(0, currentFreeIndex - 1);
    currentFreeIndex--;
    ls.setItem('results',JSON.stringify(results));
    ls.setItem('currentFreeIndex',currentFreeIndex.toString())
    if (currentFreeIndex < 2) $("#backbtn").hide();
  }


  if (html !== undefined) document.getElementById('instagram-container').innerHTML = html;
  /*    $("#instagram-profile-container").hide();
      $("#instagram-profiles-container").hide();
      $("#instagram-post-container").hide();
      $("#instagram-posts-container").hide();*/
  /*$("#instagram-container").show();*/

}

$('.btn-primary').on('click', function () {
  if(!$(this).hasClass('disabled')){
    var endpoint = $(this).attr('click-target');
    var type = $(this).attr('call-type');
    if(type && endpoint){
      if(type !== 'form-data') {
        //var currentVal = $(this).val().replace('Get ', 'Loading... ');
        //$(this).val(currentVal);
        $(this).addClass('fired');
        //$(this).find('span').remove();
      }
      var caller = this;
      console.log(caller);
      getEndpointData(endpoint, type, '', 'main',caller);
    }
  }
});

$("#github").click(function () {
  window.open('https://github.com/emg110/socialytics/', '_blank');
});
// wait for the DOM to be loaded
/*$(document).ready(function() {
  // bind 'myForm' and provide a simple callback function
  $('#login-form').ajaxForm(function(res) {
    alert("Thank you for your comment!" + res);
    console.log("Thank you for your comment!" + res);
  })
})*/
/*$('#login').on('click',function(){
  console.log('info: Login started');
  var email = $("#email").val();
  if(email){
    email = email.trim();
    ls.setItem('email', email);
   /!* console.log('info: Trying to socket authenticate with local sttartegy and username: '+ username);
    var socketUri = window.location.protocol+'//'+window.location.host;
    socket = io(socketUri);
    socket.emit('authenticate', {
      strategy: 'local',
      email: email,
      password: password
    }, function(err, data) {
      if(err)console.log('info: Authentication on socket IO has failed with error: '+ err); // message will be null
      else if(data.accessToken){
        ls.setItem('password', '');
        ls.setItem('username', username);
        ls.setItem(username, data.accessToken);
        console.log('info: Socket IO connection is started for Socialytics client App on URL: '+socketUri);
        feathersClient = feathers().configure(feathers.socketio(socket));
        startListening();
        console.log('info: Socket IO connection authenticated for Socialytics client App on URL: '+socketUri); // message will be null


      }
    });*!/
  }
})*/
$("#login-form").submit(function(e) {
  console.log('info: Login started');
  //prevent Default functionality
  e.preventDefault();
  var actionurl = e.currentTarget.action;
  $.post(actionurl,$("#login-form").serialize(), function(data, status) {
    if(status == 'success'){
      if(data){
        console.log('Data received from ETL API')
        var username = data.username;
        var accesstoken  = data.accesstoken;
        var email = data.email;
        ls.setItem('username', username)
        ls.setItem('accesstoken', accesstoken)
        ls.setItem('email', email)
        var homeUrl = window.location.protocol+'//'+window.location.host+'/home?'+'username='+username;
        console.log('the home url is: '+homeUrl)
        window.location.href = homeUrl;
      }

    }





  })


});
$("#secret").load(function() {
  console.log('secret loaded')

  var email = ls.getItem('email');
  var username = ls.getItem('username');
  var accesstoken = ls.getItem('accesstoken');
  console.log('accessToken is: '+ accesstoken)
  console.log('username is: '+ username)
  console.log('email is: '+ email)
  if(accesstoken){
    var socketUri = window.location.protocol+'//'+window.location.host;
    socket = io(socketUri);
    console.log('info: Socket IO connection is started for Socialytics client App on URL: '+socketUri);
    console.log('info: Trying to authenticate socket for account: '+email);
    socket.emit('authenticate', {
      strategy: 'jwt',
      accessToken: accesstoken
    }, function(err, data) {
      if(err)console.log('info: Authentication on socket IO has failed with error: '+ err); // message will be null
      else if(data){
        feathersClient = feathers().configure(feathers.socketio(socket));
        startListening();
        console.log('info: Socket IO connection authenticated and listening to Socialytics on URL: '+socketUri + ' by account: '+ email); // message will be null
      }
    });
  }
/*  var path = window.location.pathname
  var url = window.location.protocol+'//'+window.location.host+path+'?username='+username*/
  //window.location.replace(url)
/*  if(path.indexOf('/home')>-1 || path.indexOf('/dashboards/stats')>-1 || path.indexOf('/dashboards/explore')|| path.indexOf('/dashboards/engagement')>-1){
    window.history.pushState({},"socialytics", url);
  }*/
  //console.log(username,' :: ',accesstoken)
})
