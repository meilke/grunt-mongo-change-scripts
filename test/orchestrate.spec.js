var expect = require('expect.js'),
    orchestrate = require('../tasks/orchestrate.js'),
    grunt = require('grunt'),
    sinon = require('sinon'),
    q = require('q'),
    options,
    repository,
    runner;

describe('The change script runner', function () {

  beforeEach(function () {
    grunt.log = {
      writeln: sinon.stub(),
      warn: sinon.stub()
    };
    
    options = {
      host: 'some.host',
      db: 'somedb',
      src: 'test/scripts/*.js',
      mongoBinary: 'path/to/mongo',
      storedScriptsCollection: 'change_scripts_go_in_here'
    };

    repository = {
      findAllStoredScripts: sinon.stub().returns(q.when([])),
      storeScripts: sinon.stub().returns(q.when({}))
    };

    runner = {
      runScript: sinon.stub()
    };
  });

  it('runs two scripts if nothing has been run so far', function (done) {
    orchestrate(options, repository, runner, grunt)
      .conduct()
      .then(function () {
        expect(runner.runScript.calledTwice).to.be(true);
      })
      .then(done);
  });

  it('stores two scripts if nothing has been run so far', function (done) {
    orchestrate(options, repository, runner, grunt)
      .conduct()
      .then(function () {
        expect(repository.storeScripts.calledWith(['test/scripts/150527-test-1.js', 'test/scripts/150527-test-2.js'])).to.be(true);
      })
      .then(done);
  });

  it('runs only one script if one has already been executed', function (done) {
    repository.findAllStoredScripts.returns(q.when(['test/scripts/150527-test-1.js']));
    orchestrate(options, repository, runner, grunt)
      .conduct()
      .then(function () {
        expect(runner.runScript.calledOnce).to.be(true);
      })
      .then(done);
  });

  it('stores one scripts if one has already been executed', function (done) {
    repository.findAllStoredScripts.returns(q.when(['test/scripts/150527-test-1.js']));
    orchestrate(options, repository, runner, grunt)
      .conduct()
      .then(function () {
        expect(repository.storeScripts.calledWith(['test/scripts/150527-test-2.js'])).to.be(true);
      })
      .then(done);
  });

  it('runs no script if all have already been executed', function (done) {
    repository.findAllStoredScripts.returns(q.when(['test/scripts/150527-test-1.js', 'test/scripts/150527-test-2.js']));
    orchestrate(options, repository, runner, grunt)
      .conduct()
      .then(function () {
        expect(runner.runScript.called).to.be(false);
      })
      .then(done);
  });

  it('stores no scripts if all have already been executed', function (done) {
    repository.findAllStoredScripts.returns(q.when(['test/scripts/150527-test-1.js', 'test/scripts/150527-test-2.js']));
    orchestrate(options, repository, runner, grunt)
      .conduct()
      .then(function () {
        expect(repository.storeScripts.calledWith([])).to.be(true);
      })
      .then(done);
  });

});