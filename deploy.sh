#!/bin/sh

echo 'deploy'

git checkout gh-pages

cp -a ./dist/. .


git status

git add .
git commit -m 'deploy'

git push

