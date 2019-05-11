function getStatsData(totalPostsA = 0, totalPostsB = 0, seta = [], setb = [], aDone = false, bDone = false) {
  seta = document.getElementById('seta').value.split(',');
  setb = document.getElementById('setb').value.split(',');
  if (seta.length >= 1) {
    $("#countera").html(htmlChartLoadingMini);
    window.profilesA = [];
    var icounterA = 0;
    socket.on('authenticated', function (response) {
      var descA = response.socRes.desc;
      var serviceA = response.socRes.service
      var methodA = response.socRes.method
      var likesCountA =  0;
      var commentsCountA =  0;
      var chartCategoriesA = ['profile','profile-id','posts','followers','following','likes','comments']
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
      if (descA === 'seta-profile-userid') {
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
                  $sort: {edge_followed_by: -1},
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

          /*var chartData = []*/
          var profilesA = []
          //chartData.push(chartCategories);
         /* optionsBar.series.push({
            type: 'bar',
            name:'posts',
            barGap:'20%',
            data:[]
          })*/
          optionsBarA.series.push({
            type: 'bar',
            name:'followers',
            barGap:'150%',
            data:[]

          })
        /*  optionsBar.series.push({
            type: 'bar',
            name:'following',
            barGap:'20%',
            data:[]

          })*/
          for (var chartSeriesItemA of window.profilesA){
           /* chartData.push([
              chartSeriesItem.username,
              chartSeriesItem.id,
              chartSeriesItem.posts,
              chartSeriesItem.followers,
              chartSeriesItem.following,
              chartSeriesItem.likes,
              chartSeriesItem.comments
            ])*/
            profilesA.push( chartSeriesItemA.username)
/*            optionsBar.series[0].data.push(chartSeriesItem.posts)*/
            optionsBarA.series[0].data.push(chartSeriesItemA.followers)
    /*        optionsBar.series[2].data.push(chartSeriesItem.following)*/
            /*posts.push( chartSeriesItem.username)
            followers.push( chartSeriesItem.username)
            following.push( chartSeriesItem.username)*/

          }
          //optionsBar.dataset.source = chartData
          optionsBarA.yAxis.data = profilesA
          chartit('stats-hbar-a', optionsBarA)

          $("#countera").html(totalPostsA + '<div> Posts retrieved for set A</div>');
        }
      }
      else if (descA.indexOf('seta-posts-likes-comments:' > -1)) {
        if (response.data) {
          var likesCommentsA = response.data
          var socResA = response.socRes
          var usernameA = socResA.un
          descA = descA.substring(descA.indexOf(':') + 1, descA.length)
          if (response.data[0]) {
            likesCountA = likesCommentsA[0]['comments'] || 0;
            icounterA++
            $("#" + descA).find('.likes').html(likesCountA)
            //console.log(icounter + ' seta user id: ' + desc + ' username:' + usernameA + ' has total likes count: ' + likesCountA);
            for(i of window.profilesA){
              if(i.id===descA){
                i.likes = likesCountA
              }
            }
          } else {
            icounterA++
            //console.log(icounter + ' seta user id: ' + desc + ' username:' + usernameA + ' has total likes count: ' + 0);
          }
          if (response.data[1]) {
            commentsCountA = likesCommentsA[1]['likes'] || 0;
            icounterA++
            $("#" + descA).find('.comments').html(commentsCountA)
            //console.log(icounter + ' seta user id: ' + desc + ' username:' + usernameA + ' has total comments count:' + commentsCountA);
            for(i of window.profilesA){
              if(i.id===descA){
                i.comments = commentsCountA
              }
            }
          } else {
            icounterA++
            //console.log(icounter + ' seta user id: ' + desc + ' username:' + usernameA + ' has total comments count: ' + 0);
          }
        }
      }
    })
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
    var icounterB = 0;
    socket.on('authenticated', function (response) {
      var descB = response.socRes.desc;
      var serviceB = response.socRes.service
      var methodB = response.socRes.method
      var chartCategoriesB = ['profile','profile-id','posts','followers','following','likes','comments']
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
      if (descB === 'setb-profile-userid') {
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
                  $sort: {edge_followed_by: -1},
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
        /*  var chartDataB = []*/
          var profilesB = [];
        /*  chartDataB.push(chartCategories);*/
         /* optionsBarB.series.push({
            type: 'bar',
            name:'posts',
            barGap:'100%',
            data:[]
          })*/
          optionsBarB.series.push({
            type: 'bar',
            name:'followers',
            barGap:'150%',
            data:[]

          })
         /* optionsBarB.series.push({
            type: 'bar',
            name:'following',
            barGap:'20%',
            data:[]

          })*/
          for (var chartSeriesItemB of window.profilesB){
           /* chartDataB.push([
              chartSeriesItem.username,
              chartSeriesItem.id,
              chartSeriesItem.posts,
              chartSeriesItem.followers,
              chartSeriesItem.following,
              chartSeriesItem.likes,
              chartSeriesItem.comments
            ])*/
            profilesB.push( chartSeriesItemB.username)
      /*      optionsBarB.series[0].data.push(chartSeriesItemB.posts)*/
            optionsBarB.series[0].data.push(chartSeriesItemB.followers)
            //optionsBarB.series[2].data.push(chartSeriesItemB.following)

          }
        /*  optionsBar.dataset.source = chartDataB*/
          optionsBarB.yAxis.data = profilesB
          chartit('stats-hbar-b',optionsBarB)

          $("#counterb").html(totalPostsB + '<div> Posts retrieved for set B</div>');

        }
      }
      else if (descB.indexOf('setb-posts-likes-comments:' > -1)) {
        if (response.data) {
          var likesCommentsB = response.data
          var socResB = response.socRes
          var usernameB = socResB.un
          descB = descB.substring(descB.indexOf(':') + 1, descB.length)
          if (response.data[0]) {
            likesCountB = likesCommentsB[0]['comments'] || 0;
            icounterB++
            $("#" + descB).find('.likes').html(likesCountB)
            //console.log(icounter + ' setb user id: ' + desc + ' username:' + usernameB + ' has total likes count: ' + likesCountB);

          } else {
            icounterB++
            //console.log(icounter + ' setb user id: ' + desc + ' username:' + usernameB + ' has total likes count: ' + 0);
          }
          if (response.data[1]) {
            commentsCountB = likesCommentsB[1]['likes'] || 0;
            icounterB++

            $("#" + descB).find('.comments').html(commentsCountB)
            //console.log(icounter + ' setb user id: ' + desc + ' username:' + usernameB + ' has total comments count:' + commentsCountB);
          } else {
            icounterB++
            //console.log(icounter + ' setb user id: ' + desc + ' username:' + usernameB + ' has total comments count: ' + 0);
          }
        }
      }
    })
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
