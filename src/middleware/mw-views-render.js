const config = require('../../config')
module.exports = function (options = {}) {
  return function mwViewsRender(req, res, next) {
    let expr = req.originalUrl;
    let output = {};
    switch (expr) {
      case '/':
        if(config.sessionid && config.csrftoken){
          res.redirect('/home');
        } else {
          res.render('pages/login');
          console.log('Rendering login page to authenticate');
        }
        break;
      case '/authenticate':
        res.redirect('/');
        break;
      case '/home':
        if(config.sessionid && config.csrftoken){
          res.render('pages/index', { layout: 'layout-home' });
          console.log('Rendering home page');
        }else {
          res.redirect('/');
        }

        break;
      case '/engagement':
        res.render('pages/engagement', {output});
        console.log('Rendering instagram engagement page');
        break;
      case '/login':
        res.render('pages/engagement', {output});
        console.log('Rendering instagram engagement page');
        break;
      case '/static/bundles/':
        res.redirect(expr)
        break;
      default:
        next();
        console.log('No routable views found, routing to other APIs to check if they game this '  + '!');
    }
  };
};
