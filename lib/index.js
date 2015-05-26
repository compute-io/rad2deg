'use strict';

// MODULES //

var isArray = require( 'validate.io-array' ),
	isNumber = require( 'validate.io-number' ),
	isBoolean = require( 'validate.io-boolean-primitive' ),
	isObject = require( 'validate.io-object' ),
	isFunction = require( 'validate.io-function' );

// RADIANS-TO-DEGREES //

/**
* FUNCTION: rad2deg( x[, copy] )
*	Converts radians to degrees. Note: if provided an array, the array is mutated.
*
* @param {Array|Number} x - value(s) to be converted to degrees
* @param {Object} [options] - function options
* @param {Function} [options.accessor] - accessor function for accessing numeric values
* @param {Boolean} [options.copy=true] - boolean indicating whether to return a new array
* @returns {Array|Number|Null} degree value(s). If `x` is an empty `array`, returns `null`.
*/
function rad2deg( x, opts ) {
	var len,
		out,
		copy = true,
		clbk,
		i;

	if ( !isArray( x ) && !isNumber( x ) ) {
		throw new TypeError( 'rad2deg()::invalid input argument. Must provide either a single numeric value or a numeric array. Value: `' + x + '`.' );
	}
	if ( arguments.length > 1 ) {
		if ( !isObject( opts ) ) {
			throw new TypeError( 'rad2deg()::invalid input argument. Options must be an object. Value: `' + opts + '`.' );
		}
		if ( opts.hasOwnProperty( 'accessor' ) ) {
			clbk = opts.accessor;
			if ( !isFunction( clbk ) ) {
				throw new TypeError( 'rad2deg()::invalid option. Accessor option must be a function. Value: `' + clbk + '`.' );
			}
		}
		if ( opts.hasOwnProperty( 'copy' ) ) {
			copy = opts.copy;
			if ( !isBoolean( copy ) ) {
				throw new TypeError( 'rad2deg()::invalid option. Copy option must be a boolean primitive. Value: `' + copy + '`.' );
			}
		}
	}
	if ( !isArray( x ) ) {
		return x * 180 / Math.PI;
	}

	if ( copy ) {
		out = x.slice();
	} else {
		out = x;
	}

	len = out.length;
	if ( !len ) {
		return null;
	}
	if ( clbk ) {
		for ( i = 0; i < len; i++ ) {
			out[ i ] = clbk( x[i], i ) * 180 / Math.PI;
		}
	} else {
		for ( i = 0; i < len; i++ ) {
			out[ i ] *= 180 / Math.PI;
		}
	}
	return out;
} // end FUNCTION rad2deg()


// EXPORTS //

module.exports = rad2deg;
