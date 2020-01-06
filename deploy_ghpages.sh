#!/bin/sh
echo 'start deploy ----------------'

# abort the script if there is a non-zero error
set -e

# show where we are on the machine
pwd

cp -rf ./dist ../dist

git checkout gh-pages
git rm -rf .

cp -rf ../dist .

git add -A
git commit --allow-empty -m 'deploy to github pages [circleci]'
# send any output to /dev/null to hide anything sensitive
git push --force --quiet origin gh-pages > /dev/null 2>&1

rm -rf ../dist

echo 'end deploy ------------------'
