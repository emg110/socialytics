function aggregate(array, type, field){
  let aggr = 0;
  switch (type) {
    case 'sum':
      aggr = array.data.reduce(function(sum, post){
        if(post[field]){
          if(post[field]["count"]){
            try {
              if(field==='edge_media_to_comment'){
                return sum + parseInt(post[field]["count"]);
              }else {
                return sum + parseInt(post[field]["count"]);
              }

            }catch (e) {
              return sum
            }
          }else{
            return sum
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
  }
  return aggr
}

module.exports = function () {
  return async function (context) {
    if (context.method === 'find'  && context.params.aggregate) {
      if(Array.isArray(context.params.aggregate)){
        let resArr = [];
        for (var aggri of context.params.aggregate){
          let type = aggri['type'];
          let field = aggri['field'];
          let resField = aggri['resField'];
          if(type && field){
            let result = await aggregate(context.result, type, field)
            if(result){
              resArr.push({[resField]:result})
            }
          }
        }
        //let trendArray = context.result.data.slice(context.result.data.length-101,context.result.data.length+1)
        let trendArray = context.result.data.slice(0,101)
        resArr.push({trendsdata:trendArray})
        context.result = resArr;

      }
      else{
        let type = context.params.aggregate['type'];
        let field = context.params.aggregate['field'];
        let resField = context.params.aggregate['resField'];
        if(type && field){
          let result = await aggregate(context.result, type, field).then(res=>res)
          if(result){
            context.result = {[resField]:result}
          }
        }
      }
    }
    return context
  }
}
