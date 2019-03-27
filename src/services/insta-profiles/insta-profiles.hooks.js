const hookInstaProfileVersion = require('../../hooks/hook-insta-profile-version');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [hookInstaProfileVersion()],
    update: [hookInstaProfileVersion()],
    patch: [hookInstaProfileVersion()],
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
