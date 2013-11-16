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
        speech.inform( burt.join( '\n' ) );
        speech.inform( '\n' );
    },

    /**
     * handles letting humans know how to interact with Burtbot
     * @return {None}
     */
    showIntroduction : function () {

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
    },

    /**
     * gets all the tasks Burtbot knows and returns an array of their names
     * @return {Array} the names of all registered tasks
     */
    listTasks : function () {
        var arr = [];

        for ( var key in this.tasks ) {
            if ( this.tasks.hasOwnProperty( key ) ) {
                Array.prototype.push.call( arr, key );
            }
        }
        return arr;
    },

   getTasks : function ( path ) {

        var obj = {};

        fs.readdirSync( path ).forEach( function ( file ) {
            //console.log( __path.basename( file, '.js' ) );

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

MedullaOblongata.getTasks( process.cwd() + '/lib/tasks' );

module.exports = MedullaOblongata;