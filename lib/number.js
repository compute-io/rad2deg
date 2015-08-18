'use strict';

/**
* FUNCTION rad2deg( x )
*	Converts radian to degrees.
*
* @param {Number} x - value to be converted to degrees
* @returns {Number} degree value
*/
function rad2deg( x ) {
	return x * 180 / Math.PI;
} // end FUNCTION rad2deg()


// EXPORTS //

module.exports = rad2deg;
