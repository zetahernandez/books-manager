package "git"

include_recipe "nodejs"
#TODO: Create previous recipe and include remove ipv6
if node[:disableIPv6]
   bash "Remove ipv6" do
      code <<-EOF
      sudo echo "net.ipv6.conf.all.disable_ipv6 = 1" >> /etc/sysctl.conf  
      sudo echo "net.ipv6.conf.default.disable_ipv6 = 1"   >> /etc/sysctl.conf
      sudo echo "net.ipv6.conf.lo.disable_ipv6 = 1" >> /etc/sysctl.conf
      sudo sysctl -p
      EOF
   end
end

execute "Installing sass" do
  command "gem install sass -v 3.2.10"
end

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

