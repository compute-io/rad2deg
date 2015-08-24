/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	rad2deg = require( './../lib/array.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'array rad2deg', function tests() {

	it( 'should export a function', function test() {
		expect( rad2deg ).to.be.a( 'function' );
	});

	it( 'should convert radians to degrees', function test() {
		var data, actual, expected;

		data = [ 0, Math.PI/4, Math.PI/2, 3*Math.PI/4, Math.PI ];
		actual = new Array( data.length );

		actual = rad2deg( actual, data );
		expected = [ 0, 45, 90, 135, 180 ];

		assert.deepEqual( actual, expected );
	});

	it( 'should return an empty array if provided an empty array', function test() {
		assert.deepEqual( rad2deg( [], [] ), [] );
	});

	it( 'should handle non-numeric values by setting the element to NaN', function test() {
		var data, actual, expected;

		data = [ true, null, [], {} ];
		actual = new Array( data.length );
		actual = rad2deg( actual, data );

		expected = [ NaN, NaN, NaN, NaN ];

		assert.deepEqual( actual, expected );
	});

});
