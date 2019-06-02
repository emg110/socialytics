const sentiment = require('node-sentiment');
const emojiExtract = require('extract-emoji');
const emojiSentiment = require('emoji-extract-sentiment');
const keywordExtractor = require('keyword-extractor');
const Knwl = require('../../node_modules/knwl.js/knwl');
var knwlInstance = new Knwl('english');
const wordcount = require('wordcount');
const countWords = require("count-words");
const Autolinker = require( 'autolinker' );
const genderDetect = require('gender-detection');
const proc = (comment)=>{
  knwlInstance.init(comment.text);
  let links =Autolinker.parse(comment.text,{
    urls:true,
    mention:'instagram',
    hashtag:'instagram',
    stripPrefix:false
  });
  for (let i in links){
    links[i] = {link:links[i].matchedText}

  }
  let emojsent = emojiSentiment(comment.text)
  for (let j in emojsent){
    emojsent[j] = {emoji:emojsent[j].emoji,code:emojsent[j].code,sentiment:emojsent[j].sentiment}
  }
  let sentim = sentiment(comment.text)
  sentim = {score:sentim.score,vote:sentim.vote}
  return {
    /*created_at:comment.created_at,
    owner:{
      username: comment.owner.username,
      gender:genderDetect.detect(comment.owner.username)
    },*/
    word_count:wordcount(comment.text),
    count_words:countWords(comment.text,true),
    sentiment:sentim,
    emojis: emojiExtract.extractEmoji(comment.text),
    emojiSentiments:emojsent,
    keywords: keywordExtractor.extract(comment.text,{}),
    ner:{
      dates: knwlInstance.get('dates'),
      times:knwlInstance.get('times'),
      phones:knwlInstance.get('phones'),
      links:knwlInstance.get('links'),
      emails:knwlInstance.get('emails'),
      places:knwlInstance.get('places'),
      webs:links
    }
  }
}
module.exports = async function (data, isArray) {
  /*let resObj = {};
  let resComments = {};
  let resCaptions = {};
//context.result.data = context.result.data.slice(0,20);
  if(isArray){
    for (let item of data){
      if(item.comments.count > 0){
        resComments[item.shortcode]=[];
        if(Array.isArray(item.comments.edges)){
          for(let comment of item.comments.edges){
            knwlInstance.init(comment.text);
            let links =Autolinker.parse(comment.text,{
              urls:true,
              /!*  email:true,
                phone:true,*!/
              mention:'instagram',
              hashtag:'instagram',
              stripPrefix:false
            });
            for (let i in links){
              links[i] = {link:links[i].matchedText}

            }
            let emojsent = emojiSentiment(comment.text)
            for (let j in emojsent){
              emojsent[j] = {emoji:emojsent[j].emoji,code:emojsent[j].code,sentiment:emojsent[j].sentiment}
            }
            let sentim = sentiment(comment.text)
            sentim = {score:sentim.score,vote:sentim.vote}
            resComments[item.shortcode].push({
              created_at:comment.created_at,
              /!*text:comment.text,*!/
              owner:{
                /!*pic_url:comment.owner.profile_pic_url,*!/
                username: comment.owner.username,
                gender:genderDetect.detect(comment.owner.username)
              },
              word_count:wordcount(comment.text),
              count_words:countWords(comment.text,true),
              sentiment:sentim,
              emojis: emojiExtract.extractEmoji(comment.text),
              emojiSentiments:emojsent,
              keywords: keywordExtractor.extract(comment.text,{}),
              ner:{
                dates: knwlInstance.get('dates'),
                times:knwlInstance.get('times'),
                phones:knwlInstance.get('phones'),
                links:knwlInstance.get('links'),
                emails:knwlInstance.get('emails'),
                places:knwlInstance.get('places'),
                webs:links
              }
            })
          }
        }
      }
      if(item.captions.edges){
        resCaptions[item.shortcode]=[];
        for(let caption of item.captions.edges){
          knwlInstance.init(caption.node.text);
          let linksCap =Autolinker.parse(caption.node.text,{
            urls:true,
            /!*     email:true,
                 phone:true,*!/
            mention:'instagram',
            hashtag:'instagram',
            stripPrefix:false
          })
          for (let i in linksCap){
            linksCap[i] = {link:linksCap[i].matchedText}

          }
          let emojsentCap = emojiSentiment(caption.node.text)
          for (let j in emojsentCap){
            emojsentCap[j] = {emoji:emojsentCap[j].emoji,code:emojsentCap[j].code,sentiment:emojsentCap[j].sentiment}
          }
          let sentimCap = sentiment(caption.node.text)
          sentimCap = {score:sentimCap.score,vote:sentimCap.vote}
          resCaptions[item.shortcode].push({
            created_at:item.created_at,
            /!* text:caption.node.text,*!/
            word_count:wordcount(caption.node.text),
            count_words:countWords(caption.node.text,true),
            sentiment:sentimCap,
            emoji: emojiExtract.extractEmoji(caption.node.text),
            emojiSentiments:emojsentCap,
            keywords: keywordExtractor.extract(caption.node.text,{}),
            ner:{
              dates: knwlInstance.get('dates'),
              times:knwlInstance.get('times'),
              phones:knwlInstance.get('phones'),
              links:knwlInstance.get('links'),
              emails:knwlInstance.get('emails'),
              places:knwlInstance.get('places'),
              webs: linksCap
            }
          })
        }
      }
    }
  }
  else{
    let item = data;
    if(item.comments.count > 0){
      resComments[item.shortcode]=[];
      if(Array.isArray(item.comments.edges)){
        for(let comment of item.comments.edges){
          knwlInstance.init(comment.text);
          let links =Autolinker.parse(comment.text,{
            urls:true,
            /!*  email:true,
              phone:true,*!/
            mention:'instagram',
            hashtag:'instagram',
            stripPrefix:false
          });
          for (let i in links){
            links[i] = {link:links[i].matchedText}

          }
          let emojsent = emojiSentiment(comment.text)
          for (let j in emojsent){
            emojsent[j] = {emoji:emojsent[j].emoji,code:emojsent[j].code,sentiment:emojsent[j].sentiment}
          }
          let sentim = sentiment(comment.text)
          sentim = {score:sentim.score,vote:sentim.vote}
          resComments[item.shortcode].push({
            created_at:comment.created_at,
            /!*text:comment.text,*!/
            owner:{
              /!*pic_url:comment.owner.profile_pic_url,*!/
              username: comment.owner.username,
              gender:genderDetect.detect(comment.owner.username)
            },
            word_count:wordcount(comment.text),
            count_words:countWords(comment.text,true),
            sentiment:sentim,
            emojis: emojiExtract.extractEmoji(comment.text),
            emojiSentiments:emojsent,
            keywords: keywordExtractor.extract(comment.text,{}),
            ner:{
              dates: knwlInstance.get('dates'),
              times:knwlInstance.get('times'),
              phones:knwlInstance.get('phones'),
              links:knwlInstance.get('links'),
              emails:knwlInstance.get('emails'),
              places:knwlInstance.get('places'),
              webs:links
            }
          })
        }
      }
    }
    if(item.captions.edges){
      resCaptions[item.shortcode]=[];
      for(let caption of item.captions.edges){
        knwlInstance.init(caption.node.text);
        let linksCap =Autolinker.parse(caption.node.text,{
          urls:true,
          /!*     email:true,
               phone:true,*!/
          mention:'instagram',
          hashtag:'instagram',
          stripPrefix:false
        })
        for (let i in linksCap){
          linksCap[i] = {link:linksCap[i].matchedText}

        }
        let emojsentCap = emojiSentiment(caption.node.text)
        for (let j in emojsentCap){
          emojsentCap[j] = {emoji:emojsentCap[j].emoji,code:emojsentCap[j].code,sentiment:emojsentCap[j].sentiment}
        }
        let sentimCap = sentiment(caption.node.text)
        sentimCap = {score:sentimCap.score,vote:sentimCap.vote}
        resCaptions[item.shortcode].push({
          created_at:item.created_at,
          /!* text:caption.node.text,*!/
          word_count:wordcount(caption.node.text),
          count_words:countWords(caption.node.text,true),
          sentiment:sentimCap,
          emoji: emojiExtract.extractEmoji(caption.node.text),
          emojiSentiments:emojsentCap,
          keywords: keywordExtractor.extract(caption.node.text,{}),
          ner:{
            dates: knwlInstance.get('dates'),
            times:knwlInstance.get('times'),
            phones:knwlInstance.get('phones'),
            links:knwlInstance.get('links'),
            emails:knwlInstance.get('emails'),
            places:knwlInstance.get('places'),
            webs: linksCap
          }
        })
      }
    }
  }
  resObj.comments = resComments;
  resObj.captions = resCaptions;
  /!*    resObj.comments = [];
      resObj.captions = [];*!/
  return resObj*/
  if(isArray){
    for (let i in data){
      data[i]['text_proc']= await proc(data[i]);
    }
  }
  else{
    data['text_proc']= await proc(data);
  }
  return data
}
