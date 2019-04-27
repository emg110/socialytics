function ig_media_preview(base64data) {
  var jpegtpl = "/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEABsaGikdKUEmJkFCLy8vQkc/Pj4/R0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0cBHSkpNCY0PygoP0c/NT9HR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR//AABEIABQAKgMBIgACEQEDEQH/xAGiAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgsQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+gEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoLEQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2gAMAwEAAhEDEQA/AA==",
    t = atob(base64data),
    p = t.slice(3).split(""),
    o = t.substring(0, 3).split("").map(function (e) {
      return e.charCodeAt(0)
    }),
    c = atob(jpegtpl).split("");
  c[162] = String.fromCharCode(o[1]);
  c[160] = String.fromCharCode(o[2]);
  return base64data ? "data:image/jpeg;base64," + btoa(c.concat(p).join("")) : null
};

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

function render(html, container){
  document.getElementById('social-sidepanel').style.backgroundColor = "#fff";
  OverlayScrollbars(document.getElementById('social-sidepanel'), {
    className : "os-theme-dark",
  });
  var index = parseInt(ls.getItem('currentFreeIndex'));
  var results = JSON.parse(ls.getItem('results'));
  var counters = JSON.parse(ls.getItem('counters'));
  results[index] = {html: html};

  document.getElementById('instagram-container').innerHTML = html;
  if (container !== 'main') {
    $("#backbtn").show();
  }

  index++;
  var currentVal = $('.disabled').val();
  /*if (currentVal) {
    currentVal = currentVal.replace('Loading... ', 'Get ');
  }*/

  $('.disabled').val(currentVal);
  $('.disabled').css('background-color', '#007bff');
  $('.disabled').find('#loading').remove();
  var doneDate = dayjs(Date.now()).format('YYYY MM-DD HH:mm:ss')
  //<span class="badge">7</span>
  $('.disabled').next().remove();
  $('.disabled').after('<span style="color:lawngreen;" class="glyphicon glyphicon-ok"></span>');
  var count = 0;
  if (counters[currentVal]) {
    if (counters[currentVal] >= 1) {
      count = counters[currentVal] + 1;
      counters[currentVal]++;
    } else {
      counters[currentVal] = 1;
      count = 1
    }
  } else {
    counters[currentVal] = 1;
    count = 1
  }
  if (count > 0) {
    $('.disabled').find('span').remove()
    $('.disabled').append('<span data-toggle="popover" data-trigger="hover" title="Last updated" data-content="' + doneDate + '" style="" class="badge pulse-default etl-badge" >' + count + '</span>');
  }
  var elem = $('.disabled').find('span');
  $(elem).popover();
  $('.disabled').removeClass('disabled');
  var optionsEngagement = {
    width:'150px',
    height:'40px',
    type: 'line',
    lineColor: '#e0c526',
    fillColor: '#e08e0b',
    lineWidth: 3,
    highlightLineColor: '#ffffff'
  };
  var optionsLikes = {
    width:'150px',
    height:'40px',
    type: 'line',
    lineColor: '#44ff6e',
    fillColor: '#21c936',
    lineWidth: 3,
    highlightLineColor: '#ffffff'
  };
  var optionsComments = {
    width:'150px',
    height:'40px',
    type: 'line',
    lineColor: '#003f7f',
    fillColor: '#5690c9',
    lineWidth: 3,
    highlightLineColor: '#ffffff'
  };
  var optionsSentiments = {
    width:'150px',
    height:'40px',
    type: 'line',
    lineColor: '#7f2e29',
    fillColor: '#c9424a',
    lineWidth: 3,
    highlightLineColor: '#ffffff'
  };
  engagementData =  $('#sparkline-data').attr('sparkline-data');
  likesData =  $('#sparkline-likes-data').attr('sparkline-data');
  commentsData =  $('#sparkline-comments-data').attr('sparkline-data');
  sentimentData =  $('#sparkline-likes-data').attr('sparkline-data');
  if(engagementData){
    engagementData = engagementData.split(',') || [];
    if(engagementData.length>=1){
      $('#sparkline').sparkline(engagementData, optionsEngagement)
    }
  }
  if(likesData){
    likesData = likesData.split(',') || [];
    if(likesData.length>=1){
      $('#sparkline-likes').sparkline(likesData, optionsLikes)
    }
  }
  if(commentsData){
    commentsData = commentsData.split(',') || [];
    if(commentsData.length>=1){
      $('#sparkline-comments').sparkline(commentsData, optionsComments)
    }
  }
  if(sentimentData){
    sentimentData = sentimentData.split(',') || [];
    if(sentimentData.length>=1){
      $('#sparkline-sentiments').sparkline(sentimentData, optionsSentiments)
    }
  }
  ls.setItem('results',JSON.stringify(results));
  ls.setItem('currentFreeIndex',index.toString());
  ls.setItem('counters',JSON.stringify(counters));
  /*  var myChart = echarts.init(document.getElementById('sparkline'));

    // specify chart configuration item and data
    var option = {
      title: {
        text: 'Engagement activity'
      },
      tooltip: {},
      legend: {
        data:['Engagement']
      },
      xAxis: {
        data: ["shirt","cardign","chiffon shirt","pants","heels","socks"]
      },
      yAxis: {},
      series: [{
        name: 'Engagement',
        type: 'bar',
        data: engagementData
      }]
    };

    // use configuration item and data specified to show chart
    myChart.setOption(option);*/
}

function norender(){
  closeNav('social-sidepanel');
  console.log('Did not provide all required input data');
  window.alert('please provide all required');
  //var currentVal = $('.disabled').val();
  //if (currentVal) currentVal = currentVal.replace('Loading... ', 'Get ');
  //$('.disabled').val(currentVal);
  $('#loading').remove();
  $('.disabled').css('background-color', '#007bff');
  //$('.disabled').next().remove();
  $('.disabled').removeClass('fired');
  $('.btn-primary').removeClass('fired');
  $('.btn-primary').removeClass('disabled');
}

function renderText(txt){
  var json = JSON.parse(txt);
  document.getElementById('username-input').value = json.username;
  document.getElementById('tag-input').value = json.tag;
  document.getElementById('location-input').value = json.location;
  document.getElementById('search-input').value = json.query;
  document.getElementById('count-input').value = json.count;
  document.getElementById('shortcode-input').value = json.shortcode;
  console.log(json);
}

function getEndpoint(endpoint, type, code, container) {
  $("#carosel").hide();
  $("#logo").show();
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
            window.bulkevent = true;
            url = endpoint + 'username=' + username;
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
    if (url !== "NA" && url.indexOf('http://') >= 0) {
      $('.fired').addClass('disabled');
      $('.disabled').removeClass('fired');
      $('.btn-primary').removeClass('fired');
      $('.disabled').css('background-color', '#e08e0b');
      $('.disabled').append('<span id="loading" class="spinner-grow spinner-grow-sm"></span>');
      var xhr = new XMLHttpRequest();
      xhr.timeout = 0;
      xhr.open("GET", url, true);
      xhr.onload = function (e) {
        var html = xhr.responseText;
        if(html.length){
          if(html.length>0)render(html,container);
        }
      }
      xhr.send();
    }
    else {
      norender();
    }
  }
  else {
    var xhr = new XMLHttpRequest();
    xhr.timeout = 0;
    xhr.open("GET", endpoint, true);
    xhr.onload = function (e) {
      var txt = xhr.responseText;
      renderText(txt);
    }
    xhr.send();

  }

}

function carosel() {
  $("#powerpoint").carousel();
  // Enable Carousel Indicators
  $(".item").click(function () {
    $("#powerpoint").carousel(1);
  });
  // Enable Carousel Controls
  $(".carousel-control-prev").click(function () {
    $("#powerpoint").carousel("prev");
  });
}

function picit(item) {
  var pic = '';
  if (item.thumbnail_src) {
    pic = item.thumbnail_src;
  } else if (item.profile_pic_url) {
    pic = item.profile_pic_url;
  } else if (item.media_preview) {
    pic = item.media_preview;
    pic = ig_media_preview(pic);
  }
  return pic
}

$('.btn-primary').on('click', function () {
  var endpoint = $(this).attr('click-target');
  var type = $(this).attr('call-type');
  if(type !== 'form-data') {
    //var currentVal = $(this).val().replace('Get ', 'Loading... ');
    //$(this).val(currentVal);
    $(this).addClass('fired');
    //$(this).find('span').remove();
  }
  getEndpoint(endpoint, type, '', 'main');
});


