'use strict';
module.exports = grunt => {
	function log(err, stdout, stderr, cb) {
		console.log(`Directory listing:\n${stdout}`);
		cb();
	}

	let path = null;
	function pathCallback(err, stdout, stderr, cb) {
		if (path === null) {
			path = stdout;
		} else if (path !== stdout) {
			grunt.fatal('Path shouldn\'t have changed!');
		}
		cb();
	}

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		shell: {
			subfolder: {
				command: 'ls',
				options: {
					execOptions: {
						cwd: 'tasks'
					}
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
					callback: log
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

	grunt.registerTask('default', [
		'shell',
		'shell:fnCmd:<%= pkg.version %>',
		'shell:path'
	]);
};
