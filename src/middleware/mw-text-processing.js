const countWords = require("count-words");
const emojiRegex = require('emoji-regex');
const regex = emojiRegex();
module.exports = function (options = {}) {
  return async function mwTextProcessing(req, res, next) {
    let expr = req.originalUrl;
    if(expr.indexOf('/instagram/set/textProc?')>=0){
      let querySet = req.query.set;
      let queryProfiles = req.query.profiles;
      let postsSet = 'instagram/postsa';
      if(querySet==='setb')postsSet = 'instagram/postsb';
      let commentsData=[];
      let wordCloudArray=[];
      let emojiCloudArray=[];

      //TODO: find all posts of set's profile and return their textProc object only (textProc array not comments array)
      console.log('Text processing middleware is working now...');
      let resTextProc = await req.app.service(postsSet).find({
        query: {
          "owner.id": {$in:queryProfiles.split(',')},
          "comments.count": {$gt:0},
          $select: [ 'comments' ],
          $sort: {timestamp: -1},
          $limit: 20000
        },
        paginate: {
          default: 20000,
          max: 10000
        },
      }).then(items => {
        return items
      }).catch(err=>{
        console.log(err)
      })

      for (let i in resTextProc.data){
        commentsData = commentsData.concat(resTextProc.data[i].comments.edges)
      }
      if(commentsData){
        for (let j in commentsData){
          if(commentsData[j]){
            if(commentsData[j].text_proc){
              wordCloudArray = wordCloudArray.concat(commentsData[j].text_proc.keywords)
              emojiCloudArray = emojiCloudArray.concat(commentsData[j].text_proc.emojis)
            }
          }
        }
      }else{
        console.log('No comments data')
      }

      let wordCloudData = await countWords(wordCloudArray.toString(),true)
      //let emojiCloudData = await countWords(emojiCloudArray.toString(),true)
      let match;
      let emojiCloudData ={};
      while (match = regex.exec(emojiCloudArray.toString())) {
        const emoji = match[0];
        emojiCloudData[emoji]=[...emoji].length
        //console.log(`Matched sequence ${ emoji } — code points: ${ [...emoji].length }`);
      }
      let finalTextProcRes = JSON.stringify({
        set:querySet,
        profiles:queryProfiles,
        results:commentsData,
        wordcloud:wordCloudData,
        emojicloud:emojiCloudData
      })
      res.send(finalTextProcRes)
    }
    else{
      next()
    }

  }
};
