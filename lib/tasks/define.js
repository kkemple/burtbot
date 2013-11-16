/**
 * handles getting word definitions from google
 * @param  {String} term the string of the word we want to define
 * @return {None}
 * @method define
 * @private
 */

var open = require( 'open' ),
      speech = require( '../brochasarea' );

exports.define = function ( params ) {

    open( 'https://www.google.com/search?q=define%3A+' + params[0].toString(), function ( err ) {
        if ( err ) {

            speech.inform( 'Whoops looks like something went wrong! How embarassing!' );
            throw err;
        }
        speech.inform( 'I opened a window in your browser for you and asked Google for the definition of ' + params[0] + '.' );
    });

};
