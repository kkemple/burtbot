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
	input = process.argv.slice( 2 );


reason.processInput( input );

