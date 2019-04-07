const request = require('request');
const serverUrl = 'http://localhost:3003/api';
const config = require('../../config');
const fetch = require('node-fetch');
const ejs = require('ejs')
const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36';
function getHeaders() {
  return {
    'referer': 'http://localhost:8080/',
    'origin': 'http://localhost:8080/',
    'user-agent': userAgent,
    'x-requested-with': 'XMLHttpRequest'
  }
}
async function getEndpointEtl(etlApiEndpoint){
  let etlData = await fetch(etlApiEndpoint,
    {
      headers: getHeaders(),
    }).then(t => t.json().catch((e) => {
    console.log('Instagram API returned an error:' + e)
  }).then(r => r));
  console.log('Rendering results from backend-social API to browser client');
  //res.render('pages/profile',{finalData});
  if(etlData.results)etlData = etlData.results;
  return etlData
}
module.exports = function (options = {}) {
  return async function mwEtlApi(req, res, next) {
    if(!(config.sessionid && config.csrftoken)){
      res.redirect('/');
    }else{
      let expr = req.originalUrl;
      if(expr.indexOf('/instagram/profile')>=0){
        let etlApiEndpoint = serverUrl+expr;
        const etlData = await getEndpointEtl(etlApiEndpoint);
        res.render('pages/profile',{etlData},function(err, html) {
          res.send(html);
        });
      }
      else if(expr.indexOf('/instagram/whoami')>=0){
        expr = expr.replace('/instagram/whoami','/instagram/profile') + "?"+ config.username
        let etlApiEndpoint = serverUrl+expr;
        const etlData = await getEndpointEtl(etlApiEndpoint);
        res.render('pages/profile',{etlData},function(err, html) {
          res.send(html);
        });
      }
      else if(expr.indexOf('/instagram/posts')>=0){
        let etlApiEndpoint = serverUrl+expr;
        let etlData = await getEndpointEtl(etlApiEndpoint);

        let userid = config.userid;
        res.render('pages/posts',{etlData, userid},function(err, html) {
          if(err)console.log('ejs has returned this error: '+ err);
          res.send(html);
        });
      }
      else if(expr.indexOf('/instagram/allposts')>=0){
        let etlApiEndpoint = serverUrl+expr;
        let etlData = await getEndpointEtl(etlApiEndpoint);

        let userid = config.userid;
        if(etlData.length){
          if(etlData.length> 100){
            etlData = etlData.slice(0,100);
            console.log('data has been cropped to 100 items to show for all posts but all posts have been saved to database successfully');
          }
          let finalData = {};
          finalData.user = {};
          finalData.user.edge_owner_to_timeline_media = {};
          finalData.user.edge_owner_to_timeline_media.edges = etlData;
          etlData = finalData;
        }
        res.render('pages/posts',{etlData, userid},function(err, html) {
          if(err)console.log('ejs has returned this error: '+ err);
          res.send(html);
        });
      }
      else if(expr.indexOf('/instagram/explore/tag')>=0){
        let etlApiEndpoint = serverUrl+expr.replace('/explore','');
        let etlData = await getEndpointEtl(etlApiEndpoint);

        let userid = config.userid;
        if(etlData.length){
          if(etlData.length> 100){
            etlData = etlData.slice(0,100);
            console.log('data has been cropped to 100 items to show for all posts but all posts have been saved to database successfully');
          }
          let finalData = {};
          finalData.user = {};
          finalData.user.edge_owner_to_timeline_media = {};
          finalData.user.edge_owner_to_timeline_media.edges = etlData;
          etlData = finalData;
        }
        res.render('pages/posts',{etlData, userid},function(err, html) {
          if(err)console.log('ejs has returned this error: '+ err);
          res.send(html);
        });
      }
      else if(expr.indexOf('/instagram/explore/location')>=0){
        let etlApiEndpoint = serverUrl+expr.replace('/explore','');
        let etlData = await getEndpointEtl(etlApiEndpoint);

        let userid = config.userid;
        if(etlData.length){
          if(etlData.length> 100){
            etlData = etlData.slice(0,100);
            console.log('data has been cropped to 100 items to show for all posts but all posts have been saved to database successfully');
          }
          let finalData = {};
          finalData.user = {};
          finalData.user.edge_owner_to_timeline_media = {};
          finalData.user.edge_owner_to_timeline_media.edges = etlData;
          etlData = finalData;
        }
        res.render('pages/posts',{etlData, userid},function(err, html) {
          if(err)console.log('ejs has returned this error: '+ err);
          res.send(html);
        });
      }
      else if(expr.indexOf('/instagram/following')>=0){
        let etlApiEndpoint = serverUrl+expr
        let etlData = await getEndpointEtl(etlApiEndpoint);
        let userid = config.userid;
        if(etlData.length){
          if(etlData.length> 100){
            etlData = etlData.slice(0,100);
            console.log('data has been cropped to 100 items to show for all posts but all posts have been saved to database successfully');
          }
          let finalData = {};

          finalData.edges = etlData;
          etlData = finalData;
        }
        res.render('pages/follow',{etlData, userid},function(err, html) {
          if(err)console.log('ejs has returned this error: '+ err);
          res.send(html);
        });
      }
      else if(expr.indexOf('/instagram/followers')>=0){
        let etlApiEndpoint = serverUrl+expr
        let etlData = await getEndpointEtl(etlApiEndpoint);
        let userid = config.userid;
        if(etlData.length){
          if(etlData.length> 100){
            etlData = etlData.slice(0,100);
            console.log('data has been cropped to 100 items to show for all posts but all posts have been saved to database successfully');
          }
          let finalData = {};

          finalData.edges = etlData;
          etlData = finalData;
        }
        res.render('pages/follow',{etlData, userid},function(err, html) {
          if(err)console.log('ejs has returned this error: '+ err);
          res.send(html);
        });
      }
      else if(expr.indexOf('/instagram/search')>=0){
        let etlApiEndpoint = serverUrl+expr;
        let etlData = await getEndpointEtl(etlApiEndpoint);
        let userid = config.userid;
        res.render('pages/search',{etlData, userid},function(err, html) {
          if(err)console.log('ejs has returned this error: '+ err);
          res.send(html);
        });
      }
      else if(expr.indexOf('/instagram/feed')>=0){
        let etlApiEndpoint = serverUrl+expr;
        let etlData = await getEndpointEtl(etlApiEndpoint);
        let userid = config.userid;
        if(etlData.user)etlData = etlData.user;
        if(etlData.edge_web_feed_timeline)etlData = etlData.edge_web_feed_timeline;
        if(etlData.edges)etlData = etlData.edges;
        res.render('pages/feed',{etlData, userid},function(err, html) {
          if(err)console.log('ejs has returned this error: '+ err);
          res.send(html);
        });
      }
      else if(expr.indexOf('/instagram/allfeed')>=0){
        let etlApiEndpoint = serverUrl+expr;
        let etlData = await getEndpointEtl(etlApiEndpoint);
        let userid = config.userid;
        res.render('pages/feed',{etlData, userid},function(err, html) {
          if(err)console.log('ejs has returned this error: '+ err);
          res.send(html);
        });
      }
      else if(expr.indexOf('/instagram/suggested/posts')>=0){
        let etlApiEndpoint = serverUrl+expr;
        let etlData = await getEndpointEtl(etlApiEndpoint);
        let userid = config.userid;
        let finalData = {};
        finalData.user = {};
        finalData.user.edge_owner_to_timeline_media = {};
        finalData.user.edge_owner_to_timeline_media.edges = etlData;
        etlData = finalData;

        res.render('pages/posts',{etlData, userid},function(err, html) {
          if(err)console.log('ejs has returned this error: '+ err);
          res.send(html);
        });
      }
      else if(expr.indexOf('/instagram/suggested/people')>=0){
        let etlApiEndpoint = serverUrl+expr;
        let etlData = await getEndpointEtl(etlApiEndpoint);
        let userid = config.userid;
        let finalData = {};
        finalData.edges = etlData;
        etlData = finalData;
        res.render('pages/people',{etlData, userid},function(err, html) {
          if(err)console.log('ejs has returned this error: '+ err);
          res.send(html);
        });
      }
      else if(expr.indexOf('/instagram/likes')>=0){
        let etlApiEndpoint = serverUrl+expr;
        let etlData = await getEndpointEtl(etlApiEndpoint);
        if(etlData.length>0){
          let userid = config.userid;
          let finalData = {};
          finalData.edges = etlData;
          etlData = finalData;

          res.render('pages/likes',{etlData, userid},function(err, html) {
            if(err)console.log('ejs has returned this error: '+ err);
            res.send(html);
          });
        }else{
          res.send('<h1>NO LIKES FOR SELECTED POST</h1>>')
        }

      }
      else if(expr.indexOf('/instagram/comments')>=0){
        let etlApiEndpoint = serverUrl+expr;
        let etlData = await getEndpointEtl(etlApiEndpoint);
        if(etlData.length>0){
          let userid = config.userid;
          let finalData = {};
          finalData.edges = etlData;
          etlData = finalData;

          res.render('pages/comments',{etlData, userid},function(err, html) {
            if(err)console.log('ejs has returned this error: '+ err);
            res.send(html);
          });
        }else{
          res.send('<h1>NO LIKES FOR SELECTED POST</h1>>')
        }

      }
      /*else if(expr.indexOf('/instagram/post/page')>=0){
        let etlApiEndpoint = serverUrl+expr;
        let etlData = await getEndpointEtl(etlApiEndpoint);
        if(etlData){
          res.send(etlData);
        }else{
          res.send('<h1>NO SUCH POST</h1>>')
        }

      }*/
      else if(expr.indexOf('/instagram/post')>=0){
        let etlApiEndpoint = serverUrl+expr;
        let etlData = await getEndpointEtl(etlApiEndpoint);
        if(etlData){
          let userid = config.userid;
          res.render('pages/post',{etlData, userid},function(err, html) {
            if(err){
              console.log('ejs has returned this error: '+ err);
            }
            res.send(html);

          });
        }else{
          res.send('<h1>NO SUCH POST</h1>>')
        }

      }

    }


  };
};
