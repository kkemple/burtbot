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
	open = require( 'open' );

var NeoCortex;

NeoCortex = {
	processInput: function ( input, fn ) {
		var task = input[0];
		if ( typeof task === 'string' ) {

			this.respondToQuestion( task, fn );
		}
	},

	respondToQuestion: function ( question, fn ) {
		speech.inform( '\nLet me see if I have an answer for you...' );

		open( 'http://google.com/search?q=' + question.split( /\s+/ ).join( '+' ), function ( err ) {
			if ( err ) {
				speech.inform( '\nWhoops looks like something went wrong! How embarassing!\n' );
				throw err;
			}
			speech.inform( 'Looks like I found something, I opened a window in your browser for you.' );
		});
	}
};

module.exports = NeoCortex;