'use strict';

module.exports = grunt => {
	let checkCounter = 0;

	function check(substring) {
		checkCounter++;

		return (error, stdout, stderr, callback) => {
			if (error) {
				grunt.fatal(`Command failed: ${error}`);
			}

			if (!stdout.includes(substring)) {
				grunt.fatal(`Expected substring not found: ${substring}`);
			}

			checkCounter--;
			callback();
		};
	}

	let path = null;

	function pathCallback(error, stdout, stderr, callback) {
		if (error) {
			grunt.fatal(`Command failed: ${error}`);
		}

		if (path === null) {
			path = stdout;
		} else if (path !== stdout) {
			grunt.fatal('Path shouldn\'t have changed!');
		}

		callback();
	}

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		testDir: 'tasks',
		shell: {
			subfolder1: {
				command: 'ls',
				options: {
					execOptions: {
						cwd: 'tasks'
					},
					callback: check('shell.js')
				}
			},
			subfolder2: {
				command: 'ls',
				options: {
					execOptions: {
						cwd: '<%= testDir %>'
					},
					callback: check('shell.js')
				}
			},
			subfolder3: {
				command: 'ls',
				cwd: '<%= testDir %>',
				options: {
					callback: check('shell.js')
				}
			},
			fnCmd: {
				command(version) {
					// `this` is scoped to the grunt instance
					if (version) {
						return `echo grunt-shell version: ${version}`;
					}

					return `echo grunt version: ${this.version}`;
				}
			},
			callback: {
				command: 'ls',
				options: {
					callback: check('gruntfile.js')
				}
			},
			withColor: {
				command: 'ls -G'
			},
			error: {
				command: 'ls && exit 1',
				options: {
					failOnError: false
				}
			},
			path: {
				command: process.platform === 'win32' ? 'set path' : 'printenv PATH',
				options: {
					callback: pathCallback
				}
			}
		}
	});

	grunt.loadTasks('tasks');

	grunt.registerTask('check', () => {
		if (checkCounter > 0) {
			grunt.fatal('Callbacks were not executed');
		}
	});

	grunt.registerTask('default', [
		'shell',
		'shell:fnCmd:<%= pkg.version %>',
		'shell:path',
		'check'
	]);
};
