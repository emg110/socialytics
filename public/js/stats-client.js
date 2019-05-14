function getStatsData(totalPostsA = 0, totalPostsB = 0, seta = [], setb = [], aDone = false, bDone = false) {
  seta = document.getElementById('seta').value.split(',');
  setb = document.getElementById('setb').value.split(',');

  var icounterB = 0;
  var optionsLineB = {
    grid: {containLabel: true,top:90},
    yAxis: {
      name: 'metrics',
    },
    dataZoom: [{
      start: 0,
      end:7
    },{
      start: 0,
      end:7,
      type: 'inside'
    }],
    legend: {
      top:5,
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
  var icounterA = 0;
  var optionsBarA = {
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
  var optionsLine = {
    grid: {containLabel: true,top:90},
    yAxis: {
      name: 'metrics',
    },
    dataZoom: [{
      start: 0,
      end:7
    },{
      start: 0,
      end:7,
      type: 'inside'
    }],
    legend: {
      top:5,
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
  var optionsPieDom = {
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
  var optionsPieDow = {
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
  var optionsPieHod = {
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
  var optionsLineA = {
    grid: {containLabel: true,top:90},
    yAxis: {
      name: 'metrics',
    },
    dataZoom: [{
      start: 0,
      end:7
    },{
      start: 0,
      end:7,
      type: 'inside'
    }],
    legend: {
      top:5,
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



  socket.removeListener('authenticated');
  socket.on('authenticated', function (response) {
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
            }, 'seta-posts-likes-comments:' + useridA
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
          data:[]

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
    else if (desc === 'setb-profile-userid') {
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
            }, 'setb-posts-likes-comments:' + useridB
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
          barGap:'150%',
          data:[]
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
    if (desc.indexOf('seta-posts-likes-comments:') > -1) {
      if (response.data) {
        var likesCommentsA = response.data;
        var socResA = response.socRes;
        var usernameA = socResA.un
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
            optionsLineA = optionsLine;
            optionsPieDomA = optionsPieDom;
            optionsPieDowA = optionsPieDow;
            optionsPieHodA = optionsPieHod;
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
            optionsLineA.series[optionsLineA.series.length-1].data.push(trendPost.edge_media_preview_like.count)
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
            centerA = [String((icounterA*10)-5)+'%','30%'];
          }else if(icounterA>10 && icounterA<=20){
            centerA = [String(((icounterA-10)*10)-5)+'%','60%'];
          }else if(icounterA>20 && icounterA<=30){
            centerA = [String(((icounterA-20)*10)-5)+'%','90%'];
          }
          optionsPieDomA.series.push({
            name:usernameA,
            center:centerA,
            type: 'pie',
            radius: 50,
            data:profilesPieDomDataA,
            label:{
              show:false
            }
          })
          optionsPieDowA.series.push({
            name:usernameA,
            center:centerA,
            type: 'pie',
            radius: 50,
            data:profilesPieDowDataA,
            label:{
              show:false
            }
          })
          optionsPieHodA.series.push({
            name:usernameA,
            center:centerA,
            type: 'pie',
            radius: 50,
            data:profilesPieHodDataA,
            label:{
              show:false
            }
          })
          optionsLineA.legend.data.push(username)
          //optionsPieDomA.legend.data.push(usernameA)

          if(icounterA === 1){
            $("#lines-seta").height(400)
            $("#lines-seta").width('100%')
            chartit('lines-seta', optionsLineA)
            $("#DoMA").height(400)
            $("#DoMA").width('100%')
            chartit('DoMA', optionsPieDomA)
            $("#DoWA").height(400)
            $("#DoWA").width('100%')
            chartit('DoWA', optionsPieDowA)
            $("#HoDA").height(400)
            $("#HoDA").width('100%')
            chartit('HoDA', optionsPieHodA)

          }else{



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
    else if (desc.indexOf('setb-posts-likes-comments:') > -1) {
      if (response.data) {
        var likesCommentsB = response.data;
        var likesCountB =  0;
        var commentsCountB =  0;
        var socResB = response.socRes;
        var usernameB = socResB.un;
        desc = desc.substring(desc.indexOf(':') + 1, desc.length);
        if (response.data[0]) {
          likesCountB = likesCommentsB[0]['comments'] || 0;
          $("#" + desc).find('.likes').html(likesCountB);
        }
        if (response.data[1]) {
          commentsCountB = likesCommentsB[1]['likes'] || 0;
          $("#" + desc).find('.comments').html(commentsCountB);
          //console.log(icounter + ' setb user id: ' + desc + ' username:' + usernameB + ' has total comments count:' + commentsCountB);
        }
        if (response.data[2]) {
          icounterB++
          optionsLineB.series.push({
            type: 'line',
            name: usernameB,
            data:[]
          })

          for (var trendPostB of response.data[2].trendsdata){
            optionsLineB.series[optionsLineB.series.length-1].data.push(trendPostB.edge_media_preview_like.count)
            var dateB = dayjs(parseInt(trendPostB.taken_at_timestamp)*1000).format('YYYY-MM-DD')
            optionsLineB.xAxis.data.push(dateB)
          }
          optionsLineB.legend.data.push(usernameB)
          if(icounterB === 1){
            $("#lines-setb").height(400)
            $("#lines-setb").width('100%')
            chartit('lines-setb', optionsLineB)
          }else{
            var domLinesB = document.getElementById('lines-setb');
            echarts.getInstanceByDom(domLinesB).setOption(optionsLineB)

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
      'seta-profile-userid'
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
      'setb-profile-userid'
    )

  }
}
