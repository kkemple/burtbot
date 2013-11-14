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

BrochasArea = {
	inform: function ( message ) {
		console.log( '\n' + message + '\n' );
	}
};

module.exports = BrochasArea;