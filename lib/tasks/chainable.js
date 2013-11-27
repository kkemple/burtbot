/**
 * This is the best part of Burtbot, this task is responsible for allowing chaining of presaved tasks,
 * this way with one command Burtbot can complete multilple tasks for you allowing you to bootstrap sites/apps
 * or setup testing or anything you can think of really
 */

var speech = require( '../brochasarea' ),
      shortterm = require( '../memory' ),
      _task;

/**
 * allows Burtbot tasks to be chained
 * @param {Array} tasks
 * @return {None}
 * @method chainable
 */
exports.chainable = function ( tasks ) {

    tasks.forEach(function ( task ) {

        speech.inform( shortterm[ task ].response );

        if ( shortterm[ task ].task ) {

            _task = require( './' + shortterm[ task ].task  );

            _task[ shortterm[ task ].task ]( shortterm[ task ].params );
        }
    });
};