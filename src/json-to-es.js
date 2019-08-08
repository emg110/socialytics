const fs = require('fs');
const logger = require('./logger');
const { Client } = require('@elastic/elasticsearch');
const client = new Client({ node: 'http://192.168.140.200:9600' });
const inStream = fs.createReadStream('././data/insta-postsa.db');
var lineReader = require('readline').createInterface({
  input: inStream
});
async function writeToES(doc){
  await client.index({
    index: 'insta-postsa',
    type: '_doc',
    body: doc
  }).then(()=>{
    counter++;
    logger.info(counter+" Records has been stored in ES")
  }).catch(err=>{
    logger.error(err)
  })

}
var counter=0;
lineReader.on('line', function (line) {

  //line = line.replace(/\"/g, '"');
  //line = line.replace(/\//g, '');
  let rec = JSON.parse(line)
  if(rec['_id']){
    rec.dbid = rec['_id'];
    delete rec['_id'];
  }
  if(rec['comments']){
    if(rec['comments'].edges){
      delete rec['comments'].edges
    }
  }
  var capts = {};
  if (rec['captions']){
    if(rec['captions'].edges){
      if(rec['captions'].edges.length > 0){
        for (var i=0; i<rec['captions'].edges.length;i++){
          capts['caption'+i] = rec['captions'].edges[i].node.text
        }
      }
    }
  }
  rec['captions']= capts;
  if (rec['media']){
    if(rec['media']['related_media']){
      delete rec['media']['related_media']
    }
  }
  if (rec['timestamp']){
    rec['timestamp']=rec['timestamp']*1000
  }
  if (!rec['extraction_at']){
    rec['extraction_at']= Date.now();
  }
  if (rec['media']){
    if(rec['media']['timestamp']){
      rec['media']['timestamp']=rec['media']['timestamp']*1000
    }
    if (rec['media']['location']){
      if(rec['media']['location']['lat'] && rec['media']['location']['lng']){
        rec['media']['location']['geopoint']={"lat":rec['media']['location']['lat'] , "lon":rec['media']['location']['lng']}
      }
    }
  }

  writeToES(rec);

});


inStream.on('end', function() {

  logger.info('ETL has ended successfully....'+' & around '+counter+' Records have been transfered in total')
  client.indices.refresh({ index: 'insta-postsa' })

});





