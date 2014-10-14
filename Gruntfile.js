// Generated on 2013-07-31 using generator-ember 0.5.9
'use strict';


// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to match all subfolders:
// 'test/spec/**/*.js'

module.exports = function(grunt) {

  require("time-grunt")(grunt);
  // load all grunt tasks
  require("load-grunt-tasks")(grunt);

  grunt.initConfig({

    express: {
      options: {
        port: process.env.PORT || 9000
      },
      dev: {
        options: {
          script: 'lib/server.js'
        }
      },
      prod: {
        options: {
          script: 'lib/cluster.js',
          node_env: 'production'
        }
      }
    },

    watch: {
      express: {
        files: [
          'lib/server.js',
          'lib/**/*.{js,json}'
        ],
        tasks: ['express:dev'],
        options: {
          livereload: true,
          spawn: false //Without this option specified express won't be reloaded
        }
      }
    },
    jshint: {
      all: {
        src: ["Gruntfile.js", "lib/*.js", "lib/*/*.js", "test/*.js"],
        options: {
          jshintrc: "./.jshintrc"
        }
      }
    },
    mocha: {
      test: {
        src: ["test/*.spec.js"]
      }
    },
  });

  grunt.registerTask('server', function(target) {
    // if (target === 'dist') {
    //   return grunt.task.run([]);
    // }

    grunt.task.run([
      'jshint',
      'express:dev',
      'watch'
    ]);
  });

  grunt.registerTask('test', [
    'jshint',
    'mocha'
  ]);


  grunt.registerTask('default', [
    'test'
  ]);
};