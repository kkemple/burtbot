#! /usr/bin/env node

/**
 * burtbot
 * https://github.com/kkemple/burtbot
 *
 * Copyright (c) 2013 Kurtis Kemple
 * Licensed under the MIT license.
 */

'use strict';
var reason = require( './neocortex' ),
    mundane = require( './medullaoblongata' ),
    input = process.argv.slice( 2 );

// if there are no arguments then introduce Burtbot
if ( input.length === 0 ) {

    mundane.drawBurtbot();
    mundane.showIntroduction();
} else {

    // otherwise process the human's input
    reason.processInput( input );
}

