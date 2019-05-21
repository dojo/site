#!/bin/bash

if [ "$TRAVIS_PULL_REQUEST" != "false" ] ; then
	environment="staging"
	branch=TRAVIS_PULL_REQUEST_BRANCH
else
	environment="production"
	branch=TRAVIS_BRANCH
fi

cp ./now.json ./output/dist
if [ "$NOW_TOKEN" = "" ] ; then
	echo "No token?"
	exit 1
fi

nowurl=$(npx now ./output/dist --token=$NOW_TOKEN --public)
if [ "$nowurl" = "" ] ; then
	echo "Now deployment failed"
	exit 1
fi

echo "Deployed to $nowurl"

deploymenturl=$(curl -H "Authorization: Bearer $GITHUB_TOKEN" -H "Content-Type: application/vnd.github.v3+json" -s -X POST https://api.github.com/repos/$TRAVIS_REPO_SLUG/deployments -d '{"ref": "'$branch'","environment": "'$environment'","description": "Deploy request from Travis","auto_merge":false}' | jq -r '.url')
if [ "$deploymenturl" = "" ] ; then
	echo "Failed creating github deployment"
	exit 1
fi

echo "Github deployment url $deploymenturl"

curl -H "Authorization: Bearer $GITHUB_TOKEN" -H "Content-Type: application/vnd.github.v3+json" -s -X POST $deploymenturl/statuses -d '{"environment": "'$environment'", "state": "success", "target_url": "'$nowurl'", "log_url": "'$nowurl'/_logs", "environment_url": "'$nowurl'", "description": "Deployment finished successfully."}'
