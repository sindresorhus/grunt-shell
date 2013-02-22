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

	grunt.registerTask('default', ['shell']);
};
