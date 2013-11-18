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
'use strict';

var bower = require( 'bower' ),
    fs = require( 'fs' ),
    speech = require( './brochasarea' ),
    __path = require( 'path' ),
    MedullaOblongata;


MedullaOblongata = {

    /**
     * handles displaying Burtbot to the user
     * @return {None}
     * @method drawBurtbot
     * @private
     */
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
        return burt.join( '\n' );
    },

    /**
     * handles letting humans know how to interact with Burtbot
     * @return {None}
     */
    showIntroduction : function () {
       return 'Hello! I\'m Burtbot, but you can call me burt for short if you would like.\nI can run tasks for you, or if you prefer to not enter the same mundane commands again and again, you can teach me to run them for you.\nIf you would like to view my documention, head over to https://github.com/kkemple/burtbot.\nThere is tons of information for you.\nAlso, not only can you teach me to run tasks for you but my task memory can be expanded, making me even more helpful.';
    },

    /**
     * returns a puncuation free single spaced string that can be tokenized
     * @param  {String} text the string to wash
     * @return {String}      the washed string
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
     */
    listTasks : function () {
        var arr = [],
              key;

        for ( key in this.tasks ) {
            if ( this.tasks.hasOwnProperty( key ) ) {
                Array.prototype.push.call( arr, key );
            }
        }
        return arr;
    },

   getTasks : function ( path ) {

        var obj = {};

        fs.readdirSync( path ).forEach( function ( file ) {
            var newPath = path + '/' + file;
            var stat = fs.statSync( newPath );

            if ( stat.isFile() ) {

                if ( /(.*)\.(js)/.test( file ) ) {

                    obj = require( newPath );
                    MedullaOblongata.tasks[ __path.basename( file, '.js' ) ] = obj[ __path.basename( file, '.js' ) ];
                }
            } else if ( stat.isDirectory() ) {

                this.getTasks( newPath );
            }
        });
    },

    // this property is set before we return the MedullaOblongata to the NeoCortex
    tasks : {}
};

MedullaOblongata.getTasks( __dirname + '/tasks' );

module.exports = MedullaOblongata;