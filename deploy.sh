#!/bin/sh
branch=$(git branch --show-current)

if [[ $branch == "main" ]]; then
    echo "On main branch. Will build and ship to server"
    npm run build
    echo "Shipping dist to server"
    rsync -arvz -e 'ssh -p 2244' --progress $(pwd)/dist/* jeth@pipher.local:/var/www/zero-to-hundred.jtdev.se
else
    echo "Not on main branch. Skipping build and deploy."
fi