#!/bin/bash

cd /home/ubuntu/devcamp

sudo yarn install
sudo pm2 kill
sudo pm2 start "yarn run start"


sudo pm2 startup
sudo pm2 save