#!/bin/bash
export REDIS_HOST_OVERRIDE=172.31.26.231
cd /home/ubuntu/Workspace/CltCodeCamp2014
sudo git pull --rebase
sudo service CltCodeCamp2014 restart
cp upstart_CltCodeCamp2014Notify.conf /etc/inti/CltCodeCamp2014Notify.conf
sudo service CltCodeCamp2014Notify restart