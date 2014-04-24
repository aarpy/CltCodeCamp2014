#!/bin/bash

sudo iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to-ports 8080
#sudo iptables -t nat -A OUTPUT -p tcp --dport 80 -j REDIRECT --to-ports 8080
sudo iptables -F
sudo iptables-save
sudo iptables -L -t nat
