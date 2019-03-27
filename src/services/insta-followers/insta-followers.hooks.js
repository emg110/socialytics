const hookInstaFollowVersion = require('../../hooks/hook-insta-follow-version');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [hookInstaFollowVersion()],
    update: [hookInstaFollowVersion()],
    patch: [hookInstaFollowVersion()],
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
