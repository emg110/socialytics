
function chartit(container, data){
    var myChart = echarts.init(document.getElementById(container));


   // specify chart configuration item and data
   /*var option = {
     title: {
       top: '20px',
       text: 'Engagement activity'
     },
     tooltip: {},
     legend: {
       data:['Engagement']
     },
     xAxis: {
       data: ["1","2","3","4","5","7"]
     },
     yAxis: {},
     series: [{
       name: 'Engagement',
       type: 'bar',
       data: [1,2,3,4,5,6,7]
     }]
   };*/
  var option = {
    dataset: {
      source: [
        ['score', 'amount', 'product'],
        [89.3, 58212, 'Matcha Latte'],
        [57.1, 78254, 'Milk Tea'],
        [74.4, 41032, 'Cheese Cocoa'],
        [50.1, 12755, 'Cheese Brownie'],
        [89.7, 20145, 'Matcha Cocoa'],
        [68.1, 79146, 'Tea'],
        [19.6, 91852, 'Orange Juice'],
        [10.6, 101852, 'Lemon Juice'],
        [32.7, 20112, 'Walnut Brownie']
      ]
    },
    grid: {containLabel: true},
    xAxis: {name: 'amount'},
    yAxis: {type: 'category'},
    visualMap: {
      orient: 'horizontal',
      left: 'center',
      min: 10,
      max: 100,
      text: ['High Score', 'Low Score'],
      // Map the score column to color
      dimension: 0,
      inRange: {
        color: ['#D7DA8B', '#E15457']
      }
    },
    series: [
      {
        type: 'bar',
        encode: {
          // Map the "amount" column to X axis.
          x: 'amount',
          // Map the "product" column to Y axis
          y: 'product'
        }
      }
    ]
  };
   // use configuration item and data specified to show chart
   myChart.setOption(option);
}
function getStatsData() {
  window.dataArrSetA = [];
  window.useridArr = [];
  window.dataArrSetB = [];
  var seta = document.getElementById('seta').value.split(',');
  var setb = document.getElementById('setb').value.split(',');
  var userid = '';
  var i = 0;
  if (seta.length && setb.length) {
    for (i = 0; i < seta.length; i++) {
      getServiceData('find', 'instagram/profiles', {
        $search: seta[i],
        $fields: ['username'],
        $deep: false
      }, undefined, {createdAt: -1})
        .then(profile => {
          userid = profile.data[0].id;
          if (userid) {
            window.useridArr.push(userid);
          }
        })
    }

    /*  for(i in setb){
        getServiceData('find', 'instagram/profiles',{$search: setb[i],$fields:['username'],$deep:false }, undefined, { createdAt: -1}).then(profile=>{
          userid = profile.data[0].id;
          getServiceData('find', 'instagram/posts',{"owner.id":userid.toString() }, undefined, { createdAt: -1}).then(posts=>{
            window.dataArrSetB.concat(posts.data)
            console.log(window.dataArrSetB.length)
            $("#counter").html(window.dataArrSetB.length)
            if(i== setb.length-1){
              window.alert('setA data length is:'+ window.dataArrSetA.length+ 'setB data length is:'+ window.dataArrSetB.length)
            }
          })
        })
      }*/
  }
  setTimeout(function () {
    getServiceData('find', 'instagram/posts', {"owner.id": {$in: window.useridArr}}, 0, {createdAt: -1})
      .then(posts => {
          if (posts.data || posts.total) {
            //window.dataArrSetA = posts.data;
            console.log(posts.total);
            $("#counter").html(posts.total+'<div> records retrieved</div>');
            chartit('stats-hbar-a',window.dataArrSetA)
          }

        }
      )
  }, 1000)
}
