function getStatsData(totalPostsA = 0, totalPostsB = 0, seta = [], setb = [], aDone = false, bDone = false) {
  seta = document.getElementById('seta').value.split(',');
  setb = document.getElementById('setb').value.split(',');

  var icounterB = 0;
  var icounterA = 0;


  var optionsBarA = {
    grid: {containLabel: true,top:10},
    xAxis: {name: 'followers'},
    yAxis: {
      name: 'profiles',
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
      text: ['Most followers', 'least followers'],
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
    xAxis: {name: 'metrics'},
    yAxis: {
      inverse:true,
      type: 'category',
      data: '',
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
      text: ['Most followers', 'least followers'],
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

  var optionsLineA = {
    tooltip:{},
    grid: {containLabel: true,top:90,left:130},
    yAxis: {
      name: 'metrics',
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
      top:50,
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
    grid: {containLabel: true,top:90,left:130},
    yAxis: {
      name: 'metrics',
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
      top:50,
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


  socket.removeListener('authenticated:seta');
  socketB.removeListener('authenticated:setb');
  socket.on('authenticated:seta', function (response) {
    var desc = response.socRes.desc;
    if (desc === 'seta-profile-userid') {
      if (response.data) {
        window.profilesA = response.data.data;
        totalPostsA = 0;
        $("#profiles-counters-a").html('');
        for (let itemA of window.profilesA) {
          var accountA = itemA.username;
          var useridA = itemA.id;
          var postCountA = itemA.edge_owner_to_timeline_media.count || 0;
          var followersCountA = itemA.edge_followed_by.count || 0;
          var followingCountA = itemA.edge_follow.count || 0;
          itemA.posts = postCountA
          itemA.followers = followersCountA
          itemA.following = followingCountA

          totalPostsA += postCountA
          $("#profiles-counters-a").append(
            '<div  id="' + useridA + '" class="counter-metric">' +
            '<figure>'+
            '<img alt="missing" class="profile-mini-img" src="' +
            picit(itemA) +
            '">' +
            '<figcaption style="color:white">'+accountA+'</figcaption>'+
            '</figure>'+
            '<div class="counter-metric-span posts">' + postCountA + '</div>' +
            '<div class="counter-metric-span followers">' + followersCountA + '</div>' +
            '<div class="counter-metric-span following">' + followingCountA + '</div>' +
            '<div class="counter-metric-span likes">' + htmlChartLoadingMini + '</div>' +
            '<div class="counter-metric-span comments">' + htmlChartLoadingMini + '</div>' +
            '</div>'
          )
          getServiceData('find',
            'instagram/posts',
            {
              query: {
                "owner.id": useridA,
                $sort: {taken_at_timestamp: -1},
                $limit: 20000
              },
              paginate: {
                default: 100000,
                max: 20000
              },
              un: accountA,
              aggregate: [
                {type: 'sum', field: 'edge_media_to_comment', resField: 'comments'},
                {type: 'sum', field: 'edge_media_preview_like', resField: 'likes'}
              ],
            },
            'seta-posts-likes-comments:' + useridA,
            'authenticated:seta'
          )
        }
        var heightA = $("#profiles-counters-a").height();
        var widthA = $("#profiles-counters-a").width();
        $("#stats-hbar-a").height(heightA)
        $("#stats-hbar-a").width(widthA)

        var profilesA = []

        optionsBarA.series.push({
          type: 'bar',
          name:'followers',
          barGap:'150%',
          data:[],
          label:{
            show:true,
            color:'#fff',
            formatter: '{b}'
          }

        })

        for (var chartSeriesItemA of window.profilesA){
          profilesA.push( chartSeriesItemA.username)
          optionsBarA.series[0].data.push(chartSeriesItemA.followers)
        }
        optionsBarA.yAxis.data = profilesA
        chartit('stats-hbar-a', optionsBarA)
        $("#countera").html(totalPostsA + '<div> Posts retrieved for set A</div>');
      }
    }
    if (desc.indexOf('seta-posts-likes-comments:') > -1) {
      if (response.data) {
        var likesCommentsA = response.data;
        var socResA = response.socRes;
        var usernameA = socResA.un;
        var totalA = parseInt(response.data[3].total);
        var likesCountA = 0;
        var commentsCountA = 0;

        desc = desc.substring(desc.indexOf(':') + 1, desc.length);
        if (response.data[0]) {
          likesCountA = likesCommentsA[0]['comments'] || 0;
          $("#" + desc).find('.likes').html(likesCountA)

          for(i of window.profilesA){
            if(i.id===desc){
              i.likes = likesCountA
            }
          }
        }
        if (response.data[1]) {
          commentsCountA = likesCommentsA[1]['likes'] || 0;
          $("#" + desc).find('.comments').html(commentsCountA)
          //console.log(icounter + ' seta user id: ' + desc + ' username:' + usernameA + ' has total comments count:' + commentsCountA);
          for(i of window.profilesA){
            if(i.id===desc){
              i.comments = commentsCountA
            }
          }
        }
        if (response.data[2]) {
          icounterA++
          if(icounterA===1){
            optionsLineA.series = [];
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
            data:[]
          })
          var domsA = {};
          var dowsA = {};
          var hodsA = {};
          var profilesPieDomDataA = []
          var profilesPieDowDataA = []
          var profilesPieHodDataA = []

          for (var trendPost of response.data[2].trendsdata){
            //totalA
            var likesTotal = trendPost.edge_media_preview_like.count
            var commentsTotal = trendPost.edge_media_to_comment.count
            var engagement = parseInt(likesTotal)+parseInt(commentsTotal)
            engagement = engagement /totalA
            optionsLineA.series[optionsLineA.series.length-1].data.push(engagement)
            var dateA = dayjs.unix(trendPost.taken_at_timestamp);
            var dateFormatA = dateA.format('YYYY-MM-DD');
            var domA = dayjs(dateA).date();
            var dowA = dayjs(dateA).day();
            var hodA = dayjs(dateA).hour();
            /*  var moy = dayjs().month(date);
              */
            domsA[domA] = domsA[domA] || 0;
            domsA[domA]++
            dowsA[dowA] = dowsA[dowA] || 0;
            dowsA[dowA]++
            hodsA[hodA] = hodsA[hodA] || 0;
            hodsA[hodA]++
            optionsLineA.xAxis.data.push(dateFormatA)
          }
          optionsLineA.legend.data.push(usernameA)
          optionsPieDomA.legend[1].data.push({name:usernameA,icon:'image:///img/user.png'})
          optionsPieDomA.legend[1].data.sort()
          optionsPieDowA.legend[1].data.push({name:usernameA,icon:'image:///img/user.png'})
          optionsPieDowA.legend[1].data.sort()
          optionsPieHodA.legend[1].data.push({name:usernameA,icon:'image:///img/user.png'})
          optionsPieHodA.legend[1].data.sort()
          for(var domi in domsA){
            domi = domi>9 ? String(domi) : '0'+domi
            profilesPieDomDataA.push({name:domi,value:domsA[domi]})
            optionsPieDomA.legend[0].data.push(domi)
            optionsPieDomA.legend[0].data.sort()
          }
          for(var dowi in dowsA){
            profilesPieDowDataA.push({name:dowi,value:dowsA[dowi]})
            optionsPieDowA.legend[0].data.push(dowi)
            optionsPieDowA.legend[0].data.sort()
          }
          for(var hodi in hodsA){
            hodi = hodi>9 ? String(hodi) : '0'+hodi
            profilesPieHodDataA.push({name:hodi,value:hodsA[hodi]})
            optionsPieHodA.legend[0].data.push(hodi)
            optionsPieHodA.legend[0].data.sort()
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
          })
          optionsPieDowA.series.push({
            name:usernameA,
            center:centerA,
            type: 'pie',
            radius: 35,
            data:profilesPieDowDataA,
            label:{
              show:false
            }
          })
          optionsPieHodA.series.push({
            name:usernameA,
            center:centerA,
            type: 'pie',
            radius: 35,
            data:profilesPieHodDataA,
            label:{
              show:false
            }
          })
          optionsLineA.legend.data.push(username)
          //optionsPieDomA.legend.data.push(usernameA)

          if(icounterA === 1){
            $("#lines-seta").height(400)
            var width = $("#lines-seta").width()
            chartit('lines-seta', optionsLineA)
            $("#DoMA").height(250)
            $("#DoMA").width(width)

            chartit('DoMA', optionsPieDomA)
            $("#DoWA").height(250)
            $("#DoWA").width(width)

            chartit('DoWA', optionsPieDowA)
            $("#HoDA").height(250)
            $("#HoDA").width(width)

            chartit('HoDA', optionsPieHodA)
          }
          else{
            var domLinesA = document.getElementById('lines-seta');
            console.log()
            echarts.getInstanceByDom(domLinesA).setOption(optionsLineA);
            var domPieA = document.getElementById('DoMA');
            echarts.getInstanceByDom(domPieA).setOption(optionsPieDomA);
            var dowPieA = document.getElementById('DoWA');
            echarts.getInstanceByDom(dowPieA).setOption(optionsPieDowA);
            var hodPieA = document.getElementById('HoDA');
            echarts.getInstanceByDom(hodPieA).setOption(optionsPieHodA);
          }
        }
      }
    }

  })
  socketB.on('authenticated:setb', function (response) {
    var desc = response.socRes.desc;
    if (desc === 'setb-profile-userid') {
      if (response.data) {
        window.profilesB = response.data.data;
        totalPostsB = 0;
        $("#profiles-counters-b").html('');
        for (let itemB of window.profilesB) {
          var accountB = itemB.username;
          var useridB = itemB.id;
          var postCountB = itemB.edge_owner_to_timeline_media.count || 0;
          var followersCountB = itemB.edge_followed_by.count || 0;
          var followingCountB = itemB.edge_follow.count || 0;
          itemB.posts = postCountB
          itemB.followers = followersCountB
          itemB.following = followingCountB

          totalPostsB += postCountB;
          $("#profiles-counters-b").append(
            '<div  id="' + useridB + '" class="counter-metric">' +
            '<figure>'+
            '<img alt="missing" class="profile-mini-img" src="' +
            picit(itemB) +
            '">' +
            '<figcaption style="color:white">'+accountB+'</figcaption>'+
            '</figure>'+
            '<div class="counter-metric-span posts">' + postCountB + '</div>' +
            '<div class="counter-metric-span followers">' + followersCountB + '</div>' +
            '<div class="counter-metric-span following">' + followingCountB + '</div>' +
            '<div class="counter-metric-span likes">' + htmlChartLoadingMini + '</div>' +
            '<div class="counter-metric-span comments">' + htmlChartLoadingMini + '</div>' +
            '</div>'
          )
          getServiceData('find',
            'instagram/posts',
            {
              query: {
                "owner.id": useridB,
                $sort: {taken_at_timestamp: -1},
                $limit: 20000
              },
              paginate: {
                default: 100000,
                max: 20000
              },
              un: accountB,
              aggregate: [
                {type: 'sum', field: 'edge_media_to_comment', resField: 'comments'},
                {type: 'sum', field: 'edge_media_preview_like', resField: 'likes'}
              ],
            },
            'setb-posts-likes-comments:' + useridB,
            'authenticated:setb'
          )
        }
        var heightB = $("#profiles-counters-b").height();
        var widthB = $("#profiles-counters-b").width();
        $("#stats-hbar-b").height(heightB)
        $("#stats-hbar-b").width(widthB)
        var profilesB = [];
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
        })

        for (var chartSeriesItemB of window.profilesB){
          profilesB.push( chartSeriesItemB.username)
          optionsBarB.series[0].data.push(chartSeriesItemB.followers)
        }
        optionsBarB.yAxis.data = profilesB
        chartit('stats-hbar-b',optionsBarB)

        $("#counterb").html(totalPostsB + '<div> Posts retrieved for set B</div>');

      }
    }
    else if (desc.indexOf('setb-posts-likes-comments:') > -1) {
      if (response.data) {
        var likesCommentsB = response.data;
        var socResB = response.socRes;
        var usernameB = socResB.un;
        var totalB = parseInt(response.data[3].total);
        var likesCountB =  0;
        var commentsCountB =  0;

        desc = desc.substring(desc.indexOf(':') + 1, desc.length);
        if (response.data[0]) {
          likesCountB = likesCommentsB[0]['comments'] || 0;
          $("#" + desc).find('.likes').html(likesCountB);

          for(var j of window.profilesB){
            if(j.id===desc){
              j.likes = likesCountB;
            }
          }
        }
        if (response.data[1]) {
          commentsCountB = likesCommentsB[1]['likes'] || 0;
          $("#" + desc).find('.comments').html(commentsCountB);
          //console.log(icounter + ' setb user id: ' + desc + ' username:' + usernameB + ' has total comments count:' + commentsCountB);
          for(var j of window.profilesB){
            if(j.id===desc){
              j.comments = commentsCountB
            }
          }
        }
        if (response.data[2]) {
          icounterB++
          if(icounterB===1){
            optionsLineB.series = [];
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
            data:[]
          })
          var domsB = {};
          var dowsB = {};
          var hodsB = {};
          var profilesPieDomDataB = []
          var profilesPieDowDataB = []
          var profilesPieHodDataB = []

          for (var trendPostB of response.data[2].trendsdata){
            var likesTotalB = trendPostB.edge_media_preview_like.count
            var commentsTotalB = trendPostB.edge_media_to_comment.count
            var engagementB = parseInt(likesTotalB)+parseInt(commentsTotalB)
            engagementB = engagementB /totalB
            optionsLineB.series[optionsLineB.series.length-1].data.push(engagementB)
            var dateB = dayjs.unix(trendPostB.taken_at_timestamp);
            var dateFormatB = dateB.format('YYYY-MM-DD');
            var domB = dayjs(dateB).date();
            var dowB = dayjs(dateB).day();
            var hodB = dayjs(dateB).hour();
            /*  var moy = dayjs().month(date);
              */
            domsB[domB] = domsB[domB] || 0;
            domsB[domB]++
            dowsB[dowB] = dowsB[dowB] || 0;
            dowsB[dowB]++
            hodsB[hodB] = hodsB[hodB] || 0;
            hodsB[hodB]++
            optionsLineB.xAxis.data.push(dateFormatB)
          }
          optionsLineB.legend.data.push(usernameB)
          optionsPieDomB.legend[1].data.push({name:usernameB,icon:'image:///img/user.png'})
          optionsPieDomB.legend[1].data.sort()
          optionsPieDowB.legend[1].data.push({name:usernameB,icon:'image:///img/user.png'})
          optionsPieDowB.legend[1].data.sort()
          optionsPieHodB.legend[1].data.push({name:usernameB,icon:'image:///img/user.png'})
          optionsPieHodB.legend[1].data.sort()
          for(var domib in domsB){
            domib = domib>9 ? String(domib) : '0'+domib
            profilesPieDomDataB.push({name:domib,value:domsB[domib]})
            optionsPieDomB.legend[0].data.push(domib)
            optionsPieDomB.legend[0].data.sort()
          }
          for(var dowib in dowsB){
            profilesPieDowDataB.push({name:dowib,value:dowsB[dowib]})
            optionsPieDowB.legend[0].data.push(dowib)
            optionsPieDowB.legend[0].data.sort()
          }
          for(var hodib in hodsB){
            hodib = hodib>9 ? String(hodib) : '0'+hodib
            profilesPieHodDataB.push({name:hodib,value:hodsB[hodib]})
            optionsPieHodB.legend[0].data.push(hodib)
            optionsPieHodB.legend[0].data.sort()
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
          }

        }
      }
    }
  })

  if (seta.length >= 1) {
    $("#countera").html(htmlChartLoadingMini);
    window.profilesA = [];
    //{$search: seta[i], $fields: ['username'], $deep: false}
    $(".widget-stage.classa").html(htmlChartLoading);
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
    $(".widget-stage.classb").html(htmlChartLoading);
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
