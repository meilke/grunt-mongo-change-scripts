var expect = require('expect.js'),
    runner = require('../tasks/run.js'),
    sinon = require('sinon'),
    options,
    log;

describe('The change script runner', function () {

  beforeEach(function () {
    log = {
      writeln: sinon.stub(),
      warn: sinon.stub()
    };

    options = {
      host: 'some.host',
      db: 'somedb',
      mongoBinary: 'path/to/mongo'
    };

  });

  it('warns of errors', function () {
    runner(options, log).runScript('name');
    expect(log.warn.called).to.be(true);
  });

  it('writes the output to the console', function () {
    runner(options, log).runScript('name');
    expect(log.writeln.called).to.be(true);
  });

});