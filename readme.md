# grunt-shell [![Build Status](https://travis-ci.org/sindresorhus/grunt-shell.svg?branch=master)](https://travis-ci.org/sindresorhus/grunt-shell)

> Run shell commands

A good way to interact with other CLI tools. E.g. compiling Compass `compass compile` or get the current git branch `git branch`.

**Use [Stack Overflow](http://stackoverflow.com/questions/tagged/gruntjs) for support questions.**


## Install

```
$ npm install --save-dev grunt-shell
```


## Usage

```js
require('load-grunt-tasks')(grunt); // npm install --save-dev load-grunt-tasks

grunt.initConfig({
	shell: {
		options: {
			stderr: false
		},
		target: {
			command: 'ls'
		},
		another: 'ls ./src' // shorthand
	}
});

grunt.registerTask('default', ['shell']);
```


## Examples

### Run command

Create a folder named `test`.

```js
grunt.initConfig({
	shell: {
		makeDir: {
			command: 'mkdir test'
		}
	}
});
```

The `command` property supports templates:

```js
grunt.initConfig({
	testDir: 'test',
	shell: {
		makeDir: {
			command: 'mkdir <%= testDir %>'
		}
	}
});
```

You can also supply a function that returns the command:

```js
grunt.initConfig({
	shell: {
		hello: {
			command: () => 'echo hello'
		}
	}
});
```

Which can also take arguments:

```js
module.exports = grunt => {
	grunt.loadNpmTasks('grunt-shell');
	grunt.initConfig({
		shell: {
			greet: {
				command: greeting => 'echo ' + greeting
			}
		}
	});
	grunt.registerTask('default', ['shell:greet:hello']);
}
```

### Run command and display the output

Output a directory listing in your Terminal.

```js
grunt.initConfig({
	shell: {
		dirListing: {
			command: 'ls'
		}
	}
});
```

### Custom callback

Do whatever you want with the output.

```js
function log(err, stdout, stderr, cb) {
	if (err) {
		cb(err);
		return;
	}

	console.log(stdout);
	cb();
}

grunt.initConfig({
	shell: {
		dirListing: {
			command: 'ls',
			options: {
				callback: log
			}
		}
	}
});
```

### Option passed to the .exec() method

Run a command in another directory. In this example we run it in a subfolder using the `cwd` (current working directory) option.

```js
grunt.initConfig({
	shell: {
		subfolderLs: {
			command: 'ls',
			options: {
				stderr: false,
				execOptions: {
					cwd: 'tasks'
				}
			}
		}
	}
});
```

### Multiple commands

Run multiple commands by placing them in an array which is joined using `&&` or `;`. `&&` means run this only if the previous command succeeded. You can also use `&` to have the commands run concurrently (by executing all commands except the last one in a subshell).

```js
grunt.initConfig({
	shell: {
		multiple: {
			command: [
				'mkdir test',
				'cd test',
				'ls'
			].join('&&')
		}
	}
});
```


## Config

### command

*Required*<br>
Type: `String` `Function`

Command to run or a function which returns the command. Supports underscore templates.

*Command can be omitted by directly setting the target with the command.*

## Options

### stdout

Type: `Boolean`<br>
Default: `true`

Show stdout in the terminal.

### stderr

Type: `Boolean`<br>
Default: `true`

Show stderr in the terminal.

### stdin

Type: `Boolean`<br>
Default: `true`

Forward the terminal's stdin to the command.

### failOnError

Type: `Boolean`<br>
Default: `true`

Fail task if it encounters an error. Doesn't apply if you specify a `callback`.

### stdinRawMode

Type: `Boolean`<br>
Default: `false`

Set `stdin` to [act as a raw device](http://nodejs.org/api/tty.html#tty_rs_setrawmode_mode).

### callback(err, stdout, stderr, cb)

Type: `Function`

Lets you override the default callback with your own.

**Make sure to call the `cb` method when you're done.** Supply an error as the first argument to `cb` to print a warning and cause the task to fail.

### preferLocal

Type: `Boolean`<br>
Default: `false`

Execute local binaries by name like [npm run-script](http://blog.keithcirkel.co.uk/how-to-use-npm-as-a-build-tool/).

### execOptions

Type: `Object`

Specify some options to be passed to the [.exec()](http://nodejs.org/api/child_process.html#child_process_child_process_exec_command_options_callback) method:

- `cwd` String *Current working directory of the child process*
- `env` Object *Environment key-value pairs*
- `setsid` Boolean
- `encoding` String *(Default: 'utf8')*
- `timeout` Number *(Default: 0)*
- `maxBuffer` Number *(Default: 200\*1024)*
- `killSignal` String *(Default: 'SIGTERM')*


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
