// Application hooks that run for every service
const log = require('./hooks/log');
const hookInstaCheckBeforeCreate = require('./hooks/hook-insta-check-before-create');
const hookInstaVersionBeforeCreate = require('./hooks/hook-insta-version-before-create');
const { authenticate } = require('@feathersjs/authentication').hooks;
const checkProvider = function(){
  return (context)=>{
    if(context.params.provider === 'socketio') {
      throw new Error('You can not delete a user via Socket.io');
    }
  }
  // check for if(context.params.provider) to prevent any external call

}

module.exports = {
  before: {
    all: [ authenticate('jwt'),log()  ],
    find: [],
    get: [],
    create: [hookInstaCheckBeforeCreate(),hookInstaVersionBeforeCreate()],
    update: [],
    patch: [],
    remove: [checkProvider()]
  },

  after: {
    all: [ log() ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [ log() ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
