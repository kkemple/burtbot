/**
 * This file is responsible for Burtbot's speech abilities
 *
 * burtbot
 * https://github.com/kkemple/burtbot
 *
 * Copyright (c) 2013 Kurtis Kemple
 * Licensed under the MIT license.
 */

'use strict';

var  readline = require( 'readline' ),
       BrochasArea,
       rl;

BrochasArea = {
    inform: function ( message ) {
        console.log( '\n' + message + '\n' );
    },

    ask: function ( question, handleResponse, scope, close ) {

        // set scope for our callback
        scope = scope || null;

        // set up our interface to communicate with the humans
        rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        // ask the humans a question
        rl.question( question, function ( answer ) {
            handleResponse.call( scope, answer );
            if ( close ) {
                rl.close();
            }
        });
    }
};

module.exports = BrochasArea;