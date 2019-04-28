const Router = require("koa-Router");
const router = new Router({prefix: "/api"});
var config = require('../../../../config');
const CSRF_TOKEN = config.CSRFTOKEN;
const sessionid = config.SESSIONID;
var userid = config.userid;
console.log("Socialytics configurations initialized...");

const Instagram = require('./instagram');
const instagramClient = new Instagram();
instagramClient.csrftoken = (instagramClient.csrftoken && instagramClient.csrftoken.length > 5) ? instagramClient.csrftoken : CSRF_TOKEN;
instagramClient.sessionid = (instagramClient.sessionid && instagramClient.sessionid.length > 5) ? instagramClient.sessionid : sessionid;
instagramClient.userid = (instagramClient.userid && instagramClient.userid.length > 2) ? instagramClient.sessionid : userid;
console.log("Socialytics Instagram client has been initialized...");
console.log("Socialytics Instagram API has started...");
const feathers = require('@feathersjs/feathers');
//const client = require('@feathersjs/client');
const socketio = require('@feathersjs/socketio-client');
const io = require('socket.io-client');
const uri = (config.PROTOCOL+"://"+config.HOST+':'+config.UIPORT)+'/';
console.log('socket uri= '+uri);
const socket = io(uri);
const api = feathers().configure(socketio(socket, {
  timeout: 0
}));

async function writeDatabase(data, service) {
  if (data.user) {
    if (data.user.edge_owner_to_timeline_media) {
      if (data.user.edge_owner_to_timeline_media.edges) {
        data = data.user.edge_owner_to_timeline_media.edges
      }
    }
  }
  if (data.graphql) {
    if (data.graphql.shortcode_media) {
      for (i in data.graphql.shortcode_media) {
        data[i] = data.graphql.shortcode_media[i]
      }
      delete data.graphql.shortcode_media
      delete data.graphql

    }
  }
  if (data.length) {
    for (var i = 0; i < data.length; i++) {
      let item = data[i];
      if (item.node) {
        item = item.node;
      } else if (item.user) {
        item = data.user
      }
      let recordData = await api.service(service)
        .create(item)
        .then(result => {
          return result;
        })
        .catch(err => {
          console.log(err);
        });
    }
  } else {
    if (data.user) {
      if (Object.keys(data).length <= 1) data = data.user
    }
    let recordData = await api.service(service)
      .create(data)
      .then(result => {
        return result;
      })
      .catch(err => {
        console.log(err);
      });
  }
}

//Async functions using Instagram client
const profileJson = async (ctx) => {
  var inputUser = ctx.request.query;
  var uoi = inputUser.username || Object.keys(ctx.request.query)[0];
  let userData = await instagramClient.getUserDataByUsername(uoi).then((t) => {
    return t;
  })
  console.log('Profile JSON data has fetched from Instagram for user name: ' + uoi);

// Set up a socket connection to our Instagram ETL API
  let recordData = await api.service('/instagram/profiles')
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
const profileSelfJson = async (ctx) => {
  var uoi = new String(instagramClient.userid);
  var uoi = inputUser.username || Object.keys(ctx.request.query)[0];
  let userData = await instagramClient.getUserDataByUsername(uoi).then((t) => {
    return t;
  })
  console.log('Profile JSON data has fetched from Instagram for self logged in account: ' + uoi);
  let recordData = await api.service('/instagram/profiles')
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
const userPosts = async (ctx) => {
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
const userAllPosts = async (ctx) => {
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
const exploreTag = async (ctx) => {
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
const exploreLocation = async (ctx) => {
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
const userFollowing = async (ctx) => {
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
const userFollowers = async (ctx) => {
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
const searchTop = async (ctx) => {
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
const feedPosts = async (ctx) => {
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
const allFeedPosts = async (ctx) => {
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
const postLikes = async (ctx) => {
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
const postComments = async (ctx) => {
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
const postJson = async (ctx) => {
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
/*const postPage = async (ctx) => {
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
}*/
const suggestedPosts = async (ctx) => {
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
const suggestedPeople = async (ctx) => {
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

// Instagram client router endpoints mapped to async functions to implement 100% async Rest json endpoints.
router.get("/instagram/profile", profileJson);
router.get("/instagram/whoami", profileSelfJson);
router.get("/instagram/posts", userPosts);
router.get("/instagram/allposts", userAllPosts);
router.get("/instagram/tag", exploreTag);
router.get("/instagram/location", exploreLocation);
router.get("/instagram/following", userFollowing);
router.get("/instagram/followers", userFollowers);
router.get("/instagram/search", searchTop);
router.get("/instagram/feed", feedPosts);
router.get("/instagram/allfeed", allFeedPosts);
router.get("/instagram/likes", postLikes);
router.get("/instagram/comments", postComments);
router.get("/instagram/post", postJson);
/*router.get("/instagram/post/page", postPage);*/
router.get("/instagram/suggested/posts", suggestedPosts);
router.get("/instagram/suggested/people", suggestedPeople);


module.exports = router

