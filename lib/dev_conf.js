var path = require('path');
module.exports = {
  dbPath: "mongodb://zeta:123456@44.44.44.2:27017/books",
  booksPath: path.resolve(process.env.PWD, 'books'),
  google: {
    clientID: "469432464424-2hqd0bqo8j5rs7psgions0q0k21r8f7v.apps.googleusercontent.com",
    clientSecret: "s6-JH3hfnsKY32vmE2SE35Wl",
    serverKey: "AIzaSyDg30nsJmvCbHtu0niJJYHT6KFMzHuN0xM",
    callbackURL: "http://localhost:9000/api/auth/google/return"
  },
  facebook: {
    clientID: '188351788023431',
    clientSecret: '27026bd66e0cc90d49783cbd16d687e2',
    callbackURL: "http://localhost:9000/api/auth/facebook/return"
  },
  dropbox: {
    clientID: 'z8j7pomu6xcg7fs',
    clientSecret: 'indptxw2tegh86j',
    callbackURL: "http://localhost:9000/api/auth/dropbox/return"
  }
};