function getStatsData(useridArrA = [],useridArrB = [], seta=[], setb=[], aDone = false, bDone = false) {
  seta = document.getElementById('seta').value.split(',');
  setb = document.getElementById('setb').value.split(',');
  if (seta.length && setb.length) {
    socket.on('authenticated', function (response) {
      var desc = response.socRes.desc;
      var service = response.socRes.service
      var method = response.socRes.method
      if (desc === 'seta-profile-userid') {
        if (response.data) {
          var profilesA = response.data.data;
         for (i in profilesA){
           if (profilesA[i].id) {
             useridArrA.push(profilesA[i].id);
           }
         }
          getServiceData('find',
            'instagram/posts',
            {
              query: {
                "owner.id": {$in: useridArrA},
                $sort: {createdAt: -1},
                $limit: 0
              }
            },'seta-posts'
          )
        }
      }
      else if (desc === 'setb-profile-userid') {
        if (response.data) {
          var profilesB = response.data.data;
         for (i in profilesB){
           if (profilesB[i].id) {
             useridArrB.push(profilesB[i].id);
           }
         }
          getServiceData('find',
            'instagram/posts',
            {
              query: {
                "owner.id": {$in: useridArrB},
                $sort: {createdAt: -1},
                $limit: 0
              }
            },'setb-posts'
          )
        }
      }
      else if (desc === 'seta-posts') {
        if (response.data) {
          aDone = true;
          if(bDone===true)socket.removeListener('authenticated')
          var postsA = response.data
          if (postsA.data || postsA.total) {
            console.log(postsA.total);
            $("#counter").append(postsA.total + '<div> records retrieved for set A</div>');
            chartit('stats-hbar-a', postsA.total)
          }
        }
      }
      else if (desc === 'setb-posts') {
        if (response.data) {
          bDone = true;
          if(aDone===true)socket.removeListener('authenticated')
          var postsB = response.data
          if (postsB.total) {
            console.log(postsB.total);
            $("#counter").append(postsB.total + '<div> records retrieved for set B</div>');
            chartit('stats-hbar-b', postsB.total)


          }
        }
      }
    })
    //{$search: seta[i], $fields: ['username'], $deep: false}
    getServiceData('find',
      'instagram/profiles',
      {query:{
          "username": {$in: seta},
          $limit:seta.length,
          $sort:{createdAt: -1}
        }},
      'seta-profile-userid'
    )
    getServiceData('find',
      'instagram/profiles',
      {query:{
          "username": {$in: setb},
          $limit:setb.length,
          $sort:{createdAt: -1}
        }},
      'setb-profile-userid'
    )

  }

}

//getSocketData('cube','this data is needed').then(data=>console.log(data))
