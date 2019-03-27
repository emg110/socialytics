const hookInstaLocationVersion = require('../../hooks/hook-insta-location-version');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [hookInstaLocationVersion()],
    update: [hookInstaLocationVersion()],
    patch: [hookInstaLocationVersion()],
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
