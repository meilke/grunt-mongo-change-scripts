module.exports = function (grunt) {

  grunt.registerMultiTask('mongoChangeScripts', 'Run change scripts only once!.', function() {
    var done = this.async();
    var options = this.options();
    
    var repository = require('./repository.js')(options);
    var runner = require('./run.js')(options);
    var orchestrate = require('./orchestrate.js')(options, repository, runner, grunt);

    orchestrate.conduct().then(done);
  });

};