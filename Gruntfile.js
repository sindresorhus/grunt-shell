'use strict';
module.exports = function (grunt) {
	function log(err, stdout, stderr, cb) {
		console.log('Directory listing:\n' + stdout);
		cb();
	}

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		shell: {
			subfolder: {
				command: 'ls',
				options: {
					stdout: true,
					execOptions: {
						cwd: 'tasks'
					}
				}
			},
			fnCmd: {
				command: function (ver) {
					// `this` is scoped to the grunt instance
					if(ver){
						return 'echo grunt-shell version: ' + ver;
					} else {
						return 'echo grunt version: ' + this.version
					}
				},
				options: {
					stdout: true
				}
			},
			callback: {
				command: 'ls',
				options: {
					callback: log
				}
			},
			error: {
				command: 'ls && exit 1',
				options: {
					stderr: true,
					failOnError: true
				}
			}
		}
	});

	grunt.loadTasks('tasks');

	grunt.registerTask('default', [
		'shell', 
		'shell:fnCmd:<%= pkg.version %>'
	]);
};
