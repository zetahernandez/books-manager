
########################################################
#  GLOBAL DEPENDENCIES                                 #
########################################################


execute "Installing sass" do
  #Use sass 3.2.10 * with version 3.2.12 doesn't work
  command "gem install sass -v 3.2.10"
  not_if do ::File.exists?('/usr/bin/sass') end
end

execute "Installing compass" do
  command "gem install compass"
  not_if do ::File.exists?('/usr/bin/compass') end
end

execute "Installing grunt-contrib-compass" do
  command "npm install -g grunt-contrib-compass"
  not_if do ::File.exists?('/usr/local/lib/node_modules/grunt-contrib-compass') end
end

execute "Installing mocha" do
  command "npm install -g mocha"
  not_if do ::File.exists?('/usr/local/bin/mocha') end
end

execute "Installing grunt" do
  command "npm install -g grunt grunt-cli "
  not_if do ::File.exists?('/usr/local/bin/grunt') end
end

execute "Installing grunt-cli" do
  command "npm install -g grunt-cli"
  not_if do ::File.exists?('/usr/local/lib/node_modules/grunt-cli') end
end

execute "Installing grunt-mocha" do
  command "npm install -g grunt-mocha"
  not_if do ::File.exists?('/usr/local/lib/node_modules/grunt-mocha') end
end

execute "Installing Forever" do
  command "npm install -g forever"
  only_if { node[:environment] == 'aws' }
  not_if do ::File.exists?('/usr/local/bin/forever') end
end
