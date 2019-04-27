// Application hooks that run for every service
const log = require('./hooks/log');
const hookInstaCheckBeforeCreate = require('./hooks/hook-insta-check-before-create');
const hookInstaVersionBeforeCreate = require('./hooks/hook-insta-version-before-create');

module.exports = {
  before: {
    all: [ log() ],
    find: [],
    get: [],
    create: [hookInstaCheckBeforeCreate(),hookInstaVersionBeforeCreate()],
    update: [],
    patch: [],
    remove: []
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
