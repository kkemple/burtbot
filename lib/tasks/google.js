var open = require( 'open' ),
      speech = require( '../brochasarea' );


/**
 * this function searches google for a specified search term
 * @param {Array} params array containing the search term to google ( array used for task consistency )
 * @return {None}
 * @method google
 */
exports.google = function ( params ) {
    open( 'https://google.com/search?q=' + params[0].toString().split( /\s+/ ).join( '+' ), function ( err ) {
        if ( err ) {

            speech.inform( 'Whoops looks like something went wrong! How embarassing!' );
            throw err;
        }
        speech.inform( 'I opened a window in your browser for you and Googled your question.' );
    });
};