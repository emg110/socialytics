const config = require('../../config')
module.exports = function (options = {}) {
  return function mwViewsRender(req, res, next) {
    let expr = req.originalUrl;
    let output = {};
    switch (expr) {
      case '/':
        if(config.sessionid){
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
          res.render('pages/index', { layout: 'layouts/layout-home' });
          console.log('Rendering home page');
        }else {
          res.redirect('/');
        }

        break;
      case '/dashboards/engagement':
        if(config.sessionid && config.csrftoken){
          res.render('pages/dashboards-engagement');
          console.log('Rendering instagram engagement dashboard page');
        }else {
          res.redirect('/');
        }
        break;
      case '/dashboards/stats':

        if(config.sessionid && config.csrftoken){
          res.render('pages/dashboards-stats');
          console.log('Rendering instagram stats dashboard page');
        }else {
          res.redirect('/');
        }
        break;
      case '/dashboards/explore':
        if(config.sessionid && config.csrftoken){
          res.render('pages/dashboards-explore');
          console.log('Rendering instagram explore dashboard page');
        }else {
          res.redirect('/');
        }
        break;
      case '/login':
        if(config.sessionid && config.csrftoken){
          res.render('pages/login', {output});
          console.log('Rendering login page');
        }else {
          res.redirect('/');
        }
        break;
      case '/instagram/form/data?':
        if(config.sessionid && config.csrftoken){
          var formData = config.default_form_data
          res.json(formData)
          console.log('Rendering form data');
        }else {
          res.redirect('/');
        }

        break;
      case '/instagram/sets/data?':
        if(config.sessionid && config.csrftoken){
          var setsData = {seta:config.seta,setb:config.setb}
          res.json(setsData)
          console.log('Rendering sets data');
        }else {
          res.redirect('/');
        }

        break;
      default:
        next();
        console.log('Resource routing or unknown path '  + ':'+ expr);
    }
  };
};
