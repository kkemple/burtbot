var spawn = require( 'child_process' ).spawn,
      speech = require( '../brochasarea' );

/**
 * handles starting a local server in the current directory
 * can use: node, python, ruby, or php
 * params: language, port, environment
 * @param  {Array} params array of the settings for the sever
 * @return {None}
 * @method server
 */
exports.server = function ( params ) {
    var lang = params[0],
        port = params[1] || 8000,
        env = params[2] || 'development',
        child;

    switch ( lang.toLowerCase() ) {
        case 'php':
            speech.inform( 'PHP Server started at http://localhost:' + port + '. Press Crtl+C to quit.' );
            child = spawn( 'php', [ '-S localhost:' + port ], function ( err, stdout, stderr ) {
                if ( err ) {
                    speech.inform( 'Whoops looks like something went wrong! How embarassing!' );
                    throw err;
                }
            });
        break;
        case 'python':
            speech.inform( 'Python Server started at http://localhost:' + port + '. Press Crtl+C to quit.' );
            child = spawn( 'python', [ '-m', 'SimpleHTTPServer', port ], function ( err, stdout, stderr ) {
                if ( err ) {
                    speech.inform( 'Whoops looks like something went wrong! How embarassing!' );
                    throw err;
                }
            });
        break;
        case 'node':
            speech.inform( 'Node Server started at http://localhost:' + port + '. Press Crtl+C to quit.' );
            child = spawn( 'node', [ './node_modules/http-server/bin/http-server', '-p ' + port, '-e ' + env ], {stdio: ['ignore', 'ignore', 'ignore']});
        break;
        case 'ruby':
            speech.inform( 'Rails Server started at http://localhost:' + port + '. Press Crtl+C to quit.' );
            child = spawn( 'rails', ['server', '-p ' + port, '-e ' + env ], function ( err, stdout, stderr ) {
                if ( err ) {
                    speech.inform( 'Whoops looks like something went wrong! How embarassing!' );
                    throw err;
                }
            });
        break;
    }
};
