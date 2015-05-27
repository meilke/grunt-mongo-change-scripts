[![Build Status](https://api.travis-ci.org/meilke/grunt-mongo-change-scripts.png)](https://travis-ci.org/meilke/grunt-mongo-change-scripts)
[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)
[![NPM version](https://badge.fury.io/js/grunt-mongo-change-scripts.svg)](http://badge.fury.io/js/grunt-mongo-change-scripts)  
[![Code Climate](https://codeclimate.com/github/meilke/grunt-mongo-change-scripts/badges/gpa.svg)](https://codeclimate.com/github/meilke/grunt-mongo-change-scripts)
[![Test Coverage](https://codeclimate.com/github/meilke/grunt-mongo-change-scripts/badges/coverage.svg)](https://codeclimate.com/github/meilke/grunt-mongo-change-scripts)  

# grunt-mongo-change-scripts

This will run Mongo DB scripts and save that it is run so that you only run it once.

## Getting started

If you want to use it in your Grunt pipeline:

```bash
$ npm install grunt-mongo-change-scripts --save-dev
```

Next add this line to your project's Gruntfile:

```js
grunt.loadNpmTasks('grunt-mongo-change-scripts');
```

## Configuration

Add this to your Grunt configuration:

```js
grunt-mongo-change-scripts: {
  options: {
    // the Mongo DB host
    host: 'some.host',

    // the Mongo DB name
    db: 'somedb',

    // path to the change scripts
    src: 'test/scripts/*.js',

    // path to Mongo executable
    mongoBinary: 'path/to/mongo',

    // Mongo DB collection name to store change scripts already executed
    storedScriptsCollection: 'change_scripts_go_in_here'
  },
  do: {}
}
```