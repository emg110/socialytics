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
function getEndpointData(endpoint, type, code, container, caller) {
  console.log('now starting getting endpoint data...')
  $("#carosel").hide();
  $("#logo").show();
  var xhr = new XMLHttpRequest();
  if (type !== "form-data") {
    closeNav('social-sidepanel');
    openNav('social-sidepanel');
    document.getElementById('instagram-container').innerHTML = htmlLoading;
    var username = code.length>0 ? code : document.getElementById('username-input').value;
    var tag = code.length>0 ? code : document.getElementById('tag-input').value;
    var location = code.length>0 ? code : document.getElementById('location-input').value;
    var query = document.getElementById('search-input').value;
    var count = document.getElementById('count-input').value || 50;
    var shortcode = code.length>0 ? code : document.getElementById('shortcode-input').value;
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
            window.bulkevent=true;
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
      ls.setItem('results',JSON.stringify([]));
      ls.setItem('currentFreeIndex','0');
      $("#backbtn").hide();
    }
    if (url !== "NA" ) {
      if(caller){
        $(caller).addClass('disabled');
        $(caller).removeClass('fired');
        //$(caller).removeClass('fired');
        $(caller).css('background-color', '#e08e0b');
        $(caller).append('<span id="loading" class="spinner-grow spinner-grow-sm"></span>');

      }

      xhr.timeout = 0;
      xhr.open("GET", url, true);
      xhr.onload = function (e) {
        var html = xhr.responseText;
        if(html.length){
          if(html.length>0)render(html,container, caller);
          window.bulkevent=false;
        }
      }
      xhr.send();
    }
    else {
      norender(caller);
    }
  }
  else {
    console.log('form data...')
    xhr = new XMLHttpRequest();
    xhr.timeout = 0;
    xhr.open("GET", endpoint, true);
    xhr.onload = function (e) {
      var txt = xhr.responseText;
      renderText(txt);
    }
    xhr.send();

  }

}

function getServiceData(method, service,filters, limit, sort){
  var options = {};
  if(limit && limit !== undefined){
    options.$limit = limit;
  }
  if(sort && sort !== undefined){
    options.$sort = sort;
  }
  //console.log(method, service,filters, limit, sort)
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

function getSocketData(type, data,options){
  options = options || {};
  return new Promise((resolve, reject)=>{
    socket.emit(type, {data:data, options:options}, (error, data) => {
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

