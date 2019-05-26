var tagsOptions = {
  'defaultText':'Drag or add a profile...',
  'width':'400px',
  'height':'10%'
};
$('#seta').tagsInput(tagsOptions)
$('#setb').tagsInput(tagsOptions)
function getSetsData(totalsA = {}, totalsB = {}, seta = [], setb = []) {
  var setLimit = document.getElementById('set-limit-input').value || 3
  if(setLimit){
    seta = document.getElementById('seta').value.split(',').slice(0,setLimit);
    setb = document.getElementById('setb').value.split(',').slice(0,setLimit);
  }else{
    seta = document.getElementById('seta').value.split(',');
    setb = document.getElementById('setb').value.split(',');
  }

  totalsA = totalsB = {
    totalPosts:0,
    totalFollowers:0,
    totalFollowing:0,
    totalLikes:0,
    totalComments:0
  }
  totalsA['name']='seta';
  totalsB['name']='setb';
  var icounterB = 0;
  var icounterA = 0;

  $("#countera").html(htmlChartLoadingMini);
  $("#counterb").html(htmlChartLoadingMini);
  var user = ls.getItem('username');
  var accesstoken = ls.getItem('accesstoken');
  if (accesstoken) console.log('info: accessToken is available');
  console.log('info: Now getting endpoint data... ' + 'for user: ' + user);
  var xhr = new XMLHttpRequest();
  var url = '/instagram/set/data?setAData=';
  url += seta.toString();
  url += '&setBData=';
  url += setb.toString();
  xhr.timeout = 0;
  xhr.open("GET", url, true);
  xhr.setRequestHeader('username', user)
  xhr.setRequestHeader('accesstoken', accesstoken)
  xhr.setRequestHeader('strategy', 'jwt')
  xhr.onload = function (e) {
    var html = xhr.responseText;
    //console.log(html)
    var json = JSON.parse(html);
    var htmlA = '<div class="counter-metric-home-span posts"><span class="fa fa-instagram"></span><br>A: ' + json.totalInstaPostsA + '</div>'+
      '<div class="counter-metric-home-span posts"><span class="fa fa-database"></span><br>A: ' + json.totalDbPostsA + '</div>';
    $("#countera").html(htmlA);
    var htmlB = '<div class="counter-metric-home-span posts"><span class="fa fa-instagram"></span><br>B: ' + json.totalInstaPostsB + '</div>'+
      '<div class="counter-metric-home-span posts"><span class="fa fa-database"></span><br>B: ' + json.totalDbPostsB + '</div>';
      $("#counterb").html(htmlB);
  }
  xhr.send();

}
