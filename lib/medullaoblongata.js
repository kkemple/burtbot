/**
 * This file is responsible for Burtbot's mundane task handling like finding things in a directory
 * or opening a file for web page
 *
 * burtbot
 * https://github.com/kkemple/burtbot
 *
 * Copyright (c) 2013 Kurtis Kemple
 * Licensed under the MIT license.
 */

var fs = require( 'fs' ),
    _path = require( 'path' ),
    speech = require( './brochasarea' ),
    MedullaOblongata;

(function () {
	
	'use strict';
	
	MedullaOblongata = {
	
		/**
		 * returns a puncuation free single spaced string that can be tokenized
		 * @param  {String} text the string to wash
		 * @return {String}      the washed string
		 * @method washtext
		 */
		washText : function ( text ) {
			text = text
				.toString()
				.trim()
				.replace( /[^\d\w\s]/g, '' )
				.replace( / {2,}/g,' ');
	
			return text;
		},
	
		/**
		 * gets all the tasks Burtbot knows and returns an array of their names
		 * @return {Array} the names of all registered tasks
		 * @method listTasks
		 */
		listTasks : function () {
			var arr = [], key;
	
			for ( key in this.tasks ) {
				if ( this.tasks.hasOwnProperty( key ) ) {
					Array.prototype.push.call( arr, key );
				}
			}
			return arr;
		},
	
		/**
		 * adds all available tasks to the MedullaOblongata.tasks object
		 * @param {String} path the path to the directory of the tasks
		 * @return {None}
		 * @method getTasks
		 */
		getTasks : function ( path ) {
		
			var obj = {};
		
			fs.readdirSync( path ).forEach( function ( file ) {
				var newPath = path + '/' + file;
				var stat = fs.statSync( newPath );
		
				if ( stat.isFile() ) {
		
					if ( /(.*)\.(js)/.test( file ) ) {
		
						obj = require( newPath );
						MedullaOblongata.tasks[ _path.basename( file, '.js' ) ] = obj[ _path.basename( file, '.js' ) ];
					}
				} else if ( stat.isDirectory() ) {
		
					this.getTasks( newPath );
				}
			});
		},
		
		/*
		 * this property is set before we return the MedullaOblongata to the NeoCortex by the get tasks method
		 * @property {Object} tasks holds the tasks loaded by getTasks method
		 */
		tasks : {}
	};
	
	MedullaOblongata.getTasks( __dirname + '/tasks' );
	
}());

module.exports = MedullaOblongata;