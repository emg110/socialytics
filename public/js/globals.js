var htmlNoData = htmlNoData || '<div class="loader loader--style1" title="0">  NO DATA HERE...</div>';
var legendHtmlA =
  '<div class="counter-metric-span ">' +
  '<div class="metrics-legend posts-legend classa">\n' +
  '          <span class="fa fa-instagram"></span>\n' +
  '        </div>\n' +
  '</div>' +
  '<div class="counter-metric-span ">' +
  '        <div class="metrics-legend followers-legend classa">\n' +
  '          <span class="fa fa-users"></span>\n' +
  '        </div>\n' +
  '</div>' +
  '<div class="counter-metric-span ">' +
  '        <div class="metrics-legend following-legend classa">\n' +
  '          <span class="fa fa-user-o"></span>\n' +
  '        </div>\n' +
  '</div>' +
  '<div class="counter-metric-span ">' +
  '        <div class="metrics-legend likes-legend classa">\n' +
  '          <span class="fa fa-heart-o"></span>\n' +
  '        </div>\n' +
  '</div>' +
  '<div class="counter-metric-span ">' +
  '        <div class="metrics-legend comments-legend classa">\n' +
  '          <span class="fa fa-comments-o"></span>\n' +
  '        </div>'+
  '</div>';
var legendHtmlB =
  '<div class="counter-metric-span ">' +
  '<div class="metrics-legend posts-legend classb">\n' +
  '          <span class="fa fa-instagram"></span>\n' +
  '        </div>\n' +
  '</div>' +
  '<div class="counter-metric-span ">' +
  '        <div class="metrics-legend followers-legend classb">\n' +
  '          <span class="fa fa-users"></span>\n' +
  '        </div>\n' +
  '</div>' +
  '<div class="counter-metric-span ">' +
  '        <div class="metrics-legend following-legend classb">\n' +
  '          <span class="fa fa-user-o"></span>\n' +
  '        </div>\n' +
  '</div>' +
  '<div class="counter-metric-span ">' +
  '        <div class="metrics-legend likes-legend classb">\n' +
  '          <span class="fa fa-heart-o"></span>\n' +
  '        </div>\n' +
  '</div>' +
  '<div class="counter-metric-span ">' +
  '        <div class="metrics-legend comments-legend classb">\n' +
  '          <span class="fa fa-comments-o"></span>\n' +
  '        </div>'+
  '</div>';
var htmlChartLoading = '<div class="loader loader--style7" title="6">\n' +
  '  <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\n' +
  '     width="24px" height="30px" viewBox="0 0 24 30" style="enable-background:new 0 0 50 50;" xml:space="preserve">\n' +
  '    <rect x="0" y="0" width="4" height="20" fill="#333">\n' +
  '      <animate attributeName="opacity" attributeType="XML"\n' +
  '        values="1; .2; 1" \n' +
  '        begin="0s" dur="0.6s" repeatCount="indefinite" />\n' +
  '    </rect>\n' +
  '    <rect x="7" y="0" width="4" height="20" fill="#333">\n' +
  '      <animate attributeName="opacity" attributeType="XML"\n' +
  '        values="1; .2; 1" \n' +
  '        begin="0.2s" dur="0.6s" repeatCount="indefinite" />\n' +
  '    </rect>\n' +
  '    <rect x="14" y="0" width="4" height="20" fill="#333">\n' +
  '      <animate attributeName="opacity" attributeType="XML"\n' +
  '        values="1; .2; 1" \n' +
  '        begin="0.4s" dur="0.6s" repeatCount="indefinite" />\n' +
  '    </rect>\n' +
  '  </svg>\n' +
  '</div>\n';
var htmlChartLoadingMini = '<div class="mini-loader loader--style7" title="6">\n' +
  '  <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\n' +
  '     width="12px" height="15px" viewBox="0 0 24 30" style="enable-background:new 0 0 50 50;" xml:space="preserve">\n' +
  '    <rect x="0" y="0" width="4" height="20" fill="#333">\n' +
  '      <animate attributeName="opacity" attributeType="XML"\n' +
  '        values="1; .2; 1" \n' +
  '        begin="0s" dur="0.6s" repeatCount="indefinite" />\n' +
  '    </rect>\n' +
  '    <rect x="7" y="0" width="4" height="20" fill="#333">\n' +
  '      <animate attributeName="opacity" attributeType="XML"\n' +
  '        values="1; .2; 1" \n' +
  '        begin="0.2s" dur="0.6s" repeatCount="indefinite" />\n' +
  '    </rect>\n' +
  '    <rect x="14" y="0" width="4" height="20" fill="#333">\n' +
  '      <animate attributeName="opacity" attributeType="XML"\n' +
  '        values="1; .2; 1" \n' +
  '        begin="0.4s" dur="0.6s" repeatCount="indefinite" />\n' +
  '    </rect>\n' +
  '  </svg>\n' +
  '</div>\n';
var htmlLoading = htmlLoading || '<div class="loader loader--style1" title="0">\n' +
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
var powerpoint = '<div id="powerpoint" class="carousel slide" data-ride="carousel">\n' +
  '\n' +
  '              <!-- Indicators -->\n' +
  '              <ul class="carousel-indicators">\n' +
  '                <li data-target="#powerpoint" data-slide-to="0" class="active"></li>\n' +
  '                <li data-target="#powerpoint" data-slide-to="1"></li>\n' +
  '                <li data-target="#powerpoint" data-slide-to="2"></li>\n' +
  '                <li data-target="#powerpoint" data-slide-to="3"></li>\n' +
  '                <li data-target="#powerpoint" data-slide-to="4"></li>\n' +
  '                <li data-target="#powerpoint" data-slide-to="5"></li>\n' +
  '                <li data-target="#powerpoint" data-slide-to="6"></li>\n' +
  '                <li data-target="#powerpoint" data-slide-to="7"></li>\n' +
  '                <li data-target="#powerpoint" data-slide-to="8"></li>\n' +
  '                <li data-target="#powerpoint" data-slide-to="9"></li>\n' +
  '                <li data-target="#powerpoint" data-slide-to="10"></li>\n' +
  '              </ul>\n' +
  '\n' +
  '              <!-- The slideshow -->\n' +
  '              <div class="carousel-inner">\n' +
  '                <div class="carousel-item active">\n' +
  '                  <img style="max-width:100%;max-height:450px" src="img/ppt/Slide1.jpg" alt="Slide #1">\n' +
  '                </div>\n' +
  '                <div class="carousel-item">\n' +
  '                  <img style="max-width:100%;max-height:450px" src="img/ppt/Slide2.jpg" alt="Slide #2">\n' +
  '                </div>\n' +
  '                <div class="carousel-item">\n' +
  '                  <img style="max-width:100%;max-height:450px" src="img/ppt/Slide3.jpg" alt="Slide #3">\n' +
  '                </div>\n' +
  '                <div class="carousel-item">\n' +
  '                  <img style="max-width:100%;max-height:450px" src="img/ppt/Slide4.jpg" alt="Slide #4">\n' +
  '                </div>\n' +
  '                <div class="carousel-item">\n' +
  '                  <img style="max-width:100%;max-height:450px" src="img/ppt/Slide5.jpg" alt="Slide #5">\n' +
  '                </div>\n' +
  '                <div class="carousel-item">\n' +
  '                  <img style="max-width:100%;max-height:450px" src="img/ppt/Slide6.jpg" alt="Slide #6">\n' +
  '                </div>\n' +
  '                <div class="carousel-item">\n' +
  '                  <img style="max-width:100%;max-height:450px" src="img/ppt/Slide7.jpg" alt="Slide #7">\n' +
  '                </div>\n' +
  '                <div class="carousel-item">\n' +
  '                  <img style="max-width:100%;max-height:450px" src="img/ppt/Slide8.jpg" alt="Slide #8">\n' +
  '                </div>\n' +
  '                <div class="carousel-item">\n' +
  '                  <img style="max-width:100%;max-height:450px" src="img/ppt/Slide9.jpg" alt="Slide #9">\n' +
  '                </div>\n' +
  '                <div class="carousel-item">\n' +
  '                  <img style="max-width:100%;max-height:450px" src="img/ppt/Slide10.jpg" alt="Slide #10">\n' +
  '                </div>\n' +
  '              </div>\n' +
  '\n' +
  '              <!-- Left and right controls -->\n' +
  '              <a class="carousel-control-prev" href="#powerpoint" data-slide="prev">\n' +
  '                <span class="carousel-control-prev-icon"></span>\n' +
  '              </a>\n' +
  '              <a class="carousel-control-next" href="#powerpoint" data-slide="next">\n' +
  '                <span class="carousel-control-next-icon"></span>\n' +
  '              </a>\n' +
  '\n' +
  '            </div>';

/*OverlayScrollbars(document.querySelectorAll('body'), {
  className : "os-theme-dark",
});*/
var ls = ls || window.localStorage;
window.bulkevent = false;
var socket = {};
var socketB = {};
var app = {}
/*window.alert(window.location.href)
window.alert(window.location.host)
window.alert(window.location.hostname)
window.alert(window.location.pathname)*/
if(!ls.getItem('results'))ls.setItem('results',JSON.stringify([]));
if(!ls.getItem('currentFreeIndex'))ls.setItem('currentFreeIndex','0');
if(!ls.getItem('counters'))ls.setItem('counters',JSON.stringify({'empty':''}));
if(document.getElementById('instagram-container'))document.getElementById('instagram-container').innerHTML = htmlNoData;
Holder.addTheme("white", {
  bg: "#fff",
  fg: "#a7a7a7",
  size: 10
});
var ctrs = ls.getItem('counters');
ctrs = JSON.parse(ctrs);
for(i in Object.keys(ctrs)){
  var key = Object.keys(ctrs)[i];
  var value = ctrs[Object.keys(ctrs)[i]];
  if(key !== "empty"){
    var querySelector = "[value="+"'"+key+"'"+"]"
    $(querySelector).append('<span data-toggle="popover" data-trigger="hover" title="Last updated" data-content="' + 'Page refreshed!' + '" style="" class="badge pulse-default etl-badge" >' + value + '</span>');
  }
}
delete ctrs;

$("#carosel").hide();
$("#logo").click(function () {
  $("#carosel").show();
  $("#logo").hide();
  $("#carosel").html(powerpoint);
  $("#powerpoint").carousel();
// Enable Carousel Indicators
  $(".item").click(function () {
    $("#powerpoint").carousel(1);
  });
// Enable Carousel Controls
  $(".carousel-control-prev").click(function () {
    $("#powerpoint").carousel("prev");
  });
});

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  //ev.target.appendChild(document.getElementById(data));
  if($("#"+ev.target.id).hasClass('tagsinput')){
    $("#"+ev.target.id).addTag(data)

  }else{
    $("#"+ev.target.id).val()
    $("#"+ev.target.id).val(data)
   /* var instance = $("#autocomplete-results").overlayScrollbars()
    if(instance)instance.destroy()*/
    $("#autocomplete-results").html('<div>  </div>')
  }

}
