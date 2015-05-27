var options,
  bluebird = require('bluebird'),
  _ = require('lodash');

module.exports = initialize;

function initialize(_options_) {
  options = _options_;
  return {
    findAllStoredScripts: findAllStoredScripts,
    storeScripts: storeScripts
  };
}

function getMongoHost() {
  return options.host + '/' + options.db;
}

function getMongoConnection() {
  var url = 'mongodb://' + getMongoHost();
  var mongo = bluebird.promisifyAll(require('mongodb').MongoClient);
  return mongo.connectAsync(url);
}

function findAllStoredScripts() {
  return getMongoConnection()
    .then(function (db) {
      var finder = bluebird.promisifyAll(db.collection(options.storedScriptsCollection).find());
      return finder.toArrayAsync();
    })
    .then(function (scriptObjects) {
      return _.map(scriptObjects, 'name');
    });
}

function storeScripts(scripts) {
  if (_.isEmpty(scripts)) {
    return;
  }

  return getMongoConnection().then(function (db) {
    var c = bluebird.promisifyAll(db.collection(options.storedScriptsCollection));
    return c.insertAsync(_.map(scripts, function (script) { return { name: script }; }));
  });
}