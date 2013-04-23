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
    lint : {
      all : ["grunt.js", "src/**/*.js"]
    },
    min: {
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
    jshint: {
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
    }
  });

  // Default task.
  grunt.registerTask("default", "lint qunit concat min");

};