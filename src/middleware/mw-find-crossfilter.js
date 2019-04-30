
module.exports = function (options = {}) {
  return function mwFindCrossfilter(req, res, next) {
    //console.log('mw-find-crossfilter middleware is running');
    next();
  };
};
