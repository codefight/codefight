module.exports = function (grunt) {
  // Load needed tasks
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      options: {
        esnext: true
      },
      grunt: ['Gruntfile.js'],
      server: ['server/**/*.js']
    },
    watch: {
      js: {
        files: ['Gruntfile.js', 'server/**/*.js'],
        target: 'jshint'
      }
    }
  });
};
