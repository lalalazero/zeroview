#!/bin/sh

echo 'deploy'

git checkout gh-pages

cp -a ./dist/. .


git status

git add .
git add -A

echo '不应该有没有 staged 的文件 ==============='
git status

echo 'commit ==============='

git commit -m 'deploy'

echo 'push ==============='

git push

