# Contributing

## Preconditions

 - [nodejs4](https://nodejs.org/en/download/)
 - [electron](https://www.npmjs.com/package/electron)

## Testing

Start an iRacing replay or test on track and put iRacing into windowed mode. Enable the `debug` flag in your `config.json` and launch it:

``` bash
$ gulp run
```

You now have the developer toolbar and a bigger window to work with.

## Building

### Assets

[gulp](http://gulpjs.com/) is used to compile assets. Install `gulp-cli` and run the following to command to compile the assets:

``` bash
$ gulp # builds styles, vendors and scripts
$ gulp styles # builds styles only
$ gulp vendors # builds vendors only
$ gulp scripts # builds scripts only
$ gulp watch # build on file change
```

### Electron

``` bash
$ gulp build
```
