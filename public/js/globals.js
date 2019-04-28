var htmlNoData = '<div class="loader loader--style1" title="0">  NO DATA HERE...</div>';
var htmlLoading = '<div class="loader loader--style1" title="0">\n' +
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
OverlayScrollbars(document.querySelectorAll('body'), {
  className : "os-theme-dark",
});
var ls = window.localStorage;
window.bulkevent = false;
var socketUri = window.location.protocol+'//'+window.location.host+':'+ (window.location.port? window.location.port : '80');
console.log(socketUri);
var socket = io(socketUri);
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
});
$("#github").click(function () {
  window.open('https://github.com/emg110/socialytics/', '_blank');
});
