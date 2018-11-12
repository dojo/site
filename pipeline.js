'use strict';
/**
 * Load the TypeScript compiler, then load the TypeScript pipeline files.
 */

const path = require('path');

const tsconfigPath = path.join(__dirname, 'scripts/tsconfig.json');
// const tsconfig = require(tsconfigPath);

// Register TS compilation.
require('ts-node').register({
  project: tsconfigPath
});

require('./scripts/compile').process();
