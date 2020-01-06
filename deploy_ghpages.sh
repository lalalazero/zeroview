#!/bin/sh
echo 'start deploy ----------------'

# abort the script if there is a non-zero error
set -e

# show where we are on the machine
pwd

cd dist

git init
git config --global user.email 'zzzero520@hotmail.com'
git config --global user.name 'lalalazero'


git add -A
git commit --allow-empty -m 'deploy to github pages [circleci]'
git checkout gh-pages


git remote add origin https://github.com/lalalazero/zeroview
# send any output to /dev/null to hide anything sensitive
git push -u origin gh-pages > /dev/null 2>&1

cd ..
rm -rf dist

echo 'end deploy ------------------'
