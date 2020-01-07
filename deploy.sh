#!/bin/sh

echo 'deploy'

git checkout gh-pages

if [ -d 'dist' ]
then
  echo 'dist is empty'
  git checkout master
  exit 1
fi

echo 'checkout master'
git checkout master

exit 0

cp -a dist .

git status

git add -A
git commit -m 'deploy'

git push

git checkout master
