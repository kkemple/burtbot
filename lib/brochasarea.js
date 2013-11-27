/**
 * This file is responsible for Burtbot's speech abilities
 *
 * burtbot
 * https://github.com/kkemple/burtbot
 *
 * Copyright (c) 2013 Kurtis Kemple
 * Licensed under the MIT license.
 */

var BrochasArea;

(function () {
	
	'use strict';
	
	BrochasArea =  {
	
		/**
		 * handles relaying statements to the humans
		 * @param  {String} message the message to relay
		 * @return {None}
		 * @method inform
		 */
		inform : function ( message ) {
			console.log( '\n' + message + '\n' );
		},
	
		/**
		 * handles interaction with humans
		 * @param  {String}   question the question to present to the human
		 * @param  {Function} callback the function to execute when we have human response
		 * @param  {Object}   scope    the scope in which to execute callback
		 * @return {None}
		 * @method ask
		 */
		ask : function ( question, scope, callback ) {
			var stdin = process.stdin, stdout = process.stdout;
			scope = scope || null;
	
			stdin.resume();
			stdout.write( question + ": " );
	
			stdin.once( 'data', function( data ) {
				data = data.toString().trim();
				callback.call( scope, data );
			});
		},
	
		/**
		 * handles closing interaction with humans gracefully
		 * @return {None}
		 * @method endConvo
		 */
		endConvo : function () {
			process.exit();
		}
	};
	
}());

module.exports = BrochasArea;
