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
