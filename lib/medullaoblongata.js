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
    open = require( 'open' ),
    speech = require( './brochasarea' ),
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
     * Burtbot's main task center
     * @type {Object}
     */
    tasks : {

        /**
         * handles grepping through files
         * @param  {Array} type array of parameters for task
         * @return {None}
         * @method find
         * @private
         */
        find : function ( params ) {

        },

        /**
         * responsible for all google requests
         * @param  {String} term the term to search for
         * @return {None}
         * @method google
         * @private
         */
        google : function ( term ) {
            open( 'https://google.com/search?q=' + term.toString().split( /\s+/ ).join( '+' ), function ( err ) {
                if ( err ) {

                    speech.inform( 'Whoops looks like something went wrong! How embarassing!' );
                    throw err;
                }
                speech.inform( 'I opened a window in your browser for you and Googled your question.' );
            });
        },

        /**
         * handles opening of files and web URLs
         * @param  {Array} params the params for the open function
         * @return {None}
         * @method open
         * @private
         */
        open : function ( params ) {
            var type = params[0];

            if ( type.toLowerCase() === 'file' ) {
                var re = /(?:\.([^.]+))?$/;
                var fileType = re.exec( params[1] );

                if ( fileType === 'exe' ) {

                    speech.ask( 'Are you sure you want to open that file? It appears to be an executable. (Y/n)', function ( answer ) {
                        if ( answer === 'Y' ) {

                            open( params[1], function ( err ) {
                                if ( err ) {

                                    speech.inform( 'Whoops looks like something went wrong! How embarassing!' );
                                    throw err;
                                }
                                speech.inform( 'Your executable has been opened.' );
                            }, null, true );
                        }
                    });
                } else {

                    open( params[1], function ( err ) {
                        if ( err ) {

                            speech.inform( 'Whoops looks like something went wrong! How embarassing!' );
                            throw err;
                        }

                        speech.inform( 'Your file has been opened.' );
                    });
                }
            } else if ( type.toLowerCase() === 'web' ) {
                var location = ( params[1].indexOf( 'http' ) > -1 ) ? location : 'http://' + params[1];
                open( location, function ( err ) {
                    if ( err ) {

                        speech.inform( 'Whoops looks like something went wrong! How embarassing!' );
                        throw err;
                    }

                    speech.inform( 'Your web page has been opened.' );
                });
            }
        },

        /**
         * handles getting word definitions from google
         * @param  {String} term the string of the word we want to define
         * @return {None}
         * @method define
         * @private
         */
        define : function ( term ) {

            open( 'https://www.google.com/search?q=define%3A+' + term.toString(), function ( err ) {
                if ( err ) {

                    speech.inform( 'Whoops looks like something went wrong! How embarassing!' );
                    throw err;
                }
                speech.inform( 'I opened a window in your browser for you and asked Google for the definition of ' + term + '.' );
            });
        },

        /**
         * handles all shell commands
         * @param  {String} command the command to run in child process
         * @return {None}
         * @method  shell
         * @private
         */
        shell : function ( command ) {
            speech.inform( 'Running your shell command now...' );
            exec( command, function ( err, stdout, stderr ) {
                if ( err ) {
                    speech.inform( 'Whoops looks like something went wrong! How embarassing!' );
                    throw err;
                }
                speech.inform( 'Shell command complete.' );
            });
        },

        /**
         * handles starting a local server for you
         * can use: node, python, ruby, or php
         * @param  {Array} params array of the settings for the sever
         * @return {None}
         * @method server
         * @private
         */
        server : function ( params ) {
            var lang = params[0],
                port = params[1] || 8000,
                env = params[2] || 'development';

            switch ( lang.toLowerCase() ) {
                case 'php':
                    speech.inform( 'PHP Server started at http://localhost:' + port + '. Press Crtl+C to quit.' );
                    exec( 'php -S localhost:' + port, function ( err, stdout, stderr ) {
                        if ( err ) {
                            speech.inform( 'Whoops looks like something went wrong! How embarassing!' );
                            throw err;
                        }
                    });
                break;
                case 'python':
                    speech.inform( 'Python Server started at http://localhost:' + port + '. Press Crtl+C to quit.' );
                    exec( 'python -m SimpleHTTPServer ' + port, function ( err, stdout, stderr ) {
                        if ( err ) {
                            speech.inform( 'Whoops looks like something went wrong! How embarassing!' );
                            throw err;
                        }
                    });
                break;
                case 'node':
                    speech.inform( 'Node Server started at http://localhost:' + port + '. Press Crtl+C to quit.' );
                    exec( 'node ./node_modules/http-server/bin/http-server -p ' + port + ' -e ' + env, function ( err, stdout, stderr ) {
                        if ( err ) {
                            speech.inform( 'Whoops looks like something went wrong! How embarassing!' );
                            throw err;
                        }
                    });
                break;
                case 'ruby':
                    speech.inform( 'Rails Server started at http://localhost:' + port + '. Press Crtl+C to quit.' );
                    exec( 'rails server -p ' + port + ' -e ' + env, function ( err, stdout, stderr ) {
                        if ( err ) {
                            speech.inform( 'Whoops looks like something went wrong! How embarassing!' );
                            throw err;
                        }
                    });
                break;
            }
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

    /**
     * gets all the tasks Burtbot knows and returns an array of their names
     * @return {Array} the names of all registered tasks
     */
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