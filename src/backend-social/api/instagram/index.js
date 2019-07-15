var config = require('../../../../config');
const Router = require("koa-router");
const router = new Router({ prefix: "/api" });
const api = require('./api');
console.log("Socialytics Instagram backend API and Router initialized...");
router.get("/etl-health-check", async (ctx) => {
  ctx.status = 200
  ctx.body = { result: "ok" }
});
router.get("/instagram/profile", api.profileJson);
router.get("/instagram/whoami", api.profileSelfJson);
router.get("/instagram/posts", api.userPosts);
router.get("/instagram/allposts", api.userAllPosts);
router.get("/instagram/allpostsById", api.userAllPostsById);
router.get("/instagram/tag", api.exploreTag);
router.get("/instagram/location", api.exploreLocation);
router.get("/instagram/following", api.userFollowing);
router.get("/instagram/followers", api.userFollowers);
router.get("/instagram/search", api.searchTop);
router.get("/instagram/feed", api.feedPosts);
router.get("/instagram/allfeed", api.allFeedPosts);
router.get("/instagram/likes", api.postLikes);
router.get("/instagram/comments", api.postComments);
router.get("/instagram/post", api.postJson);
/*router.get("/instagram/post/page", api.postPage);*/
router.get("/instagram/suggested/posts", api.suggestedPosts);
router.get("/instagram/suggested/people", api.suggestedPeople);
/*router.get("/instagram/set/data", api.getStatsData);*/
console.log("Socialytics Instagram backend ETL routes registered...");
module.exports = router;











