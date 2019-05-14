function getStatsData(totalPostsA = 0, totalPostsB = 0, seta = [], setb = [], aDone = false, bDone = false) {
  seta = document.getElementById('seta').value.split(',');
  setb = document.getElementById('setb').value.split(',');
  var centerA = [5,5]

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
  var icounter = 0;
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
  socket.on('authenticated', function (response) {
    var desc = response.socRes.desc;
    var serviceA = response.socRes.service
    var methodA = response.socRes.method
    var likesCountA =  0;
    var commentsCountA =  0;
    var chartCategoriesA = ['profile','profile-id','posts','followers','following','likes','comments'];
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
    var serviceB = response.socRes.service;
    var methodB = response.socRes.method;
    var likesCountB =  0;
    var commentsCountB =  0;
    var chartCategoriesB = ['profile','profile-id','posts','followers','following','likes','comments'];
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
    var domLines = document.getElementById('lines-seta');
    var domLinesB = document.getElementById('lines-setb');
    var domPie = document.getElementById('DoMA');
    var dowPie = document.getElementById('DoWA');
    var hodPie = document.getElementById('HoDA');
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
        var likesComments = response.data;
        var socRes = response.socRes;
        var username = socRes.un
        var likesCount = 0;
        var commentsCount = 0;
        desc = desc.substring(desc.indexOf(':') + 1, desc.length);
        if (response.data[0]) {
          likesCount = likesComments[0]['comments'] || 0;

          $("#" + desc).find('.likes').html(likesCount)

          for(i of window.profilesA){
            if(i.id===desc){
              i.likes = likesCount
            }
          }
        }
        if (response.data[1]) {
          commentsCount = likesComments[1]['likes'] || 0;
          $("#" + desc).find('.comments').html(commentsCount)
          //console.log(icounter + ' seta user id: ' + desc + ' username:' + usernameA + ' has total comments count:' + commentsCountA);
          for(i of window.profilesA){
            if(i.id===desc){
              i.comments = commentsCount
            }
          }
        }
        if (response.data[2]) {
          icounter++
          optionsLine.series.push({
            type: 'line',
            name: username,
            data:[]
          })
          var doms = {};
          var dows = {};
          var hods = {};
          var profilesPieDomData = []
          var profilesPieDowData = []
          var profilesPieHodData = []

          for (var trendPost of response.data[2].trendsdata){
            optionsLine.series[optionsLine.series.length-1].data.push(trendPost.edge_media_preview_like.count)
            var date = dayjs.unix(trendPost.taken_at_timestamp);
            var dateFormat = date.format('YYYY-MM-DD');
            var dom = dayjs(date).date();
            var dow = dayjs(date).day();
            var hod = dayjs(date).hour();
            /*  var moy = dayjs().month(date);
              */
            doms[dom] = doms[dom] || 0;
            doms[dom]++
            dows[dow] = dows[dow] || 0;
            dows[dow]++
            hods[hod] = hods[hod] || 0;
            hods[hod]++
            optionsLine.xAxis.data.push(dateFormat)
          }
          optionsPieDom.legend[1].data.push({name:username,icon:'image:///img/user.png'})
          optionsPieDom.legend[1].data.sort()
          optionsPieDow.legend[1].data.push({name:username,icon:'image:///img/user.png'})
          optionsPieDow.legend[1].data.sort()
          optionsPieHod.legend[1].data.push({name:username,icon:'image:///img/user.png'})
          optionsPieHod.legend[1].data.sort()
          for(var domi in doms){
            domi = domi>9 ? String(domi) : '0'+domi
            profilesPieDomData.push({name:domi,value:doms[domi]})
            optionsPieDom.legend[0].data.push(domi)
            optionsPieDom.legend[0].data.sort()
          }
          for(var dowi in dows){
            profilesPieDowData.push({name:dowi,value:dows[dowi]})
            optionsPieDow.legend[0].data.push(dowi)
            optionsPieDow.legend[0].data.sort()
          }
          for(var hodi in hods){
            hodi = hodi>9 ? String(hodi) : '0'+hodi
            profilesPieHodData.push({name:hodi,value:hods[hodi]})
            optionsPieHod.legend[0].data.push(hodi)
            optionsPieHod.legend[0].data.sort()
          }
          var center = []
          if(icounter<=10){
            center = [String((icounter*10)-5)+'%','30%'];
          }else if(icounter>10 && icounter<=20){
            center = [String(((icounter-10)*10)-5)+'%','60%'];
          }else if(icounter>20 && icounter<=30){
            center = [String(((icounter-20)*10)-5)+'%','90%'];
          }
          optionsPieDom.series.push({
            name:username,
            center:center,
            type: 'pie',
            radius: 50,
            data:profilesPieDomData,
            label:{
              show:false
            }
          })
          optionsPieDow.series.push({
            name:username,
            center:center,
            type: 'pie',
            radius: 50,
            data:profilesPieDowData,
            label:{
              show:false
            }
          })
          optionsPieHod.series.push({
            name:username,
            center:center,
            type: 'pie',
            radius: 50,
            data:profilesPieHodData,
            label:{
              show:false
            }
          })
          optionsLine.legend.data.push(username)
          //optionsPieDomA.legend.data.push(usernameA)

          if(icounter === 1){
            $("#pie-seta").html(htmlNavTabsStatPies)
            $("#lines-seta").height(400)
            $("#lines-seta").width('100%')
            chartit('lines-seta', optionsLine)
            $("#DoMA").height(400)
            $("#DoMA").width('100%')
            chartit('DoMA', optionsPieDom)
            $("#DoWA").height(400)
            $("#DoWA").width('100%')
            chartit('DoWA', optionsPieDow)
            $("#HoDA").height(400)
            $("#HoDA").width('100%')
            chartit('HoDA', optionsPieHod)

          }else{
            echarts.getInstanceByDom(domLines).setOption(optionsLine)
            echarts.getInstanceByDom(domPie).setOption(optionsPieDom)
            echarts.getInstanceByDom(dowPie).setOption(optionsPieDow)
            echarts.getInstanceByDom(hodPie).setOption(optionsPieHod)

          }




        }
      }
    }
    else if (desc.indexOf('setb-posts-likes-comments:') > -1) {
      if (response.data) {
        var likesCommentsB = response.data;
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
