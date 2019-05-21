function openNav(id, width) {
  //document.getElementById(id).style.backgroundColor = "#111";
  document.getElementById(id).style.width = width || "35%";
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
  if (html !== undefined){
    document.getElementById('instagram-container').innerHTML = html;
    sparkChartit();
  }

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
      getEndpointData('/instagram/sets/data?', 'form-data', '', 'main', undefined);
    }
  }
});
$('#getSetDataBtn').on('click', function () {
  getSetsData()
});
$("#login-form").submit(function (e) {
  console.log('info: Login started');
  //prevent Default functionality
  e.preventDefault();
  var actionurl = e.currentTarget.action;
  var logindata = $("#login-form").serialize()
  $.post(actionurl,logindata )
    .done(function (data) {
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
  })
});
$("#github").click(function () {
  window.open('https://github.com/emg110/socialytics/', '_blank');
});

$("#getDataBtn").on('click',function(e){
  e.preventDefault();
  getStatsData();
})
$("#resetSets").on('click',function(e){
  e.preventDefault();
  $("#seta").importTags('')

  $("#setb").importTags('')
})

//$(".scrollable").overlayScrollbars({ className : "os-theme-dark"});

/*OverlayScrollbars(document.getElementById('home-sidebar'), {
  className : "os-theme-dark",
});*/

$("#search-input").on('keypress',(e)=>{
  //console.log(e.which)
  if(e.which===13){
    var value = $("#search-input").val();
    var instance = $("#autocomplete-results").overlayScrollbars()
    if(instance)instance.destroy()
    $("#autocomplete-results").html('<div>  </div>')
    if(value.length>3){
      window.fetch('https://www.instagram.com/web/search/topsearch/?query='+value).then(res=>{
        return res.json()
      }).then(function (json) {
        if(json){
          json = json.users;

          $("#autocomplete-results").append('<div style="width:100%;color:#f8f9fa;padding:5px;font-family: monospace; background: rgba(0,123,255,.5);text-align: center">Drag profiles to desired input</div>')
          for(var i of json){
            i = i.user;
            var verified = i.is_verified? 'Verified':'';
            $("#autocomplete-results").append(
              '<div id="'+i.username+'" class="search-result" draggable="true" ondragstart="drag(event)">'+
              '<span>'+
              '<img title="'+i.full_name+':'+'" class="profile-mini-img" src="'+i.profile_pic_url+'">'+
              '</span>'+
              '<span style="margin-left:1vw">'+
              i.username+
              '</span>'+
              '<span style="margin: 5px;background-color: rgba(0, 170, 255, .8);" class="badge badge-secondary">'+verified+'</span>'+
              '</div>')
          }
        }
        $("#autocomplete-results").overlayScrollbars({
          className : "os-theme-dark"
        })
        /*OverlayScrollbars(document.getElementById('autocomplete-results'), {
            className : "os-theme-dark",
          });*/
      });
    }
  }
});
$("#searchProfileBtn").click(()=>{
  var value = $("#search-input").val();
  var instance = $("#autocomplete-results").overlayScrollbars()
  if(instance)instance.destroy()
  $("#autocomplete-results").html('<div>  </div>')
  if(value.length>3){
    window.fetch('https://www.instagram.com/web/search/topsearch/?query='+value).then(res=>{
      return res.json()
    }).then(function (json) {
      if(json){
        json = json.users;

        $("#autocomplete-results").append('<div style="width:100%;color:#f8f9fa;padding:5px;font-family: monospace; background: rgba(0,123,255,.5);text-align: center">Drag profiles to desired input</div>')
        for(var i of json){
          i = i.user;
          var verified = i.is_verified? 'Verified':'';
          $("#autocomplete-results").append(
            '<div id="'+i.username+'" class="search-result" draggable="true" ondragstart="drag(event)">'+
            '<span>'+
            '<img title="'+i.full_name+':'+'" class="profile-mini-img" src="'+i.profile_pic_url+'">'+
            '</span>'+
            '<span style="margin-left:1vw">'+
            i.username+
            '</span>'+
            '<span style="margin: 5px;background-color: rgba(0, 170, 255, .8);" class="badge badge-secondary">'+verified+'</span>'+
            '</div>')
        }
      }
      $("#autocomplete-results").overlayScrollbars({
        className : "os-theme-dark"
      })
      /*OverlayScrollbars(document.getElementById('autocomplete-results'), {
          className : "os-theme-dark",
        });*/
    });
  }
});



$("#help-btn").on('click',function() {
  // tour.restart();
});


$('[data-toggle="popover"]').popover();


