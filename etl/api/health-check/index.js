const Router = require("koa-router");

const router = new Router({ prefix: "/api" });

router.get("/health-check", async (ctx) => {
    ctx.status = 200;
    ctx.body = { result: "ok" };
});

module.exports = router;
