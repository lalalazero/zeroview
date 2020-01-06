#!/bin/sh
# ideas used from https://gist.github.com/motemen/8595451

# abort the script if there is a non-zero error
# set -e

# show where we are on the machine
pwd

remote=$(git config remote.origin.url)

echo 'remote'
echo $remote

siteSource="$1"

if [ -z $remote]
then
  echo '给 remote 赋值'
  remote=https://github.com/lalalazero/zeroview.git
fi

echo 'hello'

echo $siteSource

echo $remote

if [ ! -d "$siteSource" ]
then
    echo "Usage: $0 <site source dir>"
    exit 1
fi

# make a directory to put the gp-pages branch
echo 'mkdir pg-pages-branch'

mkdir gh-pages-branch
cd gh-pages-branch

echo 'enter ..'

pwd
# now lets setup a new repo so we can update the gh-pages branch
git config --global user.email "$GH_EMAIL"
git config --global user.name "$GH_NAME"
git init
git remote add --fetch origin "$remote"

echo $remote

# switch into the gh-pages branch
if git rev-parse --verify origin/gh-pages
then
    git checkout gh-pages
    # delete any old site as we are going to replace it
    # Note: this explodes if there aren't any, so moving it here for now
    git rm -rf .
else
    git checkout --orphan gh-pages
fi


echo 'copy from dist '

# copy over or recompile the new site
cp -a "../${siteSource}/." .

# stage any changes and new files
git add -A
echo 'git status..'

git status
# now commit, ignoring branch gh-pages doesn't seem to work, so trying skip
git commit --allow-empty -m "Deploy to GitHub pages [ci skip]"
# and push, but send any output to /dev/null to hide anything sensitive
git push --force --quiet origin gh-pages

# go back to where we started and remove the gh-pages git repo we made and used
# for deployment
cd ..
rm -rf gh-pages-branch

echo "Finished Deployment!"
