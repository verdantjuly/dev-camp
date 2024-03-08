#!/bin/bash

cd /home/ubuntu/devcamp

sudo yarn install
sudo pm2 start "yarn run start:prod"
