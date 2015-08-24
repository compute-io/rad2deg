'use strict';

// FUNCTIONS //

var RAD2DEG = require( './number.js' ),
	matrixfun = require( 'compute-matrix-function' );


// RADIANS-TO-DEGREES //

/**
* FUNCTION: rad2deg( out, x )
*	Converts radians to degrees element-wise.
*
* @param {Matrix} out - output matrix
* @param {Matrix} x - input matrix
* @returns {Matrix} output matrix
*/
var rad2deg = matrixfun.create( RAD2DEG, 1 );


// EXPORTS //

module.exports = rad2deg;
