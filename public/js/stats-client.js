function getStatsData(/*usersObjA = {},usersObjB = {},*/totalPostsA = 0, totalPostsB = 0, seta = [], setb = [], aDone = false, bDone = false/*, totalsA=[], totalsB=[],htmlCountersA=[],htmlCountersB=[]*/) {
  seta = document.getElementById('seta').value.split(',');
  setb = document.getElementById('setb').value.split(',');
  window.profilesA = [];
  window.profilesB = [];
  var icounter = 0;
  if (seta.length >= 1 && setb.length >= 1) {
    socket.on('authenticated', function (response) {
      var desc = response.socRes.desc;
      var service = response.socRes.service
      var method = response.socRes.method
      var likesCountA =  0;
      var commentsCountA =  0;
      var likesCountB =  0;
      var commentsCountB =  0;
      var chartCategories = ['profile','profile-id','posts','followers','following','likes','comments']
      var optionsBar = {
        grid: {containLabel: true},
        xAxis: {name: 'metrics'},
        yAxis: {
          inverse:true,
          type: 'category',
          data: ''
        },
        visualMap: {
          textStyle:{
            color:'#999'
          },
          orient: 'horizontal',
          left: 'center',
          min: 100,
          max: 1000,
          text: ['High Score', 'Low Score'],
          // Map the score column to color
          dimension: 0,

          inRange: {
            color: ['#D7DA8B', '#E15457']
          }
        },
        series: [
       /*   /!* {
             stack:data.profile,
             type: 'bar',
             name:'posts',
             barGap:'20%',
             encode: {
               // Map the "username" column to X axis.
               x: 'posts',
               // Map the "" column to Y axis
               y: 'profile'
             }
           },*!/
          {
            type: 'bar',
            name:'followers',
                    barGap:'100%',

            encode: {
              // Map the "username" column to X axis.
              x: 'followers'
            }
          },
          /!*{
            stack:data.profile,
            type: 'bar',
            name:'following',
            barGap:'20%',
            encode: {
              // Map the "username" column to X axis.
              x: 'following',
              // Map the "" column to Y axis
              y: 'profile'
            }
          },*!/
          {
            name:'likes',
            type: 'bar',
                    barGap:'100%',
            encode: {
              // Map the "username" column to X axis.
              x: 'likes'

            }
          }/!*,
      {
        stack:data.profile,
        name:'comments',
        type: 'bar',
        barGap:'20%',
        encode: {
          // Map the "username" column to X axis.
          x: 'comments',
          // Map the "" column to Y axis
          y: 'profile'
        }
      }*!/*/
        ],
        textStyle:{
          color:'#999'
        }
      };
      var optionsBarB = {
        grid: {containLabel: true},
        xAxis: {name: 'metrics'},
        yAxis: {
          inverse:true,
          type: 'category',
          data: ''
        },
        visualMap: {
          textStyle:{
            color:'#999'
          },
          orient: 'horizontal',
          left: 'center',
          min: 100,
          max: 1000,
          text: ['High Score', 'Low Score'],
          // Map the score column to color
          dimension: 0,

          inRange: {
            color: ['#D7DA8B', '#E15457']
          }
        },
        series: [
       /*   /!* {
             stack:data.profile,
             type: 'bar',
             name:'posts',
             barGap:'20%',
             encode: {
               // Map the "username" column to X axis.
               x: 'posts',
               // Map the "" column to Y axis
               y: 'profile'
             }
           },*!/
          {
            type: 'bar',
            name:'followers',
                    barGap:'100%',

            encode: {
              // Map the "username" column to X axis.
              x: 'followers'
            }
          },
          /!*{
            stack:data.profile,
            type: 'bar',
            name:'following',
            barGap:'20%',
            encode: {
              // Map the "username" column to X axis.
              x: 'following',
              // Map the "" column to Y axis
              y: 'profile'
            }
          },*!/
          {
            name:'likes',
            type: 'bar',
                    barGap:'100%',
            encode: {
              // Map the "username" column to X axis.
              x: 'likes'

            }
          }/!*,
      {
        stack:data.profile,
        name:'comments',
        type: 'bar',
        barGap:'20%',
        encode: {
          // Map the "username" column to X axis.
          x: 'comments',
          // Map the "" column to Y axis
          y: 'profile'
        }
      }*!/*/
        ],
        textStyle:{
          color:'#999'
        }
      };
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
          var height = $("#profiles-counters-a").height();
          $("#stats-hbar-a").height(height)

          /*var chartData = []*/
          var profiles = []
          var posts = []
          var likes = []
          var followers = []
          var following = []
          //chartData.push(chartCategories);
          optionsBar.series.push({
            type: 'bar',
            name:'posts',
            barGap:'20%',
            data:[]
          })
          optionsBar.series.push({
            type: 'bar',
            name:'followers',
            barGap:'20%',
            data:[]

          })
          optionsBar.series.push({
            type: 'bar',
            name:'following',
            barGap:'20%',
            data:[]

          })
          for (var chartSeriesItem of window.profilesA){
           /* chartData.push([
              chartSeriesItem.username,
              chartSeriesItem.id,
              chartSeriesItem.posts,
              chartSeriesItem.followers,
              chartSeriesItem.following,
              chartSeriesItem.likes,
              chartSeriesItem.comments
            ])*/
            profiles.push( chartSeriesItem.username)
            optionsBar.series[0].data.push(chartSeriesItem.posts)
            optionsBar.series[1].data.push(chartSeriesItem.followers)
            optionsBar.series[2].data.push(chartSeriesItem.following)
            /*posts.push( chartSeriesItem.username)
            followers.push( chartSeriesItem.username)
            following.push( chartSeriesItem.username)*/

          }
          //optionsBar.dataset.source = chartData
          optionsBar.yAxis.data = profiles
          chartit('stats-hbar-a', optionsBar)
          $("#countera").append(totalPostsA + '<div> records retrieved for set A</div>');


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
          var height = $("#profiles-counters-b").height();
          $("#stats-hbar-b").height(height)
        /*  var chartDataB = []*/
          var profilesB = [];
        /*  chartDataB.push(chartCategories);*/
          optionsBarB.series.push({
            type: 'bar',
            name:'posts',
            barGap:'100%',
            data:[]
          })
          optionsBarB.series.push({
            type: 'bar',
            name:'followers',
            barGap:'100%',
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
            optionsBarB.series[0].data.push(chartSeriesItemB.posts)
            optionsBarB.series[1].data.push(chartSeriesItemB.followers)
            //optionsBarB.series[2].data.push(chartSeriesItemB.following)

          }
        /*  optionsBar.dataset.source = chartDataB*/
          optionsBarB.yAxis.data = profilesB
          chartit('stats-hbar-b',optionsBarB)
          $("#counterb").append(totalPostsB + '<div> records retrieved for set B</div>');

        }
      }
      else if (desc.indexOf('seta-posts-likes-comments:' > -1)) {
        if (response.data) {
          var likesCommentsA = response.data
          var socResA = response.socRes
          var usernameA = socResA.un
          desc = desc.substring(desc.indexOf(':') + 1, desc.length)
          if (response.data[0]) {
            likesCountA = likesCommentsA[0]['comments'] || 0;
            icounter++
            $("#" + desc).find('.likes').html(likesCountA)
            //console.log(icounter + ' seta user id: ' + desc + ' username:' + usernameA + ' has total likes count: ' + likesCountA);
            for(i of window.profilesA){
              if(i.id===desc){
                i.likes = likesCountA
              }
            }
          } else {
            icounter++
            //console.log(icounter + ' seta user id: ' + desc + ' username:' + usernameA + ' has total likes count: ' + 0);
          }
          if (response.data[1]) {
            commentsCountA = likesCommentsA[1]['likes'] || 0;
            icounter++
            $("#" + desc).find('.comments').html(commentsCountA)
            //console.log(icounter + ' seta user id: ' + desc + ' username:' + usernameA + ' has total comments count:' + commentsCountA);
            for(i of window.profilesA){
              if(i.id===desc){
                i.comments = commentsCountA
              }
            }
          } else {
            icounter++
            //console.log(icounter + ' seta user id: ' + desc + ' username:' + usernameA + ' has total comments count: ' + 0);
          }
        }
      }
      else if (desc.indexOf('setb-posts-likes-comments:' > -1)) {
        if (response.data) {
          var likesCommentsB = response.data
          var socResB = response.socRes
          var usernameB = socResB.un
          desc = desc.substring(desc.indexOf(':') + 1, desc.length)
          if (response.data[0]) {
            likesCountB = likesCommentsB[0]['comments'] || 0;
            icounter++
            $("#" + desc).find('.likes').html(likesCountB)
            //console.log(icounter + ' setb user id: ' + desc + ' username:' + usernameB + ' has total likes count: ' + likesCountB);

          } else {
            icounter++
            //console.log(icounter + ' setb user id: ' + desc + ' username:' + usernameB + ' has total likes count: ' + 0);
          }
          if (response.data[1]) {
            commentsCountB = likesCommentsB[1]['likes'] || 0;
            icounter++

            $("#" + desc).find('.comments').html(commentsCountB)
            //console.log(icounter + ' setb user id: ' + desc + ' username:' + usernameB + ' has total comments count:' + commentsCountB);
          } else {
            icounter++
            //console.log(icounter + ' setb user id: ' + desc + ' username:' + usernameB + ' has total comments count: ' + 0);
          }
        }
      }
    })
    //{$search: seta[i], $fields: ['username'], $deep: false}
    $(".widget-stage").html(htmlChartLoading);
    getServiceData('find',
      'instagram/profiles',
      {
        query: {
          "username": {$in: seta},
          $limit: seta.length,
          $sort: {createdAt: -1}
        }
      },
      'seta-profile-userid'
    )
    getServiceData('find',
      'instagram/profiles',
      {
        query: {
          "username": {$in: setb},
          $limit: setb.length,
          $sort: {createdAt: -1}
        }
      },
      'setb-profile-userid'
    )

  }
}
