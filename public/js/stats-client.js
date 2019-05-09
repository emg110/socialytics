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


            totalPostsA += postCountA
            $("#profiles-counters-a").append(
              '<div  id="' + useridA + '" class="counter-metric">' +
              '<img class="profile-mini-img" src="' +
              picit(itemA) +
              '">' +
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
                  $sort: {createdAt: -1},
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
          chartit('stats-hbar-a', totalPostsA)
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


            totalPostsB += postCountB;
            $("#profiles-counters-b").append(
              '<div  id="' + useridB + '" class="counter-metric">' +
              '<img class="profile-mini-img" src="' +
              picit(itemB) +
              '">' +
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
                  $sort: {createdAt: -1},
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
          chartit('stats-hbar-b', totalPostsB)
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
            console.log(icounter + ' seta user id: ' + desc + ' username:' + usernameA + ' has total likes count: ' + likesCountA);
            for(i of window.profilesA){
              if(i.id===desc){
                i.likes = likesCountA
              }
            }
          } else {
            icounter++
            console.log(icounter + ' seta user id: ' + desc + ' username:' + usernameA + ' has total likes count: ' + 0);
          }
          if (response.data[1]) {
            var commentsCountA = likesCommentsA[1]['likes'] || 0;
            icounter++
            $("#" + desc).find('.comments').html(commentsCountA)
            console.log(icounter + ' seta user id: ' + desc + ' username:' + usernameA + ' has total comments count:' + commentsCountA);
            for(i of window.profilesA){
              if(i.id===desc){
                i.comments = commentsCountA
              }
            }
          } else {
            icounter++
            console.log(icounter + ' seta user id: ' + desc + ' username:' + usernameA + ' has total comments count: ' + 0);
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
            console.log(icounter + ' setb user id: ' + desc + ' username:' + usernameB + ' has total likes count: ' + likesCountB);

          } else {
            icounter++
            console.log(icounter + ' setb user id: ' + desc + ' username:' + usernameB + ' has total likes count: ' + 0);
          }
          if (response.data[1]) {
            var commentsCountB = likesCommentsB[1]['likes'] || 0;
            icounter++

            $("#" + desc).find('.comments').html(commentsCountB)
            console.log(icounter + ' setb user id: ' + desc + ' username:' + usernameB + ' has total comments count:' + commentsCountB);
          } else {
            icounter++
            console.log(icounter + ' setb user id: ' + desc + ' username:' + usernameB + ' has total comments count: ' + 0);
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
