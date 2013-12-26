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

include_recipe "books-manager::global-dependencies"

if node[:environment] == 'aws' then
  include_recipe "books-manager::git-clone"
end  

# Do an npm rebuild for compiled dependencies.
#TODO: run npm install when node_modules not exist, otherwise run npm rebuild
execute "Perform npm" do
  cwd "#{node[:basedir]}"
  command "npm install"
end

#Build Project
execute "Build Project" do
  cwd "#{node[:basedir]}"
  only_if { node[:environment] == 'aws' }
  command "grunt build"
end

execute "Starting server" do
  cwd "#{node[:basedir]}"
  only_if { node[:environment] == 'aws' }
  command "NODE_ENV=production; forever start #{node[:basedir]}/lib/server.js"
end
