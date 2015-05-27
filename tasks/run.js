var options,
  log,
  shell = require('shelljs');

module.exports = initialize;

function initialize(_options_, _log_) {
  options = _options_;
  log = _log_;
  return {
    runScript: runScript
  };
}

function getMongoHost() {
  return options.host + '/' + options.db;
}

function runScript(changeScript) {
  var command = '"' + options.mongoBinary +'" ' + getMongoHost() + ' ' + changeScript;
  var result = shell.exec(command, { silent: true });
  log.writeln(result.output);
  if (result.code !== 0) {
    log.warn('Error: Running script ' + changeScript + ' failed!');
  } else {
    log.writeln('Running script ' + changeScript + ' done!');
  }
}