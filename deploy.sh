#!/bin/bash
cp ./now.json ./output/dist

PROD_BRANCHES=("master" "v6")

function contains() {
	local n=$#
	local value=${!n}
	for ((i=1;i < $#;i++)) {
		if [ "${!i}" == "${value}" ] ; then
			echo "y"
			return 0
		fi
	}
	echo "n"
	return 1
}

prefix=""
if [ "$DOMAIN_PREFIX" != "" ] ; then
	prefix="$DOMAIN_PREFIX."
fi

name="${prefix}dojo.io"
if [ "$1" != "" ] ; then
	name="$1.${prefix}dojo.io"
fi

echo "Deploying ${name}...";

if [ "$TRAVIS_PULL_REQUEST" != "false" ] ; then
	echo "npx now ./output/dist --token=$PUBLIC_NOW_TOKEN --public --name=$name --confirm";
	nowurl=$(npx now ./output/dist --token=$PUBLIC_NOW_TOKEN --public --name=$name --confirm)
	if [ "$nowurl" = "" ] ; then
		echo "Now deployment failed"
		exit 1
	fi

	echo "* $name: $nowurl" &>> deployments.txt
else
	if [ $(contains "${PROD_BRANCHES[@]}" "$TRAVIS_BRANCH") == "y" ] ; then
		nowurl=$(npx now ./output/dist --token=$NOW_TOKEN --public --name=$name --scope=dojo --prod --confirm)
		if [ "$nowurl" = "" ] ; then
			echo "Now deployment failed"
			exit 1
		fi

		echo "Deployed to $nowurl"

		if [ "$1" = "" ] ; then
			deploymenturl=$(curl -H "Authorization: Bearer $GITHUB_TOKEN" -H "Content-Type: application/vnd.github.v3+json" -s -X POST https://api.github.com/repos/$TRAVIS_REPO_SLUG/deployments -d '{"ref": "'$TRAVIS_COMMIT'","environment": "production","description": "Deploy request from Travis","auto_merge":false,"required_contexts":[]}' | jq -r '.url')
			if [ "$deploymenturl" = "null" ] ; then
				echo "Failed creating github deployment"
				exit 1
			fi

			echo "Github deployment url $deploymenturl"

			curl -H "Authorization: Bearer $GITHUB_TOKEN" -H "Content-Type: application/vnd.github.v3+json" -s -X POST $deploymenturl/statuses -d '{"environment": "production", "state": "success", "target_url": "'$nowurl'", "log_url": "'$nowurl'/_logs", "environment_url": "'$nowurl'", "description": "Deployment finished successfully."}'
		fi
	fi
fi
