const escape = require('escape-string-regexp')
const objectPath = require('object-path')
const deepReduce = require('deep-reduce')
function fuzzySearch(str, { fields, deep }) {
  let r = new RegExp(escape(str), 'i')

  if (Array.isArray(fields)) {
    return function () {
      return fields.reduce((match, field) => {
        if (match === true) {
          return true
        }
        let value = objectPath.get(this, field)
        return typeof value === 'string' && value.match(r) !== null
      }, false)
    }
  }

  if (deep) {
    return function () {
      let result = deepReduce(this, (match, value) =>
        match || (
          typeof value === 'string' && value.match(r) !== null
        ), false)
      return result
    }
  }

  return function () {
    for (let key in this) {
      // do not search _id and similar fields
      if (key[0] === '_' || !this.hasOwnProperty(key)) {
        continue
      }
      if (typeof this[key] === 'string' && this[key].match(r)) {
        return true
      }
    }
    return false
  }

}

module.exports = function () {
  return function (hook) {
    const query = hook.params.query;

    if (hook.method === 'find' && hook.params.query && hook.params.query.$search) {
      let options = {};
      if(hook.params.query.$fields){
        options.fields = hook.params.query.$fields;
        delete hook.params.query.$fields
      }
      if(hook.params.query.$deep){
        options.deep = true;
      }else{
        options.deep = false;
      }
      delete hook.params.query.$deep
      hook.params.query.$where = fuzzySearch(hook.params.query.$search, options)
      delete hook.params.query.$search
    }else{
      for (let field in query) {
        if(query[field].$search && field.indexOf('$') == -1) {
          query[field] = { $regex: new RegExp(query[field].$search, 'i') }
          delete query[field].$search
        }
      }
      hook.params.query = query
    }





    return hook
  }
}
