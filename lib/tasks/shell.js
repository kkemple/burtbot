/**
 * handles all shell commands
 * @param  {String} command the command to run in child process
 * @return {None}
 * @method  shell
 * @private
 */

var speech = require( '../brochasarea' ),
      exec = require( 'child_process' ).exec,
      child,
      command;

exports.shell = function ( params ) {
  console.log( params.join( ' ' ) );
    speech.inform( 'Running your shell command now...' );
    child = exec( params.join( ' ' ),
      function ( err, stdout, stderr ) {
        if ( err ) {
          speech.inform( 'Whoops looks like something went wrong! How embarassing!' );
          throw err;
        }
        speech.inform( stdout );
      });
};
