/*global module:false*/
module.exports = function(grunt) {
  "use strict";

  // Project configuration.
  grunt.initConfig({
    pkg: "<json:package.json>",
    meta: {
      banner : "/**\n" +
               " * <%= pkg.name %>\n" +
               " * <%= pkg.description %>\n" +
               " *\n" +
               " * @author <%= pkg.author.name %>\n" +
               " * @copyright <%= pkg.author.name %> <%= grunt.template.today('yyyy') %>\n" +
               " * @license <%= pkg.licenses[0].type %> <<%= pkg.licenses[0].url %>>\n" +
               " * @link <%= pkg.homepage %>\n" +
               " * @module <%= pkg.name %>\n" +
               " * @version <%= pkg.version %>\n" +
               " */"
    },
    concat: {
      dist : {
        src : [
          "<banner>",
          "src/jquery.tabletojson.js"
        ],
        dest : "lib/jquery.tabletojson.js"
      }
    },
    jshint : {
      all : ["grunt.js", "src/*.js", "test/specs/*"],
      options: {
        curly     : true,
        eqeqeq    : true,
        immed     : true,
        latedef   : true,
        noempty   : true,
        newcap    : true,
        noarg     : true,
        sub       : true,
        undef     : true,
        eqnull    : true,
        jquery    : true,
        unused    : true,
        bitwise   : true,
        camelcase : true,
        forin     : true,
        nonew     : true,
        quotmark  : true,
        trailing  : true
      }
    },
    uglify: {
      "lib/jquery.tabletojson.min.js" : ["<banner>", "<banner>","lib/jquery.tabletojson.js"]
    },
    qunit: {
      files: ["test/index.html"]
    },
    watch: {
      scripts: {
        files : "<config:lint.files>",
        tasks : "default"
      }
    },

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  
  // Default task.
  grunt.registerTask("default", ["jshint", "qunit", "concat", "uglify"]);
  grunt.registerTask("test", ["jshint", "qunit"]);

};