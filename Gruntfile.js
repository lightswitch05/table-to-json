/*global module:false*/
module.exports = function(grunt) {
  'use strict';

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON( 'package.json' ),
    
    clean: {
      build: [ 'lib' ]
    },
    
    concat: {
      options: {
        banner: '/**\n' +
                ' * <%= pkg.name %>\n' +
                ' * <%= pkg.description %>\n' +
                ' *\n' +
                ' * @author <%= pkg.author.name %>\n' +
                ' * @copyright <%= pkg.author.name %> <%= grunt.template.today("yyyy") %>\n' +
                ' * @license <%= pkg.licenses[0].type %> <<%= pkg.licenses[0].url %>>\n' +
                ' * @link <%= pkg.homepage %>\n' +
                ' * @module <%= pkg.name %>\n' +
                ' * @version <%= pkg.version %>\n' +
                ' */\n'
      },
      dist: {
        src: [
          'src/jquery.tabletojson.js'
        ],
        dest : 'lib/jquery.tabletojson.js'
      }
    },
    jshint: {
      files: {
        src: [
          'Gruntfile.js',
          'src/**/*.js',
          'test/specs/*.js'
        ]
      },
      options: {
        jshintrc: '.jshintrc'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
        '<%= pkg.author.name %> */\n',
        report: 'gzip'
      },
      dist: {
        files: {
          'lib/jquery.tabletojson.min.js': ['<banner>','lib/jquery.tabletojson.js']
        }
      }
    },
    qunit: {
      files: ['test/index.html']
    },
    watch: {
      scripts: {
        files: ['src/**/*.js'],
        tasks: ['build']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean' );
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  
  // Default task.
  grunt.registerTask('build', ['clean:build', 'concat', 'uglify']);
  grunt.registerTask('test', ['jshint', 'qunit']);
  grunt.registerTask('default', ['test', 'build']);

};