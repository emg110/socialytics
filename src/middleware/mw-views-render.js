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
        res.render('pages/dashboards-engagement');
        console.log('Rendering instagram engagement dashboard page');
        break;
      case '/dashboards/stats':
        res.render('pages/dashboards-stats');
        console.log('Rendering instagram stats dashboard page');
        break;
      case '/dashboards/explore':
        res.render('pages/dashboards-explore');
        console.log('Rendering instagram explore dashboard page');
        break;
      case '/login':
        res.render('pages/login', {output});
        console.log('Rendering login page');
        break;
      case '/instagram/form/data?':
        var formData = config.default_form_data

        res.json(formData)
        break;
      case '/instagram/sets/data?':
        var setsData = {seta:config.seta,setb:config.setb}

        res.json(setsData)
        break;
      default:
        next();
        console.log('Resource routing or unknown path '  + ':'+ expr);
    }
  };
};
