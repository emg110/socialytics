const config = require('../../config');
const serverUrl = config.PROTOCOL+"://"+config.HOST+':'+config.PORT+'/api';
const fetch = require('node-fetch');
//const ejs = require('ejs')
const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36';
const uri = config.PROTOCOL+"://"+config.HOST+':'+config.UIPORT+'/'
const cities = require("all-the-cities")
const Nominatim = require('nominatim-geocoder')
const geocoder = new Nominatim()
//console.log(uri);
const writeDatabase = require('../storage');
const renderData = require('../render');
function getHeaders(username, accessToken, strategy) {
  return {
    'referer': uri,
    'username': username,
    'accessToken': accessToken,
    'strategy': strategy,
    'origin': uri,
    'user-agent': userAgent,
    'x-requested-with': 'XMLHttpRequest'
  }
}
function cleans(post, isArray){
  if(isArray){
    for (let item in post){
      if (post[item].node) {
        post[item] = post[item].node;
      }
      if (post[item].user) {
        post[item] = post[item].user
      }
      if (post[item].graphql) {
        if (post[item].graphql.shortcode_media) {
          post[item] = post[item].graphql.shortcode_media
        }
      }
    }
    return post
  }else{
    if (post.node) {
      post = post.node;
    }
    if (post.user) {
      post = post.user
    }
    if (post.graphql) {
      if (post.graphql.shortcode_media) {
        post = post.graphql.shortcode_media
      }
    }
    return post
  }
}
const getEndpointDataEtl = async (etlApiEndpoint, username, accessToken, strategy)=>{
  let etlData = await fetch(etlApiEndpoint,
    {
      headers: getHeaders(username, accessToken, strategy),
    }).then(t => t.json().catch((e) => {
    console.log('Instagram API returned an error:' + e)
  }).then(r => r));
  console.log('Returning retrieved results from backend-social API to client');
  //res.render('pages/profile',{finalData});
  if(etlData){
    if(etlData.results){
      etlData = etlData.results;
    }
    return etlData
  }else{
    return console.error('No ETL data')
  }


}
const getCity= async (city)=>{
  let res = await cities.filter(citi => {
    return citi.name.match(city)
  })
  return res[0] || res
}
module.exports = function (options = {}) {
  return async function mwEtlApi(req, res, next) {
    let username = req.headers.username;
    let accessToken =  req.headers.accesstoken;
    let strategy = 'jwt';
    let expr = req.originalUrl;
    if(expr.indexOf('/instagram/set/data?')>=0){
      req.setTimeout(50000000000)
      var resultData = {};
      resultData.totalInstaPostsA = resultData.totalInstaPostsB = 0
      resultData.totalDbPostsA = resultData.totalDbPostsB = 0
      var setAData = req.query.setAData.split(',');
      var setBData = req.query.setBData.split(',');
      resultData.setAData = setAData;
      resultData.setBData = setBData;
      resultData.profilesA = [];
      resultData.profilesB = [];
      resultData.setA = [];
      resultData.setB = [];
      let etlApiEndpoint = serverUrl+'/instagram/profile?username=';
      let etlApiEndpointPosts = serverUrl+'/instagram/allpostsById?userid=';
      let etlApiEndpointMedia = serverUrl+'/instagram/post?shortcode=';
      if(setAData[0] === '')setAData=[];
      if(setBData[0] === '')setBData=[];
      if(setAData.length>0){
        for(var setAItem of setAData){
          let timeA = await setTimeout(function(){return 5000},5000);
          let etlDataA = await getEndpointDataEtl(etlApiEndpoint+setAItem, username, accessToken, strategy);
          if(etlDataA && etlDataA !== 'No ETL data'){
            resultData.profilesA.push(etlDataA)
            let serviceProfile = 'instagram/profiles';
            console.log('info: Writing SetA profile '+ etlDataA.username +' from ETL API to database')
            let recordProfileA = await writeDatabase(req.app, etlDataA, serviceProfile, username)
              .then(result => {
                return result
                console.log('info: SetA, profile: '+ etlDataA.username +' , has written from ETL API to database')
              })
              .catch(err => {
                console.log(err);
                res.sendStatus(500)
              });
          }
          else{
            console.log('No ETL data has returned from Instagram');
            res.sendStatus(500)
          }
        }
        for(var setAProfile of resultData.profilesA){
          let timePA = await setTimeout(function(){return 5000},5000);
          resultData.totalInstaPostsA+=setAProfile.edge_owner_to_timeline_media.count
          let etlDataPA = await getEndpointDataEtl(etlApiEndpointPosts+setAProfile.id, username, accessToken, strategy);
          if(etlDataPA && etlDataPA !== 'No ETL data'){
            resultData.totalDbPostsA+=etlDataPA.length;
            for(let postA of etlDataPA){
              postA = cleans(postA)
              let timePMA = await setTimeout(function(){return 1000},1000);
              let etlDataPMA = await getEndpointDataEtl(etlApiEndpointMedia+postA.shortcode, username, accessToken, strategy);
              etlDataPMA = cleans(etlDataPMA)
              let loc  =etlDataPMA.location;
              if(loc && loc !== null){
                if(!loc['lng'] && !loc['lon']){
                  /*let location = await geoSearch(loc.name)*/
                  let address = JSON.parse(loc['address_json']);
                  if(address){
                    let q = '';
                    if(address['zip_code']){
                      if(address['zip_code'].length>1){
                        loc.zip = address['zip_code'];
                      }
                    }
                    if(address['street_address']){
                      if(address['street_address'].length>1){
                        loc.street = address['street_address'];
                      }

                    }
                    if(address['region_name']){
                      if(address['region_name'].length>1){
                        loc.region = address['region_name'];
                      }

                    }
                    if(address['city_name']){
                      if(address['city_name'].length>1){
                        if(address['city_name'].indexOf(',')>-1)address['city_name'] = address['city_name'].substring(0,address['city_name'].indexOf(','))
                        loc.city = address['city_name'];
                      }
                    }
                    if(address['country_code']){
                      if(address['country_code'].length>1){
                        loc.country = address['country_code'];
                      }

                    }
                    if(!loc.zip && !loc.street && !loc.region &&  !loc.city){
                      if(loc.name && loc.name.length>1)q = loc.name
                      else if(loc.country)q = loc.country
                    }
                    else if(loc.city && loc.city.length>1 && loc.country && loc.country.length>1 ){
                      q = loc.city + ',' + loc.country
                    }else{
                      q = loc.name
                    }

                    let locReq = await geocoder.search( { q: q }, {}, function(error, response) {
                      if(error){
                        console.log('info: SetA on Nominatim ETL has returned error: '+error);
                        return []
                      }
                      else{
                        return response
                      }
                    });
                    let finalLoc = locReq[0]
                    if(finalLoc){
                      if(finalLoc.lng)loc.lng= finalLoc.lng;
                      else if(finalLoc.lon)loc.lng= finalLoc.lon;
                      loc.lat = finalLoc.lat;
                      etlDataPMA.location = loc;
                    }

                  }
                }
              }
              postA.media = etlDataPMA
            }
            resultData.setA.push({profile:setAProfile.username,totalDb:etlDataPA.length,profileData:setAProfile,posts:etlDataPA})
            console.log('info: Writing SetA,  '+ etlDataPA.length +'posts from ETL API to database')
            let servicePostsA = 'instagram/postsa';
            let recordDataA = await writeDatabase(req.app, etlDataPA, servicePostsA, username)
              .then(result => {
                return result
                console.log('info: Patched setA member profile: '+setAProfile.username+' in database with '+etlDataPA.length+' records '+ 'for these profiles: '+resultData.profilesA.toString());
              })
              .catch(err => {
                console.log(err);
                res.sendStatus(500)
              });
            for (let resA of resultData.setA){
              console.log('SetA '+resA.posts.length+' posts of profile: '+resA.profile+' cropped to 100 to be sent to user as sample ')
              resA.posts = resA.posts.slice(0,100);

            }

          }
          else{
            console.log('No ETL data has returned from Instagram');
            res.sendStatus(500)
          }
        }
      }
      if(setBData.length>0){
        for(var setBItem of setBData){
          let timeB = await setTimeout(function(){return 5000},5000);
          let etlDataB = await getEndpointDataEtl(etlApiEndpoint+setBItem, username, accessToken, strategy);
          if(etlDataB && etlDataB !== 'No ETL data'){
            resultData.profilesB.push(etlDataB)
            console.log('info: Writing SetB profile '+ etlDataB.username +' from ETL API to database')
            let serviceProfile = 'instagram/profiles';
            let recordProfileB = await writeDatabase(req.app, etlDataB, serviceProfile, username)
              .then(result => {
                console.log('info: SetB, profile: '+ etlDataB.username +' , has written from ETL API to database')
                return result
              })
              .catch(err => {
                console.log(err);
                res.sendStatus(500)
              });
          }
          else{
            console.log('No ETL data has returned from Instagram');
            res.sendStatus(500)
          }
        }
        for(var setBProfile of resultData.profilesB){
          let timePB = await setTimeout(function(){return 5000},5000);
          resultData.totalInstaPostsB+=setBProfile.edge_owner_to_timeline_media.count
          let etlDataPB = await getEndpointDataEtl(etlApiEndpointPosts+setBProfile.id, username, accessToken, strategy);
          if(etlDataPB && etlDataPB !== 'No ETL data'){
            resultData.totalDbPostsB+=etlDataPB.length;

            for(let postB of etlDataPB){
              postB = cleans(postB)
              let timePMB = await setTimeout(function(){return 1000},1000);
              let etlDataPMB = await getEndpointDataEtl(etlApiEndpointMedia+postB.shortcode, username, accessToken, strategy);
              etlDataPMB = cleans(etlDataPMB)
              let locB  =etlDataPMB.location;
              if(locB && locB !== null){
                if(!locB['lng'] && !locB['lon']){
                  /*let location = await geoSearch(loc.name)*/
                  let addressB = JSON.parse(locB['address_json']);
                  if(addressB){
                    let qB = '';
                    if(addressB['zip_code']){
                      if(addressB['zip_code'].length>1){
                        locB.zip = addressB['zip_code'];
                      }
                    }
                    if(addressB['street_address']){
                      if(addressB['street_address'].length>1){
                        locB.street = addressB['street_address'];
                      }

                    }
                    if(addressB['region_name']){
                      if(addressB['region_name'].length>1){
                        locB.region = addressB['region_name'];
                      }

                    }
                    if(addressB['city_name']){
                      if(addressB['city_name'].length>1){
                        if(addressB['city_name'].indexOf(',')>-1)addressB['city_name'] = addressB['city_name'].substring(0,addressB['city_name'].indexOf(','))
                        locB.city = addressB['city_name'];
                      }
                    }
                    if(addressB['country_code']){
                      if(addressB['country_code'].length>1){
                        locB.country = addressB['country_code'];
                      }

                    }
                    if(!locB.zip && !locB.street && !locB.region &&  !locB.city){
                      if(locB.name && locB.name.length>1)qB = locB.name
                      else if(locB.country)qB = locB.country
                    }
                    else if(locB.city && locB.city.length>1 && locB.country && locB.country.length>1 ){
                      qB = locB.city + ',' + locB.country
                    }else{
                      qB = locB.name
                    }

                    let locReqB = await geocoder.search( { q: qB }, {}, function(error, response) {
                      if(error){
                        console.log('info: SetB on Nominatim ETL has returned error: '+error);
                        return []
                      }
                      else{
                        return response
                      }
                    });
                    let finalLocB = locReqB[0]
                    if(finalLocB){
                      if(finalLocB.lng)locB.lng= finalLocB.lng
                      else if(finalLocB.lon)locB.lng= finalLocB.lon
                      locB.lat = finalLocB.lat;
                      etlDataPMB.location = locB
                    }

                  }
                }
              }
              postB.media = etlDataPMB
            }
            resultData.setB.push({profile:setBProfile.username,totalDb:etlDataPB.length,profileData:setBProfile,posts:etlDataPB})
            console.log('info: Writing SetB,  '+ etlDataPB.length +'posts from ETL API to database')
            let servicePostsB = 'instagram/postsb';
            let recordDataB = await writeDatabase(req.app, etlDataPB, servicePostsB, username)
              .then(result => {
                console.log('info: Patched setB in database with '+etlDataPB.length+' records '+ 'for these profiles: '+resultData.profilesB.toString());
                return result
              })
              .catch(err => {
                console.log(err);
                res.sendStatus(500)
              });
            for (let resB of resultData.setB){
              console.log('SetB '+resB.posts.length+' posts of profile: '+resB.profile+' cropped to 100 to be sent to user as sample ')
              resB.posts = resB.posts.slice(0,100);

            }
          }
          else{
            console.log('No ETL data has returned from Instagram');
            res.sendStatus(500)
          }
        }
      }

      console.log('info: Sending sets A & B data');
      res.json(resultData);


    }
    else if(expr.indexOf('/instagram/profile')>=0){
      let etlApiEndpoint = serverUrl+expr;
      let service = 'instagram/profiles';
      let page = 'pages/profile';
      console.log('info: Now requesting profile from ETL backend for: '+ username);
      let etlData = await getEndpointDataEtl(etlApiEndpoint, username, accessToken, strategy);
      if(etlData && etlData !== 'No ETL data'){
        console.log('info: Writing data from ETL API to database');
        console.log('info: Rendering data from ETL API to client');
        etlData = cleans(etlData);
        renderData(etlData,page,username,res);
       /* writeDatabase(req.app, etlData, service, username)
          .then(result => {
            console.log('info: Rendering data from ETL API to client')
            renderData(etlData,page,username,res);
          })
          .catch(err => {
            console.log(err);
            res.sendStatus(500)
          });*/
      }
      else{
        console.log('No ETL data has returned from Instagram');
        res.sendStatus(500)
      }

    }
    else if(expr.indexOf('/instagram/whoami')>=0){
      expr = expr.replace('/instagram/whoami','/instagram/profile') + "?"+ username
      let etlApiEndpoint = serverUrl+expr;
      let service = 'instagram/profiles';
      let page = 'pages/profile';
      let etlData = await getEndpointDataEtl(etlApiEndpoint, username, accessToken, strategy);
      console.log('info: Writing data from ETL API to database')
      if(etlData !== 'No ETL data'){
        etlData = cleans(etlData)
        console.log('info: Rendering data from ETL API to client')
        renderData(etlData,page,username,res);
       /* writeDatabase(req.app, etlData, service, username)
          .then(result => {
            console.log('info: Rendering data from ETL API to client')
            renderData(etlData,page,username,res);
          })
          .catch(err => {
            console.log(err);
            res.sendStatus(500)
          });*/
      }

    }
    else if(expr.indexOf('/instagram/posts')>=0){
      let etlApiEndpoint = serverUrl+expr;
      console.log('info: Now requesting posts from ETL backend for: '+ username);
      let etlData = await getEndpointDataEtl(etlApiEndpoint, username, accessToken, strategy);
      if(etlData && etlData !== 'No ETL data'){
        let service = 'instagram/posts';
        let page = 'pages/posts';
        console.log('info: Rendering data from ETL API to client')
        //etlData = cleans(etlData, true)
        renderData(etlData,page,username,res);
       /* writeDatabase(req.app, etlData, service, username)
          .then(result => {
            console.log('info: Rendering data from ETL API to client')
            renderData(etlData,page,username,res);
          })
          .catch(err => {
            console.log(err);
            res.sendStatus(500)
          });*/
      }
      else{
        console.log('No ETL data has returned from Instagram');
        res.sendStatus(500)
      }
    }
    else if(expr.indexOf('/instagram/allposts')>=0){
      req.setTimeout(50000000000)
      let etlApiEndpoint = serverUrl+expr;
      let service = 'instagram/posts';
      let page = 'pages/posts';
      let etlData = await getEndpointDataEtl(etlApiEndpoint, username, accessToken, strategy);
      var dataLength = etlData.length
      if(dataLength){
        /* if(etlData.length> 100){
           etlData = etlData.slice(0,100);
           console.log('data has been cropped to 100 items to show for all posts but all posts have been saved to database successfully');
         }*/
        let finalData = {};
        finalData.user = {};
        finalData.user.edge_owner_to_timeline_media = {};
        finalData.user.edge_owner_to_timeline_media.edges = [];
        if(dataLength > 100){
          for(var i=0;i<100;i++){
            finalData.user.edge_owner_to_timeline_media.edges.push(etlData[i])
          }
        }else{
          finalData.user.edge_owner_to_timeline_media.edges = etlData
        }
        console.log('All '+ etlData.length + ' posts have been collected from instagram, cropped to 100 records for view')

        etlData = finalData;
      }
      console.log('info: Rendering data from ETL API to client')
      renderData(etlData,page,username,res);
      /*writeDatabase(req.app, etlData, service, username)
        .then(result => {
          console.log('info: Rendering data from ETL API to client')
          renderData(etlData,page,username,res);
        })
        .catch(err => {
          console.log(err);
          res.sendStatus(500)
        });*/
    }
    else if(expr.indexOf('/instagram/tag')>=0){
      let etlApiEndpoint = serverUrl+expr.replace('/explore','');
      let service = 'instagram/tag';
      let page = 'pages/posts';
      let etlData = await getEndpointDataEtl(etlApiEndpoint, username, accessToken, strategy);
      if(etlData.length){
        /* if(etlData.length> 100){
           etlData = etlData.slice(0,100);
           console.log('data has been cropped to 100 items to show for all posts but all posts have been saved to database successfully');
         }*/
        console.log('All '+ etlData.length + ' tag posts have been collected from instagram')
        let finalData = {};
        finalData.user = {};
        finalData.user.edge_owner_to_timeline_media = {};
        finalData.user.edge_owner_to_timeline_media.edges = etlData;
        etlData = finalData;
      }
      console.log('info: Rendering data from ETL API to client')
      renderData(etlData,page,username,res);
      /*writeDatabase(req.app, etlData, service, username)
        .then(result => {
          console.log('info: Rendering data from ETL API to client')
          renderData(etlData,page,username,res);
        })
        .catch(err => {
          console.log(err);
          res.sendStatus(500)
        });*/

    }
    else if(expr.indexOf('/instagram/location')>=0){
      let etlApiEndpoint = serverUrl+expr.replace('/explore','');
      let service = 'instagram/location';
      let page = 'pages/posts';
      let etlData = await getEndpointDataEtl(etlApiEndpoint, username, accessToken, strategy);


      if(etlData.length){
        /* if(etlData.length> 100){
           etlData = etlData.slice(0,100);
           console.log('data has been cropped to 100 items to show for all posts but all posts have been saved to database successfully');
         }*/
        console.log('All '+ etlData.length + ' location posts have been collected from instagram')
        let finalData = {};
        finalData.user = {};
        finalData.user.edge_owner_to_timeline_media = {};
        finalData.user.edge_owner_to_timeline_media.edges = etlData;
        etlData = finalData;
      }
      console.log('info: Rendering data from ETL API to client')
      renderData(etlData,page,username,res);
      /*writeDatabase(req.app, etlData, service, username)
        .then(result => {
          console.log('info: Rendering data from ETL API to client')
          renderData(etlData,page,username,res);
        })
        .catch(err => {
          console.log(err);
          res.sendStatus(500)
        });*/

    }
    else if(expr.indexOf('/instagram/following')>=0){
      let etlApiEndpoint = serverUrl+expr;
      let service = 'instagram/following';
      let page = 'pages/follow';
      let etlData = await getEndpointDataEtl(etlApiEndpoint, username, accessToken, strategy);
      if(etlData.length){
        /*if(etlData.length> 100){
          etlData = etlData.slice(0,100);
          console.log('data has been cropped to 100 items to show for all posts but all posts have been saved to database successfully');
        }*/
        console.log('All '+ etlData.length + ' following profiles have been collected from instagram')
        let finalData = {};

        finalData.edges = etlData;
        etlData = finalData;
      }
      console.log('info: Rendering data from ETL API to client')
      renderData(etlData,page,username,res);
     /* writeDatabase(req.app, etlData, service, username)
        .then(result => {
          console.log('info: Rendering data from ETL API to client')
          renderData(etlData,page,username,res);
        })
        .catch(err => {
          console.log(err);
          res.sendStatus(500)
        });*/
    }
    else if(expr.indexOf('/instagram/followers')>=0){
      let etlApiEndpoint = serverUrl+expr;
      let service = 'instagram/followers';
      let page = 'pages/follow';
      let etlData = await getEndpointDataEtl(etlApiEndpoint, username, accessToken, strategy);
      if(etlData.length){
        /*if(etlData.length> 100){
          etlData = etlData.slice(0,100);
          console.log('data has been cropped to 100 items to show for all posts but all posts have been saved to database successfully');
        }*/
        let finalData = {};
        finalData.edges = [];
        if(etlData.length > 100){
          for(var i=0;i<100;i++){
            finalData.edges.push(etlData[i])
          }
        }else{
          finalData.edges=etlData;
        }
        console.log('All '+ etlData.length + ' follower profiles have been collected from instagram')
        etlData = finalData;
      }
      console.log('info: Rendering data from ETL API to client')
      renderData(etlData,page,username,res);
      /*writeDatabase(req.app, etlData, service, username)
        .then(result => {
          console.log('info: Rendering data from ETL API to client')
          renderData(etlData,page,username,res);
        })
        .catch(err => {
          console.log(err);
          res.sendStatus(500)
        });*/
    }
    else if(expr.indexOf('/instagram/search')>=0){
      let etlApiEndpoint = serverUrl+expr;
      let service = 'instagram/search';
      let page = 'pages/search';
      let etlData = await getEndpointDataEtl(etlApiEndpoint, username, accessToken, strategy);
      console.log('info: Rendering data from ETL API to client')
      renderData(etlData,page,username,res);
      /*writeDatabase(req.app, etlData, service, username)
        .then(result => {
          console.log('info: Rendering data from ETL API to client')
          renderData(etlData,page,username,res);
        })
        .catch(err => {
          console.log(err);
          res.sendStatus(500)
        });*/
    }
    else if(expr.indexOf('/instagram/feed')>=0){
      let etlApiEndpoint = serverUrl+expr;
      let service = 'instagram/feed';
      let page = 'pages/feed';
      let etlData = await getEndpointDataEtl(etlApiEndpoint, username, accessToken, strategy);
      if(etlData.user)etlData = etlData.user;
      if(etlData.edge_web_feed_timeline)etlData = etlData.edge_web_feed_timeline;
      if(etlData.edges)etlData = etlData.edges;
      console.log('info: Rendering data from ETL API to client')
      renderData(etlData,page,username,res);
      /*writeDatabase(req.app, etlData, service, username)
        .then(result => {
          console.log('info: Rendering data from ETL API to client')
          renderData(etlData,page,username,res);
        })
        .catch(err => {
          console.log(err);
          res.sendStatus(500)
        });*/
    }
    else if(expr.indexOf('/instagram/allfeed')>=0){
      let etlApiEndpoint = serverUrl+expr;
      let service = 'instagram/feed';
      let page = 'pages/feed';
      let etlData = await getEndpointDataEtl(etlApiEndpoint, username, accessToken, strategy);
      console.log('info: Rendering data from ETL API to client')
      renderData(etlData,page,username,res);
      /*writeDatabase(req.app, etlData, service, username)
        .then(result => {
          console.log('info: Rendering data from ETL API to client')
          renderData(etlData,page,username,res);
        })
        .catch(err => {
          console.log(err);
          res.sendStatus(500)
        });*/
    }
    else if(expr.indexOf('/instagram/suggested/posts')>=0){
      let etlApiEndpoint = serverUrl+expr;
      let service = 'instagram/feed';
      let page = 'pages/posts';
      let etlData = await getEndpointDataEtl(etlApiEndpoint, username, accessToken, strategy);
      let finalData = {};
      finalData.user = {};
      finalData.user.edge_owner_to_timeline_media = {};
      finalData.user.edge_owner_to_timeline_media.edges = etlData;
      etlData = finalData;
      console.log('info: Rendering data from ETL API to client')
      renderData(etlData,page,username,res);
      /*writeDatabase(req.app, etlData, service, username)
        .then(result => {
          console.log('info: Rendering data from ETL API to client')
          renderData(etlData,page,username,res);
        })
        .catch(err => {
          console.log(err);
          res.sendStatus(500)
        });*/
    }
    else if(expr.indexOf('/instagram/suggested/people')>=0){
      let etlApiEndpoint = serverUrl+expr;
      let service = 'instagram/profiles';
      let page = 'pages/people';
      let etlData = await getEndpointDataEtl(etlApiEndpoint, username, accessToken, strategy);
      let finalData = {};
      finalData.edges = etlData;
      etlData = finalData;
      console.log('info: Rendering data from ETL API to client')
      renderData(etlData,page,username,res);
     /* writeDatabase(req.app, etlData, service, username)
        .then(result => {
          console.log('info: Rendering data from ETL API to client')
          renderData(etlData,page,username,res);
        })
        .catch(err => {
          console.log(err);
          res.sendStatus(500)
        });*/
    }
    else if(expr.indexOf('/instagram/likes')>=0){
      let etlApiEndpoint = serverUrl+expr;
      let service = 'instagram/likes';
      let page = 'pages/likes';
      let etlData = await getEndpointDataEtl(etlApiEndpoint, username, accessToken, strategy);
      if(etlData.length>0){
        let finalData = {};
        finalData.edges = etlData;
        etlData = finalData;
        console.log('info: Rendering data from ETL API to client')
        renderData(etlData,page,username,res);
        /*writeDatabase(req.app, etlData, service, username)
          .then(result => {
            console.log('info: Rendering data from ETL API to client')
            renderData(etlData,page,username,res);
          })
          .catch(err => {
            console.log(err);
            res.sendStatus(500)
          });*/
      }else{
        res.send('<h1>NO LIKES FOR SELECTED POST</h1>>')
      }

    }
    else if(expr.indexOf('/instagram/comments')>=0){
      let etlApiEndpoint = serverUrl+expr;
      let service = 'instagram/comments';
      let page = 'pages/comments';
      let etlData = await getEndpointDataEtl(etlApiEndpoint, username, accessToken, strategy);
      if(etlData.length>0){
        let finalData = {};
        finalData.edges = etlData;
        etlData = finalData;
        console.log('info: Rendering data from ETL API to client')
        renderData(etlData,page,username,res);
        /*writeDatabase(req.app, etlData, service, username)
          .then(result => {
            console.log('info: Rendering data from ETL API to client')
            renderData(etlData,page,username,res);
          })
          .catch(err => {
            console.log(err);
            res.sendStatus(500)
          });*/
      }else{
        res.send('<h1 style="background-color:grey;margin-left:10px;margin-right:10px;min-height: 45px; border-radius:22px;padding:10px;">  NO COMMENTS FOR SELECTED POST<span style="color:darkred;vertical-align: middle;" class="glyphicon glyphicon-info-sign"></span></h1>>')
      }

    }
    else if(expr.indexOf('/instagram/post')>=0){
      let etlApiEndpoint = serverUrl+expr;
      let service = 'instagram/media';
      let page = 'pages/post';
      let etlData = await getEndpointDataEtl(etlApiEndpoint, username, accessToken, strategy);
      if(etlData){
        etlData = cleans(etlData)
        console.log('info: Rendering data from ETL API to client')
        renderData(etlData,page,username,res);
        /*writeDatabase(req.app, etlData, service, username)
          .then(result => {
            console.log('info: Rendering data from ETL API to client')
            renderData(etlData,page,username,res);
          })
          .catch(err => {
            console.log(err);
            res.sendStatus(500)
          });*/
      }else{
        res.send('<h1>NO SUCH POST</h1>>')
      }

    }
    else{
      console.log('info: Not an ETL request! End of the line for: '  + ': '+ expr+ ' Sending 404');
      res.sendStatus(404);
    }


  }
}
