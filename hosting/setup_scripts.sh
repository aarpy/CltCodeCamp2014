sudo apt-get install git

sudo apt-get install python-software-properties

sudo add-apt-repository ppa:chris-lea/node.js
sudo apt-get update
sudo apt-get install nodejs

curl https://www.npmjs.org/install.sh | sudo sh

sudo npm install grunt-cli -g
sudo npm install bower -g

#install python
sudo apt-get install build-essential

wget http://www.python.org/ftp/python/3.3.5/Python-3.3.5.tar.xz
tar xJf ./Python-3.3.5.tar.xz
cd ./Python-3.3.5
./configure --prefix=/opt/python3.3
make && sudo make install

#setup project

mkdir Workspace
cd Workspace

git clone https://github.com/aarpy/CltCodeCamp2014.git
cd CltCodeCamp2014
npm install
bower install

-----
Redis

sudo apt-get update
sudo apt-get upgrade
sudo apt-get redis-server
sudo cp /etc/redis/redis.conf /etc/redis/redis.conf.default