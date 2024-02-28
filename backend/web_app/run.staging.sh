#!/bin/bash 

git fetch --all
git merge development
npm install
npm run build
cp -R build/. ../web_build/