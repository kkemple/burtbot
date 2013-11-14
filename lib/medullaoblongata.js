/**
 * This file is responsible for Burtbot's mundane task handling like finding things in the directory
 *
 * burtbot
 * https://github.com/kkemple/burtbot
 *
 * Copyright (c) 2013 Kurtis Kemple
 * Licensed under the MIT license.
 */
'use strict';

var bower = require( 'bower' ),
	exec = require( 'child_process' ).exec,
	MedullaOblongata;

MedullaOblongata = {
	find: function ( file ) {

	},

	/**
	 * returns a puncuation free single spaced string that can be tokenized
	 * @param  {String} text the string to wash
	 * @return {String}      the washed string
	 */
	washText: function ( text ) {
		text = text
				.replace( /^\s+/, '' )
				.replace( /\s+$/, '' )
				.replace( /[^\d\w\s]/g, '' )
				.replace( / {2,}/g,' ');

		return text;
	}
};

module.exports = MedullaOblongata;