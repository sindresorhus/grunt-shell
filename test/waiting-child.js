'use strict';

let ret = '';
process.stdin.on('readable', () => {
	let chunk;
	while (chunk = process.stdin.read()) ret += chunk;
});
process.stdin.on('end', () => {
	process.stdout.write(ret);
});
