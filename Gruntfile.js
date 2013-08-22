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
				command: function (version) {
					// `this` is scoped to the grunt instance
					if (version) {
						return 'echo grunt-shell version: ' + version;
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
			withColor: {
				command: 'ls --color=yes',
				options: {
					stdout: true,
					stderr: true
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
