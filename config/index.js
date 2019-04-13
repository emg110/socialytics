module.exports = {
  USER_SELF: "houmanproject",
  ENVIRONMENT: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || "3003",
  HOST: process.env.HOST || "localhost",
  SESSION_ID: "",
  DEFAULT_PROFILES: [],
  DEFAULT_LOCATIONS: [],
  DEFAULT_TAGS: [],
  DEFAULT_FORM_DATA: {
    username: "s.and.m.artifacts",
    tag: "s_and_m_artifacts",
    location: "faro",
    query: "faro",
    shortcode: "BwE-N5mFizR",
    count: 65
  },
  // NOTICE: PLEASE DELETE ALL DB FILES INSIDE DATA FOLDER BEFORE CHANGING VERSIONING
  VERSIONING_DATA: false
};
