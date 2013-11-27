var open = require( 'open' ),
      speech = require( '../brochasarea' );

/**
 * this function searches google for a specific definition
 * @param {Array} params array contianing the search term ( array is used for plugablitiy )
 * @return {None}
 * @method define
 */
exports.define = function ( params ) {

    open( 'https://www.google.com/search?q=define%3A+' + params[0].toString(), function ( err ) {
        if ( err ) {

            speech.inform( 'Whoops looks like something went wrong! How embarassing!' );
            throw err;
        }
        speech.inform( 'I opened a window in your browser for you and asked Google for the definition of ' + params[0] + '.' );
    });

};
