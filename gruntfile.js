'use strict';
 
module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      files: ['rutil.js'],
      options: {
        globals: {
          console: true,
          module: false,
          jQuery: false
        }
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n',
        sourceMap: 'rutil.min.js.map',
        sourceMapRoot: '/',
        sourceMappingURL: 'rutil.min.js.map',
        sourceMapPrefix: 1,
        mangle: true,
        compress: {
          global_defs: {
            'DEBUG': true
          },
          dead_code: true
        },
        report: 'min'
      },
      dist: {
        files: {
          'rutil.min.js': [
            'rutil.js'
          ]
        }
      }
    },
    watch: {
      scripts: {
        files: [
          'rutil.js'
				],
        tasks: ['compile_scripts']
      }
    },
		copy: {
			test: {
				src: 'rutil.js',
				dest: 'test/src/rutil.js',
			}
		}
  });
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('jshint', ['jshint']);
  grunt.registerTask('compile_scripts', ['uglify:dist']);
  grunt.registerTask('test', ['copy:test']);
  grunt.registerTask('default', ['watch:scripts']);
};
