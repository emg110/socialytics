/* Set the width of the sidebar to 250px (show it) */
function openNav(id) {
  document.getElementById(id).style.width = "30%";
}

/* Set the width of the sidebar to 0 (hide it) */
function closeNav(id) {
  document.getElementById(id).style.width = "0";
}
function getEndpoint (endpoint, type){
  if(type !=="form-data"){
    closeNav('insta-sidepanel');
    openNav('insta-sidepanel');
    document.getElementById('instagram-container').innerHTML=html;
    var username = document.getElementById('username-input').value;
    var tag = document.getElementById('tag-input').value;
    var location = document.getElementById('location-input').value;
    var query = document.getElementById('search-input').value;
    var count = document.getElementById('count-input').value || 50;
    var shortcode = document.getElementById('shortcode-input').value;
    var url  =endpoint;
    switch (type) {
      case 'profile':
        if(username.length !== undefined){
          if(username.length>=3){
            url  = endpoint+username;
          }else{
            url = "NA";
          }
        }
        break
      case 'whoami':
        url  =endpoint;
        break
      case 'recent-posts':
        if(username.length !== undefined){
          if(username.length>=3){
            url  = endpoint+'username='+username+'&'+'count='+count;
          }else{
            url = "NA";
          }
        }
        break
      case 'all-posts':
        if(username.length !== undefined){
          if(username.length>=3){
            url  = endpoint+'username='+username;
          }else{
            url = "NA";
          }
        }
        break

      case 'tag-posts':
        if(tag.length !== undefined){
          if(tag.length>=3){
            url  = endpoint+'tag='+tag+'&'+'count='+count;
          }else{
            url = "NA";
          }
        }
        break
      case 'location-posts':
        if(location.length !== undefined){
          if(location.length>=3){
            url  = endpoint+'location='+location+'&'+'count='+count;
          }else{
            url = "NA";
          }
        }
        break
      case 'user-following':
        if(username.length !== undefined){
          if(username.length>=3){
            url  = endpoint+'username='+username+'&'+'count='+count;
          }else{
            url = "NA";
          }
        }
        break
      case 'user-followers':
        if(username.length !== undefined){
          if(username.length>=3){
            url  = endpoint+'username='+username+'&'+'count='+count;
          }else{
            url = "NA";
          }
        }
        break
      case 'search-posts':
        if(query.length !== undefined){
          if(query.length>=3){
            url  = endpoint+'query='+query+'&'+'count='+count;
          }else{
            url = "NA";
          }
        }
        break
      case 'feed-posts':
        if(count !== undefined){
          if(count>=10){
            url  = endpoint+'count='+count;
          }else{
            url = "NA";
          }
        }
        break
      case 'all-feed-posts':
        break
      case 'post-likes':
        if(shortcode.length !== undefined){
          if(shortcode.length>=3){
            url  = endpoint+'shortcode='+shortcode+'&'+'count='+count;
          }else{
            url = "NA";
          }
        }
        break
      case 'post-comments':
        if(shortcode.length !== undefined){
          if(shortcode.length>=3){
            url  = endpoint+'shortcode='+shortcode+'&'+'count='+count;
          }else{
            url = "NA";
          }
        }
        break
      case 'post-json':
        if(shortcode.length !== undefined){
          if(shortcode.length>=3){
            url  = endpoint+'shortcode='+shortcode;
          }else{
            url = "NA";
          }
        }
        break
      case 'post-page':
        if(shortcode.length !== undefined){
          if(shortcode.length>=3){
            url  = endpoint+'shortcode='+shortcode;
          }else{
            url = "NA";
          }
        }
        break
      case 'sugg-posts':
        if(count !== undefined){
          if(count>=10){
            url  = endpoint+'count='+count;
          }else{
            url = "NA";
          }
        }
        break
      case 'sugg-people':
        if(count !== undefined){
          if(count>=10){
            url  = endpoint+'count='+count;
          }else{
            url = "NA";
          }
        }
        break
    }
    if(url !== "NA" && url.indexOf('http://')>=0){
      var xhr = new XMLHttpRequest();
      xhr.open("GET", url, true);
      xhr.onload = function(e) {
        var html = xhr.responseText;
        document.getElementById('instagram-container').innerHTML=html;
      }
      xhr.send();
    }
    else{
      closeNav('insta-sidepanel');
      console.log('please provide all required');
      window.alert('please provide all required');
    }
  }
  else{
    var xhr = new XMLHttpRequest();
    xhr.open("GET", endpoint, true);
    xhr.onload = function(e) {
      var txt = xhr.responseText;
      var json = JSON.parse(txt);
      document.getElementById('username-input').value = json.username;
      document.getElementById('tag-input').value=json.tag;
      document.getElementById('location-input').value=json.location;
      document.getElementById('search-input').value=json.query;
      document.getElementById('count-input').value =json.count;
      document.getElementById('shortcode-input').value = json.shortcode;
      console.log(json);
    }
    xhr.send();
  }

}
/*function loadMap(divName){
  var latlon = divName.split('_');
  var coor = [latlon[0], latlon[1]];
  var map = L.map(divName).setView(coor, 13);
  map.invalidateSize();
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: ''}).addTo(map);
  L.marker(coor).addTo(map).bindPopup('A pretty CSS3 popup.<br> Easily customizable.').openPopup();
}*/
var html = '<div class="loader loader--style1" title="0">\n' +
  '        <svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"\n' +
  '             x="0px" y="0px"\n' +
  '             width="150px" height="150px" viewBox="0 0 40 40" enable-background="new 0 0 40 40" xml:space="preserve">\n' +
  '  <path opacity="0.2" fill="#000" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946\n' +
  '    s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634\n' +
  '    c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"/>\n' +
  '          <path fill="#000" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0\n' +
  '    C22.32,8.481,24.301,9.057,26.013,10.047z">\n' +
  '            <animateTransform attributeType="xml"\n' +
  '                              attributeName="transform"\n' +
  '                              type="rotate"\n' +
  '                              from="0 20 20"\n' +
  '                              to="360 20 20"\n' +
  '                              dur="0.5s"\n' +
  '                              repeatCount="indefinite"/>\n' +
  '          </path>\n' +
  '  </svg>\n' +
  '      </div>';
