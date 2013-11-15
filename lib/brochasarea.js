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

var BrochasArea;

BrochasArea =  {

    inform : function ( message ) {
        console.log( '\n' + message + '\n' );
    },
    /*
    this.ask = function ( question, handleResponse, scope, close ) {

        // set scope for our callback
        scope = scope || null;

        // ask the humans a question
        rl.question( question, function ( answer ) {
            handleResponse.call( scope, answer );
            rl.pause();
        });
    }
    */
   ask : function ( question, callback, scope ) {
    var stdin = process.stdin, stdout = process.stdout;
    scope = scope || null;

    stdin.resume();
    stdout.write( question + ": " );

    stdin.once('data', function( data ) {
        data = data.toString().trim();
        callback.call( scope, data );
    });
   },
   endConvo : function () {
        process.exit();
   }
};

module.exports = BrochasArea;