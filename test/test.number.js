/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Validate a value is NaN:
	isnan = require( 'validate.io-nan' ),

	// Module to be tested:
	rad2deg = require( './../lib/number.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'number rad2deg', function tests() {

	it( 'should export a function', function test() {
		expect( rad2deg ).to.be.a( 'function' );
	});

	it( 'should convert radians to degrees', function test() {
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

});
