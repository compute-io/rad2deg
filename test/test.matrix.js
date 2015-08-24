/* global describe, it, require, beforeEach */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Matrix data structure:
	matrix = require( 'dstructs-matrix' ),

	// Module to be tested:
	rad2deg = require( './../lib/matrix.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'matrix rad2deg', function tests() {

	var out,
		mat,
		d1,
		d2,
		i;

	d1 = new Int16Array( 25 );
	d2 = new Int16Array( 25 );
	for ( i = 0; i < d1.length; i++ ) {
		d1[ i ] = Math.random() * ( 2 * Math.PI );
		d2[ i ] = d1[ i ] * 180 / Math.PI;
	}

	beforeEach( function before() {
		mat = matrix( d1, [5,5], 'int16' );
		out = matrix( d2, [5,5], 'int16' );
	});

	it( 'should export a function', function test() {
		expect( rad2deg ).to.be.a( 'function' );
	});

	it( 'should throw an error if provided unequal length matrices', function test() {
		expect( badValues ).to.throw( Error );
		function badValues() {
			rad2deg( matrix( [10,10] ), mat );
		}
	});

	it( 'should conert radians to degrees for each matrix element', function test() {
		var actual;

		actual = matrix( [5,5], 'int16' );
		actual = rad2deg( actual, mat );

		assert.deepEqual( actual.data, out.data );
	});

	it( 'should return an empty matrix if provided an empty matrix', function test() {
		var out, mat, expected;

		out = matrix( [0,0] );
		expected = matrix( [0,0] ).data;

		mat = matrix( [0,10] );
		assert.deepEqual( rad2deg( out, mat ).data, expected );

		mat = matrix( [10,0] );
		assert.deepEqual( rad2deg( out, mat ).data, expected );

		mat = matrix( [0,0] );
		assert.deepEqual( rad2deg( out, mat ).data, expected );
	});

});
