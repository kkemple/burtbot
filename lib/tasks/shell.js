var speech = require( '../brochasarea' ),
      exec = require( 'child_process' ).exec,
      child;


/**
 * handles all shell commands
 * @param  {Array} params the command and parameters to run in child process
 * @return {None}
 * @method  shell
 */
exports.shell = function ( params ) {
	
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
