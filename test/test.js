/* global require, describe, it */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

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

	it( 'should throw an error if not provided an array or numeric value', function test(){
		var values = [
			'5',
			true,
			undefined,
			null,
			NaN,
			function(){},
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				rad2deg( value  );
			};
		}
	});


	it( 'should throw an error if `options` is not an object', function test() {
		var values = [
			'5',
			5,
			true,
			undefined,
			null,
			NaN,
			[],
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[ i ] ) ).to.throw( TypeError );
		}

		function badValue( value ) {
			return function() {
				rad2deg( [1,2,3,4,5], value );
			};
		}
	});

	it( 'should throw an error if provided an accessor which is not a function', function test() {
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
			expect( badValue( values[ i ] ) ).to.throw( TypeError );
		}

		function badValue( value ) {
			return function() {
				rad2deg( [1,2,3,4,5], {'accessor': value} );
			};
		}
	});

	it( 'should throw an error if provided a copy option which is not a boolean', function test() {
		var values = [
			'5',
			5,
			function(){},
			undefined,
			null,
			NaN,
			[],
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[ i ] ) ).to.throw( TypeError );
		}

		function badValue( value ) {
			return function() {
				rad2deg( [1,2,3,4,5], {'copy': value} );
			};
		}
	});

	it( 'should convert degrees to radians', function test() {
		var actual;

		actual = rad2deg( Math.PI/2 );
		assert.closeTo( actual, 90, 1e-10 );

		actual = rad2deg( Math.PI/6 );
		assert.closeTo( actual, 30, 1e-10 );

		actual = rad2deg( -3*Math.PI/2 );
		assert.closeTo( actual, -270, 1e-10 );
	});

	it( 'should convert all values mutating input array', function test() {
		var data, actual, expected;

		data = [ 0, Math.PI/4, Math.PI/2, 3*Math.PI/4, Math.PI ];
		expected = [ 0, 45, 90, 135, 180 ];

		actual = rad2deg( data, {'copy':false} );

		for ( var i = 0; i < data.length; i++ ) {
			assert.closeTo( data[i], expected[i], 1e-10 );
		}
		assert.ok( actual === data );
	});

	it( 'should convert all values without mutating input array', function test() {
		var data, actual, expected;

		data = [ 0, Math.PI/4, Math.PI/2, 3*Math.PI/4, Math.PI ];
		expected = [ 0, 45, 90, 135, 180 ];

		actual = rad2deg( data );

		for ( var i = 0; i < data.length; i++ ) {
			assert.closeTo( actual[i], expected[i], 1e-10 );
		}
		assert.ok( actual !== data );
	});

	it( 'should convert all values using accessor function mutating input array', function test() {
		var data, actual, expected;

		data = [
			{'x':0},
			{'x':Math.PI/4},
			{'x':Math.PI/2},
			{'x':3*Math.PI/4},
			{'x':Math.PI }
		];
		expected = [ 0, 45, 90, 135, 180 ];

		actual = rad2deg( data, {
			'copy': false,
			'accessor': getValue
		});

		for ( var i = 0; i < data.length; i++ ) {
			assert.closeTo( data[i], expected[i], 1e-10 );
		}
		assert.ok( actual === data );

		function getValue( d ) {
			return d.x;
		}
	});

	it( 'should convert all values using accessor function without mutating input array', function test() {
		var data, actual, expected;

		data = [
			{'x':0},
			{'x':Math.PI/4},
			{'x':Math.PI/2},
			{'x':3*Math.PI/4},
			{'x':Math.PI }
		];
		expected = [ 0, 45, 90, 135, 180 ];

		actual = rad2deg( data, {
			'accessor': getValue
		});

		for ( var i = 0; i < data.length; i++ ) {
			assert.closeTo( actual[i], expected[i], 1e-10 );
		}
		assert.ok( actual !== data );

		function getValue( d ) {
			return d.x;
		}
	});

	it( 'should return `null` is provided an empty array', function test() {
		assert.isNull( rad2deg( [] ) );
	});

});
