/* eslint-disable no-console */
const logger = require('./logger');
const app = require('./app');
const port = app.get('port');
const apiServer = app.listen(port);

process.on('unhandledRejection', (reason, p) =>
  logger.error('Unhandled Rejection at: Promise ', p, reason)
);

apiServer.on('listening', () =>
  logger.info('API Server started on http://%s:%d', app.get('host'), port)
);


const { HOST, PORT } = require("../config");
const application = require("./backend-social/app");
const instagram = require('./backend-social/api/instagram/index').instagramClient;
console.log('**************************************');
const etlServer = application.listen(PORT, () => {
  //console.log(`ETL Server Listening on ${host}:${port}`)
  logger.info('ETL Server Listening on http://%s:%d', HOST, PORT)
});
etlServer.timeout=60*60*1000;
