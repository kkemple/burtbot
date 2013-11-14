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
	shortterm = require( './memory' ),
	open = require( 'open' ),
	readline = require( 'readline' );

var NeoCortex, rl;

// set up our interface to communicate with the humans
rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

NeoCortex = {
	processInput: function ( input ) {
		var task = input[0];
		if ( typeof task === 'string' ) {

			this.respondToQuestion( task );
		}
	},

	respondToQuestion: function ( input ) {

		// let the human know we are working
		speech.inform( 'Let me see if I have an answer for you...' );

		// clean out any extra spaces and puncuation from the input
		input = mundane.washText( input );

		if ( shortterm.inputs[ input ] ) {

			speech.inform( 'Looks like I found something, let me put together a response for you...' );
		} else {

			rl.question( 'I don\'t seem to remember you asking that before, would you like me to Google it, or would you prefer to teach me this? ( Google / Teach )', function ( answer ) {

				switch ( answer ) {

					case 'Google':
						open( 'http://google.com/search?q=' + input.split( /\s+/ ).join( '+' ), function ( err ) {
							if ( err ) {

								speech.inform( 'Whoops looks like something went wrong! How embarassing!' );
								throw err;
							}
							speech.inform( 'I opened a window in your browser for you and Googled your input.' );
							rl.close();
						});
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