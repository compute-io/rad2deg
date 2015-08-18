/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	rad2deg = require( './../lib/deepset.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'deepset rad2deg', function tests() {

	it( 'should export a function', function test() {
		expect( rad2deg ).to.be.a( 'function' );
	});

	it( 'should convert radians to degrees and deep set', function test() {
		var data, expected;

		data = [
			{'x':0},
			{'x':Math.PI/4},
			{'x':Math.PI/2},
			{'x':3*Math.PI/4},
			{'x':Math.PI}
		];

		data = rad2deg( data, 'x' );
		expected = [
			{'x':0},
			{'x':45},
			{'x':90},
			{'x':135},
			{'x':180}
		];

		assert.deepEqual( data, expected );

		// Custom separator...
		data = [
			{'x':[9,0]},
			{'x':[9,Math.PI/4]},
			{'x':[9,Math.PI/2]},
			{'x':[9,3*Math.PI/4]},
			{'x':[9,Math.PI]}
		];

		data = rad2deg( data, 'x/1', '/' );
		expected = [
			{'x':[9,0]},
			{'x':[9,45]},
			{'x':[9,90]},
			{'x':[9,135]},
			{'x':[9,180]}
		];

		assert.deepEqual( data, expected, 'custom separator' );
	});

	it( 'should return an empty array if provided an empty array', function test() {
		assert.deepEqual( rad2deg( [], 'x' ), [] );
		assert.deepEqual( rad2deg( [], 'x', '/' ), [] );
	});

	it( 'should handle non-numeric values by setting the element to NaN', function test() {
		var data, actual, expected;

		data = [
			{'x':true},
			{'x':null},
			{'x':[]},
			{'x':{}}
		];
		actual = rad2deg( data, 'x' );

		expected = [
			{'x':NaN},
			{'x':NaN},
			{'x':NaN},
			{'x':NaN}
		];

		assert.deepEqual( data, expected );
	});

});
