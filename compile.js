'use strict';

const path = require('path');

const tsconfigPath = path.join(__dirname, 'tsconfig.json');

// Register TS compilation.
require('ts-node').register({
  project: tsconfigPath
});

require('./src/scripts/compile.block.ts').default(process.argv[2], process.argv[3]);
