#!/bin/bash
cp ./now.json ./output/dist

if [ "$TRAVIS_PULL_REQUEST" != "false" ] ; then
	nowurl=$(npx now ./output/dist --token=$PUBLIC_NOW_TOKEN --public)
	if [ "$nowurl" = "" ] ; then
		echo "Now deployment failed"
		exit 1
	fi

	curl -H "Authorization: token ${PUBLIC_GITHUB_TOKEN}" -H "Content-Type: application/vnd.github.v3+json" -s -X POST "https://api.github.com/repos/${TRAVIS_REPO_SLUG}/issues/${TRAVIS_PULL_REQUEST}/comments" -d '{"body": "This pull request has been deployed to '$nowurl'"}'
else
	nowurl=$(npx now ./output/dist --token=$NOW_TOKEN --public --scope=dojo)
	if [ "$nowurl" = "" ] ; then
		echo "Now deployment failed"
		exit 1
	fi

	echo "Deployed to $nowurl"
	
	deploymenturl=$(curl -H "Authorization: Bearer $GITHUB_TOKEN" -H "Content-Type: application/vnd.github.v3+json" -s -X POST https://api.github.com/repos/$TRAVIS_REPO_SLUG/deployments -d '{"ref": "'$TRAVIS_COMMIT'","environment": "production","description": "Deploy request from Travis","auto_merge":false,"required_contexts":[]}' | jq -r '.url')
	if [ "$deploymenturl" = "null" ] ; then
		echo "Failed creating github deployment"
		exit 1
	fi

	echo "Github deployment url $deploymenturl"

	curl -H "Authorization: Bearer $GITHUB_TOKEN" -H "Content-Type: application/vnd.github.v3+json" -s -X POST $deploymenturl/statuses -d '{"environment": "production", "state": "success", "target_url": "'$nowurl'", "log_url": "'$nowurl'/_logs", "environment_url": "'$nowurl'", "description": "Deployment finished successfully."}'
fi
