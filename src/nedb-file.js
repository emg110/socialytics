var Datastore = require('nedb');
const nedbFile = function(fileName){
   db = new Datastore({ filename: fileName, autoload: true });
  return db
}
module.exports = nedbFile
