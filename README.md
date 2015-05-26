rad2deg
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> Converts radians to degrees.


## Installation

``` bash
$ npm install compute-rad2deg
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage

To use the module,

``` javascript
var rad2deg = require( 'compute-rad2deg' );
```

#### rad2deg( x[, opts] )

Converts radians to degrees. `x` may be either an `array` of values or a single numeric value.

``` javascript
// Single value:
var deg = rad2deg( Math.PI/2 );
// returns 90

// Array of values:
var rads = [ 0, Math.PI/4, Math.PI/2, 3*Math.PI/4, Math.PI ];

rad2deg( rads );
// returns [ 0, 45, 90, 135, 180 ]
```

The function accepts two `options`:

*  __copy__: `boolean` indicating whether to return a new `array` containing the computed means. Default: `true`.
*  __accessor__: accessor `function` for accessing numerical values in object `arrays`.

To mutate the input `array` (e.g. when input values can be discarded or when optimizing memory usage), set the `copy` option to `false`.

``` javascript
var rads = [ 0, Math.PI/4, Math.PI/2, 3*Math.PI/4, Math.PI ];

var values = rad2deg( data, {
	'copy': false
});
// returns [ 0, 45, 90, 135, 180 ]

console.log( data === values );
//returns true
```

For non-numeric `arrays`, provide an accessor `function` for accessing numeric `array` values.

``` javascript
var arr = [
	{'x':0},
	{'x':Math.PI/4},
	{'x':Math.PI/2},
	{'x':3*Math.PI/4},
	{'x':Math.PI},
];

function getValue( d ) {
	return d.x;
}

var values = rad2deg( arr, {
	'accessor': getValue
});
// returns [ 0, 45, 90, 135, 180 ]
```

Notes:

*	If provided an empty `array`, the function returns `null`.

*	__Beware__ of floating point errors.

``` javascript
var deg = rad2deg( Math.PI / 6 );
// returns 29.999999999999996 instead of 30
```

## Examples

``` javascript
var rad2deg = require( 'compute-rad2deg' );

// Simulate some data...
var data = new Array( 100 );

var twopi = 2*Math.PI;
for ( var i = 0; i < data.length; i++ ) {
	data[ i ] = Math.random()*twopi;
}

rad2deg( data );

console.log( data.join( '\n' ) );
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```

## Tests

### Unit

Unit tests use the [Mocha](http://mochajs.org) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2014-2015. The Compute.io Authors.


[npm-image]: http://img.shields.io/npm/v/compute-rad2deg.svg
[npm-url]: https://npmjs.org/package/compute-rad2deg

[travis-image]: http://img.shields.io/travis/compute-io/rad2deg/master.svg
[travis-url]: https://travis-ci.org/compute-io/rad2deg

[coveralls-image]: https://img.shields.io/coveralls/compute-io/rad2deg/master.svg
[coveralls-url]: https://coveralls.io/r/compute-io/rad2deg?branch=master

[dependencies-image]: http://img.shields.io/david/compute-io/rad2deg.svg
[dependencies-url]: https://david-dm.org/compute-io/rad2deg

[dev-dependencies-image]: http://img.shields.io/david/dev/compute-io/rad2deg.svg
[dev-dependencies-url]: https://david-dm.org/dev/compute-io/rad2deg

[github-issues-image]: http://img.shields.io/github/issues/compute-io/rad2deg.svg
[github-issues-url]: https://github.com/compute-io/rad2deg/issues
