const logger = require('./logger');
module.exports = function renderData(etlData, page,username, res) {
  res.render(page,{etlData, username},function(err, html) {
    if(err){
      logger.error('ejs has returned this error: '+ err);
      res.sendStatus(500)
    }else{
      res.send(html);
    }

  });
}
