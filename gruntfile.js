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
          'rutil.js',
					'test/spec/*.js'
				],
        tasks: ['compile_scripts']
      }
    },
		copy: {
			rtoj: {
				src: 'rutil.js',
				dest: 'test/src/rutil.js',
			}
		},
		jasmine: {
			src: 'test/src/*.js',
			options: {
				specs: 'test/spec/*Spec.js',
				helpers: 'test/spec/*Helper.js'
			}
		}
  });
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('jshint', ['jshint']);
  grunt.registerTask('compile_scripts', ['uglify:dist', 'copy:rtoj', 'jasmine']);
  grunt.registerTask('build', ['copy:rtoj', 'jasmine', 'uglify:dist']);
  grunt.registerTask('test', ['copy:rtoj', 'jasmine']);
  grunt.registerTask('default', ['watch:scripts']);
};
