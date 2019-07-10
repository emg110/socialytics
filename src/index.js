/* eslint-disable no-console */
const logger = require('./logger');
const app = require('./app');
/*const ObjectsToCsv = require('objects-to-csv');
var opts = {
  paginate: {
  default: 100000,
      max: 20000
  }
}
app.service('instagram/tag').find(opts).then(items=>{
  let csv = new ObjectsToCsv(items.data);

  // Save to file:
  csv.toDisk('./testaaaaa.csv');
})*/
const port = app.get('port');
var fs = require('fs');
const https  = require('https');
//const apiHttpServer = app.listen(port);
const apiHttpsServer = https.createServer({
  key: fs.readFileSync('./security/privatekey.pem'),
  cert: fs.readFileSync('./security/certificate.pem')
}, app).listen(port);

// Call app.setup to initialize all services and SocketIO
app.setup(apiHttpsServer);
process.on('unhandledRejection', (reason, p) =>{
    console.log('Unhandled Rejection : ', p, reason)
    //process.kill()
}
);

/*apiServer.on('listening', () =>
  console.log('info: API Server started on http://%s:%d', app.get('host'), port)
);*/
apiHttpsServer.on('listening', () =>
  console.log('info: API Server started on https://%s:%d', app.get('host'), app.get('port'))
);

const { HOST, PORT } = require("../config");
const application = require("./backend-social/app");
/*const instagram = require('./backend-social/api/instagram/index').instagramClient;*/
console.log('**************************************');
const etlServer = application.listen(PORT, () => {
  //console.log(`ETL Server Listening on ${host}:${port}`)
  console.log('info: ETL Server Listening on http://%s:%d', HOST, PORT)
});
etlServer.timeout=60*60*1000;
