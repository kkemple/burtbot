/**
 * handles starting a local server for you
 * can use: node, python, ruby, or php
 * @param  {Array} params array of the settings for the sever
 * @return {None}
 * @method server
 */

var exec = require( 'child_process' ).exec,
      speech = require( '../brochasarea' );

exports.server = function ( params ) {
    var lang = params[0],
        port = params[1] || 8000,
        env = params[2] || 'development',
        cp;

    switch ( lang.toLowerCase() ) {
        case 'php':
            speech.inform( 'PHP Server started at http://localhost:' + port + '. Press Crtl+C to quit.' );
            cp = exec( 'php -S localhost:' + port, function ( err, stdout, stderr ) {
                if ( err ) {
                    speech.inform( 'Whoops looks like something went wrong! How embarassing!' );
                    throw err;
                }
            });
        break;
        case 'python':
            speech.inform( 'Python Server started at http://localhost:' + port + '. Press Crtl+C to quit.' );
            cp = exec( 'python -m SimpleHTTPServer ' + port, function ( err, stdout, stderr ) {
                if ( err ) {
                    speech.inform( 'Whoops looks like something went wrong! How embarassing!' );
                    throw err;
                }
            });
        break;
        case 'node':
            speech.inform( 'Node Server started at http://localhost:' + port + '. Press Crtl+C to quit.' );
            cp = exec( 'node ./node_modules/http-server/bin/http-server -p ' + port + ' -e ' + env, function ( err, stdout, stderr ) {
                if ( err ) {
                    speech.inform( 'Whoops looks like something went wrong! How embarassing!' );
                    throw err;
                }
            });
        break;
        case 'ruby':
            speech.inform( 'Rails Server started at http://localhost:' + port + '. Press Crtl+C to quit.' );
            cp = exec( 'rails server -p ' + port + ' -e ' + env, function ( err, stdout, stderr ) {
                if ( err ) {
                    speech.inform( 'Whoops looks like something went wrong! How embarassing!' );
                    throw err;
                }
            });
        break;
    }
};
