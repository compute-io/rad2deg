'use strict';

var rad2deg = require( './../lib' );

// Simulate some data...
var data = new Array( 100 );

var twopi = 2*Math.PI;
for ( var i = 0; i < data.length; i++ ) {
	data[ i ] = Math.random()*twopi;
}

rad2deg( data );

console.log( data.join( '\n' ) );
