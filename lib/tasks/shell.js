/**
 * handles all shell commands
 * @param  {String} command the command to run in child process
 * @return {None}
 * @method  shell
 * @private
 */

var speech = require( '../brochasarea' ),
      exec = require( 'child_process' ).exec;

exports.shell = function ( params ) {

    speech.inform( 'Running your shell command now...' );
    exec( params[0], function ( err, stdout, stderr ) {
        if ( err ) {
            speech.inform( 'Whoops looks like something went wrong! How embarassing!' );
            throw err;
        }
        speech.inform( 'Shell command complete.' );
    });
};
