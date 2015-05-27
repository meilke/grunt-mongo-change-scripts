var options,
  shell = require('shelljs');

module.exports = initialize;

function initialize(_options_) {
  options = _options_;
  return {
    runScript: runScript
  };
}

function getMongoHost() {
  return options.host + '/' + options.db;
}

function runScript(changeScript) {
  var command = '"' + options.mongoBinary +'" ' + getMongoHost() + ' ' + changeScript;
  var result = shell.exec(command);
  if (result.code !== 0) {
    log.warn('Error: Mongo migration failed for: ' + changeScript);
  }
}