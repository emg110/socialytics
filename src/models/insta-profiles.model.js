const NeDB = require('nedb');
const path = require('path');

module.exports = function (app) {
  const dbPath = app.get('nedb');
  const Model = new NeDB({
    filename: path.join(dbPath, 'insta-profiles.db'),
    autoload: true
  });
  Model.ensureIndex({ fieldName: 'id', unique: true });
  Model.ensureIndex({ fieldName: 'username', unique: true });

  return Model;
};
