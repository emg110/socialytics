const config = require('../../config')
const logger = require('../logger');
module.exports = function (options = {}) {
  return function mwViewsRender(req, res, next) {
    let username = req.body.username || req.query.username;
    let expr = req.originalUrl;
    let userfilter = '?username='+username
    let engagement = '/dashboards/engagement'+userfilter;
    let stats = '/dashboards/stats'+userfilter;
    let explore = '/dashboards/explore'+userfilter;
    switch (expr) {
      case '/':
        res.redirect('/login');
        logger.warn('Redirecting to login page to authenticate');

        break;

      case engagement:
        res.render('pages/dashboards-engagement',{username:username});
        logger.info('Rendering instagram engagement dashboard page');
        break;
      case stats:
        res.render('pages/dashboards-stats',{username:username});
        logger.info('Rendering instagram stats dashboard page for: '+ username);
        break;
      case explore:
        res.render('pages/dashboards-explore',{username:username});
        logger.info('Rendering instagram explore dashboard page');
        break;
      case '/instagram/form/data?':
        var formData = config.default_form_data
        res.json(formData)
        logger.info('Rendering form data');

        break;
      case '/instagram/sets/data?':
        var setsData = {seta:config.seta,setb:config.setb}
        res.json(setsData)
        logger.info('Rendering sets member names data');

        break;
      default:
        logger.warn('Not a view request! Redirecting to ETL middleware'  + ': '+ expr);
        next();
    }
  };
};
