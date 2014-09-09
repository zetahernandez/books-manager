 var dev_conf = require('./dev_conf'),
   prod_conf = require('./prod_conf');

 exports.commons = (function() {
   switch (process.env.NODE_ENV) {
     case 'development':
       return dev_conf;

     case 'production':
       return prod_conf;

     default:
       return dev_conf;
   }
 })();