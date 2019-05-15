const config = require('../config');
const universe = require('universe');
function cube(array){
  return universe(array).then(function(cube){
    return cube
  })

}
module.exports = function () {
  return async function (context) {
  if (context.method === 'find'  && context.params.cube) {
    let query = context.params.cube['query'];
    let squash = context.params.cube['squash'];
    let datasetName = context.params.cube['cubeName'];
    let cubeFields = context.params.cube['cubeFields'];
    if(query && cubeFields && datasetName){
      if(!config.cube[datasetName]){
        config.cube[datasetName] = await cube(context.result, query, cubeFields);
      }
      let result =  await config.cube[datasetName].query(query).then(res=>res)
      let resArr = [];
      if(result){
        resArr.push({[datasetName]:result})
        context.result = resArr;
      }
      if(squash){
        let sqresult = await config.cube[datasetName].squash(squash).then(res=>res)
        if(sqresult){
          resArr.push({[datasetName+':squash']:sqresult})
        }
      }

    }
    }
    return context
  }
}
