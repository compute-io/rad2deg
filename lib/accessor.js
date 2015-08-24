'use strict';

// MODULES //

var RAD2DEG = require( './number.js' );


// RADIANS-TO-DEGREES //

/**
* FUNCTION: rad2deg( out, arr, accessor )
*	Converts radians to degrees element-wise using an accessor function.
*
* @param {Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} out - output array
* @param {Array} arr - input array
* @param {Function} accessor - accessor function for accessing array values
* @returns {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} output array
*/
function rad2deg( out, arr, clbk ) {
	var len = arr.length,
		v, i;
	for ( i = 0; i < len; i++ ) {
		v = clbk( arr[ i ], i );
		if ( typeof v === 'number' ) {
			out[ i ] = RAD2DEG( v );
		} else {
			out[ i ] = NaN;
		}
	}
	return out;
} // end FUNCTION rad2deg()


// EXPORTS //

module.exports = rad2deg;
