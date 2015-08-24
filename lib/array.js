'use strict';

// MODULES //

var RAD2DEG = require( './number.js' );


// RADIANS-TO-DEGREES //

/**
* FUNCTION: rad2deg( out, arr )
*	Converts radians to degrees element-wise.
*
* @param {Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} out - output array
* @param {Array} arr - input array
* @returns {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} output array
*/
function rad2deg( out, arr ) {
	var len = arr.length,
		i;
	for ( i = 0; i < len; i++ ) {
		if ( typeof arr[ i ] === 'number' ) {
			out[ i ] = RAD2DEG( arr[ i ] );
		} else {
			out[ i ] = NaN;
		}
	}
	return out;
} // end FUNCTION rad2deg()


// EXPORTS //

module.exports = rad2deg;
