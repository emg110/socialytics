var conf = require('../../../config');
const CSRF_TOKEN = conf.CSRFTOKEN;
const SESSION_ID = conf.SESSIONID;
var USER_SELF = conf.USER_SELF;
console.log("Houman project's configurations initialized...");
const Router = require("koa-Router");
const Instagram = require('./instagram');
const instagramClient = new Instagram();
instagramClient.csrfToken = (instagramClient.csrfToken && instagramClient.csrfToken.length > 5) ? instagramClient.csrfToken : CSRF_TOKEN;
instagramClient.sessionId = (instagramClient.sessionId && instagramClient.sessionId.length> 5) ? instagramClient.sessionId : SESSION_ID;
instagramClient.userName = (instagramClient.userName && instagramClient.userName.length> 2) ? instagramClient.sessionId : USER_SELF;
console.log("Houman project's Instagram client has been initialized...");
const instagramRouter = new Router({ prefix: "/api" });
console.log("Houman project's Instagram API has started...");

const client = require('@feathersjs/client');
const socketio = require('@feathersjs/socketio-client');
const io = require('socket.io-client');
const socket = io('http://localhost:8080');
const api = client().configure(socketio(socket, {
  timeout: 45000
}));
//Async functions using Instagram client
const profileJson = async (ctx) => {
  var inputUser = ctx.request.query;
  var uoi = inputUser.username;
  const userData = await instagramClient.getUserDataByUsername(uoi).then((t) =>
  {
    return t;
  })
  console.log('Profile JSON data has fetched from Instagram for user name: '+uoi);

// Set up a socket connection to our remote API
  const recordData = await api.service('/instagram/profiles')
    .create(userData)
    .then(result =>  {
      return result;
    })
    .catch(err=>{
      console.log(err);
    });
  ctx.status = 200;
  ctx.body = {
    results: recordData
  }
}
const profileSelfJson = async (ctx) => {


  var uoi = new String(instagramClient.userName);
  const userData = await instagramClient.getUserDataByUsername(uoi).then((t) =>
  {
    return t;
  })
  console.log('Profile JSON data has fetched from Instagram for self logged in account: '+uoi)
  ctx.status = 200;
  ctx.body = {
    results: userData
  }
}
const userPosts = async (ctx) => {
  var inputUser = ctx.request.query;
  var uoi = inputUser.username;
  const userData = await instagramClient.getUserDataByUsername(uoi).then((t) =>
  {
    return t;
  })
  var userId = instagramClient.getUserIdByUserName(userData);
  var posts = await instagramClient.getUserPosts(userId).then((p) =>
  {
    return p
  })
  ctx.status = 200;
  ctx.body = {
    results: posts
  }
}
const userAllPosts = async (ctx) => {
  var inputUser = ctx.request.query;
  var uoi = inputUser.username;
  const userData = await instagramClient.getUserDataByUsername(uoi).then((t) =>
  {
    return t;
  })
  var userId = instagramClient.getUserIdByUserName(userData);
  var posts = await instagramClient.getAllUserPosts(userId).then((p) =>
  {
    return p
  })
  ctx.status = 200;
  ctx.body = {
    results: posts
  }
}
const exploreTag = async (ctx) => {
  var inputTag = ctx.request.query;
  var tag = inputTag.tag;
  var quantity = inputTag.count || 50;
  const tagsData = await instagramClient.explore('hashtag', tag, quantity).then((t) =>
  {
    return t;
  })
  ctx.status = 200;
  ctx.body = {
    results: tagsData
  }
}
const exploreLocation = async (ctx) => {
  var inputLocation = ctx.request.query;
  var locationName = inputLocation.location;
  var quantity = inputLocation.count || 50;
  var locationId = await instagramClient.getLocationIdByName(locationName);
  const locData = await instagramClient.explore('location',locationId,  quantity).then((t) =>
  {
    return t;
  })
  ctx.status = 200;
  ctx.body = {
    results: locData
  }
}
const userFollowing = async (ctx) => {
  var inputUser = ctx.request.query;
  var uoi = inputUser.username;
  var count = inputUser.count;
  const userData = await instagramClient.getUserDataByUsername(uoi).then((t) =>
  {
    return t;
  })
  var userId = instagramClient.getUserIdByUserName(userData);
  const userFollowingData = await instagramClient.getUserFollowing(count, userId).then((t) =>
  {
    return t;
  })
  ctx.status = 200;
  ctx.body = {
    results: userFollowingData
  }
}
const userFollowers = async (ctx) => {
  var inputUser = ctx.request.query;
  var uoi = inputUser.username;
  var count = inputUser.count;
  const userData = await instagramClient.getUserDataByUsername(uoi).then((t) =>
  {
    return t;
  })
  var userId = instagramClient.getUserIdByUserName(userData);
  const userFollowersData = await instagramClient.getUserFollowers(count,userId).then((t) =>
  {
    return t;
  })
  ctx.status = 200;
  ctx.body = {
    results: userFollowersData
  }
}
const searchTop = async (ctx) => {
  var input = ctx.request.query;
  var query = input.query;
  const searchData = await instagramClient.commonSearch(query).then((t) =>
  {
    return t;
  })
  ctx.status = 200;
  ctx.body = {
    results: searchData
  }
}
const userFeedPosts = async (ctx) => {
  var input = ctx.request.query;
  var count = input.count;
  var uoi = instagramClient.userName;
  const userData = await instagramClient.getAllUserFeeds(count, uoi).then((t) =>
  {
    return t;
  })
  ctx.status = 200;
  ctx.body = {
    results: userData
  }
}
const postLikes = async (ctx) => {
  var inputPost = ctx.request.query;
  var postId = inputPost.shortcode;
  var count = inputPost.count;
  const userData = await instagramClient.getPostLikes(count, postId).then((t) =>
  {
    return t;
  })
  ctx.status = 200;
  ctx.body = {
    results: userData
  }
}
const postComments = async (ctx) => {
  var inputPost = ctx.request.query;
  var postId = inputPost.shortcode;
  var count = inputPost.count;
  const postCommentsData = await instagramClient.getPostComments(count, postId).then((t) =>
  {
    return t;
  })
  ctx.status = 200;
  ctx.body = {
    results: postCommentsData
  }
}
//DONE
const postJson = async (ctx) => {
  var inputPost = ctx.request.query;
  var postId = inputPost.shortcode;
  const postData = await instagramClient.getPostJson(postId).then((t) =>
  {
    return t;
  })
  ctx.status = 200;
  ctx.body = {
    results: postData
  }
}
const postPage = async (ctx) => {
  var inputPost = ctx.request.query;
  var postId = inputPost.shortcode;
  const postData = await instagramClient.getPostPage(postId).then((t) =>
  {
    return t;
  })
  ctx.status = 200;
  ctx.body = {
    results: postData
  }
}
const suggestedPosts = async (ctx) => {
  var inputCount = ctx.request.query;
  var count = inputCount.count;
  const suggestedPostsData = await instagramClient.getSuggestedPosts(count).then((t) =>
  {
    return t;
  })
  ctx.status = 200;
  ctx.body = {
    results: suggestedPostsData
  }
}
const suggestedPeople = async (ctx) => {
  var inputCount = ctx.request.query;
  var count = inputCount.count;
  const suggestedPeopleData = await instagramClient.getSuggestedPeople(count).then((t) =>
  {
    return t;
  })
  ctx.status = 200;
  ctx.body = {
    results: suggestedPeopleData
  }
}

// Instagram client instagramRouter endpoints mapped to async functions to implement 100% async Rest json endpoints.
instagramRouter.get("/instagram/profile", profileJson);
instagramRouter.get("/instagram/whoami", profileSelfJson);
instagramRouter.get("/instagram/posts", userPosts);
instagramRouter.get("/instagram/allposts", userAllPosts);
instagramRouter.get("/instagram/tag", exploreTag);
instagramRouter.get("/instagram/location", exploreLocation);
instagramRouter.get("/instagram/following", userFollowing);
instagramRouter.get("/instagram/followers", userFollowers);
instagramRouter.get("/instagram/search", searchTop);
instagramRouter.get("/instagram/feed", userFeedPosts);
instagramRouter.get("/instagram/likes", postLikes);
instagramRouter.get("/instagram/comments", postComments);
instagramRouter.get("/instagram/post", postJson);
instagramRouter.get("/instagram/page", postPage);
instagramRouter.get("/instagram/suggested/posts", suggestedPosts);
instagramRouter.get("/instagram/suggested/people", suggestedPeople);



module.exports = {instagramRouter, instagramClient};

