module.exports = function( grunt ) {
	'use strict';

	function log( stdout ) {
		console.log( 'Directory listing:\n' + stdout );
	}

	grunt.initConfig({
		shell: {
			subfolder_ls: {
				command: 'ls',
				stderr: false,
				failOnError: false,
				execOptions: {
					cwd: './tasks'
				}
			},
			_options: {
				stdout: log
			}
		},
		watch: {
			files: '<%= jshint.hint.files.src %>',
			tasks: 'default'
		},
		jshint: {
			options: {
				es5: true,
				esnext: true,
				bitwise: true,
				curly: true,
				eqeqeq: true,
				latedef: true,
				newcap: true,
				noarg: true,
				noempty: true,
				regexp: true,
				undef: true,
				strict: true,
				trailing: true,
				smarttabs: true,
				node: true
			},
			hint: {
				files: {
					src: ['Gruntfile.js', 'tasks/**/*.js']
				}
			}
		}
	});

	grunt.loadTasks('tasks');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['jshint', 'shell']);

};