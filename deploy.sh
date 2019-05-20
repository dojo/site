#!/bin/bash

if [ "$TRAVIS_PULL_REQUEST" = "false" ] ; then
	environment="staging"
else
	environment="production"
fi

cp ./now.json ./output/dist

nowurl=$(npx now ./output/dist --token=$NOW_TOKEN --public)
if [ "$nowurl" = "" ] ; then
	exit 1
fi

echo "Deployed to $nowurl"

deploymenturl=$(curl -H "Authorization: Bearer $GITHUB_TOKEN" -H "Content-Type: application/vnd.github.v3+json" -s -X POST https://api.github.com/repos/dojo/site/deployments -d '{"ref": "'$TRAVIS_COMMIT'","environment": "'$environment'","description": "Deploy request from Travis"}' | jq -r '.url')
if [ "$deploymenturl" = "" ] ; then
	exit 1
fi

echo "Github deployment url $deploymenturl"

curl -H "Authorization: Bearer $GITHUB_TOKEN" -H "Content-Type: application/vnd.github.v3+json" -s -X POST $deploymenturl/statuses -d '{"environment": "'$environment'", "state": "success", "target_url": "'$nowurl'", "log_url": "'$nowurl'/_logs", "environment_url": "'$nowurl'", "description": "Deployment finished successfully."}'
