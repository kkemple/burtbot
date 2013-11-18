/**
 * This is a wrapper class that is responsible for getting project dependencies
 * such as NPM packages or Bower components
 */

var fs = require( 'fs' ),
    path = require( 'path' ),
    speech = require( '../brochasarea' ),
    io = require( './shell.js' ),
    npm,
    bower,
    yo,
    composer,
    gem;

exports.get = function ( params ) {
    var manager = params.shift();

    switch ( manager.toLowerCase() ) {
        case 'npm':
            npm( params );
        break;
        case 'bower':

        break;
    }

};

function npm ( params ) {
    var module = params[0],
        save = params[1],
        dev = params[2],
        args;

    var pJSON = {
        "name": "",
        "version": "",
        "description": "",
        "main": "index.js",
        "scripts": {
            "test": ""
        },
        "repository": "",
        "author": "",
        "license": "BSD"
    };

    if ( save.toLowerCase() === 'true' ) {

        if ( fs.existsSync( process.cwd() + '/package.json' ) ) {

            if ( dev.toLowerCase() === 'true' ) {
                args = ['npm', 'install' , module, '--save-dev' ];
                io.shell( args );
            } else {
                args = ['npm', 'install' , module, '--save' ];
                io.shell( args );
            }
        } else {

            fs.writeFileSync( path.normalize( process.cwd() + '/package.json' ), pJSON, 'utf8' );

            if ( dev.toLowerCase() === 'true' ) {
                args = ['npm', 'install' , module, '--save-dev' ];
                io.shell( args );
            } else {
                args = ['npm', 'install' , module, '--save' ];
                io.shell( args );
            }
        }
    }
}