#! /bin/sh

cp ./now.json ./output/dist

if [ "$TRAVIS_PULL_REQUEST" = "false" ] ; then
	NOW_URL=${now ./output/dist}
else
	NOW_URL=${now ./output/dist}
fi