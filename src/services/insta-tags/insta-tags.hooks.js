const hookInstaTagVersion = require('../../hooks/hook-insta-tag-version');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [hookInstaTagVersion()],
    update: [hookInstaTagVersion()],
    patch: [hookInstaTagVersion()],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
