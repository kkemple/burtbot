/**
 * This file is responsible for Burtbot's reasoning abilities
 *
 * burtbot
 * https://github.com/kkemple/burtbot
 *
 * Copyright (c) 2013 Kurtis Kemple
 * Licensed under the MIT license.
 */

'use strict';

var mundane = require( './medullaoblongata' ),
    speech = require( './brochasarea' ),
    shortterm = require( './memory' ),
    fs = require( 'fs' ),
    NeoCortex;

NeoCortex = {

    // parse human data in to burtbot compatible data
    processInput: function ( input ) {
        var task = input.splice( 0, 1 );

        // check the memory banks for previous human interaction
        if ( shortterm[ task ] ) {

            speech.inform( shortterm[ task ].response );

            if ( mundane.tasks[ shortterm[ task ].task ] ) {

                mundane.tasks[ shortterm[ task ].task ]( shortterm[task].params )
            }

        // make sure the task is registered, otherwise inform the human they may have errored
        } else if ( mundane && mundane.tasks[ task ] ) {

            speech.inform( 'Working on your request, just a sec...' );
            mundane.tasks[ task ]( input );

        // the human must want to ask us to look something up or learn something
        } else if ( task[0].split( ' ' ).length > 1 ) {

            this.respondToQuestion( task[0] );
        } else {

            speech.inform( 'Sorry, but I don\'t recognize that task, did you mean to ask a question?\nIf so, make sure to wrap your phrase in quotes and include a question mark.' );
        }
    },

    respondToQuestion: function ( input ) {

        // let the human know we are working
        speech.inform( 'Let me see if I have an answer for you...' );

        // clean out any extra spaces and puncuation from the input
        this.input = mundane.washText( input );

        speech.ask( 'I don\'t seem to remember you asking that before, would you like me to Google it, or would you prefer to teach me this? ( Google / Teach )', function ( answer ) {

            switch ( answer.toLowerCase() ) {

                case 'google':
                    mundane.tasks.google( input );
                    speech.endConvo();
                break;
                case 'teach':
                    speech.inform( 'Great! I love to learn! Let\'s get started.' );
                    shortterm[input] = {};
                    this.learn( shortterm[input] );
                break;
                default:
                    speech.inform( 'Sorry I don\'t understand your response.' );
                    speech.endConvo();
                break;
            }
        }, this);
    },

    learn : function ( mem ) {
        speech.ask( 'How should I respond to this input?', function ( answer ) {

            mem.response = answer;

            this.getTaskInformation( mem );
        }, this);
    },

    getTaskInformation : function( mem ) {
        speech.ask( 'Will this phrase correspond to a task? (Y/n)', function ( answer ) {

            if ( answer.toLowerCase() === 'y' ) {
                this.addTaskToMem( mem );

            } else {

                speech.inform( 'Okay, got it! Give me a minute to study this so I don\'t forget it.' );
                this.commitMemories();
                speech.endConvo();
            }
        }, this);
    },

    addTaskToMem : function ( mem ) {
        var question = 'Which task is this in relation to? Please choose one. (' + mundane.getTasks().join( '/' ) + ')';
        speech.ask( question, function ( answer ) {

            mem.task = answer;

            var question = 'Okay got it, this phrase relates to the ' + answer + ' task. Is this correct? (y/N)';
            speech.ask( question, function ( answer ) {

                if ( answer.toLowerCase() === 'y' ) {

                    speech.ask( 'Does this particular task have any paramaters? (Y/n)', function ( answer ) {
                        if ( answer.toLowerCase() === 'y' ) {

                            this.addTaskParam( mem );
                        } else {

                            speech.inform( 'Okay, got it! Give me a minute to study this so I don\'t forget it.' );
                            this.commitMemories();
                            speech.endConvo();
                        }
                    }, this);
                } else {

                    speech.inform( 'Whoops, let\'s try that again?' );
                    this.addTaskToMem( mem );
                }
            }, this);
        }, this);
    },

    addTaskParam : function ( mem ) {
        speech.ask( 'Please enter a parameter for ' + mem.task, function ( answer ) {

            var param = answer;
            speech.ask( 'You entered: "' + answer + '", is that correct? (y/N)', function ( answer ) {

                if ( answer.toLowerCase() === 'y' ) {

                    mem.params = mem.params || [];
                    mem.params.push( param );

                    speech.ask( 'Okay, your parameter was added, would you like to add another? (Y/n)', function ( answer ) {

                        if ( answer.toLowerCase() === 'y' ) {

                            this.addTaskParam( mem );
                        } else {

                            speech.inform( 'Okay, got it! Give me a minute to study this so I don\'t forget it.' );
                            this.commitMemories();
                            speech.endConvo();
                        }
                    }, this);
                } else {


                }
            }, this);
        }, this);
    },

    commitMemories : function () {
        var memories;
        try {
        	memories = JSON.stringify( shortterm, null, 4 );
        } catch ( e ) {
            speech.inform( 'Whoops looks like something went wrong! How embarassing!' );
        	console.log( e );
        }

        try {
        	fs.writeFileSync( './lib/memory.json', memories, 'utf8' );
        } catch ( e ) {
        	speech.inform( 'Whoops looks like something went wrong! How embarassing!' );
        	console.log( e );
        }

        speech.inform( 'I think I got it! If you would like to test my skills, just respond to me with the new phase.' );
    }
};

module.exports = NeoCortex;