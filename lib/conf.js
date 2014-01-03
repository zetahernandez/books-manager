exports.commons = {
  dbPath: "mongodb://zeta:123456@ds043398.mongolab.com:43398/books",
  
  google: {
    clientID: "469432464424-2hqd0bqo8j5rs7psgions0q0k21r8f7v.apps.googleusercontent.com",
    clientSecret: "s6-JH3hfnsKY32vmE2SE35Wl",
    callbackURL: "http://localhost:9000/api/auth/google/return"
  },
  facebook: {
    clientID: '188351788023431',
    clientSecret: '27026bd66e0cc90d49783cbd16d687e2',
    callbackURL: "http://44.44.44.4:9000/api/auth/facebook/return"
  },
  dropbox: {
    clientID: 'z8j7pomu6xcg7fs',
    clientSecret: 'indptxw2tegh86j',
    callbackURL: "http://localhost:9000/api/auth/dropbox/return"
  }
};