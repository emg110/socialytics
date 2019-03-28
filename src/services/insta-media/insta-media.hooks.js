const hookInstaMediaVersion = require('../../hooks/hook-insta-media-version');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [hookInstaMediaVersion()],
    update: [hookInstaMediaVersion()],
    patch: [hookInstaMediaVersion()],
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
