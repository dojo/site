'use strict';
/**
 * Load the TypeScript compiler, then load the TypeScript pipeline files.
 */

const path = require('path');

const tsconfigPath = path.join(__dirname, 'scripts/tsconfig.json');

let event;
if (process.argv.length > 2) {
	event = process.argv[2];
}

let filePath;
if (process.argv.length > 3) {
	filePath = process.argv[3];
}

// Register TS compilation.
require('ts-node').register({
  project: tsconfigPath
});

require('./scripts/compile').process(event, filePath);
