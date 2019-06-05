//$("#textProcBtn").hide();
$("#text-procb").responsiveTabs({
  startCollapsed: 'accordion'
})
$('#text-procb').responsiveTabs('activate', 0);
$("#text-proca").responsiveTabs({
  startCollapsed: 'accordion'
})
$('#text-proca').responsiveTabs('activate', 0);
function textProc(set){
  var profilesArrA = [];
  var profilesArrB = [];
  window.wordcloudB = false
  window.wordcloudA = false
  window.emojicloudB = false;
  window.emojicloudA = false;

  if(set==='seta'){
    for(let itemAJ of window['profilesA']){
      profilesArrA.push(itemAJ.id)

    }
    getTextProcData(profilesArrA.toString(),set).then((res)=>{
      var htmlTextProca =
        '<div id="wordCount-metrica" class="counter-metric-span" title="Word count">' + 0 + '<br ><span class="fa fa-wikipedia-w"></span></div>' +
        '<div id="sentiment-metrica" class="counter-metric-span" title="Sentiment">' + 0 + '<br ><span class="fa fa-smile-o"></span></div>' +
        '<div id="hashtag-metrica" class="counter-metric-span" title="Hashtag">' + 0 + '<br ><span class="fa fa-hashtag"></span></div>' +
        '<div id="keyword-metrica" class="counter-metric-span" title="Keywords">' + 0 + '<br ><span class="fa fa-key"></span></div>' +
        '<div id="mention-metrica" class="counter-metric-span" title="Mention">' + 0 + '<br ><span class="fa fa-at" style="cursor:pointer;"></span></div>';

      $("#text-proc-totalsa").html(htmlTextProca);
      var resObj = JSON.parse(res);
      var resData = resObj.results;
      var words = []
      var emojis = []
      var wordCloud = resObj.wordcloud
      var emojicloud = resObj.emojicloud

      for (i in wordCloud){
        words.push({
          text:i,
          weight:wordCloud[i]
        })
      }
      for (j in emojicloud){
        emojis.push({
          text:j,
          weight:emojicloud[j]+10
        })
      }



      if(window.wordcloudA){
        $("#wordCloudALink").off('click');

        $('#wordCloudA').jQCloud('update',words);
        $("#wordCloudALink").on('click',function(){
          $('#wordCloudA').jQCloud('update',words);
        })
      }
      else{
        $("#wordCloudA").height(400);
        $("#wordCloudA").html('<span></span>');
        $('#wordCloudA').jQCloud(words,{shape: 'rectangular',autoResize: true,delay: 5});
        $("#wordCloudALink").on('click',function(){
          $('#wordCloudA').jQCloud('update',words);
        })
        window.wordcloudA = true;
      }
      if(window.emojicloudA){
        $("#emojiCloudALink").off('click');
        $("#emojiCloudALink").on('click',function(){
          $('#emojiCloudA').jQCloud('update',emojis);
        })
      }
      else{
        $("#emojiCloudALink").on('click',function(){
          $("#emojiCloudA").height(400);
          $("#emojiCloudA").html('<span></span>');
          $('#emojiCloudA').jQCloud(emojis,{shape: 'rectangular',autoResize: true,delay: 5,fontSize: {
              from: 0.1,
              to: 0.01
            }});
          $("#emojiCloudALink").off('click');
          $("#emojiCloudALink").on('click',function(){
            $('#emojiCloudA').jQCloud('update',emojis);
          })
          window.emojicloudA = true;
        })
      }
      console.log(resData.length+' text processing results for profiles of seta')
    })
  }
  else if(set==='setb'){
    for(let itemBJ of window['profilesB']){
      profilesArrB.push(itemBJ.id)

    }
    getTextProcData(profilesArrB.toString(),set).then((resb)=>{
      var htmlTextProcb = '<div id="wordCount-metricb" class="counter-metric-span" title="Word count">' + 0 + '<br ><span class="fa fa-wikipedia-w"></span></div>' +
        '<div id="sentiment-metricb" class="counter-metric-span" title="Sentiment">' + 0 + '<br ><span class="fa fa-smile-o"></span></div>' +
        '<div id="hashtag-metricb" class="counter-metric-span" title="Hashtag">' + 0 + '<br ><span class="fa fa-hashtag"></span></div>' +
        '<div id="keyword-metricb" class="counter-metric-span" title="Keywords">' + 0 + '<br ><span class="fa fa-key"></span></div>' +
        '<div id="mention-metricb" class="counter-metric-span" title="Mention">' + 0 + '<br ><span class="fa fa-at" style="cursor:pointer;"></span></div>';

      $("#text-proc-totalsb").html(htmlTextProcb);
      var resObjB = JSON.parse(resb);
      var resDataB = resObjB.results;
      var wordsB = []
      var emojisB = []
      var sentimentsNutB = []
      var sentimentsPosB = []
      var sentimentsNegB = []
      var wordCloudB = resObjB.wordcloud
      var emojicloudB = resObjB.emojicloud

      for (var iB in wordCloudB){
        wordsB.push({
          text:iB,
          weight:wordCloudB[iB]
        })
      }
      for (var jB in emojicloudB){
       emojisB.push({
          text:jB,
          weight:emojicloudB[jB]+10
        })
      }
      var optionsRadarB = {
        grid: {containLabel: true,top:0,},
        series: [ ],
        textStyle:{
          color:'#999'
        }
      };
      /*for (var kB in resDataB){
        var score = resDataB[kB].sentiment.score;
        if(score>0){
          sentimentsPosB.push(score)
        }else if(score<0){
          sentimentsNegB.push()
        }else if(score===0){
          sentimentsNutB.push()
        }



      }*/




      if(window.wordcloudB){
        $("#wordCloudBLink").off('click');

        $('#wordCloudB').jQCloud('update',wordsB);
        $("#wordCloudBLink").on('click',function(){
          $('#wordCloudB').jQCloud('update',wordsB);
        })
      }
      else{
        $("#wordCloudB").height(400);
        $("#wordCloudB").html('<span></span>');
        $('#wordCloudB').jQCloud(wordsB,{shape: 'rectangular',autoResize: true,delay: 5});
        $("#wordCloudBLink").on('click',function(){
          $('#wordCloudB').jQCloud('update',wordsB);
        })
        window.wordcloudB = true;
      }
      if(window.emojicloudB){
        $("#emojiCloudBLink").off('click');
        $("#emojiCloudBLink").on('click',function(){
          $('#emojiCloudB').jQCloud('update',emojisB);
        })
      }
      else{
        $("#emojiCloudBLink").on('click',function(){
          $("#emojiCloudB").height(400);
          $("#emojiCloudB").html('<span></span>');
          $('#emojiCloudB').jQCloud(emojisB,{shape: 'rectangular',autoResize: true,delay: 5,fontSize: {
              from: 0.1,
              to: 0.01
            }});
          $("#emojiCloudBLink").off('click');
          $("#emojiCloudBLink").on('click',function(){
            $('#emojiCloudB').jQCloud('update',emojisB);
          })
          window.emojicloudB = true;
        })
      }
      console.log(resDataB.length+' text processing results for profiles of setb')
    })
  }



}
function getStatsData(totalsA = {}, totalsB = {}, seta = [], setb = []) {

  var setLimit = document.getElementById('set-limit-input').value
  if(setLimit){
    seta = document.getElementById('seta').value.split(',').slice(0,parseInt(setLimit));
    setb = document.getElementById('setb').value.split(',').slice(0,parseInt(setLimit));
  }
  else{
    seta = document.getElementById('seta').value.split(',');
    setb = document.getElementById('setb').value.split(',');
  }
var profileCounterA = 0;
var profileCounterB = 0;
  totalsA = totalsB = {
    totalPosts:0,
    totalFollowers:0,
    totalFollowing:0,
    totalLikes:0,
    totalComments:0
  }
  totalsA['name']='seta'
  totalsB['name']='setb'
  var icounterB = 0;
  var icounterA = 0;

  var optionsBarA = {
    grid: {containLabel: true,top:0,},
    xAxis: {
      name: 'Followers',
      nameLocation: 'center',
      nameGap: 25
    },
    yAxis: {
      name: 'Profiles',
      nameRotate:90,
      nameLocation: 'center',
      inverse:true,
      type: 'category',
      data: [],
      axisLabel:{
        show:false
      }
    },
    visualMap: {
      textStyle:{
        color:'#999'
      },
      orient: 'horizontal',
      left: 'center',
      min: 1000,
      max: 1000000,
      text: ['Most followers', 'Least followers'],
      // Map the score column to color
      dimension: 0,

      inRange: {
        color: ['#daa326', '#E15457']
      }
    },
    series: [ ],
    textStyle:{
      color:'#999'
    }
  };
  var optionsBarB = {
    grid: {containLabel: true,top:10},
    xAxis: {
      name: 'Followers',
      nameLocation: 'center',
      nameGap: 25
    },
    yAxis: {
      inverse:true,
      name: 'Profiles',
      nameRotate:90,
      nameLocation: 'center',
      type: 'category',
      data: [],
      axisLabel:{
        show:false
      }
    },
    visualMap: {
      textStyle:{
        color:'#999'
      },
      orient: 'horizontal',
      left: 'center',
      min: 1000,
      max: 1000000,
      text: ['Most followers', 'Least followers'],
      // Map the score column to color
      dimension: 0,

      inRange: {
        color: ['#daa326', '#E15457']
      }
    },
    series: [],
    textStyle:{
      color:'#999'
    }
  };
  var optionsHeatA = {
    textStyle:{
      color:'#777'
    },
    tooltip: {
      position: 'top'
    },
    animation: false,
    grid: {
      height: '50%',
      y: '10%',
      left:75,
      textStyle:{
        color:'#999'
      }
    },
    xAxis: {
      type: 'category',
      data: [],
      splitArea: {
        show: true
      },
      name: 'Hour of day',
      nameLocation: 'center',
      nameGap: 25,
      position:'right',
      /*right:20*/
    },
    yAxis: {
      name: 'Day of week',
      nameLocation: 'center',
      nameGap: 60,
      nameRotate:90,
      type: 'category',
      data:['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
      splitArea: {
        show: true
      },
      left:40,
      textStyle:{
        color:'#999'
      }
    },
    visualMap: {
      min: 0,
      max: 10,
      calculable: true,
      orient: 'horizontal',
      left: 'center',
      bottom: '15%',
      text:['Max engagement','Min engagement'],
      textStyle:{
        color:'#999'
      }
    },
    series: [{
      name: 'Seta',
      type: 'heatmap',
      data: [],
      label: {

        normal: {
          color:'#000',
          show: true
        }
      },
      itemStyle: {
        emphasis: {
          shadowBlur: 10,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }]
  };
  var optionsHeatB = {
    textStyle:{
      color:'#777'
    },
    tooltip: {
      position: 'top'
    },
    animation: false,
    grid: {
      height: '50%',
      y: '10%',
      left:75,
      textStyle:{
        color:'#999'
      }
    },
    xAxis: {
      type: 'category',
      data: [],
      splitArea: {
        show: true
      },
      name: 'Hour of day',
      nameLocation: 'center',
      nameGap: 25,
      position:'right',
      /*right:20*/
    },
    yAxis: {
      name: 'Day of week',
      nameLocation: 'center',
      nameGap: 60,
      nameRotate:90,
      type: 'category',
      data:['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
      splitArea: {
        show: true
      },
      left:40,
      textStyle:{
        color:'#999'
      }
    },
    visualMap: {
      min: 0,
      max: 10,
      calculable: true,
      orient: 'horizontal',
      left: 'center',
      bottom: '15%',
      text:['Max engagement','Min engagement'],
      textStyle:{
        color:'#999'
      }
    },
    series: [{
      name: 'Setb',
      type: 'heatmap',
      data: [],
      label: {

        normal: {
          color:'#000',
          show: true
        }
      },
      itemStyle: {
        emphasis: {
          shadowBlur: 10,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }]
  };
  var optionsLineA = {
    tooltip:{},
    grid: {containLabel: true,top:50,left:130},
    yAxis: {
      name: 'Metrics',
      nameLocation: 'center',
      nameGap: 25,
      nameRotate:90,
      position:'right'
    },
    dataZoom: [{
      start: 0,
      end:7,
      dataBackground:{
        areaStyle:{
          opacity:0.9,
          shadowColor:'rgba(48,153,153,0.8)'
        }
      }
    },{
      start: 0,
      end:7,
      type: 'inside'
    }],
    legend: {
      orient:'vertical',
      top:30,
      left:10,
      align:'left',
      textStyle:{
        color:'#999'
      },
      data:[]
    },
    xAxis: {
      /* type: 'category',*/
      data: [],
      inverse:true,
      axisLabel:{
        show:true
      },
      /*    boundaryGap: ['0%', '0%']*/
    },
    /*visualMap: {
      textStyle:{
        color:'#999'
      },
      orient: 'horizontal',
      left: 'center',
      min: 1000,
      max: 1000000,
      text: ['Most followers', 'least followers'],
      // Map the score column to color
      dimension: 0,

      inRange: {
        color: ['#daa326', '#E15457']
      }
    },*/
    series: [ ],
    textStyle:{
      color:'#999'
    }
  };
  var optionsPieDomA = {
    legend: [{
      top:5,
      data:[],
      textStyle:{
        color:'#999'
      }
    },{
      bottom:40,
      left:5,
      orient:'horizontal',
      data:[],
      textStyle:{
        color:'#999'
      }
    }],
    roseType:'radius',
    tooltip: {},
    /* dataset: {
       source: [
         ['pie'],
         ['DoM'],
         ['DoW'],
         ['MoY'],
         ['HoD']
       ]
     },*/
    series: [/*{
      type: 'pie',
      radius: 60,
      center: ['25%', '30%']
      // No encode specified, by default, it is first.
    }*//*, {
      type: 'pie',
      radius: 60,
      center: ['75%', '30%'],
      encode: {
        itemName: 'profile',
        value: ''
      }
    }*/]
  };
  var optionsPieDowA = {
    legend: [{
      top:5,
      data:[],
      textStyle:{
        color:'#999'
      }
    },{
      bottom:40,
      left:5,
      orient:'horizontal',
      data:[],
      textStyle:{
        color:'#999'
      }
    }],
    roseType:'radius',
    tooltip: {},
    /* dataset: {
       source: [
         ['pie'],
         ['DoM'],
         ['DoW'],
         ['MoY'],
         ['HoD']
       ]
     },*/
    series: [/*{
      type: 'pie',
      radius: 60,
      center: ['25%', '30%']
      // No encode specified, by default, it is first.
    }*//*, {
      type: 'pie',
      radius: 60,
      center: ['75%', '30%'],
      encode: {
        itemName: 'profile',
        value: ''
      }
    }*/]
  };
  var optionsPieHodA = {
    legend: [{
      top:5,
      data:[],
      textStyle:{
        color:'#999'
      }
    },{
      bottom:40,
      left:5,
      orient:'horizontal',
      data:[],
      textStyle:{
        color:'#999'
      }
    }],
    roseType:'radius',
    tooltip: {},
    /* dataset: {
       source: [
         ['pie'],
         ['DoM'],
         ['DoW'],
         ['MoY'],
         ['HoD']
       ]
     },*/
    series: [/*{
      type: 'pie',
      radius: 60,
      center: ['25%', '30%']
      // No encode specified, by default, it is first.
    }*//*, {
      type: 'pie',
      radius: 60,
      center: ['75%', '30%'],
      encode: {
        itemName: 'profile',
        value: ''
      }
    }*/]
  };
  var optionsLineB = {
    tooltip:{},
    grid: {containLabel: true,top:50,left:130},
    yAxis: {
      name: 'Metrics',
      nameLocation: 'center',
      nameGap: 25,
      nameRotate:90,
      position:'right'
    },
    dataZoom: [{
      start: 0,
      end:7,
      dataBackground:{
        areaStyle:{
          opacity:0.9,
          shadowColor:'rgba(48,153,153,0.8)'
        }
      }
    },{
      start: 0,
      end:7,
      type: 'inside'
    }],
    legend: {
      orient:'vertical',
      top:30,
      left:10,
      align:'left',
      textStyle:{
        color:'#999'
      },
      data:[]
    },
    xAxis: {
      /* type: 'category',*/
      data: [],
      inverse:true,
      axisLabel:{
        show:true
      },
      /*    boundaryGap: ['0%', '0%']*/
    },
    /*visualMap: {
      textStyle:{
        color:'#999'
      },
      orient: 'horizontal',
      left: 'center',
      min: 1000,
      max: 1000000,
      text: ['Most followers', 'least followers'],
      // Map the score column to color
      dimension: 0,

      inRange: {
        color: ['#daa326', '#E15457']
      }
    },*/
    series: [ ],
    textStyle:{
      color:'#999'
    }
  };
  var optionsPieDomB = {
    legend: [{
      top:5,
      data:[],
      textStyle:{
        color:'#999'
      }
    },{
      bottom:40,
      left:5,
      orient:'horizontal',
      data:[],
      textStyle:{
        color:'#999'
      }
    }],
    roseType:'radius',
    tooltip: {},
    /* dataset: {
       source: [
         ['pie'],
         ['DoM'],
         ['DoW'],
         ['MoY'],
         ['HoD']
       ]
     },*/
    series: [/*{
      type: 'pie',
      radius: 60,
      center: ['25%', '30%']
      // No encode specified, by default, it is first.
    }*//*, {
      type: 'pie',
      radius: 60,
      center: ['75%', '30%'],
      encode: {
        itemName: 'profile',
        value: ''
      }
    }*/]
  };
  var optionsPieDowB = {
    legend: [{
      top:5,
      data:[],
      textStyle:{
        color:'#999'
      }
    },{
      bottom:40,
      left:5,
      orient:'horizontal',
      data:[],
      textStyle:{
        color:'#999'
      }
    }],
    roseType:'radius',
    tooltip: {},
    /* dataset: {
       source: [
         ['pie'],
         ['DoM'],
         ['DoW'],
         ['MoY'],
         ['HoD']
       ]
     },*/
    series: [/*{
      type: 'pie',
      radius: 60,
      center: ['25%', '30%']
      // No encode specified, by default, it is first.
    }*//*, {
      type: 'pie',
      radius: 60,
      center: ['75%', '30%'],
      encode: {
        itemName: 'profile',
        value: ''
      }
    }*/]
  };
  var optionsPieHodB = {
    legend: [{
      top:5,
      data:[],
      textStyle:{
        color:'#999'
      }
    },{
      bottom:40,
      left:5,
      orient:'horizontal',
      data:[],
      textStyle:{
        color:'#999'
      }
    }],
    roseType:'radius',
    tooltip: {},
    /* dataset: {
       source: [
         ['pie'],
         ['DoM'],
         ['DoW'],
         ['MoY'],
         ['HoD']
       ]
     },*/
    series: [/*{
      type: 'pie',
      radius: 60,
      center: ['25%', '30%']
      // No encode specified, by default, it is first.
    }*//*, {
      type: 'pie',
      radius: 60,
      center: ['75%', '30%'],
      encode: {
        itemName: 'profile',
        value: ''
      }
    }*/]
  };

  var optionsGeoA = {
    backgroundColor: '#404a59',
    title: {
      text: 'Location engagement',
      subtext: 'Set A posts',
      x:'center',
      textStyle: {
        color: '#fff'
      }
    },
    roam:true,
    /*    zoom:80,
        layoutCenter: ['30%', '100%'],
        layoutSize:600,*/
    tooltip: {
      trigger: 'item',
      formatter: function (params) {
        return params.name + ' : ' + params.value[2];
      }
    },
    legend: {
      orient: 'vertical',
      y: 'bottom',
      x:'right',
      data:['postsa-scatter','postsa-heat'],
      textStyle: {
        color: '#fff'
      }
    },
    visualMap: {
      min: 0,
      max: 5,
      calculable: true,
      inRange: {
        color: ['#92bab3', '#eac736', '#d94e5d']
      },
      textStyle: {
        color: '#fff'
      }
    },
    geo: {
      map: 'world',
      label: {
        emphasis: {
          show: false
        }
      },
      itemStyle: {
        normal: {
          areaColor: '#323c48',
          borderColor: '#111'
        },
        emphasis: {
          areaColor: '#2a333d'
        }
      }
    },
    series: [
      {
        name: 'postsa-scatter',
        type: 'scatter',
        coordinateSystem: 'geo',
        data: [],
        symbolSize: 12,
        label: {
          normal: {
            show: false
          },
          emphasis: {
            show: false
          }
        },
        itemStyle: {
          emphasis: {
            borderColor: '#fff',
            borderWidth: 1
          }
        }
      },
      {
        name: 'postsa-heat',
        type: 'heatmap',
        coordinateSystem: 'geo',
        data: []
      }
    ]
  }
  var optionsGeoB = {
    backgroundColor: '#404a59',
    zoom:3,
    roam:true,
    title: {
      text: 'Location engagement',
      subtext: 'Set B posts',
      x:'center',
      textStyle: {
        color: '#fff'
      }
    },
    tooltip: {
      trigger: 'item',
      formatter: function (params) {
        return params.name + ' : ' + params.value[2];
      }
    },
    legend: {
      orient: 'vertical',
      y: 'bottom',
      splitNumber: 5,
      inRange: {
        color: ['#50a3ba', '#eac736', '#d94e5d'].reverse()
      },
      x:'right',
      data:['postsb-scatter','postsb-heat'],
      textStyle: {
        color: '#fff'
      }
    },
    visualMap: {
      min: 0,
      max: 5,
      calculable: true,
      inRange: {
        color: ['#50a3ba', '#eac736', '#d94e5d']
      },
      textStyle: {
        color: '#fff'
      }
    },
    geo: {
      map: 'world',
      label: {
        emphasis: {
          show: false
        }
      },
      itemStyle: {
        normal: {
          areaColor: '#323c48',
          borderColor: '#111'
        },
        emphasis: {
          areaColor: '#2a333d'
        }
      }
    },
    series: [
      {
        name: 'postsb-scatter',
        type: 'scatter',
        coordinateSystem: 'geo',
        data: [],
        symbolSize: 12,
        label: {
          normal: {
            show: false
          },
          emphasis: {
            show: false
          }
        },
        itemStyle: {
          emphasis: {
            borderColor: '#fff',
            borderWidth: 1
          }
        }
      },
      {
        name: 'postsb-heat',
        type: 'heatmap',
        coordinateSystem: 'geo',
        data: []
      }
    ]
  }

  socket.removeListener('authenticated:seta');
  socketB.removeListener('authenticated:setb');

  socket.on('authenticated:seta', function (response) {
    var desc = response.socRes.desc;
    if (desc === 'seta-profile-userid') {
      if (response.data) {
        window.profilesA = response.data.data;
        totalsA = {
          totalPosts:0,
          totalFollowers:0,
          totalFollowing:0,
          totalLikes:0,
          totalComments:0
        };
        $("#profiles-counters-a").html('');
        optionsBarA.series.push({
          type: 'bar',
          name:'followers',
          barGap:'100%',
          data:[],
          label:{
            show:true,
            color:'#fff',
            formatter: '{b}'
          }
        });

        //$("#profiles-counters-a").append(legendHtmlA)
        $("#profileA-metrics-legend").html(legendHtmlA);
        for (let itemA of window.profilesA) {
          var accountA = itemA.username;
          var useridA = itemA.id;
          var postCountA = itemA.edge_owner_to_timeline_media.count || 0;
          var followersCountA = itemA.edge_followed_by.count || 0;
          var followingCountA = itemA.edge_follow.count || 0;
          itemA.posts = postCountA;
          itemA.followers = followersCountA;
          itemA.following = followingCountA;

          totalsA.totalPosts += postCountA;
          totalsA.totalFollowers += followersCountA;
          totalsA.totalFollowing += followingCountA;
          getServiceData('find',
            'instagram/postsa',
            {
              query: {
                "owner.id": useridA,
                $sort: {timestamp: -1},
                $limit: 20000
              },
              paginate: {
                default: 100000,
                max: 20000
              },
              location:true,
              un: accountA,
              aggregate: [
                {type: 'sum', field: 'comments', resField: 'comments'},
                {type: 'sum', field: 'likes', resField: 'likes'},
                /*            {type: 'top', field: 'comments', resField: 'likes'},
                            {type: 'top', field: 'likes', resField: 'likes'}*/
              ],
            },
            'seta-posts-likes-comments:' + useridA,
            'authenticated:seta'
          );
          var pictureA = picit(itemA);

          $("#profiles-counters-a").append(
            '<div  id="' + useridA +'a'+ '" class="counter-metric">' +

            '<img alt="missing" class="profile-mini-img" src="' +
            pictureA +
            '" title="'+ accountA +'">'+
            '<div class="counter-metric-span posts">' + postCountA + '</div>' +
            '<div class="counter-metric-span followers">' + followersCountA + '</div>' +
            '<div class="counter-metric-span following">' + followingCountA + '</div>' +
            '<div class="counter-metric-span likes">' + htmlChartLoadingMini + '</div>' +
            '<div class="counter-metric-span comments">' + htmlChartLoadingMini + '</div>' +
            '</div>'
          );
          optionsBarA.series[0].data.push(itemA.followers);
          optionsBarA.series[0].label[itemA.followers] = {
            height: 40,
            align: 'center',
            backgroundColor: {
              image: pictureA
            }
          }
          optionsBarA.yAxis.data.push(itemA.username);
        }
        var heightA = $("#profiles-counters-a").height();
        var widthA = $("#profiles-counters-a").width();
        $("#stats-hbar-a").height(heightA);
        $("#stats-hbar-a").width(widthA);

        chartit('stats-hbar-a', optionsBarA);
        chartit('geoA', optionsGeoA);
        var htmlA = '<div class="counter-metric-span posts">' + totalsA.totalPosts + '</div>' +
          '<div class="counter-metric-span followers">' + totalsA.totalFollowers + '</div>' +
          '<div class="counter-metric-span following">' + totalsA.totalFollowing + '</div>' +
          '<div class="counter-metric-span likes">' + totalsA.totalLikes + '</div>' +
          '<div class="counter-metric-span comments">' + totalsA.totalComments + '</div>';
        $("#countera").html(htmlA);
        $("#total-metrics-a").html(htmlA);
      }
    }
    else if (desc.indexOf('seta-posts-likes-comments:') > -1) {
      if (response.data) {
        var likesCommentsA = response.data;
        var socResA = response.socRes;
        var usernameA = socResA.un;
        var dbPostsCountA = 0;
        if(likesCommentsA.total)dbPostsCountA = parseInt(likesCommentsA.total);
        var likesCountA = 0;
        var commentsCountA = 0;

        desc = desc.substring(desc.indexOf(':') + 1, desc.length);
        if (likesCommentsA.likes) {
          likesCountA = likesCommentsA.likes || 0;
          $("#" + desc+'a').find('.likes').html(likesCountA)
          totalsA.totalLikes += likesCountA
          for(i of window.profilesA){
            if(i.id===desc){
              i.likes = likesCountA
            }
          }
        }
        if (likesCommentsA.comments) {
          commentsCountA = likesCommentsA.comments || 0;
          $("#" + desc+'a').find('.comments').html(commentsCountA)
          //console.log(icounter + ' seta user id: ' + desc + ' username:' + usernameA + ' has total comments count:' + commentsCountA);
          totalsA.totalLikes += likesCountA
          for(i of window.profilesA){
            if(i.id===desc){
              i.comments = commentsCountA
            }
          }
        }
        if (likesCommentsA.trendsdata) {
          icounterA++
          if(icounterA===1){
            optionsLineA.series = [];
            optionsHeatA.series[0].data=[];
            optionsHeatA.xAxis.data = [];
            // optionsHeatA.yAxis.data = [];
            optionsLineA.legend.data = [];
            optionsPieDomA.series = [];
            optionsPieDomA.legend.data = [];
            optionsPieDowA.series = [];
            optionsPieDowA.legend.data = [];
            optionsPieHodA.series = [];
            optionsPieHodA.legend.data = [];
          }

          optionsLineA.series.push({
            type: 'line',
            name: usernameA,
            areaStyle: {},
            data:[]
          })
          var domsA = {};
          var dowsA = {};
          var hodsA = {};

          var profilesPieDomDataA = []
          var profilesPieDowDataA = []
          var profilesPieHodDataA = []

          for (var trendPost of likesCommentsA.trendsdata){

            var likesTotal = trendPost.likes.count;
            var commentsTotal = trendPost.comments.count;
            totalsA.totalLikes += likesTotal;
            totalsA.totalComments += commentsTotal;
            var engagement = parseInt(likesTotal)+parseInt(commentsTotal);
            engagement = (engagement /dbPostsCountA).toFixed(2);
            var locsA = trendPost.media.location;
            if(locsA && locsA !==null){
              if(locsA.lng && locsA.lat){
                var locA = {
                  name: locsA.name,
                  value: [Number(locsA.lng),Number(locsA.lat),engagement]
                }
                optionsGeoA.series[0].data.push(locA)
                optionsGeoA.series[1].data.push(locA)
              }
            }
            optionsLineA.series[optionsLineA.series.length-1].data.push(engagement);
            var dateA = dayjs.unix(trendPost.timestamp);
            var dateFormatA = dateA.format('YYYY-MM-DD');
            var domA = dayjs(dateA).date();
            domA = domA>9 ? String(domA) : '0'+domA
            var dowA = dayjs(dateA).day();
            dowA = String(dowA);
            switch (dowA) {
              case '0':
                dowA = 'Sunday'
                break
              case '1':
                dowA = 'Monday'
                break
              case '2':
                dowA = 'Tuesday'
                break
              case '3':
                dowA = 'Wednesday'
                break
              case '4':
                dowA = 'Thursday'
                break
              case '5':
                dowA = 'Friday'
                break
              case '6':
                dowA = 'Saturday'
                break
            }
            var hodA = dayjs(dateA).hour();
            hodA = hodA>9 ? String(hodA) : '0'+hodA;
            hodA = hodA>12 ? hodA+'pm' : hodA+'am';
            /*  var moy = dayjs().month(date);
              */

            domsA[domA] = domsA[domA] || 0;
            domsA[domA]++
            dowsA[dowA] = dowsA[dowA] || 0;
            dowsA[dowA]++
            hodsA[hodA] = hodsA[hodA] || 0;
            hodsA[hodA]++
            if(optionsHeatA.xAxis.data.indexOf(hodA)===-1)optionsHeatA.xAxis.data.push(hodA);
            optionsHeatA.xAxis.data.sort();
            optionsLineA.xAxis.data.push(dateFormatA);
            optionsHeatA.series[0].data.push([hodA,dowA,engagement]);
          }
          var htmlAA = '<div class="counter-metric-span posts">' + totalsA.totalPosts + '<br ><span class="fa fa-instagram"></span></div>' +
            '<div class="counter-metric-span followers">' + totalsA.totalFollowers + '<br ><span class="fa fa-users"></span></div>' +
            '<div class="counter-metric-span following">' + totalsA.totalFollowing + '<br ><span class="fa fa-user-o"></span></div>' +
            '<div class="counter-metric-span likes">' + totalsA.totalLikes + '<br ><span class="fa fa-heart-o"></span></div>' +
            '<div class="counter-metric-span comments">' + totalsA.totalComments + '<br ><span class="fa fa-comments-o" style="cursor:pointer;"></span></div>';
          $("#countera").html(htmlAA);
          $("#total-metrics-a").html(htmlAA);
          optionsLineA.legend.data.push(usernameA);
          optionsPieDomA.legend[1].data.push({name:usernameA,icon:'image:///img/user.png'});
          optionsPieDomA.legend[1].data.sort();
          optionsPieDowA.legend[1].data.push({name:usernameA,icon:'image:///img/user.png'});
          optionsPieDowA.legend[1].data.sort();
          optionsPieHodA.legend[1].data.push({name:usernameA,icon:'image:///img/user.png'});
          optionsPieHodA.legend[1].data.sort();



          for(var domi in domsA){

            profilesPieDomDataA.push({name:domi,value:domsA[domi]});
            optionsPieDomA.legend[0].data.push(domi);
            optionsPieDomA.legend[0].data.sort();
          }

          for(var dowi in dowsA){
            profilesPieDowDataA.push({name:dowi,value:dowsA[dowi]});

            // if(optionsHeatA.yAxis.data.indexOf(dowi)===-1)optionsHeatA.yAxis.data.push(dowi);

            optionsPieDowA.legend[0].data.push(dowi);
            optionsPieDowA.legend[0].data.sort();
          }

          for(var hodi in hodsA){
            profilesPieHodDataA.push({name:hodi,value:hodsA[hodi]});
            optionsPieHodA.legend[0].data.push(hodi);
            optionsPieHodA.legend[0].data.sort();
          }
          var centerA = []
          if(icounterA<=10){
            centerA = [String((icounterA*10)-5)+'%','40%'];
          }else if(icounterA>10 && icounterA<=20){
            centerA = [String(((icounterA-10)*10)-5)+'%','70%'];
          }else if(icounterA>20 && icounterA<=30){
            centerA = [String(((icounterA-20)*10)-5)+'%','100%'];
          }
          optionsPieDomA.series.push({
            name:usernameA,
            center:centerA,
            type: 'pie',
            radius: 35,
            data:profilesPieDomDataA,
            label:{
              show:false
            }
          });
          optionsPieDowA.series.push({
            name:usernameA,
            center:centerA,
            type: 'pie',
            radius: 35,
            data:profilesPieDowDataA,
            label:{
              show:false
            }
          });
          optionsPieHodA.series.push({
            name:usernameA,
            center:centerA,
            type: 'pie',
            radius: 35,
            data:profilesPieHodDataA,
            label:{
              show:false
            }
          });
          optionsLineA.legend.data.push(username);

          if(icounterA === 1){
            $("#lines-seta").height(400);
            var width = $("#lines-seta").width();
            chartit('lines-seta', optionsLineA);

            $("#DoMA").height(250);
            $("#DoMA").width(width);
            chartit('DoMA', optionsPieDomA);

            $("#DoWA").height(250);
            $("#DoWA").width(width);
            chartit('DoWA', optionsPieDowA);

            $("#HoDA").height(250);
            $("#HoDA").width(width);
            chartit('HoDA', optionsPieHodA);

            $("#heatA").height(400);
            $("#heatA").width(width);
            chartit('heatA', optionsHeatA);
            var geoA = document.getElementById('geoA');
            echarts.getInstanceByDom(geoA).setOption(optionsGeoA);
          }
          else{
            var domLinesA = document.getElementById('lines-seta');
            echarts.getInstanceByDom(domLinesA).setOption(optionsLineA);
            var domPieA = document.getElementById('DoMA');
            echarts.getInstanceByDom(domPieA).setOption(optionsPieDomA);
            var dowPieA = document.getElementById('DoWA');
            echarts.getInstanceByDom(dowPieA).setOption(optionsPieDowA);
            var hodPieA = document.getElementById('HoDA');
            echarts.getInstanceByDom(hodPieA).setOption(optionsPieHodA);
            var heatA = document.getElementById('heatA');
            echarts.getInstanceByDom(heatA).setOption(optionsHeatA);
            var geoA = document.getElementById('geoA');
            echarts.getInstanceByDom(geoA).setOption(optionsGeoA);
          }
        }
        profileCounterA++
        if(profileCounterA === window.profilesA.length && profileCounterA===seta.length){
          //$("#textProcBtn").show()
          textProc('seta')
        }
      }
    }

  });
  socketB.on('authenticated:setb', function (response) {
    var descB = response.socRes.desc;
    if (descB === 'setb-profile-userid') {
      if (response.data) {
        window.profilesB = response.data.data;
        totalsB = {
          totalPosts:0,
          totalFollowers:0,
          totalFollowing:0,
          totalLikes:0,
          totalComments:0
        }
        $("#profiles-counters-b").html('');
        optionsBarB.series.push({
          type: 'bar',
          name:'followers',
          barGap:'100%',
          data:[],
          label:{
            show:true,
            color:'#fff',
            formatter: '{b}'
          }
        });

        $("#profileB-metrics-legend").html(legendHtmlB)

        for (let itemB of window.profilesB) {
          var accountB = itemB.username;
          var useridB = itemB.id;
          var postCountB = itemB.edge_owner_to_timeline_media.count || 0;
          var followersCountB = itemB.edge_followed_by.count || 0;
          var followingCountB = itemB.edge_follow.count || 0;
          itemB.posts = postCountB
          itemB.followers = followersCountB
          itemB.following = followingCountB

          totalsB.totalPosts += postCountB
          totalsB.totalFollowers += followersCountB
          totalsB.totalFollowing += followingCountB

          getServiceData('find',
            'instagram/postsb',
            {
              query: {
                "owner.id": useridB,
                $sort: {timestamp: -1},
                $limit: 20000
              },
              paginate: {
                default: 100000,
                max: 20000
              },
              un: accountB,
              location:true,
              aggregate: [
                {type: 'sum', field: 'comments', resField: 'comments'},
                {type: 'sum', field: 'likes', resField: 'likes'}
              ],
            },
            'setb-posts-likes-comments:' + useridB,
            'authenticated:setb'
          )

          $("#profiles-counters-b").append(
            '<div  id="' + useridB+'b' + '" class="counter-metric">' +

            '<img alt="missing" class="profile-mini-img" src="' +
            picit(itemB) +
            '" title="'+ accountB +'">'+
            '<div class="counter-metric-span posts">' + postCountB + '</div>' +
            '<div class="counter-metric-span followers">' + followersCountB + '</div>' +
            '<div class="counter-metric-span following">' + followingCountB + '</div>' +
            '<div class="counter-metric-span likes">' + htmlChartLoadingMini + '</div>' +
            '<div class="counter-metric-span comments">' + htmlChartLoadingMini + '</div>' +
            '</div>'
          );
          optionsBarB.series[0].data.push(itemB.followers)
          optionsBarB.yAxis.data.push(itemB.username)
        }
        var heightB = $("#profiles-counters-b").height();
        var widthB = $("#profiles-counters-b").width();
        $("#stats-hbar-b").height(heightB)
        $("#stats-hbar-b").width(widthB)
        chartit('geoB', optionsGeoB);
        chartit('stats-hbar-b',optionsBarB)
        var htmlB = '<div class="counter-metric-span posts">' + totalsB.totalPosts + '</div>' +
          '<div class="counter-metric-span followers">' + totalsB.totalFollowers + '</div>' +
          '<div class="counter-metric-span following">' + totalsB.totalFollowing + '</div>' +
          '<div class="counter-metric-span likes">' + totalsB.totalLikes + '</div>' +
          '<div class="counter-metric-span comments">' + totalsB.totalComments + '</div>';
        $("#counterb").html(htmlB);
        $("#total-metrics-b").html(htmlB);

      }
    }
    else if (descB.indexOf('setb-posts-likes-comments:') > -1) {
      if (response.data) {
        var likesCommentsB = response.data;
        var socResB = response.socRes;
        var usernameB = socResB.un;
        var dbPostsCountB = 0;
        if(likesCommentsB.total)dbPostsCountB = parseInt(likesCommentsB.total);
        var likesCountB =  0;
        var commentsCountB =  0;

        descB = descB.substring(descB.indexOf(':') + 1, descB.length);
        if (likesCommentsB.likes) {
          likesCountB = likesCommentsB.likes || 0;
          $("#" + descB+'b').find('.likes').html(likesCountB);
          for(var j of window.profilesB){
            if(j.id===descB){
              j.likes = likesCountB;
            }
          }
        }
        if (likesCommentsB.comments) {
          commentsCountB = likesCommentsB.comments || 0;
          $("#" + descB+'b').find('.comments').html(commentsCountB);
          //console.log(icounter + ' setb user id: ' + descB + ' username:' + usernameB + ' has total comments count:' + commentsCountB);
          totalsB.totalLikes += likesCountB
          for(var j of window.profilesB){
            if(j.id===descB){
              j.comments = commentsCountB
            }
          }
        }
        if (likesCommentsB.trendsdata) {
          icounterB++
          if(icounterB===1){
            optionsLineB.series = [];
            optionsHeatB.series[0].data=[];
            optionsHeatB.xAxis.data = [];
            // optionsHeatB.yAxis.data = [];
            optionsLineB.legend.data = [];
            optionsPieDomB.series = [];
            optionsPieDomB.legend.data = [];
            optionsPieDowB.series = [];
            optionsPieDowB.legend.data = [];
            optionsPieHodB.series = [];
            optionsPieHodB.legend.data = [];
          }
          optionsLineB.series.push({
            type: 'line',
            name: usernameB,
            areaStyle: {},
            data:[]
          })
          var domsB = {};
          var dowsB = {};
          var hodsB = {};
          var profilesPieDomDataB = []
          var profilesPieDowDataB = []
          var profilesPieHodDataB = []

          for (var trendPostB of likesCommentsB.trendsdata){

            var likesTotalB = trendPostB.likes.count;
            var commentsTotalB = trendPostB.comments.count;
            totalsB.totalLikes += likesTotalB;
            totalsB.totalComments += commentsTotalB;
            var engagementB = parseInt(likesTotalB)+parseInt(commentsTotalB);
            engagementB = (engagementB /dbPostsCountB).toFixed(2);
            var locsB = trendPostB.media.location;
            if(locsB && locsB !==null){
              if(locsB.lng && locsB.lat){
                var locB = {
                  name: locsB.name,
                  value: [Number(locsB.lng),Number(locsB.lat),engagementB]
                }
                optionsGeoB.series[0].data.push(locB)
                optionsGeoB.series[1].data.push(locB)
              }
            }
            optionsLineB.series[optionsLineB.series.length-1].data.push(engagementB);
            var dateB = dayjs.unix(trendPostB.timestamp);
            var dateFormatB = dateB.format('YYYY-MM-DD');
            var domB = dayjs(dateB).date();
            domB = domB>9 ? String(domB) : '0'+domB;
            var dowB = dayjs(dateB).day();
            dowB = String(dowB);
            switch (dowB) {
              case '0':
                dowB = 'Monday';
                break
              case '1':
                dowB = 'Tuesday';
                break
              case '2':
                dowB = 'Wednesday';
                break
              case '3':
                dowB = 'Thursday';
                break
              case '4':
                dowB = 'Friday';
                break
              case '5':
                dowB = 'Saturday';
                break
              case '6':
                dowB = 'Sunday'
                break
            }
            var hodB = dayjs(dateB).hour();
            hodB = hodB>9 ? String(hodB) : '0'+hodB;
            hodB = hodB>12 ? hodB+'pm' : hodB+'am';

            domsB[domB] = domsB[domB] || 0;
            domsB[domB]++
            dowsB[dowB] = dowsB[dowB] || 0;
            dowsB[dowB]++
            hodsB[hodB] = hodsB[hodB] || 0;
            hodsB[hodB]++
            if(optionsHeatB.xAxis.data.indexOf(hodB)===-1)optionsHeatB.xAxis.data.push(hodB);
            optionsHeatB.xAxis.data.sort();
            optionsLineB.xAxis.data.push(dateFormatB);
            optionsHeatB.series[0].data.push([hodB,dowB,engagementB]);

          }
          var htmlBB = '<div class="counter-metric-span posts">' + totalsB.totalPosts + '<br ><span class="fa fa-instagram"></span></div>' +
            '<div class="counter-metric-span followers">' + totalsB.totalFollowers + '<br ><span class="fa fa-users"></span></div>' +
            '<div class="counter-metric-span following">' + totalsB.totalFollowing + '<br ><span class="fa fa-user-o"></span></div>' +
            '<div class="counter-metric-span likes">' + totalsB.totalLikes + '<br ><span class="fa fa-heart-o"></span></div>' +
            '<div class="counter-metric-span comments">' + totalsB.totalComments + '<br ><span class="fa fa-comments-o"></span></div>';
          $("#counterb").html(htmlBB);
          $("#total-metrics-b").html(htmlBB);
          optionsLineB.legend.data.push(usernameB)
          optionsPieDomB.legend[1].data.push({name:usernameB,icon:'image:///img/user.png'});
          optionsPieDomB.legend[1].data.sort();
          optionsPieDowB.legend[1].data.push({name:usernameB,icon:'image:///img/user.png'});
          optionsPieDowB.legend[1].data.sort();
          optionsPieHodB.legend[1].data.push({name:usernameB,icon:'image:///img/user.png'});
          optionsPieHodB.legend[1].data.sort();
          for(var domib in domsB){

            profilesPieDomDataB.push({name:domib,value:domsB[domib]})
            optionsPieDomB.legend[0].data.push(domib);
            optionsPieDomB.legend[0].data.sort();
          }
          for(var dowib in dowsB){
            profilesPieDowDataB.push({name:dowib,value:dowsB[dowib]})
            // if(optionsHeatB.yAxis.data.indexOf(dowib)===-1)optionsHeatB.yAxis.data.push(dowib);

            optionsPieDowB.legend[0].data.push(dowib);
            optionsPieDowB.legend[0].data.sort();
          }
          for(var hodib in hodsB){
            if(optionsHeatB.xAxis.data.indexOf(hodib)===-1)optionsHeatB.xAxis.data.push(hodib);
            profilesPieHodDataB.push({name:hodib,value:hodsB[hodib]});
            optionsPieHodB.legend[0].data.push(hodib);
            optionsPieHodB.legend[0].data.sort();
          }
          var centerB = []
          if(icounterB<=10){
            centerB = [String((icounterB*10)-5)+'%','40%'];
          }else if(icounterB>10 && icounterB<=20){
            centerB = [String(((icounterB-10)*10)-5)+'%','70%'];
          }else if(icounterB>20 && icounterB<=30){
            centerB = [String(((icounterB-20)*10)-5)+'%','100%'];
          }
          optionsPieDomB.series.push({
            name:usernameB,
            center:centerB,
            type: 'pie',
            radius: 35,
            data:profilesPieDomDataB,
            label:{
              show:false
            }
          })
          optionsPieDowB.series.push({
            name:usernameB,
            center:centerB,
            type: 'pie',
            radius: 35,
            data:profilesPieDowDataB,
            label:{
              show:false
            }
          })
          optionsPieHodB.series.push({
            name:usernameB,
            center:centerB,
            type: 'pie',
            radius: 35,
            data:profilesPieHodDataB,
            label:{
              show:false
            }
          })

          //optionsPieDomA.legend.data.push(usernameA)

          if(icounterB === 1){
            $("#lines-setb").height(400)
            var width = $("#lines-setb").width()

            chartit('lines-setb', optionsLineB)
            $("#DoMB").height(250)
            $("#DoMB").width(width)

            chartit('DoMB', optionsPieDomB)
            $("#DoWB").height(250)
            $("#DoWB").width(width)

            chartit('DoWB', optionsPieDowB)
            $("#HoDB").height(250)
            $("#HoDB").width(width)

            chartit('HoDB', optionsPieHodB)

            $("#heatB").height(400)
            $("#heatB").width(width)
            chartit('heatB', optionsHeatB)
            var geoB = document.getElementById('geoB');
            echarts.getInstanceByDom(geoB).setOption(optionsGeoB);
          }
          else{
            var domLinesB = document.getElementById('lines-setb');
            echarts.getInstanceByDom(domLinesB).setOption(optionsLineB);
            var domPieB = document.getElementById('DoMB');
            echarts.getInstanceByDom(domPieB).setOption(optionsPieDomB);
            var dowPieB = document.getElementById('DoWB');
            echarts.getInstanceByDom(dowPieB).setOption(optionsPieDowB);
            var hodPieB = document.getElementById('HoDB');
            echarts.getInstanceByDom(hodPieB).setOption(optionsPieHodB);
            var heatB = document.getElementById('heatB');
            echarts.getInstanceByDom(heatB).setOption(optionsHeatB);
            var geoB = document.getElementById('geoB');
            echarts.getInstanceByDom(geoB).setOption(optionsGeoB);
          }

        }
        profileCounterB++
        if(profileCounterB===setb.length && profileCounterB === window.profilesB.length){
          //$("#textProcBtn").show()
          textProc('setb')
        }
      }
    }

  })

  if (seta.length >= 1) {
    $("#countera").html(htmlChartLoadingMini);
    window.profilesA = [];
    //{$search: seta[i], $fields: ['username'], $deep: false}
    // $(".widget-stage.classa").html(htmlChartLoading);
    $(".widget-stage.classa").html(htmlChartLoadingMini);
    getServiceData('find',
      'instagram/profiles',
      {
        query: {
          "username": {$in: seta},
          $limit: seta.length,
          $sort: {'edge_followed_by.count': -1}
        }

      },
      'seta-profile-userid',
      'authenticated:seta'
    )

  }
  if (setb.length >= 1) {
    $("#counterb").html(htmlChartLoadingMini);
    window.profilesB = [];
    //{$search: seta[i], $fields: ['username'], $deep: false}
    $(".widget-stage.classb").html(htmlChartLoadingMini);
    getServiceData('find',
      'instagram/profiles',
      {
        query: {
          "username": {$in: setb},
          $limit: setb.length,
          $sort: {'edge_followed_by.count': -1}
        }
      },
      'setb-profile-userid',
      'authenticated:setb'
    )

  }
}
