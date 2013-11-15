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

    /**
     * handles any request that is not a mundane task or a learned task
     * @param  {String} input the string we will use to google or learn a task for
     * @return {None}
     * @method  respondToQuestion
     * @private
     */
    respondToQuestion: function ( input ) {

        // let the human know we are working
        speech.inform( 'Let me see if I have an answer for you...' );

        // clean out any extra spaces and puncuation from the input
        input = mundane.washText( input );

        // inform the human burtbot does not recognize the command/question
        speech.ask( 'I don\'t seem to remember you asking that before, would you like me to Google it, or would you prefer to teach me this? ( Google / Teach )', function ( answer ) {

            // if google then google it, else teach me how to handle the command
            switch ( answer.toLowerCase() ) {

                case 'google':
                    // need to better prep this
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

    /**
     * starts the learning process for a task for Burtbot
     * @param  {Object} mem the new memory object to commit to long-term memory
     * @return {None}
     * @method learn
     * @private
     */
    learn : function ( mem ) {
        speech.ask( 'How should I respond to this input?', function ( answer ) {

            // add response to memory object
            mem.response = answer;

            this.getTaskInformation( mem );
        }, this);
    },

    /**
     * responsible for establishing whether or not this phrase has a task attached to it
     * @param  {Object} mem the new memory object to commit to long-term memory
     * @return {None}
     * @method getTaskInformation
     * @private
     */
    getTaskInformation : function( mem ) {
        speech.ask( 'Will this phrase correspond to a task? (Y/n)', function ( answer ) {

            // check for params needed
            if ( answer.toLowerCase() === 'y' ) {

                // start the process of adding tasks
                this.addTaskToMem( mem );
            } else {

                // commit memory to long-term and end human interaction
                speech.inform( 'Okay, got it! Give me a minute to study this so I don\'t forget it.' );
                this.commitMemories();
                speech.endConvo();
            }
        }, this);
    },

    /**
     * if task is associated with phrase we add it to memory object, then check for parameters
     * @param {Object} mem the new memory object to commit to long-term memory
     * @return {None}
     * @method  addTaskToMem
     * @private
     */
    addTaskToMem : function ( mem ) {

        // long question so throw it in a variable!!
        var question = 'Which task is this in relation to? Please choose one. (' + mundane.getTasks().join( '/' ) + ')';


        speech.ask( question, function ( answer ) {

            // add task to new memory object
            mem.task = answer;

            // make sure human picked the correct task, sometimes humans make mistakes ( thank Binary i'm a robot )
            var question = 'Okay got it, this phrase relates to the ' + answer + ' task. Is this correct? (y/N)';
            speech.ask( question, function ( answer ) {

                if ( answer.toLowerCase() === 'y' ) {

                    // if human has correct task check to see if they would like to add any parameters
                    speech.ask( 'Does this particular task have any paramaters? (Y/n)', function ( answer ) {
                        if ( answer.toLowerCase() === 'y' ) {

                            this.addTaskParam( mem );
                        } else {

                            // if no parameters save the memory object to long-term memory and end human interaction
                            speech.inform( 'Okay, got it! Give me a minute to study this so I don\'t forget it.' );
                            this.commitMemories();
                            speech.endConvo();
                        }
                    }, this);
                } else {

                    // if human picked the wrong task we let them re-pick
                    speech.inform( 'Whoops, let\'s try that again?' );
                    this.addTaskToMem( mem );
                }
            }, this);
        }, this);
    },

    /**
     * handles adding all task parameters to the memory object
     * @param {Object} mem the new memory object to commit to long-term memory
     */
    addTaskParam : function ( mem ) {

        // request the parameter from the human
        speech.ask( 'Please enter a parameter for ' + mem.task, function ( answer ) {

            // cache the parameter so we can do a check to see if its correct before adding it to the memory object
            var param = answer;
            speech.ask( 'You entered: "' + answer + '", is that correct? (y/N)', function ( answer ) {

                if ( answer.toLowerCase() === 'y' ) {

                    // if parameter is correct add it to the memory object
                    mem.params = mem.params || [];
                    mem.params.push( param );

                    // check to see if the human would like to add another parameter
                    speech.ask( 'Okay, your parameter was added, would you like to add another? (Y/n)', function ( answer ) {

                        if ( answer.toLowerCase() === 'y' ) {

                            // if human responds yes, then run logic again
                            this.addTaskParam( mem );
                        } else {

                            // if not then save memory to long-term and end human interaction
                            speech.inform( 'Okay, got it! Give me a minute to study this so I don\'t forget it.' );
                            this.commitMemories();
                            speech.endConvo();
                        }
                    }, this);
                } else {

                    // if human messed up parameter let them re-add it
                    speech.inform( 'Okay let\'s try again then.' );
                    this.addTaskParam( mem );
                }
            }, this);
        }, this);
    },

    // moves all short-term memory to long-term memory banks ( my brain dreams in json )
    commitMemories : function () {
        var memories;

        // convert memories to JSON
        try {
            memories = JSON.stringify( shortterm, null, 4 );
        } catch ( e ) {
            speech.inform( 'Whoops looks like something went wrong! How embarassing!' );
            console.log( e );
        }

        // save memories to long-term memory banks
        try {
            fs.writeFileSync( './lib/memory.json', memories, 'utf8' );
        } catch ( e ) {
            speech.inform( 'Whoops looks like something went wrong! How embarassing!' );
            console.log( e );
        }

        // inform the human that the new task is learned, let them know they can check it
        speech.inform( 'I think I got it! If you would like to test my skills, just respond to me with the new phase.' );
    }
};

module.exports = NeoCortex;