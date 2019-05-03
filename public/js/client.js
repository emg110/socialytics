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

$("#secret").ready(function() {

  var username = $("#secret").attr('username').trim();
  if(username){
    var accesstoken = $("#secret").attr('token');
    if(accesstoken){
      ls.setItem(username, accesstoken);
      $("#secret").attr('token','');
    }
    var path = window.location.pathname
    var url = window.location.protocol+'//'+window.location.host+path+'?username='+username
    //window.location.replace(url)
    window.history.pushState({},"socialytics", url);
    //console.log(username,' :: ',accesstoken)
  }
})
