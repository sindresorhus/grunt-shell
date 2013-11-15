'use strict';
module.exports = function (grunt) {
	var exec = require('child_process').exec;
	var chalk = require('chalk');
	var _ = grunt.util._;

	grunt.registerMultiTask('shell', 'Run shell commands', function () {
		var cb = this.async();
		var options = this.options({
			stdout: false,
			stderr: false,
			stdin: true,
			failOnError: false
		});
		var cmd = this.data.command;

		if (cmd === undefined) {
			throw new Error('`command` is required.');
		}

		cmd = grunt.template.process(_.isFunction(cmd) ? cmd.apply(grunt, arguments) : cmd);

		var cp = exec(cmd, options.execOptions, function (err, stdout, stderr) {
			if (_.isFunction(options.callback)) {
				options.callback.call(this, err, stdout, stderr, cb);
			} else {
				if (err && options.failOnError) {
					grunt.warn(err);
				}
				cb();
			}
		}.bind(this));

		var captureOutput = function (child, output) {
			if (grunt.option('color') === false) {
				child.on('data', function (data) {
					output.write(chalk.stripColor(data));
				});
			} else {
				child.pipe(output);
			}
		};

		grunt.verbose.writeln('Command:', chalk.yellow(cmd));
		grunt.verbose.writeflags(options, 'Options');

		if (options.stdout || grunt.option('verbose')) {
			captureOutput(cp.stdout, process.stdout);
		}

		if (options.stderr || grunt.option('verbose')) {
			captureOutput(cp.stderr, process.stderr);
		}

		if (options.stdin) {
			process.stdin.pipe(cp.stdin);
		}
	});
};
