package "git"

execute "Installing compass" do
  command "gem install compass"
end

execute "Installing grunt-contrib-compass" do
  command "npm install -g grunt-contrib-compass"
  only_if { node[:environment] == 'vagrant' }
end

execute "Installing mocha grunt-cli grunt-mocha" do
  command "npm install -g mocha grunt grunt-cli grunt-mocha"
end

# Do an npm rebuild for compiled dependencies.

#TODO: run npm install when node_modules not exist, otherwise run npm rebuild
execute "Perform npm" do
  cwd "#{node[:basedir]}"
  command "npm install"
end

