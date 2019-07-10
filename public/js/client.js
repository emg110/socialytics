function openNav(id, width) {
  //document.getElementById(id).style.backgroundColor = "#111";
  document.getElementById(id).style.width = width || "35%";
  $("#maximMinimBtn").removeClass('fa-window-minimize');
  $("#maximMinimBtn").addClass('fa-window-maximize');
}

/* Set the width of the sidebar to 0 (hide it) */
function closeNav(id) {
  document.getElementById(id).style.width = "0";
  $("#maximMinimBtn").removeClass('fa-window-maximize');
  $("#maximMinimBtn").addClass('fa-window-minimize');
}

function maximMinimNav(id) {
  if($("#maximMinimBtn").hasClass('fa-window-maximize')){
    document.getElementById(id).style.width = "100%";
    $("#maximMinimBtn").removeClass('fa-window-maximize');
    $("#maximMinimBtn").addClass('fa-window-minimize');
  }else{
    document.getElementById(id).style.width = "35%";
    $("#maximMinimBtn").removeClass('fa-window-minimize');
    $("#maximMinimBtn").addClass('fa-window-maximize');

  }

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
      var caller = this;
      if (type !== 'form-data') {
        $(this).addClass('fired');
      }
      getEndpointData('/instagram/sets/data?', 'form-data', '', 'main', undefined);
      getEndpointData(endpoint, type, '', 'main', caller);
    }
  }
});
$('#getSetDataBtn').on('click', function () {
  $('#home-body').addClass('disabled');
  if(confirm("Gettings sets data can take a long time! Are you sure?")){
    getSetsData(false);
  }

});
$('#getTagSetDataBtn').on('click', function () {
  $('#home-body').addClass('disabled');
  if(confirm("Gettings hashtag sets data can take a long time! Are you sure?")){
    getSetsData(true);
  }

});
$("#login-form").submit(function (e) {
  console.log('info: Login started');
  //prevent Default functionality
  e.preventDefault();

  $('#login').html(htmlLoading)
  $('#registration').addClass('disabled');
  $('#login-error').html('')
  var actionurl = e.currentTarget.action;
  var logindata = $("#login-form").serialize()
  $.post(actionurl,logindata )
    .done(function (data) {
      if (data) {
        console.log('info: Authentication data received from Socialytics server')
        var username = data.username;
        var accesstoken = data.accesstoken;
        var email = data.email;
        ls.setItem('username', username);
        ls.setItem('accesstoken', accesstoken);
        ls.setItem('email', email);
        ls.setItem('pic', data.pic);
        ls.setItem('bio', data.bio);
        ls.setItem('followers', data.stats.followers);
        ls.setItem('following', data.stats.following);
        ls.setItem('saved', data.stats.saved);
        ls.setItem('posts', data.stats.posts);

        var homeUrl = window.location.protocol + '//' + window.location.host + '/home?' + 'username=' + username;
        console.log('info: Authentication to Socialytics has completed! Now requesting home page: ' + homeUrl)
        window.location.href = homeUrl;



      }
  })
    .fail(function(error){
      $('#login').html('Login to socialytics');
      $('#registration').removeClass('disabled');
      $('#login-error').html('Login failed , please try again with correct inputs');

      console.log('Login failed with error: '+ error)
    })
});
$("#github").click(function () {
  window.open('https://github.com/emg110/socialytics/', '_blank');
});

$("#getDataBtn").on('click',function(e){
  e.preventDefault();
  getStatsData();
})
/*$("#textProcBtn").on('click',function(e){
  e.preventDefault();
  textProc();
})*/
$("#resetSets").on('click',function(e){
  e.preventDefault();
  $("#seta").importTags('')

  $("#setb").importTags('')
})

//$(".scrollable").overlayScrollbars({ className : "os-theme-dark"});

// OverlayScrollbars(document.querySelectorAll('body'), {
//   className : "os-theme-dark",
// });

/*OverlayScrollbars(document.getElementById('home-sidebar'), {
  className : "os-theme-dark",
});*/

$("#search-input").on('keypress',(e)=>{
  //console.log(e.which)
  if(e.which===13){
    var value = $("#search-input").val();
/*    var instance = $("#autocomplete-results").overlayScrollbars()
    if(instance)instance.destroy()*/
    $("#autocomplete-results").html('<div>  </div>')
    if(value.length>2){
      window.fetch('https://www.instagram.com/web/search/topsearch/?query='+value).then(res=>{
        return res.json()
      }).then(function (json) {

        $("#autocomplete-results").append('<a href="#" id="close-btn" class="fa fa-times"></a><div style="width:100%;color:#f8f9fa;padding:5px;font-family: monospace; background: #31a9b8;text-align: center">Drag profiles to input</div>');
        $("#close-btn").on('click',function(){
          $("#autocomplete-results").html('<div>  </div>');
        });
        if(json && json.users.length >= 1){

          json = json.users;

          for(var i of json){
            i = i.user;
            var searchRes =
              '<div id="'+i.username+'" class="search-result" draggable="true" ondragstart="drag(event)">'+
              '<span>'+
              '<img title="'+i.full_name+'" class="profile-mini-img" src="'+i.profile_pic_url+'">'+
              '</span>'+
              '<span style="margin-left:1vw" id="searched-username">'+
              i.username+
              '</span>';

            if(i.is_private){
              searchRes += ' <span class="fa fa-lock"></span></div>';
            }
            if( i.is_verified){
              searchRes += ' <span class="fa fa-check-circle verified"></span></div>';
            }
            else{
              searchRes += '</div>';
            }

            $("#autocomplete-results").append(searchRes);
          }
        }
        else{
          $("#autocomplete-results").append('<span>Result not found.</span>');
        }
       /* $("#autocomplete-results").overlayScrollbars({
          className : "os-theme-dark"
        })*/
        /*OverlayScrollbars(document.getElementById('autocomplete-results'), {
            className : "os-theme-dark",
          });*/
      });
    }
  }
});
$("#search-input-side-panel").on('keypress',(e)=>{
  //console.log(e.which)
  if(e.which===13){
    var value = $("#search-input-side-panel").val();
    /*    var instance = $("#autocomplete-results").overlayScrollbars()
        if(instance)instance.destroy()*/
    $("#autocomplete-results").html('<div>  </div>')
    if(value.length>2){
      window.fetch('https://www.instagram.com/web/search/topsearch/?query='+value).then(res=>{
        return res.json()
      }).then(function (json) {
        if(json){
          json = json.users;

          $("#autocomplete-results").append('<a href="#" id="close-button" class="fa fa-times"></a><div style="width:100%;color:#f8f9fa;padding:5px;font-family: monospace; background: #31a9b8;text-align: center">Drag profiles to input</div>');
          $("#close-button").on('click',function(){
            $("#autocomplete-results").html('<div>  </div>');
          });

          for(var i of json){
            i = i.user;
            var searchRes =
              '<div id="'+i.username+'" class="search-result" draggable="true" ondragstart="drag(event)">'+
              '<span>'+
              '<img title="'+i.full_name+':'+'" class="profile-mini-img" src="'+i.profile_pic_url+'">'+
              '</span>'+
              '<span style="margin-left:1vw" id="searched-username">'+
              i.username+
              '</span>';

            if(i.is_private){
              searchRes += ' <span class="fa fa-lock"></span></div>';
            }
            if( i.is_verified){
              searchRes += ' <span class="fa fa-check-circle verified"></span></div>';
            }
            else{
              searchRes += '</div>';
            }

            $("#autocomplete-results").append(searchRes);
          }
        }
        /* $("#autocomplete-results").overlayScrollbars({
           className : "os-theme-dark"
         })*/
        /*OverlayScrollbars(document.getElementById('autocomplete-results'), {
            className : "os-theme-dark",
          });*/
      });
    }
  }
});
$("#sidepanelSearchProfileBtn").click(()=>{
  var value = $("#search-input-side-panel").val();
  /* var instance = $("#autocomplete-results").overlayScrollbars()
   if(instance)instance.destroy()*/
  $("#autocomplete-results").html('<div>  </div>')
  if(value.length>2){
    window.fetch('https://www.instagram.com/web/search/topsearch/?query='+value).then(res=>{
      return res.json()
    }).then(function (json) {
      if(json){
        json = json.users;

        $("#autocomplete-results").append('<a href="#" id="close-button" class="fa fa-times"></a><div style="width:100%;color:#f8f9fa;padding:5px;font-family: monospace; background: #31a9b8;text-align: center">Drag profiles to input</div>');
        $("#close-button").on('click',function(){
          $("#autocomplete-results").html('<div>  </div>');
        });

        for(var i of json){
          i = i.user;
          var searchRes =
            '<div id="'+i.username+'" class="search-result" draggable="true" ondragstart="drag(event)">'+
            '<span>'+
            '<img title="'+i.full_name+':'+'" class="profile-mini-img" src="'+i.profile_pic_url+'">'+
            '</span>'+
            '<span style="margin-left:1vw" id="searched-username">'+
            i.username+
            '</span>';

          if(i.is_private){
            searchRes += ' <span class="fa fa-lock"></span></div>';
          }
          if( i.is_verified){
            searchRes += ' <span class="fa fa-check-circle verified"></span></div>';
          }
          else{
            searchRes += '</div>';
          }

          $("#autocomplete-results").append(searchRes);
        }
      }
      /* $("#autocomplete-results").overlayScrollbars({
         className : "os-theme-dark"
       })*/
      /*OverlayScrollbars(document.getElementById('autocomplete-results'), {
          className : "os-theme-dark",
        });*/
    });
  }
});
$("#searchProfileBtn").click(()=>{
  var value = $("#search-input").val();
 /* var instance = $("#autocomplete-results").overlayScrollbars()
  if(instance)instance.destroy()*/
  $("#autocomplete-results").html('<div>  </div>')
  if(value.length>2){
    window.fetch('https://www.instagram.com/web/search/topsearch/?query='+value).then(res=>{
      return res.json()
    }).then(function (json) {
      if(json){
        json = json.users;

        $("#autocomplete-results").append('<a href="#" id="close-btn" class="fa fa-times"></a><div style="width:100%;color:#f8f9fa;padding:5px;font-family: monospace; background: #31a9b8;text-align: center">Drag profiles to desired input</div>')
        $("#close-btn").on('click',function(){
          $("#autocomplete-results").html('<div>  </div>');
        });
        for(var i of json){
          i = i.user;
          var searchRes =
            '<div id="'+i.username+'" class="search-result" draggable="true" ondragstart="drag(event)">'+
            '<span>'+
            '<img title="'+i.full_name+':'+'" class="profile-mini-img" src="'+i.profile_pic_url+'">'+
            '</span>'+
            '<span style="margin-left:1vw" id="searched-username">'+
            i.username+
            '</span>';

          if(i.is_private){
            searchRes += ' <span class="fa fa-lock"></span></div>';
          }
          if( i.is_verified){
            searchRes += ' <span class="fa fa-check-circle verified"></span></div>';
          }
          else{
            searchRes += '</div>';
          }

          $("#autocomplete-results").append(searchRes);

        }
      }
     /* $("#autocomplete-results").overlayScrollbars({
        className : "os-theme-dark"
      })*/
      /*OverlayScrollbars(document.getElementById('autocomplete-results'), {
          className : "os-theme-dark",
        });*/
    });
  }
});


$("#search-insta-input").on('keypress',(e)=>{
  //console.log(e.which)
  if(e.which===13){
    var value = $("#search-insta-input").val();
    // var caller = this;

    if(value.length>2){
      getEndpointData('/instagram/search?', 'search-posts', '', 'main');
    }
  }
});

$('[data-toggle="popover"]').popover();
$("#resetSeta").on('click',function(){
  $('#seta').importTags('');
});
$("#resetSetb").on('click',function(){
  $('#setb').importTags('');
});


$("#storeBrowsingBtn").on('click',function(){
  if($("input[id='storeBrowsingBtn']").is(":checked")){

    $("#setToggleDiv").removeClass('hidden');
    $("#setToggleDiv").css('display','inline');

  }else{
    $("#setToggleDiv").addClass('hidden');
    $("#setToggleDiv").css('display','none');
  }
});
$("#allPostsBtn").on('click',function(){
  if($("input[id='allPostsBtn']").is(":checked")){

    $("#commentsDiv").removeClass('hidden');
    $("#commentsDiv").css('display','inline');
    $("#locationDiv").removeClass('hidden');
    $("#locationDiv").css('display','inline');

  }else{
    $("#commentsDiv").addClass('hidden');
    $("#commentsDiv").css('display','none');
    $("#locationDiv").addClass('hidden');
    $("#locationDiv").css('display','none');
  }
});
var selfPic =ls.getItem('pic');
var selfBio =ls.getItem('bio');
var selfUsername =ls.getItem('username');
var selfFollowersCount =ls.getItem('followers');
var selfFollowingCount =ls.getItem('following');
var selfSavedCount =ls.getItem('saved') || 0;
var selfPostsCount =ls.getItem('posts');


$('#self-profile-pic').html('<img class="usr-img-thumbnail" alt="emg110" src="'+selfPic+'">');
$('#self-bio').html('<h5>'+selfBio+'</h5>');
$('#self-username').html('<h3>'+selfUsername+'</h3>');
$('#self-followers-count').html('<br><span>'+selfFollowersCount+'</span>');
$('#self-following-count').html('<br><span>'+selfFollowingCount+'</span>');
$('#self-posts-count').html('<br><span>'+selfPostsCount+'</span>');
$('#self-saved-count').html('<br><span>'+selfSavedCount+'</span>');


