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
    options = {
      host: 'some.host', // the Mongo DB host
      db: 'somedb', // the Mongo DB name
      src: 'test/scripts/*.js', // path to the change scripts
      mongoBinary: 'path/to/mongo', // path to Mongo executable
      storedScriptsCollection: 'change_scripts_go_in_here' // Mongo DB collection name to store change scripts already executed
    }
  },
  do: {}
}
```