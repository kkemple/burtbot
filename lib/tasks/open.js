var __open = require( 'open' ),
     speech = require( '../brochasarea' );

/**
 * this funciton is responsible for opening a file or web url
 * params: type( web/file ), path( url/filePath ) 
 * @param {Array} params array containing params for open task, like type and path or url
 * @return {None}
 * @method open
 */
exports.open = function ( params ) {
    var type = params[0];

    if ( type.toLowerCase() === 'file' ) {
        var re = /(?:\.([^.]+))?$/;
        var fileType = re.exec( params[1] );

        if ( fileType === 'exe' ) {

            speech.ask( 'Are you sure you want to open that file? It appears to be an executable. (Y/n)', function ( answer ) {
                if ( answer === 'Y' ) {

                    __open( params[1], function ( err ) {
                        if ( err ) {

                            speech.inform( 'Whoops looks like something went wrong! How embarassing!' );
                            throw err;
                        }
                        speech.inform( 'Your executable has been opened.' );
                    }, null, true );
                }
            });
        } else {

            __open( params[1], function ( err ) {
                if ( err ) {

                    speech.inform( 'Whoops looks like something went wrong! How embarassing!' );
                    throw err;
                }

                speech.inform( 'Your file has been opened.' );
            });
        }
    } else if ( type.toLowerCase() === 'web' ) {
        var location = ( params[1].indexOf( 'http' ) > -1 ) ? location : 'http://' + params[1];
        __open( location, function ( err ) {
            if ( err ) {

                speech.inform( 'Whoops looks like something went wrong! How embarassing!' );
                throw err;
            }

            speech.inform( 'Your web page has been opened.' );
        });
    }
};
