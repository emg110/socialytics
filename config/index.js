module.exports = {
  ENVIRONMENT: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || "8196",
  HOST: process.env.HOST || "localhost",
  PROTOCOL: "http",
  UIPORT:"8195",
  //"houmanproject": {email:"your@email.com",sessionid:undefined,csrftoken:undefined}
  users: {},
  sessionid: undefined,
  csrftoken:undefined,
  profiles: [],
  locations: [],
  tags: [],
  cube:{},
  seta:[
    'continente',
    'meoinstagram',
    'nos',
    'lidlportugal',
    'prozisportugal',
    'algarvetourism',
    'visitportugal',
    'ualg_universidadedoalgarve',
    'zoomarine_algarve_oficial'
  ],
  setb:[
    'mynetbarg',
    'kiagallery',
    'iran_.attractions',
    'irancell',
    'digikalacom',
    'bamilocom',
    'iran_tourism_official',
    'irantourism.me',
    'iran_tourism.info'
  ],
  default_form_data: {
    username: "emg110",
    tag: "emg110",
    location: "faro",
    query: "faro",
    shortcode: "BwE-N5mFizR",
    count: 65
  },
  // NOTICE: PLEASE DELETE ALL DB FILES INSIDE DATA FOLDER BEFORE CHANGING VERSIONING
  versioning: false
};
