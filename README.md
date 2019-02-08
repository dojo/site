# dojo.io

Next generation dojo.io.

## Running dojo.io Locally

Build Time Rendering does not function properly with dojo's serve feature, so docker is used instead to serve up the static site (same as the Now deployments).

### Pre-requisites

The only pre-requisite is to have [Docker](https://store.docker.com/editions/community/docker-ce-desktop-mac) installed, running and logged in with a valid Docker account.

### Install, Build and Start Docker

1. Install, `npm install`
2. Build the site once, `npm run build:docker`
  - The docker build relies on the `dist` build of the site.
	- If you use VSCode you can set this command up as your default build task.
3. Start docker, `docker-compose up`
4. Go to http://localhost:9005/

### Start Docker

Run `docker-compose up -d`.

### View Docker Logs

Run `docker-compose logs -f`.

### Stop Docker

Run `docker-compose down`.

## Content Pipeline
Coming Soon

## Tests

We use Jest for unit tests on the site.

Run all unit tests, `npm run test` or `npm test` or `jest`.

## Now Deployments

On submission of a PR, an automatic deployment of the site is made to `now.sh`. The PR will be updated with the URL to the deployment automatically. You can test this deployment prior by running `now` locally (install the now cli with `npm install -g now`).
