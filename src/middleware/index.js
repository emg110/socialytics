const config = require('../../config')
const mwViewsRender = require('./mw-views-render');
const mwEtlApi = require('./mw-etl-api');
const mwFindCrossfilter = require('./mw-find-crossfilter');
const Instagram = require('../backend-social/api/instagram/instagram');
const logger = require('../logger');

// eslint-disable-next-line no-unused-vars
  module.exports = function (app) {
    var path = require('path');
    const expressLayouts = require('express-ejs-layouts')
    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, '../../src/views'));
    app.use('/home',expressLayouts);
    app.use('/home',async (req, res)=> {
      let username = req.query.username;
      let accesstoken = req.query.accesstoken;
      if(username){
        if(config.users[username].sessionid && config.users[username].csrftoken){
          res.render('pages/index', { layout: 'layouts/layout-home',username:username, accesstoken:accesstoken });
          console.log('info: Rendering home page');
        }
        else {
          res.redirect('/login');
        }
      }else{
        res.send(404)
      }
    });
    app.use('/authenticate', async (req, res, next) => {
      if(req.body.password && req.body.email){
        //let username = req.body.username.toLowerCase();
        let username = '';
        let password = req.body.password;
        let email = req.body.email;
        app.service('users')
          .find({email: email, $limit:1})
          .then( async (result) => {
            result = result.data[0];
            console.log('info: User found for authentication '+ result.username);
            config.users[result.username] = result;
            username = result.username;
            req.body.username = username
            if(req.body.sessionid)config.users[username].sessionid = result.sessionid
            const instagram = new Instagram(username.toLowerCase());

            let csrftoken = await instagram.getCsrfToken().then((csrf) =>
            {
              return csrf;
            }).catch(e =>
            {
              console.log(e);
            });
            let userData = await instagram.getUserDataByUsername(username).then(t => {
              return t;
            }).catch(e =>
            {
              config.users[username].sessionid = result.sessionid
              console.log(e);
            })
            let userId = instagram.getUserIdByUserName(userData);
            if(userId){
              req.body.csrftoken = csrftoken;
              req.body.status = 'verified';
              if(req.body.sessionid){
                config.users[username].sessionid =  req.body.sessionid;
              }else{
                config.users[username].sessionid = result.sessionid
              }
              config.users[username].csrftoken = csrftoken;
              config.users[username].userid = userId;
              config.users[username].status = 'verified';
              console.log('info: Got csrf-token and checked along username and session-id with Instagram and added to request');
              app.service('authentication')
                .create({
                  strategy: 'local',
                  email: email,
                  password: password
                })
                .then(response => {
                res.redirect('/home?username='+username+ '&accesstoken= '+ response.accessToken.toString())
              });

            }

          })
          .catch(err => {
            console.log(err);
            res.redirect('/registration')
          });
      }
      else {
        logger.error('Not all info required is provided! Redirecting to login page')
        res.redirect('/login')
      }
    });
    app.use('/register', async (req, res) => {
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
          console.log(e);
        });
        const userData = await instagram.getUserDataByUsername(username).then(t => {
          return t;
        }).catch(e =>
        {
          console.log(e);
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
              console.log('User registeration successfully done and retuned: '+ result);
              res.redirect('/home?username='+username)
            })
            .catch(err => {
              console.log(err);
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
      console.log('info: Logging out...! Redirecting to login page')
      res.redirect('/login');
    });
    app.use('/login', (req, res) => {
      let username = req.query.username;
      if(config.users[username].sessionid && config.users[username].csrftoken){
        res.render('pages/login');
        console.log('info: Rendering login page');
      }else {
        res.redirect('/');
      }
    });
    app.use('/registration', (req, res) => {
      console.log('info: Now rendering registration page')
      res.render('pages/register')
    });
    app.use(mwViewsRender());
    app.use(mwFindCrossfilter());
    app.use(mwEtlApi());


};
