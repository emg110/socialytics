const config = require('../../config')
const mwViewsRender = require('./mw-views-render');
const mwEtlApi = require('./mw-etl-api');
const mwTextProc = require('./mw-text-processing');
const mwFindCrossfilter = require('./mw-find-crossfilter');
const Instagram = require('../backend-social/api/instagram/instagram');
const logger = require('../logger');
const { authenticate } = require('@feathersjs/authentication').express;
// eslint-disable-next-line no-unused-vars
  module.exports = function (app) {
    var path = require('path');
    const expressLayouts = require('express-ejs-layouts')
    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, '../../src/views'));
    app.use('/home',expressLayouts);
    app.use('/home',async (req, res)=> {
      let username = req.query.username;
      logger.info('Incoming: Request for /home')
      if(username && config.users[username]){
        if(config.users[username].sessionid && config.users[username].csrftoken){
          res.render('pages/index',{ layout: 'layouts/layout-home',username:username},function(err, html) {
            if(err){
              logger.error('ejs has returned this error: '+ err);
              res.sendStatus(500)
            }else{
              logger.info('Render: Home page');
              res.send(html);
            }

          })
          /*res.render('pages/index', { layout: 'layouts/layout-home',username:username, accesstoken:response.accessToken });*/

        }
        else {
          res.redirect('/login');
        }
      }
      else{
        //res.sendStatus(404)
        res.status(404).redirect('/login');
      }
    });
    app.post('/authenticate',authenticate('local'), async (req, res) => {
      logger.info('Incoming: Request for /authenticate');
      var username = req.user.username;
      var email = req.user.email;
      if(req.user){

        const data = {payload: req.user};

        app.service('authentication').create(data)
          .then(async function(response) {
            var accessToken = response.accessToken;
            logger.info('User found for authentication '+ username);
            config.users[username] = req.user;
            const instagram = new Instagram(username.toLowerCase());

            let csrftoken = await instagram.getCsrfToken().then((csrf) =>
            {
              return csrf;
            }).catch(e =>
            {
              logger.error(e);
            });
            let userData = await instagram.getUserDataByUsername(username).then(t => {
              return t;
            }).catch(e =>
            {
              logger.error(e);
            })
            let userId = instagram.getUserIdByUserName(userData);
            if(userId){
              config.users[username].csrftoken = csrftoken;
              if(!config.users[username].userid)config.users[username].userid = userId;
              config.users[username].status = 'verified';
              logger.info('Got csrf-token and checked along username and session-id with Instagram and added to request');
            }
            logger.info('Now responding to authenticate call from client via REST for username: '+ username +' by email: '+ email)
           /* res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
          */
           res.status(200).send({
              accesstoken:accessToken,
              username: username,
              userid:userId,
              email: email,
              bio:userData.graphql.user.biography,
              pic:userData.graphql.user.profile_pic_url,
              stats: {
                followers:userData.graphql.user.edge_followed_by.count,
                following:userData.graphql.user.edge_follow.count,
                posts: userData.graphql.user.edge_owner_to_timeline_media.count,
                saved: userData.graphql.user.edge_saved_media.count
              },

            })

          });


      }
      else {
        logger.error('Not all info required is provided! Redirecting to login page')
        res.redirect('/login')
      }
    });
    app.use('/register', async (req, res) => {
      logger.info('Incoming: Request for /register')
      if(req.body.sessionid && req.body.username && req.body.password && req.body.email){
        let username = req.body.username.toLowerCase();
        config.users[username] = {};
        const instagram = new Instagram(username.toLowerCase());
        let password = req.body.password;
        let sessionid = req.body.sessionid;
        let email = req.body.email;
        let csrftoken = await instagram.getCsrfToken().then((csrf) =>
        {
          return csrf;
        }).catch(e =>
        {
          logger.error(e);
        });
        const userData = await instagram.getUserDataByUsername(username).then(t => {
          return t;
        }).catch(e =>
        {
          logger.error(e);
        })
        let userId = instagram.getUserIdByUserName(userData);
        let fullname = instagram.getUserFullNameByUserName(userData) || '';
        if(userId){
          req.body.csrftoken = csrftoken;
          req.body.status = 'verified';
          config.users[username].status = 'verified';
          let data = {
            email:email,
            password:password,
            username:username,
            fullname:fullname,
            sessionid:sessionid,
            csrftoken:csrftoken,
            status: 'verified',
            userid: userId,
            instagram: config.users[username].instagram
          }
          app.service('users')
            .create(data)
            .then(result => {
              logger.info('User registration successfully done and returned: '+ result);
              res.redirect('/home?username='+username)
            })
            .catch(err => {
              logger.error(err);
              res.redirect('/login')
            });
        }
      }
      else {
        logger.error('Not all info required is provided! Redirecting to login page')
        res.redirect('/login')
      }
    });
    app.use('/logout', (req, res) => {
      logger.info('Incoming: Request for /logout')
      logger.warn('Logging out...! Redirecting to login page')
      res.redirect('/login');
    });
    app.use('/login', (req, res) => {
      logger.info('Incoming: Request for /login')
      let username = req.query.username;
      if(username && config.users[username]){
        if(config.users[username].sessionid && config.users[username].csrftoken){
          res.render('pages/index', { layout: 'layouts/layout-home',username:username, accesstoken:accesstoken });
          logger.info('Render: Home page');
        }else {
          res.render('pages/login');
          logger.info('Render: Login page');
        }
      }
      else {
        res.render('pages/login');
        logger.info('Render: Login page');
      }

    });
    app.use('/registration', (req, res) => {
      logger.info('Incoming: Request for /registration')
      logger.info('Render: Registration page')
      res.render('pages/register')
    });
    app.use(mwViewsRender());
    app.use(mwFindCrossfilter());
    app.use(mwTextProc());
    app.use(mwEtlApi());



};
