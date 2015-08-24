'use strict';

// FUNCTIONS //

var RAD2DEG = require( './number.js' ),
	arrayfun = require( 'compute-typed-array-function' );


// RADIANS-TO-DEGREES //

/**
* FUNCTION: rad2deg( out, arr )
*	Converts radians to degrees element-wise.
*
* @param {Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} out - output array
* @param {Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} arr - input array
* @returns {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} output array
*/
var rad2deg = arrayfun.create( RAD2DEG, 1 );


// EXPORTS //

module.exports = rad2deg;
