#!/bin/bash

nowurl=$(npx now ./output/dist --token=$NOW_TOKEN --public)

deploymenturl=$(curl -H "Authorization: Bearer $GITHUB_TOKEN" -H "Content-Type: application/vnd.github.v3+json" -s -X POST\
https://api.github.com/repos/dojo/site/deployments -d '{\
  "ref": "'$TRAVIS_COMMIT'",\
  "environment": "staging",\
  "description": "Deploy request from Travis"\
}'\
| jq -r '.url')

echo $(curl -H "Authorization: Bearer $GITHUB_TOKEN" -H "Content-Type: application/vnd.github.v3+json" -s -X POST $deploymenturl/statuses \
-d '{"environment": "staging", "state": "success", "target_url": "'$nowurl'", "log_url": "'$nowurl'/_logs",\
"environment_url": "'$nowurl'", "description": "Deployment finished successfully."}')
