module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      build: {
        src: ['js/animations.js'],
        dest: 'js/build/animation.min.js'
      }
    },
    sass: {
      dist: {
        options: {
          // style: 'compressed'
        },
        files: {
          'css/build/estilo.css': 'css/estilo.scss'
        }
      }
    },
    imagemin: {
      dynamic: {
        options: {
          cache: false
        },
        files: [{
          expand: true,
          cwd: 'img/',
          src: ['*.{png,JPG,jpg,gif}','!optimised/**'],
          dest: 'img/optimised/'
        }]
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-imagemin');

  // Default task(s).
  grunt.registerTask('default', ['sass'/*,'imagemin','uglify'*/]);

};