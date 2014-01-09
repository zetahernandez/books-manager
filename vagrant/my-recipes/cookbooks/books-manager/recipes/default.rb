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

template "/etc/init/nodejs.conf" do
  source "node.conf.erb"
  owner "root"
  group "root"
  mode "0640"
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

package "g++"
package "authbind"

bash "Configure authbind" do
  code <<-EOF
  touch /etc/authbind/byport/80
  chmod 500 /etc/authbind/byport/80
  chown ubuntu /etc/authbind/byport/80
  touch /etc/authbind/byport/443
  chmod 500 /etc/authbind/byport/443
  chown ubuntu /etc/authbind/byport/443
  EOF
end
execute "Starting Node" do
  command "initctl start nodejs || initctl restart nodejs"
end