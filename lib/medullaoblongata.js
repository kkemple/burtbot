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
	open = require( 'open' ),
	speech = require( './brochasarea' ),
	MedullaOblongata;

MedullaOblongata = {
	drawBurtbot : function () {
		var burt;
		burt = [
		'           _____             ',
		'          |     |            ',
		'          | | | |            ',
		'          |_____|            ',
		'    ____ ___|_|___ ____      ',
		'   ()___)         ()___)     ',
		'   // /|           |\ \\\\     ',
		'  // / |           | \ \\\\    ',
		' (___) |___________| (___)   ',
		' (___)   (_______)   (___)   ',
		' (___)     (___)     (___)   ',
		' (___)      |_|      (___)   ',
		' (___)  ___/___\\___   | |    ',
		'  | |  |           |  | |    ',
		'  | |  |___________| /___\\   ',
		' /___\\  |||     ||| //   \\\\  ',
		'//   \\\\ |||     ||| \\\\   //  ',
		'\\\\   // |||     |||  \\\\ //   ',
		' \\\\ // ()__)   (__()         ',
		'       ///       \\\\\\         ',
		'      ///         \\\\\\        ',
		'    _///___     ___\\\\\\_      ',
		'   |_______|   |_______|     '
		];
		console.log( burt.join( '\n' ) );
	},

	tasks : {
		find : function ( type, term ) {

		},

		google : function ( term ) {
			open( 'https://google.com/search?q=' + term.split( /\s+/ ).join( '+' ), function ( err ) {
				if ( err ) {

					speech.inform( 'Whoops looks like something went wrong! How embarassing!' );
					throw err;
				}
				speech.inform( 'I opened a window in your browser for you and Googled your question.' );
			});
		},

		open : function ( file ) {
			var re = /(?:\.([^.]+))?$/;
			var fileType = re.exec( file[0] );

			if ( fileType === 'exe' ) {

				speech.ask( 'Are you sure you want to open that file? It appears to be an executable. (Y/n)', function ( answer ) {
					if ( answer === 'Y' ) {

						open( file[ 0 ], function ( err ) {
							if ( err ) {

								speech.inform( 'Whoops looks like something went wrong! How embarassing!' );
								throw err;
							}
							speech.inform( 'Your executable has been opened.' );
						});
					}
				});
			} else {

				open( file[0], function ( err ) {
					if ( err ) {

						speech.inform( 'Whoops looks like something went wrong! How embarassing!' );
						throw err;
					}
					if ( file[0].indexOf( 'http' ) > -1 ) {
						speech.inform( 'Your web page has been opened.' );
					} else {
						speech.inform( 'Your file has been opened.' );
					}
				});
			}
		},

		get : function ( resource ) {

		},

		define : function ( term ) {

			open( 'https://www.google.com/search?q=define%3A+' + term[0], function ( err ) {
				if ( err ) {

					speech.inform( 'Whoops looks like something went wrong! How embarassing!' );
					throw err;
				}
				speech.inform( 'I opened a window in your browser for you and asked Google for the definition of ' + term + '.' );
			});
		}
	},

	/**
	 * returns a puncuation free single spaced string that can be tokenized
	 * @param  {String} text the string to wash
	 * @return {String}      the washed string
	 */
	washText : function ( text ) {
		text = text
			.replace( /^\s+/, '' )
			.replace( /\s+$/, '' )
			.replace( /[^\d\w\s]/g, '' )
			.replace( / {2,}/g,' ');

		return text;
	}
};

module.exports = MedullaOblongata;