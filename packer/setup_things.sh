#!/bin/bash -x

#==================================================================================================
#
# This script can be run on a basic Canonical Ubuntu AMI to install the minimum software
# required by Fluid Retail AMIs.  This speeds up provisioning a bit since less software needs
# to be installed.
# 
#==================================================================================================

sleep 30

RUBY_VERSION=1.9.3
RUBYGEMS_VERSION=2.1.7

# Install the OS updates to the system before anything else.
echo "installing OS updates..."
sudo apt-get -y update
sudo apt-get -y dist-upgrade
sudo apt-get -y autoremove
sudo apt-get -y autoclean

# Install ntpd
sudo apt-get install -y ntp

# Install the chef solo goodies. Chef is ruby and it needs several ruby gems.
echo "installing ruby stuff..."
sudo apt-get install -y ruby${RUBY_VERSION} build-essential wget
cd /tmp
wget http://production.cf.rubygems.org/rubygems/rubygems-${RUBYGEMS_VERSION}.tgz
tar zxf rubygems-${RUBYGEMS_VERSION}.tgz
cd rubygems-${RUBYGEMS_VERSION}
sudo ruby setup.rb --no-format-executable
cd /tmp
rm -rf rubygems-${RUBYGEMS_VERSION}
rm rubygems-${RUBYGEMS_VERSION}.tgz

echo "installing chef..."
sudo gem install chef --version '~> 10.28' --no-rdoc --no-ri --verbose

# aws-sdk has a couple of extra package dependencies via nokogiri
sudo apt-get install -y libxslt-dev libxml2-dev

sudo gem install aws-sdk --no-rdoc --no-ri --verbose



# Create some directories for building chef-solo into.
sudo mkdir -p /var/chef/cache
sudo mkdir -p /var/chef/roles
sudo mkdir -p /etc/chef/ohai/hints
sudo touch /etc/chef/ohai/hints/ec2.json

history -c
