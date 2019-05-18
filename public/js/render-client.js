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
}

function render(html, container, caller){
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
  var currentVal = $(caller).val();
  /*if (currentVal) {
    currentVal = currentVal.replace('Loading... ', 'Get ');
  }*/

  $(caller).val(currentVal);
  $(caller).css('background-color', '#007bff');
  $(caller).find('#loading').remove();
  var doneDate = dayjs(Date.now()).format('YYYY MM-DD HH:mm:ss')
  //<span class="badge">7</span>
  if($(caller).next().hasClass('glyphicon'))$(caller).next().remove();
  $(caller).after('<span style="color:lawngreen;" class="glyphicon glyphicon-ok"></span>');

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
    $(caller).find('span').remove()
    $(caller).append('<span data-toggle="popover" data-trigger="hover" title="Last updated" data-content="' + doneDate + '" style="" class="badge pulse-default etl-badge" >' + count + '</span>');
  }
  var elem = $(caller).find('span');
  $(elem).popover();
  $(caller).removeClass('disabled');
  var optionsEngagement = {
    width:'150px',
    height:'30px',
    type: 'line',
    lineColor: '#cc4400',
    fillColor: '#ffaa80',
    lineWidth: 3,
    highlightLineColor: '#ffffff'
  };
  var optionsLikes = {
    width:'150px',
    height:'30px',
    type: 'line',
    lineColor: '#8f2724',
    fillColor: '#c23531',
    lineWidth: 3,
    highlightLineColor: '#ffffff'
  };
  var optionsComments = {
    width:'150px',
    height:'30px',
    type: 'line',
    lineColor: '#496954',
    fillColor: '#749f83',
    lineWidth: 3,
    highlightLineColor: '#ffffff'
  };
  var optionsSentiments = {
    width:'150px',
    height:'30px',
    type: 'line',
    lineColor: '#365e63',
    fillColor: '#61a0a8',
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

function norender(caller){
  closeNav('social-sidepanel');
  console.log('Did not provide all required input data');
  window.alert('please provide all required');
  //var currentVal = $('.disabled').val();
  //if (currentVal) currentVal = currentVal.replace('Loading... ', 'Get ');
  //$('.disabled').val(currentVal);
  $('#loading').remove();
  $(caller).css('background-color', '#007bff');
  //$('.disabled').next().remove();
  $(caller).removeClass('fired');
  //$(caller).removeClass('fired');
  $(caller).removeClass('disabled');
}

function renderFormData(txt){
  console.log('rendering text...')
  var json = JSON.parse(txt);
  if(json.username)document.getElementById('username-input').value = json.username;
  if(json.username)document.getElementById('tag-input').value = json.tag;
  if(json.username)document.getElementById('location-input').value = json.location;
  if(json.username)document.getElementById('search-input').value = json.query;
  if(json.username)document.getElementById('count-input').value = json.count;
  if(json.username)document.getElementById('shortcode-input').value = json.shortcode;
  $("#search-input").on('keypress',(e)=>{
    console.log(e.which)
    if(e.which===13){
      var value = $("#search-input").val();
      if(value.length>3){
        window.fetch('https://www.instagram.com/web/search/topsearch/?query='+value).then(res=>{
          return res.json()
        }).then(function (json) {
          if(json){
            json = json.users;
            $("#autocomplete-results").html('');
            $("#autocomplete-results").append('<div style="width:100%;color:#f8f9fa;padding:5px;font-family: monospace; background: rgba(0,123,255,.5);text-align: center">Drag profiles to desired sets</div>')
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
        });
      }
      else{
        $("#autocomplete-results").html('')
      }
    }
  });
  $("#searchProfileBtn").click(()=>{
    var value = $("#search-input").val();
    if(value.length>3){
      window.fetch('https://www.instagram.com/web/search/topsearch/?query='+value).then(res=>{
        return res.json()
      }).then(function (json) {
        if(json){
          json = json.users;
          $("#autocomplete-results").html('')

          for(var i of json){
            i = i.user;
            var verified = i.is_verified? 'Verified':'Not verified'
            $("#autocomplete-results").append(
              '<div class="search-result">'+
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
      });
    }
  });

  var tagsOptions = {
    'defaultText':'Drag or add a profile...',
    width:'400px',
    height:'10%'
  };
  if(json.seta){
    console.log('set A found');

    $('#seta').tagsInput(tagsOptions).importTags(json.seta.toString());

    //document.getElementById('seta').value = json.seta.toString();
  }
  if(json.setb){
    console.log('set B found');
    //document.getElementById('setb').value = json.setb.toString();

    $('#setb').tagsInput(tagsOptions).importTags(json.setb.toString());

  }

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
function renderItem(params, api) {
  var values = [api.value(0), api.value(1)];
  var coord = api.coord(values);
  var size = api.size([1, 1], values);
  return {
    type: 'sector',
    shape: {
      cx: params.coordSys.cx,
      cy: params.coordSys.cy,
      r0: coord[2] - size[0] / 2,
      r: coord[2] + size[0] / 2,
      startAngle: -(coord[3] + size[1] / 2),
      endAngle: -(coord[3] - size[1] / 2)
    },
    style: api.style({
      fill: api.visual('color')
    })
  };
}
function chartit(container, options){
  var dom = document.getElementById(container)
  if(echarts.getInstanceByDom(dom)){
    echarts.getInstanceByDom(dom).dispose()
    var chart = echarts.init(dom);
    chart.setOption(options)
  }else{
    var chart = echarts.init(dom);
    chart.setOption(options)
  }

}
