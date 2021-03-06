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
    composer,
    gem;

exports.get = function ( params ) {
    var manager = params.shift();

    switch ( manager.toLowerCase() ) {
        case 'npm':
            npm( params );
        break;
        case 'bower':
            bower( params );
        break;
    }

};

function npm ( params ) {
    var module = params[0],
        save = params[1],
        dev = params[2],
        args;

    var pJSON = fs.readFileSync( path.resolve(  __dirname, '../templates/package.json' ) );

    if ( save && save.toLowerCase() === 'true' ) {

        if ( fs.existsSync( './package.json' ) ) {

            if ( dev && dev.toLowerCase() === 'true' ) {
                args = ['npm', 'install' , module, '--save-dev' ];
                io.shell( args );
            } else {
                args = ['npm', 'install' , module, '--save' ];
                io.shell( args );
            }
        } else {

            fs.writeFileSync( './package.json', pJSON, 'utf8' );

            if ( dev && dev.toLowerCase() === 'true' ) {
                args = ['npm', 'install' , module, '--save-dev' ];
                io.shell( args );
            } else {
                args = ['npm', 'install' , module, '--save' ];
                io.shell( args );
            }
        }
    }
}

function bower ( params ) {
    var module = params[0],
        save = params[1],
        dev = params[2],
        args;

    var bJSON = fs.readFileSync( path.resolve( __dirname, '../templates/bower.json' ) );

    if ( save && save.toLowerCase() === 'true' ) {

        if ( fs.existsSync( './bower.json' ) ) {

            if ( dev && dev.toLowerCase() === 'true' ) {
                args = ['bower', 'install' , module, '--save-dev' ];
                io.shell( args );
            } else {
                args = ['bower', 'install' , module, '--save' ];
                io.shell( args );
            }
        } else {

            fs.writeFileSync( './bower.json', bJSON, 'utf8' );

            if ( dev && dev.toLowerCase() === 'true' ) {
                args = ['bower', 'install' , module, '--save-dev' ];
                io.shell( args );
            } else {
                args = ['bower', 'install' , module, '--save' ];
                io.shell( args );
            }
        }
    }
}