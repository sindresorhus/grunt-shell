'use strict';
module.exports = function (grunt) {
	var exec = require('child_process').exec;
	var _ = grunt.util._;

	grunt.registerMultiTask('shell', 'Run shell commands', function () {
		var cb = this.async();
		var options = this.options({
			stdout: false,
			stderr: false,
			failOnError: false
		});
		var cmd = this.data.command;

		if (cmd === undefined) {
			throw new Error('`command` is required.');
		}

		cmd = grunt.template.process(_.isFunction(cmd) ? cmd.call(grunt) : cmd);

		var cp = exec(cmd, options.execOptions, function (err, stdout, stderr) {
			if (_.isFunction(options.callback)) {
				options.callback.call(this, err, stdout, stderr, cb);
			} else {
				if (err && options.failOnError) {
					grunt.warn(err);
				}
				cb();
			}
		});

		grunt.verbose.writeln('Command:', cmd.yellow);
		grunt.verbose.writeflags(options, 'Options');

		if (options.stdout || grunt.option('verbose')) {
			cp.stdout.pipe(process.stdout);
		}

		if (options.stderr || grunt.option('verbose')) {
			cp.stderr.pipe(process.stderr);
		}
	});
};
