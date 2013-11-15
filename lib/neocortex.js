/**
 * This file is responsible for Burtbot's reasoning abilities
 *
 * burtbot
 * https://github.com/kkemple/burtbot
 *
 * Copyright (c) 2013 Kurtis Kemple
 * Licensed under the MIT license.
 */

'use strict';

var mundane = require( './medullaoblongata' ),
	speech = require( './brochasarea' ),
	shortterm = require( './memory' );

var NeoCortex, rl;

NeoCortex = {
	processInput: function ( input ) {
		var task = input.splice( 0, 1 );
		if ( task.indexOf( '?' ) > -1 ) {

			this.respondToQuestion( task );
		} else {
			if ( mundane && mundane.tasks[ task ] ) {

				speech.inform( 'Working on your request, just a sec...' );
				mundane.tasks[ task ]( input );
			} else {

				speech.inform( 'Sorry, but I don\'t recognize that task, did you mean to ask a question?\nIf so, make sure to wrap your phrase in quotes and include a question mark.' );
			}
		}
	},

	respondToQuestion: function ( input ) {

		// let the human know we are working
		speech.inform( 'Let me see if I have an answer for you...' );

		// clean out any extra spaces and puncuation from the input
		input = mundane.washText( input );

		if ( false ) {
			speech.inform( 'Looks like I found something, let me put together a response for you...' );

		} else {

			speech.ask( 'I don\'t seem to remember you asking that before, would you like me to Google it, or would you prefer to teach me this? ( Google / Teach )', function ( answer ) {

				switch ( answer ) {

					case 'Google':
						mundane.tasks.google( input );
					break;
					case 'Teach':
						rl.close();
					break;
					default:
						speech.inform( 'Sorry I don\'t understand your response.' );
					break;
				}
			});
		}
	}
};

module.exports = NeoCortex;