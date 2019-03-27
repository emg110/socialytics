const hookInstaSearchVersion = require('../../hooks/hook-insta-search-version');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [hookInstaSearchVersion()],
    update: [hookInstaSearchVersion()],
    patch: [hookInstaSearchVersion()],
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
