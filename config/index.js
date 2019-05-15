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
    'sephoraportugal',
    'prozisportugal',
    'algarvetourism',
    'tapairportugal',
    'visitportugal',
    'visitmadeira'

  ],
  setb:['mynetbarg',
    'kiagallery',
    'zarinhome',
    'irancell',
    'digikalacom',
    'bamilocom',
    'doucce.iran',
    'dorsaofficial',
    'tourism_iran',
    'set.men'
  ],
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
