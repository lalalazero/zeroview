#!/bin/sh

remote=$(git config remote.origin.url)

echo 'remote'
echo $remote


if [ -d 'gh-pages' ]
then
  echo 'clear gh-pages'
  rm -rf gh-pages
fi

echo 'mkdir gh-pages'
mkdir gh-pages
cd gh-pages

pwd

git clone --depth 1 --branch gh-pages $remote


cd zeroview

git status


rm -rf js css index.html favicon.ico

git status

# git add .

# git commit -m 'delete'


# git status

cp -a ../../dist/. .

git status

git add .

git commit --allow-empty -m 'deploy'

# git push --force --quiet https://${DOCS_GITHUB_TOKEN}@github.com/lalalazero/zeroview.git

git push --force --quiet $remote

rm -rf gh-pages



