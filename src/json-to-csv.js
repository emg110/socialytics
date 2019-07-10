/*
const fs = require('fs')
/!*const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
  path: 'algarveTourism.csv',
  header: ['id','timestamp','captions','shortcode','comments','owner','thumbnail','media','_id']
});
const records = require('./algtourism.js');
csvWriter.writeRecords(records)
  .then().catch(err=>{
  console.log(err)
});*!/
//var jsonsafeparse = require('json-safe-parse');


const inStream = require('fs').createReadStream('algarveTourism.json')
const outStream = fs.createWriteStream('algtourism.js', {
  flags: 'a' // 'a' means appending (old data will be preserved)
})
var lineReader = require('readline').createInterface({
  input: inStream
});
*/

/*

//outStream.write('var algarveTourism = [');
lineReader.on('line', function (line) {
 /!* let rec = await csvWriter.writeRecords(line)       // returns a promise
    .then().catch(err=>{
    console.log(err)
  });*!/
  //line = line.replace(/\"/g, '"');
  line = line.replace(/\//g, '');

  outStream.write(line)

});
*/

/*inStream.on('end', function() {
 /!* csvWriter.writeRecords(jsonArray)       // returns a promise
    .then(() => {
      console.log('...Done');
    }).catch(err=>{
      console.log(err)
  });*!/
  //outStream.write(JSON.stringify(jsonArray));
  //outStream.write(']; module.exports = function(){return algarveTourism}');
  /!*csvWriter.writeRecords(require('./algarve_tourism.js'))       // returns a promise
    .then(()=>{
      console.log('Wrote to CSV')
    }).catch(err=>{
      console.log(err)
    })*!/
  //require('./algarve_tourism.js')
  console.log('ended....')

});*/
const fs = require('fs')
var stream = fs.createReadStream("../testaaaaa.csv");
var csv = require("fast-csv");

var csvStream = csv()
  .on("data", function(data){
    console.log(data);
  })
  .on("end", function(){
    console.log("done");
  });

stream.pipe(csvStream);
