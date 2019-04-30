var config = require('../../../../config');
const feathers = require('@feathersjs/feathers');
//const client = require('@feathersjs/client');
const socketio = require('@feathersjs/socketio-client');
const io = require('socket.io-client');
const uri = (config.PROTOCOL+"://"+config.HOST+':'+config.UIPORT)+'/';
const socket = io(uri);
const fapi = feathers().configure(socketio(socket, {
  timeout: 0
}));
var userid = config.userid;
console.log("Socialytics Instagram backend configurations initialized...");
const writeDatabase = require('./storage');
const Instagram = require('./instagram');
const instagramClient = new Instagram();
instagramClient.csrftoken = (instagramClient.csrftoken && instagramClient.csrftoken.length > 5) ? instagramClient.csrftoken : config.csrftoken;
instagramClient.sessionid = (instagramClient.sessionid && instagramClient.sessionid.length > 5) ? instagramClient.sessionid : config.sessionid;
instagramClient.userid = (instagramClient.userid && instagramClient.userid.length > 2) ? instagramClient.sessionid : userid;
console.log("Socialytics Instagram client has been initialized...");
console.log("Socialytics Instagram API has started...");
//Async functions using Instagram client
var api = {};
api.profileJson = async (ctx) => {
  if(config.sessionid && config.csrftoken){
    var inputUser = ctx.request.query;
    var uoi = inputUser.username || Object.keys(ctx.request.query)[0];
    let userData = await instagramClient.getUserDataByUsername(uoi).then((t) => {
      return t;
    })
    console.log('Profile JSON data has fetched from Instagram for user name: ' + uoi);

// Set up a socket connection to our Instagram ETL API
    let recordData = await fapi.service('/instagram/profiles').create(userData.graphql.user)
      .then(result => {
        return result;
      })
      .catch(err => {
        console.log(err);
      });
    ctx.status = 200;
    ctx.body = {
      results: userData.graphql.user
    }
  }
  else{
    ctx.status = 403;
    ctx.body = {
      results: 'You are not authenticated yet, hence not authorized to do this!'
    }
  }
}
api.profileSelfJson = async (ctx) => {
  if(config.sessionid&&config.csrftoken){
    var uoi = new String(instagramClient.userid);
    var uoi = inputUser.username || Object.keys(ctx.request.query)[0];
    let userData = await instagramClient.getUserDataByUsername(uoi).then((t) => {
      return t;
    })
    console.log('Profile JSON data has fetched from Instagram for self logged in account: ' + uoi);
    let recordData = await fapi.service('/instagram/profiles')
      .create(userData.graphql.user)
      .then(result => {
        return result;
      })
      .catch(err => {
        console.log(err);
      });
    ctx.status = 200;
    ctx.body = {
      results: userData.graphql.user
    }
  }
  else{
    ctx.status=403;
    ctx.body={
      results:'You are not authenticated yet, hence not authorized to do this!'
    }
  }

}
api.userPosts = async (ctx) => {
  if(config.sessionid && config.csrftoken){
    var inputUser = ctx.request.query;
    var uoi = inputUser.username;
    var count = inputUser.count;
    var userId = config.userid;
    let userData = await instagramClient.getUserDataByUsername(uoi).then((t) => {
      return t.graphql.user;
    })
    let posts = await instagramClient.getUserPosts(userData.id, count).then((p) => {
      return p.data
    }).catch(err => {
      console.log(err);
    });
    let writeToDatabase = await writeDatabase(posts, '/instagram/posts')
    ctx.status = 200;
    ctx.body = {
      results: posts
    }
  }
  else{
    ctx.status=403;
    ctx.body={
      results:'You are not authenticated yet, hence not authorized to do this!'
    }
  }
}
api.userAllPosts = async (ctx) => {
  if(config.sessionid && config.csrftoken){
    var inputUser = ctx.request.query;
    var uoi = inputUser.username;
    let userData = await instagramClient.getUserDataByUsername(uoi).then((t) => {
      return t;
    })
    var userId = instagramClient.getUserIdByUserName(userData);
    var posts = await instagramClient.getAllUserPosts(userId).then((p) => {
      return p
    }).catch(err => {
      console.log(err);
    });
    let writeToDatabase = await writeDatabase(posts, '/instagram/posts')
    ctx.status = 200;
    ctx.body = {
      results: posts
    }
  }
  else{
    ctx.status=403;
    ctx.body={
      results:'You are not authenticated yet, hence not authorized to do this!'
    }
  }

}
api.exploreTag = async (ctx) => {
  if(config.sessionid && config.csrftoken){
    var inputTag = ctx.request.query;
    var tag = inputTag.tag;
    var quantity = inputTag.count || 50;
    let tagsData = await instagramClient.explore('hashtag', tag, quantity).then((t) => {
      return t;
    }).catch(err => {
      console.log(err);
    });
    config.activetag = tag;
    let writeTagPostsToDatabase = await writeDatabase(tagsData, '/instagram/tag')


    ctx.status = 200;
    ctx.body = {
      results: tagsData
    }
  }
  else{
    ctx.status=403;
    ctx.body={
      results:'You are not authenticated yet, hence not authorized to do this!'
    }
  }
}
api.exploreLocation = async (ctx) => {
  if(config.sessionid && config.csrftoken){
    var inputLocation = ctx.request.query;
    var locationName = inputLocation.location;
    var quantity = inputLocation.count || 50;
    var locationId = await instagramClient.getLocationIdByName(locationName);
    let locData = await instagramClient.explore('location', locationId, quantity).then((t) => {
      return t;
    }).catch(err => {
      console.log(err);
    });
    config.activelocation = locationName;
    let writeTagPostsToDatabase = await writeDatabase(locData, '/instagram/location')
    ctx.status = 200;
    ctx.body = {
      results: locData
    }
  }
  else{
    ctx.status=403;
    ctx.body={
      results:'You are not authenticated yet, hence not authorized to do this!'
    }
  }
}
api.userFollowing = async (ctx) => {
  if(config.sessionid && config.csrftoken){
    var inputUser = ctx.request.query;
    var uoi = inputUser.username;
    var count = inputUser.count;
    const userData = await instagramClient.getUserDataByUsername(uoi).then((t) => {
      return t;
    }).catch(err => {
      console.log(err);
    });
    var userId = instagramClient.getUserIdByUserName(userData);
    const userFollowingData = await instagramClient.getUserFollowing(count, userId).then((t) => {
      return t;
    }).catch(err => {
      console.log(err);
    });
    let writeFollowingToDatabase = await writeDatabase(userFollowingData, '/instagram/following')

    ctx.status = 200;
    ctx.body = {
      results: userFollowingData
    }
  }
  else{
    ctx.status=403;
    ctx.body={
      results:'You are not authenticated yet, hence not authorized to do this!'
    }
  }
}
api.userFollowers = async (ctx) => {
  if(config.sessionid && config.csrftoken){
    var inputUser = ctx.request.query;
    var uoi = inputUser.username;
    var count = inputUser.count;
    const userData = await instagramClient.getUserDataByUsername(uoi).then((t) => {
      return t;
    }).catch(err => {
      console.log(err);
    });
    var userId = instagramClient.getUserIdByUserName(userData);
    let userFollowersData = await instagramClient.getUserFollowers(count, userId).then((t) => {
      return t;
    }).catch(err => {
      console.log(err);
    });
    let writeFollowersToDatabase = await writeDatabase(userFollowersData, '/instagram/followers')

    ctx.status = 200;
    ctx.body = {
      results: userFollowersData
    }
  }
  else{
    ctx.status=403;
    ctx.body={
      results:'You are not authenticated yet, hence not authorized to do this!'
    }
  }
}
api.searchTop = async (ctx) => {
  if(config.sessionid && config.csrftoken){
    var input = ctx.request.query;
    var query = input.query;
    config.activequery = query;
    const searchData = await instagramClient.commonSearch(query).then((t) => {
      return t;
    }).catch(err => {
      console.log(err);
    });
    let writeSearchToDatabase = await writeDatabase(searchData, '/instagram/search')
    ctx.status = 200;
    ctx.body = {
      results: searchData
    }
  }
  else{
    ctx.status=403;
    ctx.body={
      results:'You are not authenticated yet, hence not authorized to do this!'
    }
  }
}
api.feedPosts = async (ctx) => {
  if(config.sessionid && config.csrftoken){
    var input = ctx.request.query;
    var count = input.count;
    const feedData = await instagramClient.getUserFeed(count).then((t) => {
      if (t.data) t = t.data
      return t;
    }).catch(err => {
      console.log(err);
    });
    let writeFeedPostsToDatabase = await writeDatabase(feedData.user.edge_web_feed_timeline.edges, '/instagram/posts')

    ctx.status = 200;
    ctx.body = {
      results: feedData
    }
  }
  else{
    ctx.status=403;
    ctx.body={
      results:'You are not authenticated yet, hence not authorized to do this!'
    }
  }
}
api.allFeedPosts = async (ctx) => {
  if(config.sessionid && config.csrftoken){
    var input = ctx.request.query;
    var count = input.count;
    const feedData = await instagramClient.getAllUserFeeds(count).then((t) => {
      return t;
    }).catch(err => {
      console.log(err);
    });
    let writeFeedPostsToDatabase = await writeDatabase(feedData, '/instagram/posts')


    //let writeFeedToDatabase = await writeDatabase(feedData, '/instagram/feed');
    ctx.status = 200;
    ctx.body = {
      results: feedData
    }
  }
  else{
    ctx.status=403;
    ctx.body={
      results:'You are not authenticated yet, hence not authorized to do this!'
    }
  }
}
api.postLikes = async (ctx) => {
  if(config.sessionid && config.csrftoken){
    var inputPost = ctx.request.query;
    var postId = inputPost.shortcode;
    var count = inputPost.count;
    const likesData = await instagramClient.getPostLikes(count, postId).then((t) => {
      return t;
    }).catch(err => {
      console.log(err);
    });
    let writeLikesToDatabase = await writeDatabase(likesData, '/instagram/likes')
    ctx.status = 200;
    ctx.body = {
      results: likesData
    }
  }
  else{
    ctx.status=403;
    ctx.body={
      results:'You are not authenticated yet, hence not authorized to do this!'
    }
  }
}
api.postComments = async (ctx) => {
  if(config.sessionid && config.csrftoken){
    var inputPost = ctx.request.query;
    var postId = inputPost.shortcode;
    var count = inputPost.count;
    const postCommentsData = await instagramClient.getPostComments(count, postId).then((t) => {
      return t;
    }).catch(err => {
      console.log(err);
    });
    let writeCommentsToDatabase = await writeDatabase(postCommentsData, '/instagram/comments')
    ctx.status = 200;
    ctx.body = {
      results: postCommentsData
    }
  }
  else{
    ctx.status=403;
    ctx.body={
      results:'You are not authenticated yet, hence not authorized to do this!'
    }
  }
}
api.postJson = async (ctx) => {
  if(config.sessionid && config.csrftoken){
    var inputPost = ctx.request.query;
    var postId = inputPost.shortcode;
    const postMediaData = await instagramClient.getPostJson(postId).then((t) => {
      return t;
    }).catch(err => {
      console.log(err);
    });
    let writeMediaToDatabase = await writeDatabase(postMediaData, '/instagram/media')
    ctx.status = 200;
    ctx.body = {
      results: postMediaData
    }
  }
  else{
    ctx.status=403;
    ctx.body={
      results:'You are not authenticated yet, hence not authorized to do this!'
    }
  }
}
api.suggestedPosts = async (ctx) => {
  if(config.sessionid && config.csrftoken){
    var inputCount = ctx.request.query;
    var count = inputCount.count;
    const suggestedPostsData = await instagramClient.getSuggestedPosts(count).then((t) => {
      return t;
    }).catch(err => {
      console.log(err);
    });
    let writeToDatabase = await writeDatabase(suggestedPostsData, '/instagram/posts')
    ctx.status = 200;
    ctx.body = {
      results: suggestedPostsData
    }
  }
  else{
    ctx.status=403;
    ctx.body={
      results:'You are not authenticated yet, hence not authorized to do this!'
    }
  }
}
api.suggestedPeople = async (ctx) => {
  if(config.sessionid && config.csrftoken){
    var inputCount = ctx.request.query;
    var count = inputCount.count;
    const suggestedPeopleData = await instagramClient.getSuggestedPeople(count).then((t) => {
      return t;
    }).catch(err => {
      console.log(err);
    });
    for(var i=0;i<suggestedPeopleData.length;i++){
      if(suggestedPeopleData[i].node){
        if(suggestedPeopleData[i].node.user){
          suggestedPeopleData[i]= suggestedPeopleData[i].node.user
        }else{
          suggestedPeopleData[i]= suggestedPeopleData[i].node
        }
      }

    }
    let writeToDatabase = await writeDatabase(suggestedPeopleData, '/instagram/feed')
    ctx.status = 200;
    ctx.body = {
      results: suggestedPeopleData
    }
  }
  else{
    ctx.status=403;
    ctx.body={
      results:'You are not authenticated yet, hence not authorized to do this!'
    }
  }
}
module.exports = api;
