const Koa = require("koa");
const bodyparser = require("koa-bodyparser");
const logger = require("koa-logger");
const cors = require('koa2-cors');

const healthCheck = require("./api/health-check/index");
const instagramRouter = require("./api/instagram").instagramRouter;

const application = new Koa();



application.use(logger());

application.use(bodyparser());

application.use(cors({
    origin: "*"
}));

application
    .use(healthCheck.routes())
    .use(healthCheck.allowedMethods());

application
    .use(instagramRouter.routes())
    .use(instagramRouter.allowedMethods());

module.exports = application;
