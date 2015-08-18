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

``` javascript
var rad2deg = require( 'compute-rad2deg' );
```

#### rad2deg( x[, opts] )

Converts radians to degrees element-wise. `x` may be either a [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number), an [`array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array), a [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays), or a [`matrix`](https://github.com/dstructs/matrix).

``` javascript
var matrix = require( 'dstructs-matrix' ),
	data,
	mat,
	out,
	i;

out = rad2deg( Math.PI/4 );
// returns 45

out = rad2deg( -Math.PI/4 );
// returns -45

data = [ 0, Math.PI/4, Math.PI/2, 3*Math.PI/4, Math.PI, 5*Math.PI/4 ];
out = rad2deg( data );
// returns [ 0, 45, 90, 135, 180, 225 ]

data = new Float64Array( data );
out = rad2deg( data );
// returns Float64Array( [ 0, 45, 90, 135, 180, 225 ] )

data = new Int16Array( 6 );
for ( i = 0; i < 6; i++ ) {
	data[ i ] = 0 * Math.PI/4;
}
mat = matrix( data, [3,2], 'int16' );
/*
	[ 0           Math.PI/4
	  Math.PI/2 3*Math.PI/4
	  Math.PI   5*Math.PI/4 ]
*/

out = rad2deg( mat );
/*
	[   0   45
	   90  135
	  180  225 ]
*/
```

The function accepts the following `options`:

* 	__accessor__: accessor `function` for accessing `array` values.
* 	__dtype__: output [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays) or [`matrix`](https://github.com/dstructs/matrix) data type. Default: `float64`.
*	__copy__: `boolean` indicating if the `function` should return a new data structure. Default: `true`.
*	__path__: [deepget](https://github.com/kgryte/utils-deep-get)/[deepset](https://github.com/kgryte/utils-deep-set) key path.
*	__sep__: [deepget](https://github.com/kgryte/utils-deep-get)/[deepset](https://github.com/kgryte/utils-deep-set) key path separator. Default: `'.'`.

For non-numeric `arrays`, provide an accessor `function` for accessing `array` values.

``` javascript
var data = [
	{'x':0},
	{'x':Math.PI/4},
	{'x':Math.PI/2},
	{'x':3*Math.PI/4},
	{'x':Math.PI}
];

function getValue( d, i ) {
	return d.x;
}

var out = rad2deg( data, {
	'accessor': getValue
});
// returns [ 0, 45, 90, 135, 180 ]
```

To [deepset](https://github.com/kgryte/utils-deep-set) an object `array`, provide a key path and, optionally, a key path separator.

``` javascript
var data = [
	{'x':[0,0]},
	{'x':[1,Math.PI/4]},
	{'x':[2,Math.PI/2]},
	{'x':[3,3*Math.PI/4]},
	{'x':[4,Math.PI]}
];

var out = rad2deg( data, 'x|1', '|' );
/*
	[
		{'x':[0,0]},
		{'x':[1,45]},
		{'x':[2,90]},
		{'x':[3,135]},
		{'x':[4,180]}
	]
*/

var bool = ( data === out );
// returns true
```

By default, when provided a [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays) or [`matrix`](https://github.com/dstructs/matrix), the output data structure is `float64` in order to preserve precision. To specify a different data type, set the `dtype` option (see [`matrix`](https://github.com/dstructs/matrix) for a list of acceptable data types).

``` javascript
var data, out;

data = new Int8Array( [0,1,2] );

out = rad2deg( data, {
	'dtype': 'int32'
});
// returns Int32Array( [0,57,114] )

// Works for plain arrays, as well...
out = rad2deg( [0,1,2], {
	'dtype': 'uint8'
});
// returns Uint8Array( [0,57,114] )
```

By default, the function returns a new data structure. To mutate the input data structure (e.g., when input values can be discarded or when optimizing memory usage), set the `copy` option to `false`.

``` javascript
var data,
	bool,
	mat,
	out,
	i;

data = [ 0, Math.PI/4, Math.PI/2, 3*Math.PI/4, Math.PI, 5*Math.PI/4 ];

out = rad2deg( data, {
	'copy': false
});
// returns [ 0, 45, 90, 135, 180, 225 ]

bool = ( data === out );
// returns true

data = new Float64Array( 6 );
for ( i = 0; i < 6; i++ ) {
	data[ i ] = 45 * i;
}
mat = matrix( data, [3,2], 'float64' );
/*
	[ 0           Math.PI/4
	  Math.PI/2 3*Math.PI/4
	  Math.PI   5*Math.PI/4 ]
*/

out = rad2deg( mat, {
	'copy': false
});
/*
	[   0   45
	   90  135
	  180  225 ]
*/

bool = ( mat === out );
// returns true
```


## Notes

*	If an element is __not__ a numeric value, the evaluated principal [square root](https://en.wikipedia.org/wiki/Square_root) is `NaN`.

	``` javascript
	var data, out;

	out = rad2deg( null );
	// returns NaN

	out = rad2deg( true );
	// returns NaN

	out = rad2deg( {'a':'b'} );
	// returns NaN

	out = rad2deg( [ true, null, [] ] );
	// returns [ NaN, NaN, NaN ]

	function getValue( d, i ) {
		return d.x;
	}
	data = [
		{'x':true},
		{'x':[]},
		{'x':{}},
		{'x':null}
	];

	out = rad2deg( data, {
		'accessor': getValue
	});
	// returns [ NaN, NaN, NaN, NaN ]

	out = rad2deg( data, {
		'path': 'x'
	});
	/*
		[
			{'x':NaN},
			{'x':NaN},
			{'x':NaN,
			{'x':NaN}
		]
	*/
	```

*	Be careful when providing a data structure which contains non-numeric elements and specifying an `integer` output data type, as `NaN` values are cast to `0`.

	``` javascript
	var out = rad2deg( [ true, null, [] ], {
		'dtype': 'int8'
	});
	// returns Int8Array( [0,0,0] );
	```

## Examples

``` javascript
var matrix = require( 'dstructs-matrix' ),
	rad2deg = require( 'compute-rad2deg' );

var data,
	mat,
	out,
	tmp,
	i;

var TWO_PI = 2 * Math.PI;

// Plain arrays...
data = new Array( 10 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = Math.random() * TWO_PI;
}
out = rad2deg( data );

// Object arrays (accessors)...
function getValue( d ) {
	return d.x;
}
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = {
		'x': data[ i ]
	};
}
out = rad2deg( data, {
	'accessor': getValue
});

// Deep set arrays...
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = {
		'x': [ i, data[ i ].x ]
	};
}
out = rad2deg( data, {
	'path': 'x/1',
	'sep': '/'
});

// Typed arrays...
data = new Int32Array( 10 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = Math.random() * TWO_PI;
}
tmp = rad2deg( data );
out = '';
for ( i = 0; i < data.length; i++ ) {
	out += tmp[ i ];
	if ( i < data.length-1 ) {
		out += ',';
	}
}

// Matrices...
mat = matrix( data, [5,2], 'int32' );
out = rad2deg( mat );

// Matrices (custom output data type)...
out = rad2deg( mat, {
	'dtype': 'uint8'
});
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
