=======
# dojo.io site

This project was generated with the [Dojo CLI](https://github.com/dojo/cli) & [Dojo CLI create app command](https://github.com/dojo/cli-create-app).

## Build

Run `dojo build --mode dist` (the `mode` option defaults to `dist`) to create a production build for the project. The built artifacts will be stored in the `output/dist` directory.

## Content Build

Run `npm run build:content` to build the content

## Production Build

Run `npm run build` to create a development build for the project. The built artifacts will be stored in the `output/dev` directory.

## Development Build/Server

Run `npm run dev` to create a development build and start a development server. By default the server runs on port `9999`, navigate to `http://localhost:9999/`.

## Running unit tests

To run units tests in node only use `npm run test` which uses JIT (just in time) compilation.

To run the unit tests against built bundles, first the run a test build with `dojo build --mode unit`. The build test artifacts are written to the `output/tests/unit` directory.

Then `dojo test -c local` to run the projects unit tests. These tests are located in the `tests/unit` directory. The `--watch` options can be used with the test build which means that `dojo test` can be re-run without needing to re-build the full application each time.

## Running functional tests

To run the functional tests, first the run a test build with `dojo build --mode functional` and then `dojo test -f` to run the projects functional tests. These tests are located in the `tests/functional` directory.

## Further help

To get help for these commands and more, run `dojo` on the command line.
