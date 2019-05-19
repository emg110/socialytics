function aggregateSum(array, type, field){
  var aggr = array.data.reduce(function(sum, post){
    if(post[field]){
      if(post[field]["count"]){
        if(Number(post[field]["count"])){
          sum += parseInt(Number(post[field]["count"]));
          return sum
        }else{
          return sum
        }
      }else{
        if(Number(post[field])){
          sum += parseInt(Number(post[field]));
          return sum
        }else{
          return sum
        }
      }
    }
    else return 0
  }, 0);
  return aggr
}
/*let aggr = 0;
 switch (type) {
   case 'sum':
     aggr = array.data.reduce(function(sum, post){
       if(post[field]){
         if(post[field]["count"]){
           return sum + parseInt(post[field]["count"]);
         }else{
           return sum + parseInt(post[field])
         }
       }
       else return 0
     }, 0)
     break
   case 'avg':
     aggr = array.data.reduce(function(sum, post){
       if(post[field]){
         return sum + Number(post[field]);
       }else return 0

     }, 0)
     aggr = aggr / array.length
     break
   case 'max':
     aggr = array.data.reduce(function(max, post){
       if(post[field]){
         return Math.max(max , Number(post[field]));
       }else return max

     },0)
     break
   case 'min':
     aggr = array.data.reduce(function(min, post){
       if(post[field]){
         return Math.max(min , Number(post[field]));
       }else return min

     },0)
     break
 }*/
module.exports = function () {
  return async function (context) {
    let resObj = {};
    if (context.method === 'find'  && context.params.aggregate) {
      if(Array.isArray(context.params.aggregate)){
        for (let aggri of context.params.aggregate){
          let type = aggri['type'];
          let field = aggri['field'];
          let resField = aggri['resField'];
          if(type && field){
            let result
            switch (type) {
              case 'sum':
                result = await aggregateSum(context.result, type, field)
                break
            /*  case 'min':
                result = await aggregate(context.result, type, field)
                break
              case 'max':
                result = await aggregate(context.result, type, field)
                break
              case 'avg':
                result = await aggregate(context.result, type, field)
                break*/
            }
            if(result){
              //console.log(resField+' : '+result)
              resObj[resField] = result
            }
          }
        }
        //let trendArray = context.result.data.slice(context.result.data.length-101,context.result.data.length+1)
        resObj['total']=context.result.data.length;
        let trendArray = context.result.data.slice(0,101);
        resObj['trendsdata']=trendArray;
        context.result = resObj;

      }
      else{
        let type = context.params.aggregate['type'];
        let field = context.params.aggregate['field'];
        let resField = context.params.aggregate['resField'];
        if(type && field){
          let result = await aggregate(context.result, type, field)
          if(result){
            let resArr = [];
            resArr.push({[resField]:result})
            for (let item in context.result.data){
              if(item.location){
                console.log(item.location.toString())
              }
            }
            let trendArray = context.result.data.slice(0,101)
            resArr.push({trendsdata:trendArray})
            resArr.push({total:context.result.total})
            context.result = resArr;
          }
        }
      }
    }
    return context
  }
}
