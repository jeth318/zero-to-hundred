#!/usr/bin/env bash

BRANCH_NAME=$1;


if [[ $BRANCH_NAME == "master" ]]; then
    cd /home/pi/Apps/zero-to-hundred/client
else
    exit 0;
fi

echo "Stashing lock files "
git stash

echo "Dropping stash"
git stash drop

echo "Pulling from ${BRANCH_NAME}"
git pull origin ${BRANCH_NAME}
echo "Pulled successfully"

echo "Removing node_modules and re-installing dependencies"
npm install
echo "Project dependencies was installed"
echo "Rebuilding application"
npm run build
echo "Rebuild OK"
echo "Deployment complete, and it was a success!"
echo "Version ${NEW_VERSION} is now live"
exit 0
