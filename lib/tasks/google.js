/**
 * responsible for all google requests
 * @param  {String} term the term to search for
 * @return {None}
 * @method google
 * @private
 */
var open = require( 'open' ),
      speech = require( '../brochasarea' );

exports.google = function ( params ) {
    open( 'https://google.com/search?q=' + params[0].toString().split( /\s+/ ).join( '+' ), function ( err ) {
        if ( err ) {

            speech.inform( 'Whoops looks like something went wrong! How embarassing!' );
            throw err;
        }
        speech.inform( 'I opened a window in your browser for you and Googled your question.' );
    });
};