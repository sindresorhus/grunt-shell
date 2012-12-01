/*
 * grunt-shell
 * 0.1.2 - 2012-06-28
 * github.com/sindresorhus/grunt-shell
 *
 * (c) Sindre Sorhus
 * sindresorhus.com
 * MIT License
 */
module.exports = function( grunt ) {
	'use strict';

	var _ = grunt.utils._;
	var log = grunt.log;

	grunt.registerMultiTask( 'shell', 'Run shell commands', function() {
		var exec = require('child_process').exec;
		var done = this.async();
		var data = _.extend( [], grunt.config.get('shell')._options, this.data );
		var dataOut = data.stdout;
		var dataErr = data.stderr;

		if ( _.isFunction( data.callback ) ) {
			data.callback.call( this );
			return;
		}

		var childProcess = exec( data.command, data.execOptions, function( err, stdout, stderr ) {
			if ( stdout ) {
				if ( _.isFunction( dataOut ) ) {
					dataOut( stdout );
				} else if ( dataOut === true ) {
					log.write( stdout );
				}
			}

			if ( err ) {
				if ( _.isFunction( dataErr ) ) {
					dataErr( stderr );
				} else if ( data.failOnError === true ) {
					grunt.fatal( err );
				} else if ( dataErr === true ) {
					log.error( err );
				}
			}

			done();
		});

		childProcess.stdout.on('data', function(stdout){
			if ( stdout ) {
				if ( _.isFunction( dataOut ) ) {
					dataOut( stdout );
				} else if ( dataOut === true ) {
					log.write( stdout );
				}
			}
		});
		childProcess.stderr.on('data', function(stderr){
			if ( stderr ) {
				if ( _.isFunction( dataErr ) ) {
					dataErr( stderr );
				} else if ( data.failOnError === true ) {
					grunt.fatal( stderr );
				} else if ( dataErr === true ) {
					log.error( stderr );
				}
			}
		});
	});
};
