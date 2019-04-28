module.exports = {
  ENVIRONMENT: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || "3003",
  HOST: process.env.HOST || "localhost",
  PROTOCOL: "http",
  UIPORT:"80",
  userid: "houmanproject",
  sessionid: "",
  csrftoken:"",
  profiles: [],
  locations: [],
  tags: [],
  default_form_data: {
    username: "s.and.m.artifacts",
    tag: "s_and_m_artifacts",
    location: "faro",
    query: "faro",
    shortcode: "BwE-N5mFizR",
    count: 65
  },
  // NOTICE: PLEASE DELETE ALL DB FILES INSIDE DATA FOLDER BEFORE CHANGING VERSIONING
  versioning: false
};
