/* global require, describe, it */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Matrix data structure:
	matrix = require( 'dstructs-matrix' ),

	// Validate a value is NaN:
	isnan = require( 'validate.io-nan' ),

	// Module to be tested:
	rad2deg = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'compute-rad2deg', function tests() {

	it( 'should export a function', function test() {
		expect( rad2deg ).to.be.a( 'function' );
	});

	it( 'should throw an error if provided an invalid option', function test() {
		var values = [
			'5',
			5,
			true,
			undefined,
			null,
			NaN,
			[],
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				rad2deg( [1,2,3], {
					'accessor': value
				});
			};
		}
	});

	it( 'should throw an error if provided an array and an unrecognized/unsupported data type option', function test() {
		var values = [
			'beep',
			'boop'
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				rad2deg( [1,2,3], {
					'dtype': value
				});
			};
		}
	});

	it( 'should throw an error if provided a typed-array and an unrecognized/unsupported data type option', function test() {
		var values = [
			'beep',
			'boop'
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				rad2deg( new Int8Array([1,2,3]), {
					'dtype': value
				});
			};
		}
	});

	it( 'should throw an error if provided a matrix and an unrecognized/unsupported data type option', function test() {
		var values = [
			'beep',
			'boop'
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				rad2deg( matrix( [2,2] ), {
					'dtype': value
				});
			};
		}
	});

	it( 'should return NaN if the first argument is neither a number, array-like, or matrix-like', function test() {
		var values = [
			// '5', // valid as is array-like (length)
			true,
			undefined,
			null,
			// NaN, // allowed
			function(){},
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			assert.isTrue( isnan( rad2deg( values[ i ] ) ) );
		}
	});

	it( 'should convert radians to degrees when provided a number', function test() {
		var actual;

		actual = rad2deg( Math.PI/2 );
		assert.closeTo( actual, 90, 1e-10 );

		actual = rad2deg( Math.PI/6 );
		assert.closeTo( actual, 30, 1e-10 );

		actual = rad2deg( -3*Math.PI/2 );
		assert.closeTo( actual, -270, 1e-10 );

		actual = rad2deg( NaN );
		assert.isTrue( isnan( actual ) );
	});

	it( 'should convert radians to degrees element-wise when provided a plain array', function test() {
		var data, actual, expected;

		data = [ 0, Math.PI/4, Math.PI/2, 3*Math.PI/4, Math.PI ];
		expected = [ 0, 45, 90, 135, 180 ];

		actual = rad2deg( data );
		assert.notEqual( actual, data );
		assert.deepEqual( actual, expected );

		// Mutate...
		actual = rad2deg( data, {
			'copy': false
		});
		assert.strictEqual( actual, data );
		assert.deepEqual( data, expected );
	});

	it( 'should convert radians to degrees element-wise when provided a typed array', function test() {
		var data, actual, expected;

		data = new Float64Array( [ 0, Math.PI/4, Math.PI/2, 3*Math.PI/4, Math.PI ] );
		expected = new Float64Array( [ 0, 45, 90, 135, 180 ] );

		actual = rad2deg( data );
		assert.notEqual( actual, data );
		assert.deepEqual( actual, expected );

		// Mutate:
		actual = rad2deg( data, {
			'copy': false
		});
		expected = new Float64Array( [ 0, 45, 90, 135, 180 ] );
		assert.strictEqual( actual, data );
		assert.deepEqual( data, expected );
	});

	it( 'should convert radians to degrees element-wise and return an array of a specific type', function test() {
		var data, actual, expected;

		data = [ 0, Math.PI/4, Math.PI/2, 3*Math.PI/4, Math.PI ];
		expected = new Int8Array( [ 0, 45, 90, 135, 180 ] );

		actual = rad2deg( data, {
			'dtype': 'int8'
		});
		assert.notEqual( actual, data );
		assert.strictEqual( actual.BYTES_PER_ELEMENT, 1 );
		assert.deepEqual( actual, expected );
	});

	it( 'should convert radians to degrees element-wise using an accessor', function test() {
		var data, actual, expected;

		data = [
			[0,0],
			[1,Math.PI/4],
			[2,Math.PI/2],
			[3,3*Math.PI/4],
			[4,Math.PI]
		];
		expected = [ 0, 45, 90, 135, 180 ];

		actual = rad2deg( data, {
			'accessor': getValue
		});
		assert.notEqual( actual, data );
		assert.deepEqual( actual, expected );

		// Mutate:
		actual = rad2deg( data, {
			'accessor': getValue,
			'copy': false
		});
		assert.strictEqual( actual, data );
		assert.deepEqual( data, expected );

		function getValue( d ) {
			return d[ 1 ];
		}
	});

	it( 'should convert radians to degrees element-wise and deep set', function test() {
		var data, actual, expected;

		data = [
			{'x':[9,0]},
			{'x':[9,Math.PI/4]},
			{'x':[9,Math.PI/2]},
			{'x':[9,3*Math.PI/4]},
			{'x':[9,Math.PI]}
		];
		expected = [
			{'x':[9,0]},
			{'x':[9,45]},
			{'x':[9,90]},
			{'x':[9,135]},
			{'x':[9,180]}
		];

		actual = rad2deg( data, {
			'path': 'x.1'
		});
		assert.strictEqual( actual, data );
		assert.deepEqual( actual, expected );

		// Specify a path with a custom separator...
		data = [
			{'x':[9,0]},
			{'x':[9,Math.PI/4]},
			{'x':[9,Math.PI/2]},
			{'x':[9,3*Math.PI/4]},
			{'x':[9,Math.PI]}
		];

		actual = rad2deg( data, {
			'path': 'x/1',
			'sep': '/'
		});
		assert.strictEqual( actual, data );
		assert.deepEqual( actual, expected );
	});

	it( 'should convert radians to degrees element-wise when provided a matrix', function test() {
		var mat,
			out,
			d1,
			d2,
			d3,
			i;

		d1 = new Int16Array( 25 );
		d2 = new Float64Array( 25 );
		d3 = new Int16Array( 25 );
		for ( i = 0; i < d1.length; i++ ) {
			d1[ i ] = Math.random() * ( 2 * Math.PI );
			d2[ i ] = d1[ i ] * 180 / Math.PI;
			d3[ i ] = d1[ i ] * 180 / Math.PI;
		}
		mat = matrix( d1, [5,5], 'int16' );
		out = rad2deg( mat );

		assert.deepEqual( out.data, d2 );

		// Mutate...
		out = rad2deg( mat, {
			'copy': false
		});
		assert.strictEqual( mat, out );
		assert.deepEqual( mat.data, d3 );
	});

	it( 'should convert radians to degrees element-wise and return a matrix of a specific type', function test() {
		var mat,
			out,
			d1,
			d2,
			i;

		d1 = new Int16Array( 25 );
		d2 = new Float32Array( 25 );
		for ( i = 0; i < d1.length; i++ ) {
			d1[ i ] = Math.random() * ( 2 * Math.PI );
			d2[ i ] = d1[ i ] * 180 / Math.PI;
		}
		mat = matrix( d1, [5,5], 'int16' );
		out = rad2deg( mat, {
			'dtype': 'float32'
		});

		assert.strictEqual( out.dtype, 'float32' );
		assert.deepEqual( out.data, d2 );
	});

	it( 'should return an empty data structure if provided an empty data structure', function test() {
		assert.deepEqual( rad2deg( [] ), [] );
		assert.deepEqual( rad2deg( matrix( [0,0] ) ).data, new Float64Array() );
		assert.deepEqual( rad2deg( new Int8Array() ), new Float64Array() );
	});

});
