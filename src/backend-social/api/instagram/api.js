var config = require('../../../../config');
console.log("Socialytics Instagram backend configurations initialized...");

const Instagram = require('./instagram');

console.log("Socialytics Instagram client has been initialized...");
console.log("Socialytics Instagram API has started...");
//Async functions using Instagram client
var api = {};
api.profileJson = async (ctx) => {
  var username = ctx.get('username')
  var accesstoken = ctx.get('accesstoken')
  var strategy = ctx.get('strategy')
  var userconfig = config.users[username]
  if(userconfig.sessionid && userconfig.csrftoken){
    console.log('Now answering call: profile :: user :: '+username)
    let instagramClient =  new Instagram(username.toLowerCase());
    var inputUser = ctx.request.query;
    var uoi = inputUser.username || Object.keys(ctx.request.query)[0];
    let userData = await instagramClient.getUserDataByUsername(uoi).then((t) => {
      return t;
    }).catch(err => {
      console.log(err);
    });
    console.log('Profile JSON data has fetched from Instagram for user name: ' + uoi);
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
  var username = ctx.get('username')
  var accesstoken = ctx.get('accesstoken')
  var strategy = ctx.get('strategy')
  var userconfig = config.users[username]
  if(userconfig.sessionid && userconfig.csrftoken){
    let instagramClient =  new Instagram(username.toLowerCase());
    var uoi = new String(username);
    //uoi = Object.keys(ctx.request.query)[0] || uoi;
    let userData = await instagramClient.getUserDataByUsername(uoi).then((t) => {
      return t;
    }).catch(err => {
      console.log(err);
    })
    console.log('Profile JSON data has fetched from Instagram for self logged in account: ' + uoi);
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
  var username = ctx.get('username')
  var accesstoken = ctx.get('accesstoken')
  var strategy = ctx.get('strategy')
  var userconfig = config.users[username]
  if(userconfig.sessionid && userconfig.csrftoken){
    let instagramClient =  new Instagram(username.toLowerCase());
    var inputUser = ctx.request.query;
    var uoi = inputUser.username;
    var count = inputUser.count;
    let userData = await instagramClient.getUserDataByUsername(uoi).then((t) => {
      return t;
    })
    if(userData){
      if(userData.graphql){
        if(userData.graphql.user){
          userData = userData.graphql.user
          let posts = await instagramClient.getUserPosts(userData.id, count).then((p) => {
            return p.data
          }).catch(err => {
            console.log(err);
          })
          if(posts){
            ctx.status = 200;
            ctx.body = {
              results: posts
            }
          }else{
            ctx.status=500;
            ctx.body={
              results:'No posts data retrieved fro Instagram'
            }
          }
        }else{
          ctx.status=500;
          ctx.body={
            results:'No user data retrieved fro Instagram'
          }
        }
      }

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
  var username = ctx.get('username')
  var accesstoken = ctx.get('accesstoken')
  var strategy = ctx.get('strategy')
  var userconfig = config.users[username]
  if(userconfig.sessionid && userconfig.csrftoken){
    let instagramClient =  new Instagram(username.toLowerCase());
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
    /*let writeToDatabase = await writeDatabase(socket, accesstoken,  posts, '/instagram/posts')*/
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
api.userAllPostsById = async (ctx) => {
  var username = ctx.get('username')
  var accesstoken = ctx.get('accesstoken')
  var strategy = ctx.get('strategy')
  var userconfig = config.users[username]
  if(userconfig.sessionid && userconfig.csrftoken){
    let instagramClient =  new Instagram(username.toLowerCase());
    let userId =  ctx.request.query.userid;
    var posts = await instagramClient.getAllUserPosts(userId).then((p) => {
      return p
    }).catch(err => {
      console.log(err);
    });
    /*let writeToDatabase = await writeDatabase(socket, accesstoken,  posts, '/instagram/posts')*/
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
  var username = ctx.get('username')
  var accesstoken = ctx.get('accesstoken')
  var strategy = ctx.get('strategy')
  var userconfig = config.users[username]
  if(userconfig.sessionid && userconfig.csrftoken){
    let instagramClient =  new Instagram(username.toLowerCase());
    var inputTag = ctx.request.query;
    var tag = inputTag.tag;
    var quantity = inputTag.count || 50;
    let tagsData = await instagramClient.explore('hashtag', tag, quantity).then((t) => {
      return t;
    }).catch(err => {
      console.log(err);
    });
    config.activetag = tag;
    /*let writeTagPostsToDatabase = await writeDatabase(socket, accesstoken,  tagsData, '/instagram/tag')*/


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
  var username = ctx.get('username')
  var accesstoken = ctx.get('accesstoken')
  var strategy = ctx.get('strategy')
  var userconfig = config.users[username]
  if(userconfig.sessionid && userconfig.csrftoken){
    let instagramClient =  new Instagram(username.toLowerCase());
    var inputLocation = ctx.request.query;
    var locationName = inputLocation.location;
    var quantity = inputLocation.count || 50;
    var locationId = await instagramClient.getLocationIdByName(locationName);
    let locData = await instagramClient.explore('location', locationId, quantity).then((t) => {
      return t;
    }).catch(err => {
      console.log(err);
    });
    userconfig.activelocation = locationName;
    /*let writeTagPostsToDatabase = await writeDatabase(socket, accesstoken,  locData, '/instagram/location')*/
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
  var username = ctx.get('username')
  var accesstoken = ctx.get('accesstoken')
  var strategy = ctx.get('strategy')
  var userconfig = config.users[username]
  if(userconfig.sessionid && userconfig.csrftoken){
    let instagramClient =  new Instagram(username.toLowerCase());
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
    /*let writeFollowingToDatabase = await writeDatabase(socket, accesstoken,  userFollowingData, '/instagram/following')*/

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
  var username = ctx.get('username')
  var accesstoken = ctx.get('accesstoken')
  var strategy = ctx.get('strategy')
  var userconfig = config.users[username]
  if(userconfig.sessionid && userconfig.csrftoken){
    let instagramClient =  new Instagram(username.toLowerCase());
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
    /*let writeFollowersToDatabase = await writeDatabase(socket, accesstoken,  userFollowersData, '/instagram/followers')*/

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
  var username = ctx.get('username')
  var accesstoken = ctx.get('accesstoken')
  var strategy = ctx.get('strategy')
  var userconfig = config.users[username]
  if(userconfig.sessionid && userconfig.csrftoken){
    let instagramClient =  new Instagram(username.toLowerCase());
    var input = ctx.request.query;
    var query = input.query;
    config.activequery = query;
    const searchData = await instagramClient.commonSearch(query).then((t) => {
      return t;
    }).catch(err => {
      console.log(err);
    });
    /*let writeSearchToDatabase = await writeDatabase(socket, accesstoken,  searchData, '/instagram/search')*/
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
  var username = ctx.get('username')
  var accesstoken = ctx.get('accesstoken')
  var strategy = ctx.get('strategy')
  var userconfig = config.users[username]
  if(userconfig.sessionid && userconfig.csrftoken){
    let instagramClient =  new Instagram(username.toLowerCase());
    var input = ctx.request.query;
    var count = input.count;
    const feedData = await instagramClient.getUserFeed(count).then((t) => {
      if (t.data) t = t.data
      return t;
    }).catch(err => {
      console.log(err);
    });
    /*let writeFeedPostsToDatabase = await writeDatabase(socket, accesstoken,  feedData.user.edge_web_feed_timeline.edges, '/instagram/posts')*/

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
  var username = ctx.get('username')
  var accesstoken = ctx.get('accesstoken')
  var strategy = ctx.get('strategy')
  var userconfig = config.users[username]
  if(userconfig.sessionid && userconfig.csrftoken){
    let instagramClient =  new Instagram(username.toLowerCase());
    var input = ctx.request.query;
    var count = input.count;
    const feedData = await instagramClient.getAllUserFeeds(count).then((t) => {
      return t;
    }).catch(err => {
      console.log(err);
    });
    /*let writeFeedPostsToDatabase = await writeDatabase(socket, accesstoken,  feedData, '/instagram/posts')*/

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
  var username = ctx.get('username')
  var accesstoken = ctx.get('accesstoken')
  var strategy = ctx.get('strategy')
  var userconfig = config.users[username]
  if(userconfig.sessionid && userconfig.csrftoken){
    let instagramClient =  new Instagram(username.toLowerCase());
    var inputPost = ctx.request.query;
    var postId = inputPost.shortcode;
    var count = inputPost.count;
    const likesData = await instagramClient.getPostLikes(count, postId).then((t) => {
      return t;
    }).catch(err => {
      console.log(err);
    });
    /*let writeLikesToDatabase = await writeDatabase(socket, accesstoken,  likesData, '/instagram/likes')*/
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
  var username = ctx.get('username')
  var accesstoken = ctx.get('accesstoken')
  var strategy = ctx.get('strategy')
  var userconfig = config.users[username]
  if(userconfig.sessionid && userconfig.csrftoken){
    let instagramClient =  new Instagram(username.toLowerCase());
    var inputPost = ctx.request.query;
    var postId = inputPost.shortcode;
    var count = inputPost.count;
    const postCommentsData = await instagramClient.getPostComments(count, postId).then((t) => {
      return t;
    }).catch(err => {
      console.log(err);
    });
    /*let writeCommentsToDatabase = await writeDatabase(socket, accesstoken,  postCommentsData, '/instagram/comments')*/
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
  var username = ctx.get('username')
  var accesstoken = ctx.get('accesstoken')
  var strategy = ctx.get('strategy')
  var userconfig = config.users[username]
  if(userconfig.sessionid && userconfig.csrftoken){
    let instagramClient =  new Instagram(username.toLowerCase());
    var inputPost = ctx.request.query;
    var postId = inputPost.shortcode;
    const postMediaData = await instagramClient.getPostJson(postId).then((t) => {
      return t;
    }).catch(err => {
      console.log(err);
    });
    /*let writeMediaToDatabase = await writeDatabase(socket, accesstoken,  postMediaData, '/instagram/media')*/
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
  var username = ctx.get('username')
  var accesstoken = ctx.get('accesstoken')
  var strategy = ctx.get('strategy')
  var userconfig = config.users[username]
  if(userconfig.sessionid && userconfig.csrftoken){
    let instagramClient =  new Instagram(username.toLowerCase());
    var inputCount = ctx.request.query;
    var count = inputCount.count;
    const suggestedPostsData = await instagramClient.getSuggestedPosts(count).then((t) => {
      return t;
    }).catch(err => {
      console.log(err);
    });
    /*let writeToDatabase = await writeDatabase(socket, accesstoken,  suggestedPostsData, '/instagram/posts')*/
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
  var username = ctx.get('username')
  var accesstoken = ctx.get('accesstoken')
  var strategy = ctx.get('strategy')
  var userconfig = config.users[username]
  if(userconfig.sessionid && userconfig.csrftoken){
    let instagramClient =  new Instagram(username.toLowerCase());
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
    /*let writeToDatabase = await writeDatabase(socket, accesstoken,  suggestedPeopleData, '/instagram/feed')*/
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
