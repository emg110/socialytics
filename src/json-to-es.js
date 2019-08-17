const fs = require('fs');
const logger = require('./logger');
const { Client } = require('@elastic/elasticsearch');
const client = new Client({ node: 'http://192.168.140.200:9600' });
const inStream = fs.createReadStream('././data/insta-postsa.db');
const getDB = require('./nedb-file') ;
const db = getDB('././data/insta-profiles.db')
/*function findOne(id){
   db.findOne({"id":id  }, function (err, docs) {
    if(docs.id){
      return docs.username
    }
  });
}*/
async function findOne(id) {
  let promise = await new Promise((resolve, reject) => {
    db.findOne({"id":id  }, function (err, docs) {
      if(docs.id && docs !== null){
       resolve(docs.username)
      }
      else if(err){
        reject(err)
      }
    });
  })
    .catch(err => {throw err});

  return promise
}
//findOne('144117420').then(username=>console.log(username));

var lineReader = require('readline').createInterface({
  input: inStream
});
async function writeToES(doc, index){
  await findOne(doc['owner']['id'])
    .then(username=>{
      doc['owner']['username']=username
    })
    .catch(err => logger.error(err));

  await client.index({
    index: index,
    type: '_doc',
    body: doc
  }).then(()=>{
    counter++;
    logger.info(counter+" docs has been stored in ES index: "+index)
  }).catch(err=>{
    logger.error(err)
  })

}
async function queryES(q, index){
  await client.search({
    index: index,
    type: '_doc',
    query: q
  }).then(()=>{
    logger.info('')
  }).catch(err=>{
    logger.error(err)
  })

}
var counter=0;
lineReader.on('line',  function (line) {

  //line = line.replace(/\"/g, '"');
  //line = line.replace(/\//g, '');
  let rec = JSON.parse(line)
  if(rec['_id']){
    rec.dbid = rec['_id'];
    delete rec['_id'];
  }
  if(rec['comments']){
    if(rec['comments'].edges){
      if(rec['comments'].edges.length>0){
        for (i in rec['comments'].edges){
          delete rec['comments'].edges[i]['text_proc']["count_words"]
          delete rec['comments'].edges[i]['text_proc']["ner"]
          delete rec['comments'].edges[i]['text_proc']["emojiSentiments"]
          if(rec['comments'].edges[i]['text_proc']){
            rec['comments'].edges[i]['text_proc']['emojis']=rec['comments'].edges[i]['text_proc']['emojis'].join(',')
            rec['comments'].edges[i]['text_proc']['keywords']=rec['comments'].edges[i]['text_proc']['keywords'].join(',')
          }
        }
      }
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

   writeToES(rec, 'instagram_posts');

});


inStream.on('end', function() {

  logger.info('ETL has ended successfully....'+' & around '+counter+' Records have been transfered in total')
  client.indices.refresh({ index: 'instagram_posts' })

});





