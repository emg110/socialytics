const NeDB = require('nedb');
const path = require('path');

module.exports = function (app) {
  const dbPath = app.get('nedb');
  const Model = new NeDB({
    filename: path.join(dbPath, 'insta-following.db'),
    autoload: true
  });
  Model.ensureIndex({ fieldName: 'id', unique: true });
  return Model;
};
