/**
*
*	COMPUTE: rad2deg
*
*
*	DESCRIPTION:
*		- Converts radians to degrees.
*
*
*	NOTES:
*		[1]
*
*
*	TODO:
*		[1]
*
*
*	LICENSE:
*		MIT
*
*	Copyright (c) 2014. Athan Reines.
*
*
*	AUTHOR:
*		Athan Reines. kgryte@gmail.com. 2014.
*
*/

'use strict';

// RADIANS-TO-DEGREES //

/**
* FUNCTION: rad2deg( x )
*	Converts radians to degrees. Note: if provided an array, the array is mutated.
*
* @param {Array|Number} x - value(s) to be converted to degrees
* @returns {Array|Number|Null} degree value(s). If `x` is an empty `array`, returns `null`.
*/
function rad2deg( x ) {
	var isArray = Array.isArray( x ),
		len;
	if ( !isArray && ( typeof x !== 'number' || x !== x ) ) {
		throw new TypeError( 'rad2deg()::invalid input argument. Must provide either a single numeric value or a numeric array.' );
	}
	if ( !isArray ) {
		return x * 180 / Math.PI;
	}
	len = x.length;
	if ( !len ) {
		return null;
	}
	for ( var i = 0; i < len; i++ ) {
		x[ i ] *= 180 / Math.PI;
	}
	return x;
} // end FUNCTION rad2deg()


// EXPORTS //

module.exports = rad2deg;
