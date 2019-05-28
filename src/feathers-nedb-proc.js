const sentiment = require('node-sentiment');
const emojiExtract = require('extract-emoji');
const emojiSentiment = require('emoji-extract-sentiment');
const keywordExtractor = require('keyword-extractor');
const Knwl = require('knwl.js');
var knwlInstance = new Knwl('english');
const wordcount = require('wordcount');
const countWords = require("count-words");
const Autolinker = require( 'autolinker' );
const genderDetect = require('gender-detection');

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
              let resLocationArr = [];
              let resComments = {};
              let resCaptions = {};
              if(context.params.location || context.params.textProc || context.params.imageProc){
                for (let item of context.result.data){
                  if(context.params.location){
                    if(item.media){
                      if(item.media.location){
                        let location = item.media.location;
                        if(location.lat){
                          resLocationArr.push({sc:item.shortcode,loc:{name:location.name,lat:location.lat,lng:location.lng}});
                        }
                      }
                    }
                  }
                  if(context.params.textProc){
                    if(item.comments.count > 0){
                      resComments[item.shortcode]=[];
                      for(let comment of item.comments.edges){
                        knwlInstance.init(comment.text);
                        resComments[item.shortcode].push({
                          created_at:comment.created_at,
                          text:comment.text,
                          owner:{
                            pic_url:comment.owner.profile_pic_url,
                            username: comment.owner.username,
                            gender:genderDetect.detect(comment.owner.username)
                          },
                          word_count:wordcount(comment.text),
                          sentiment:sentiment(comment.text),
                          emoji: emojiExtract.extractEmoji(comment.text),
                          emojiSentiments:emojiSentiment(comment.text),
                          keywords: keywordExtractor.extract(comment.text,{}),
                          ner:{
                            dates: knwlInstance.get('dates'),
                            times:knwlInstance.get('times'),
                            phones:knwlInstance.get('phones'),
                            links:knwlInstance.get('links'),
                            emails:knwlInstance.get('emails'),
                            places:knwlInstance.get('places')
                          },
                          count_words:countWords(comment.text,true),
                          links: Autolinker.parse(comment.text,{
                            urls:true,
                            email:true,
                            phone:true,
                            mention:true,
                            hashtag:true
                          })




                        })
                      }
                    }
                    if(item.captions.edges){
                      for(let caption of item.captions.edges){
                        knwlInstance.init(caption.text);
                        resCaptions[item.shortcode].push({
                          text:caption.node.text,
                          word_count:wordcount(caption.node.text),
                          sentiment:sentiment(caption.node.text),
                          emoji: emojiExtract.extractEmoji(caption.node.text),
                          emojiSentiments:emojiSentiment(caption.node.text),
                          keywords: keywordExtractor.extract(caption.node.text,{}),
                          ner:{
                            dates: knwlInstance.get('dates'),
                            times:knwlInstance.get('times'),
                            phones:knwlInstance.get('phones'),
                            links:knwlInstance.get('links'),
                            emails:knwlInstance.get('emails'),
                            places:knwlInstance.get('places')
                          },
                          count_words:countWords(caption.node.text,true),
                          links: Autolinker.parse(caption.node.text,{
                            urls:true,
                            email:true,
                            phone:true,
                            mention:true,
                            hashtag:true
                          })

                        })
                      }
                    }
                  }
                }
              }
              resObj[resField] = result
              resObj['locations'] = resLocationArr
              resObj['comments'] = resCommentsArr
            }
          }
        }
        //let trendArray = context.result.data.slice(context.result.data.length-101,context.result.data.length+1)
        resObj['total']=context.result.data.length;
        let trendArray = context.result.data.slice(0,101);
        resObj['trendsdata']=trendArray;
        context.result = resObj;

      }
    }
    return context
  }
}
