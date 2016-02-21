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
  return repository
    .findAllStoredScripts()
    .then(runAllScriptsIfNecessary)
    .then(repository.storeScripts);
}

function runAllScriptsIfNecessary(storedScripts) {
  var onlyNonStoredScripts = function (script) {
    return storedScripts.indexOf(script) < 0;
  };

  var runScripts = function (script) {
    try {
      grunt.log.writeln();
      grunt.log.writeln('---------------------------------------------');
      grunt.log.writeln('Running: ' + script);
      grunt.log.writeln('---------------------------------------------');
      grunt.log.writeln();
      runner.runScript(script);
      return script;
    }
    catch(err) {
      grunt.log.warn('Error occurred : ' + err);
    }
  };

  return _
    .chain(grunt.file.expand(options.src).sort())
    .filter(onlyNonStoredScripts)
    .map(runScripts)
    .value();
}