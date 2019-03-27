const hookInstaPostVersion = require('../../hooks/hook-insta-post-version');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [hookInstaPostVersion()],
    update: [hookInstaPostVersion()],
    patch: [hookInstaPostVersion()],
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
