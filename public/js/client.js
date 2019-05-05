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
    ls.setItem('results', JSON.stringify(results));
    ls.setItem('currentFreeIndex', currentFreeIndex.toString())
    if (currentFreeIndex < 2) $("#backbtn").hide();
  }
  if (html !== undefined) document.getElementById('instagram-container').innerHTML = html;

}
$('.btn-primary').on('click', function () {
  if (!$(this).hasClass('disabled')) {
    var endpoint = $(this).attr('click-target');
    var type = $(this).attr('call-type');
    if (type && endpoint) {
      if (type !== 'form-data') {
        //var currentVal = $(this).val().replace('Get ', 'Loading... ');
        //$(this).val(currentVal);
        $(this).addClass('fired');
        //$(this).find('span').remove();
      }
      var caller = this;
      console.log(caller);
      getEndpointData(endpoint, type, '', 'main', caller);
    }
  }
});

$("#login-form").submit(function (e) {
  console.log('info: Login started');
  //prevent Default functionality
  e.preventDefault();
  var actionurl = e.currentTarget.action;
  $.post(actionurl, $("#login-form").serialize(), function (data, status) {
    if (status == 'success') {
      if (data) {
        console.log('info: Authentication data received from Socialytics server')
        var username = data.username;
        var accesstoken = data.accesstoken;
        var email = data.email;
        ls.setItem('username', username)
        ls.setItem('accesstoken', accesstoken)
        ls.setItem('email', email)
        var homeUrl = window.location.protocol + '//' + window.location.host + '/home?' + 'username=' + username;
        console.log('info: Authentication to Socialytics has completed! Now requesting home page: ' + homeUrl)
        window.location.href = homeUrl;
      /*  var client = new XMLHttpRequest();
        client.open('GET', homeUrl);
        client.setRequestHeader('Authorization', accesstoken);
        client.onload = function (e) {
        var html = client.responseText;
        var path = window.location.pathname
        var url = window.location.protocol+'//'+ window.location.host+ '/home' +'?username='+username
        window.history.pushState({urlPath:url},"Socialytics",url);
        window.document.write(html)
       }
        client.send();*/

      }
    }
  })
});
$("#github").click(function () {
  window.open('https://github.com/emg110/socialytics/', '_blank');
});
if($("#secret")){
  $("#secret").ready(function () {
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
          console.log(data)
          var feathersClient = feathers().configure(feathers.socketio(socket));
          startListening(feathersClient);
          console.log('info: Socket IO connection authenticated and listening to Socialytics on URL: ' + socketUri + ' by account: ' + email); // message will be null
        }
      });
    }

  });
}











