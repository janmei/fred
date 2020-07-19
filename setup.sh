#!/bin/bash
sudo apt-get install git python3-pip python-pygame -y
pip3 install paho-mqtt pygame
git clone https://github.com/janmei/fred.git
cd fred
python3 index.py