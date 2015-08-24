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

describe( 'typed-array sqrt', function tests() {

	it( 'should export a function', function test() {
		expect( rad2deg ).to.be.a( 'function' );
	});

	it( 'should convert radians to degrees', function test() {
		var data, actual, expected;

		data = new Float64Array( [ 0, Math.PI/4, Math.PI/2, 3*Math.PI/4, Math.PI ] );
		actual = new Float64Array( data.length );

		actual = rad2deg( actual, data );
		expected = new Float64Array( [ 0, 45, 90, 135, 180 ] );

		assert.deepEqual( actual, expected );
	});

	it( 'should return an empty array if provided an empty array', function test() {
		assert.deepEqual( rad2deg( new Int8Array(), new Int8Array() ), new Int8Array() );
	});

});
