function getEndpointData(endpoint, type, code, container, caller) {
  var user = ls.getItem('username');
  var accesstoken = ls.getItem('accesstoken');
  if (accesstoken) console.log('info: accessToken is available')
  console.log('info: Now getting endpoint data... ' + 'for user: ' + user)
  $("#carosel").hide();
  $("#logo").show();
  var xhr = new XMLHttpRequest();
  if (type !== "form-data") {
    closeNav('social-sidepanel');
    openNav('social-sidepanel');
    document.getElementById('instagram-container').innerHTML = htmlLoading;
    var username = code.length > 0 ? code : document.getElementById('username-input').value;
    var tag = code.length > 0 ? code : document.getElementById('tag-input').value;
    var location = code.length > 0 ? code : document.getElementById('location-input').value;
    var query = document.getElementById('search-input').value;
    var count = document.getElementById('count-input').value || 50;
    var shortcode = code.length > 0 ? code : document.getElementById('shortcode-input').value;
    var url = endpoint;
    switch (type) {
      case 'profile':
        if (code) {
          if (code.length >= 3) {
            url = endpoint + code;
          } else {
            url = "NA";
          }
        } else if (username.length !== undefined) {
          if (username.length >= 3) {
            url = endpoint + username;
          } else {
            url = "NA";
          }
        }
        break
      case 'whoami':
        url = endpoint;
        break
      case 'recent-posts':
        if (username.length !== undefined) {
          if (username.length >= 3) {
            url = endpoint + 'username=' + username + '&' + 'count=' + count;
          } else {
            url = "NA";
          }
        }
        break
      case 'all-posts':
        if (username.length !== undefined) {
          if (username.length >= 3) {
            url = endpoint + 'username=' + username;
            window.bulkevent = true;
          } else {
            url = "NA";
          }
        }
        break

      case 'tag-posts':
        if (tag.length !== undefined) {
          if (tag.length >= 3) {
            url = endpoint + 'tag=' + tag + '&' + 'count=' + count;
          } else {
            url = "NA";
          }
        }
        break
      case 'location-posts':
        if (location.length !== undefined) {
          if (location.length >= 3) {
            url = endpoint + 'location=' + location + '&' + 'count=' + count;
          } else {
            url = "NA";
          }
        }
        break
      case 'user-following':
        if (username.length !== undefined) {
          if (username.length >= 3) {
            url = endpoint + 'username=' + username + '&' + 'count=' + count;
          } else {
            url = "NA";
          }
        }
        break
      case 'user-followers':
        if (username.length !== undefined) {
          if (username.length >= 3) {
            url = endpoint + 'username=' + username + '&' + 'count=' + count;
          } else {
            url = "NA";
          }
        }
        break
      case 'search-posts':
        if (query.length !== undefined) {
          if (query.length >= 3) {
            url = endpoint + 'query=' + query + '&' + 'count=' + count;
          } else {
            url = "NA";
          }
        }
        break
      case 'feed-posts':
        if (count !== undefined) {
          if (count >= 10) {
            url = endpoint + 'count=' + count;
          } else {
            url = "NA";
          }
        }
        break
      case 'all-feed-posts':
        break
      case 'post-likes':
        if (shortcode.length !== undefined) {
          if (shortcode.length >= 3) {
            url = endpoint + 'shortcode=' + shortcode + '&' + 'count=' + count;
          } else {
            url = "NA";
          }
        }
        break
      case 'post-comments':
        if (shortcode.length !== undefined) {
          if (shortcode.length >= 3) {
            url = endpoint + 'shortcode=' + shortcode + '&' + 'count=' + count;
          } else {
            url = "NA";
          }
        }
        break
      case 'post-json':
        if (code) {
          if (code.length >= 3) {
            url = endpoint + 'shortcode=' + code;
          } else {
            url = "NA";
          }
        } else if (shortcode.length !== undefined) {
          if (shortcode.length >= 3) {
            url = endpoint + 'shortcode=' + shortcode;
          } else {
            url = "NA";
          }
        }
        break
      case 'post-page':
        if (shortcode.length !== undefined) {
          if (shortcode.length >= 3) {
            url = endpoint + 'shortcode=' + shortcode;
          } else {
            url = "NA";
          }
        }
        break
      case 'sugg-posts':
        if (count !== undefined) {
          if (count >= 10) {
            url = endpoint + 'count=' + count;
          } else {
            url = "NA";
          }
        }
        break
      case 'sugg-people':
        if (count !== undefined) {
          if (count >= 10) {
            url = endpoint + 'count=' + count;
          } else {
            url = "NA";
          }
        }
        break
    }
    if (container === 'main') {
      ls.setItem('results', JSON.stringify([]));
      ls.setItem('currentFreeIndex', '0');
      $("#backbtn").hide();
    }
    if (url !== "NA") {
      if (caller) {
        $(caller).addClass('disabled');
        $(caller).removeClass('fired');
        //$(caller).removeClass('fired');
        $(caller).css('background-color', '#e0560d');
        $(caller).append('<span id="loading" class="spinner-grow spinner-grow-sm"></span>');

      }

      xhr.timeout = 0;

      xhr.open("GET", url, true);
      xhr.setRequestHeader('username', user)
      xhr.setRequestHeader('accesstoken', accesstoken)
      xhr.setRequestHeader('strategy', 'jwt')
      xhr.onload = function (e) {
        var html = xhr.responseText;
        if (html.length) {
          if (html.length > 0) render(html, container, caller);
          window.bulkevent = false;
        }
      }
      xhr.send();
    } else {
      norender(caller);
    }
  }
  else {
    console.log('form data...')
    xhr = new XMLHttpRequest();
    xhr.timeout = 0;
    xhr.open("GET", endpoint, true);
    xhr.setRequestHeader('username', user)
    xhr.setRequestHeader('accesstoken', accesstoken)
    xhr.setRequestHeader('strategy', 'jwt')
    xhr.onload = function (e) {
      var txt = xhr.responseText;
      renderFormData(txt);
    }
    xhr.send();

  }

}

function getServiceData(method, service, filters, desc, channel) {
  var accesstoken = ls.getItem('accesstoken')
  var data = {}
  data['accessToken'] = accesstoken;
  if(filters.un)data['un'] = filters.un;
  data['method'] = method
  data['service'] = service
  data['desc'] = desc
  if(channel.indexOf('setb')>-1){
    socketB.emit(channel, {data: data, options: filters});
  }else{
    socket.emit(channel, {data: data, options: filters});
  }

}
/*function getServiceData(method, service, filters, desc) {
  return new Promise((resolve, reject) => {
    socket.emit(method, service, filters, (error, data) => {
      if(error)reject(error)
      if(data)resolve(data)
    })
    /!*app.services[service].find(filters).then(results=> resolve(results)).catch(err=>{
      reject(err)
    })*!/
  })
  //socket.emit('authenticated', {data: data, options: filters});

}*/

function getSocketData(type, data, options) {
  options = options || {};
  return new Promise((resolve, reject) => {
    socket.emit(type, {data: data, options: options}, (error, data) => {
      if (error) {
        reject(error);
      }
      if (data) {
        resolve(data);
      }
    });
  })

}

function getServiceSample(method, service) {
  var options = {$limit: 1, $sort: {createdAt: -1}};
  socket.emit(method, service, options, (error, data) => {
    console.log('Found all messages', data);
  });
}

/*socket.emit('find', 'instagram/posts', { $limit: 20, $sort: { createdAt: -1},$search: 'BwE-N5mFizR',$fields:['shortcode'],$deep:false }, (error, data) => {
  console.log('Found all messages', data);
});*/

/*  var accesstoken = ls.getItem('accesstoken');
  options['accessToken'] = accesstoken
  options['Authorization'] = accesstoken*/
/* var feathersClient = feathers();
 feathersClient.configure(feathers.socketio(socket));
 feathersClient.configure(feathers.authentication());
 feathersClient.authenticate({
   strategy: 'jwt',
   accessToken: accesstoken
 }).then(() => {
   return feathersClient.service(service).find(options)
 }).catch(e => {
   console.error('Authentication error', e);
   // Show login page
 });*/


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
/*socket.emit('cube', 'seta-posts', {}, (error, data) => {
  if(error){
    console.log(error);
  }
  if(data){
    console.log(data);
  }
});*/
