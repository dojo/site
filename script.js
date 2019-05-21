'use strict';
/**
 * Load the TypeScript compiler, then load the TypeScript gulpfile which simply loads all
 * the tasks. The tasks are really inside tools/gulp/tasks.
 */

const path = require('path');

const tsconfigPath = path.join(__dirname, 'tsconfig.json');

// Register TS compilation.
require('ts-node').register({
  project: tsconfigPath
});

require('./src/scripts/compile-blog-index.block').default({ locale: 'en' });
