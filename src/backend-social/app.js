const Koa = require("koa");
const bodyparser = require("koa-bodyparser");
const logger = require("koa-logger");
const cors = require('koa2-cors');

const healthCheck = require("./api/health-check/index");
const router = require("./api/instagram/index");

const application = new Koa();



application.use(logger());

application.use(bodyparser());

application.use(cors({
    origin: "*"
}));
/*const ip = require('koa-ip')
application.use(ip(['127.0.0.1','192.168.140.110']))*/
application
    .use(healthCheck.routes())
    .use(healthCheck.allowedMethods());

application
    .use(router.routes())
  /*  .use(router.allowedMethods());*/

module.exports = application;
