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
    exec = require( 'child_process' ).exec,
    fs = require( 'fs' ),
    http = require( 'http' ),
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
        speech.inform( burt.join( '\n' ) );
        speech.inform( '\n' );
    },

    tasks : {
        find : function ( type, term ) {

        },

        google : function ( term ) {
            open( 'https://google.com/search?q=' + term[0].split( /\s+/ ).join( '+' ), function ( err ) {
                if ( err ) {

                    speech.inform( 'Whoops looks like something went wrong! How embarassing!' );
                    throw err;
                }
                speech.inform( 'I opened a window in your browser for you and Googled your question.' );
            });
        },

        open : function ( file ) {
            var type = file[0];

            if ( type.toLowerCase() === 'file' ) {
                var re = /(?:\.([^.]+))?$/;
                var fileType = re.exec( file[1] );

                if ( fileType === 'exe' ) {

                    speech.ask( 'Are you sure you want to open that file? It appears to be an executable. (Y/n)', function ( answer ) {
                        if ( answer === 'Y' ) {

                            open( file[1], function ( err ) {
                                if ( err ) {

                                    speech.inform( 'Whoops looks like something went wrong! How embarassing!' );
                                    throw err;
                                }
                                speech.inform( 'Your executable has been opened.' );
                            }, null, true );
                        }
                    });
                } else {

                    open( file[1], function ( err ) {
                        if ( err ) {

                            speech.inform( 'Whoops looks like something went wrong! How embarassing!' );
                            throw err;
                        }

                        speech.inform( 'Your file has been opened.' );
                    });
                }
            } else if ( type.toLowerCase() === 'web' ) {
                var location = ( file[1].indexOf( 'http' ) > -1 ) ? location : 'http://' + file[1];
                open( location, function ( err ) {
                    if ( err ) {

                        speech.inform( 'Whoops looks like something went wrong! How embarassing!' );
                        throw err;
                    }

                    speech.inform( 'Your web page has been opened.' );
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
    },

    getTasks : function () {
        var arr = [];

        for ( var key in this.tasks ) {
            if ( this.tasks.hasOwnProperty( key ) ) {
                Array.prototype.push.call( arr, key );
            }
        }
        return arr;
    }
};

module.exports = MedullaOblongata;