#!/bin/bash

cd /home/ubuntu/build

sudo npm install
sudo pm2 kill
sudo pm2 start "npm run start:gate_build"
sudo pm2 start "npm run start:dis_build"
sudo pm2 start "npm run start:users_build"
sudo pm2 start "npm run start:posts_build"
sudo pm2 start "npm run start:admin_build"
sudo pm2 start "npm run start:threads_build"
sudo pm2 start "npm run start:chat_build"

cd /home/ubuntu/devcamp

sudo yarn install
sudo pm2 start "yarn run start:prod"

sudo pm2 startup
sudo pm2 save
