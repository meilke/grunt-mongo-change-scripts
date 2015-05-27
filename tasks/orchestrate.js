var options,
  repository,
  runner,
  grunt,
  _ = require('lodash');

module.exports = initialize;

function initialize(_options_, _repository_, _runner_, _grunt_) {
  options = _options_;
  repository = _repository_;
  runner = _runner_;
  grunt = _grunt_;

  return {
    conduct: conduct
  };
}

function conduct() {
  return repository.findAllStoredScripts()
    .then(runAllScriptsIfNecessary)
    .then(repository.storeScripts);
}

function runAllScriptsIfNecessary(storedScripts) {
  var scripts = grunt.file.expand(options.src).sort();
  var scriptsActuallyRun = [];

  _(scripts).forEach(function (script) {
    var runScript = storedScripts.indexOf(script) < 0;
    if (runScript) {
      try {
        grunt.log.writeln();
        grunt.log.writeln('---------------------------------------------');
        grunt.log.writeln('Running: ' + script);
        grunt.log.writeln('---------------------------------------------');
        grunt.log.writeln();
        runner.runScript(script);
        scriptsActuallyRun.push(script);
      }
      catch(err) {
        grunt.log.warn('Error occurred : ' + err);
      }
    }
  }).value();

  return scriptsActuallyRun;
}