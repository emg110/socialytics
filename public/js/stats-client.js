function getStatsData() {
  window.useridArrA = [];
  window.useridArrB = [];
  var seta = document.getElementById('seta').value.split(',');
  var setb = document.getElementById('setb').value.split(',');
  var userid = '';
  var allPromisesA = [];
  var allPromisesB = [];
  if (seta.length && setb.length) {
    getSocketData('cube','this data is needed').then(data=>console.log(data))
    for (var i = 0; i < seta.length; i++) {
      allPromisesA.push(
        getServiceData('find', 'instagram/profiles', {
          $search: seta[i],
          $fields: ['username'],
          $deep: false
        }, undefined, {createdAt: -1})
          .catch((e)=>{
            console.log('Getting service data :: instagram/profiles :: returned error: '+ e );
          })
      );

    }
    for (var j = 0; j < setb.length; j++) {
      allPromisesB.push(
        getServiceData('find', 'instagram/profiles', {
          $search: setb[j],
          $fields: ['username'],
          $deep: false
        }, undefined, {createdAt: -1})
          .catch((e)=>{
            console.log('Getting service data :: instagram/profiles :: returned error: '+ e );
          })
      );

    }
    Promise.all(allPromisesA).then(profilesA => {
      for (i in profilesA){
        userid = profilesA[i].data[0].id;
        if (userid) {
          window.useridArrA.push(userid);
        }
      }
      getServiceData('find', 'instagram/posts', {"owner.id": {$in: window.useridArrA}}, 0, {createdAt: -1})
      .then(postsA => {
          if (postsA.data || postsA.total) {
            console.log(postsA.total);
            $("#counter").append(postsA.total+'<div> records retrieved for set A</div>');
            chartit('stats-hbar-a',postsA.total)
          }

        })
      .catch((e)=>{
        console.log('Getting service data :: instagram/posts :: on set A returned error: '+ e );
      })
    })
    Promise.all(allPromisesB).then(profilesB => {
      for (i in profilesB){
        userid = profilesB[i].data[0].id;
        if (userid) {
          window.useridArrB.push(userid);
        }
      }
      getServiceData('find', 'instagram/posts', {"owner.id": {$in: window.useridArrB}}, 0, {createdAt: -1})
      .then(postsB => {
          if (postsB.data || postsB.total) {
            console.log(postsB.total);
            $("#counter").append(postsB.total+'<div> records retrieved for set B</div>');
            chartit('stats-hbar-b',postsB.total)
          }

        })
      .catch((e)=>{
        console.log('Getting service data :: instagram/posts :: on set B returned error: '+ e );
      })
    })
  }
}
