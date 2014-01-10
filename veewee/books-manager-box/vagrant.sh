date > /etc/vagrant_box_build_time

# Setup sudo to allow no-password sudo for "sudo"
usermod -a -G sudo vagrant

# Installing vagrant keys
mkdir /home/vagrant/.ssh
chmod 700 /home/vagrant/.ssh
cd /home/vagrant/.ssh
wget --no-check-certificate 'https://raw.github.com/mitchellh/vagrant/master/keys/vagrant.pub' -O authorized_keys
chmod 600 /home/vagrant/.ssh/authorized_keys
chown -R vagrant /home/vagrant/.ssh

#Install Vagrant
sudo apt-get install dpkg-dev virtualbox-dkms
sudo apt-get install axel 
axel -n 200 http://files.vagrantup.com/packages/7e400d00a3c5a0fdf2809c8b5001a035415a607b/vagrant_1.2.2_x86_64.deb
sudo dpkg -i vagrant_1.2.2_x86_64.deb
sudo apt-get install linux-headers-$(uname -r)
sudo dpkg-reconfigure virtualbox-dkms
#Install Vagran puglin for aws
vagrant plugin install vagrant-aws
vagrant box add dummy https://github.com/mitchellh/vagrant-aws/raw/master/dummy.box