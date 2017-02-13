'use strict';

let ret = '';
process.stdin.on('readable', () => {
	let chunk;
	while (chunk = process.stdin.read()) { // eslint-disable-line no-cond-assign
		ret += chunk;
	}
});
process.stdin.on('end', () => {
	process.stdout.write(ret);
});
