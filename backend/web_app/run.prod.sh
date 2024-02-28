#!/bin/bash 

git fetch --all
git merge staging
npm install
npm run build
cp -R build/. ../web_build/