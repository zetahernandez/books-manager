###############################################################################
# This is an example user.rb file that can be used as a starting point to     #
# create a real user.rb file.                                                 #
#                                                                             #
# Vagrantfile loads user.rb to allow each individual user to override the     #
# default property values that it sets. This file can update any of the       #
# property values set in the DEFAULT PROPERTY VALUES section of Vagrantfile.  #
#                                                                             #
# The real user.rb file will be ignored by git. It will only exist on the     #
# developer workstation. This makes it safer to put sensitive information     #
# like passwords into this file.                                              #
###############################################################################

# location of the commons repo on the host machine (your computer)
#$repo = '/usr/local/repo'

# This is Ubuntu 12.04.3 LTS (Precise Pangolin) 64-bit built with the
# necessary software added for Vagrant. Guest Additions 4.2.12 is installed.
#$box = ''

# If the selected box is not yet loaded in Vagrant, Vagrant will
# automatically retrieve that box from this URL and load it.
#$box_url = ''

# Allow you change the provisioning path
# See https://github.com/mitchellh/vagrant/blob/master/plugins/provisioners/chef/provisioner/base.rb
#$provisioning_path = nil
