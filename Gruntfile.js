'use strict';
module.exports = function (grunt) {
	function log(err, stdout, stderr, cb) {
		console.log('Directory listing:\n' + stdout);
		cb();
	}

	grunt.initConfig({
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
				command: function () {
					// `this` is scoped to the grunt instance
					return 'echo grunt version: ' + this.version;
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

	grunt.registerTask('default', ['shell']);
};
