const path = require('path');
const favicon = require('serve-favicon');
const compress = require('compression');
const helmet = require('helmet');
const cors = require('cors');
const logger = require('./logger');

const feathers = require('@feathersjs/feathers');
const configuration = require('@feathersjs/configuration');
const express = require('@feathersjs/express');
const socketio = require('@feathersjs/socketio');
const middleware = require('./middleware');
const services = require('./services');
const appHooks = require('./app.hooks');
const channels = require('./channels');
const authentication = require('./authentication');
//const { authenticate } = require('@feathersjs/authentication').express;
const app = express(feathers());
// Load app configuration
app.configure(configuration());

// Enable security, CORS, compression, favicon and body parsing
app.use(helmet());
app.use(cors());
app.use(compress());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(favicon(path.join(app.get('public'), 'favicon.ico')));
// Host the public folder
app.use('/', express.static(app.get('public')));
/*app.use('/node_modules/', express.static(__dirname + '/node_modules/'));*/

// Set up Plugins and providers
app.configure(express.rest());


// Configure other middleware (see `middleware/index.js`)
app.configure(middleware);
app.configure(authentication);
// Set up our services (see `services/index.js`)
app.configure(services);

// Set up event channels (see channels.js)
app.configure(channels);


//app.configure(socketio());
app.configure(socketio(function (io) {
  io.on('connection', function (socket) {
    //socket.emit('instagram', { text: 'A client connected!' });
    socket.on('authenticated:seta', function (socReq) {
      switch (socReq.data.method) {
        case 'find':
          app.service(socReq.data.service).find(socReq.options).then(items => {
            socket.emit('authenticated:seta', {data: items, socRes: socReq.data});
          }).catch(err=>{
            console.log(err)
          })
          break
        default:
          console.log('info: Method does not exist! ');


      }

    });
    socket.on('authenticated:setb', function (socReq) {
      switch (socReq.data.method) {
        case 'find':
          app.service(socReq.data.service).find(socReq.options).then(items => {
            /*if(items.data){
              console.log(items.data.length)
            }*/
            socket.emit('authenticated:setb', {data: items, socRes: socReq.data});
          }).catch(err=>{
            console.log(err)
          })
          break
        default:
          console.log('info: Method does not exist! ');


      }

    });
  });

  // Registering Socket.io middleware
  io.use(function (socket, next) {
    // Exposing a request property to services and hooks
    socket.feathers.referrer = socket.request.referrer;
    next();
  });
}));
// Configure a middleware for 404s and the error handler
app.use(express.notFound());
app.use(express.errorHandler({logger}));
app.hooks(appHooks);

module.exports = app;
