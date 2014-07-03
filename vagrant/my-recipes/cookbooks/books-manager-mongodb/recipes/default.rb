bash "Remove set locate" do
      code <<-EOF
    	 export LC_ALL="en_US.UTF-8"
      EOF
end

group node["mongodb"]["group"] do
  action [ :create, :manage ]
end


user node["mongodb"]["user"] do
  comment "MongoDB Server"
  gid node["mongodb"]["group"]
  supports :manage_home => true
  home "/home/#{node["mongodb"]["user"]}"
  action [ :create, :manage ]
end

unless ::File.exists?('/usr/bin/mongo')
	include_recipe "chef-mongodb::default"
end

template "#{node[:basedir]}/scripts/auth.js" do
  source "auth.js.erb"
  owner node["mongodb"]["user"]
  group node["mongodb"]["group"]
  mode "0644"
end

template "#{node[:basedir]}/scripts/users.js" do
  source "users.js.erb"
  owner node["mongodb"]["user"]
  group node["mongodb"]["group"]
  mode "0644"
end
execute "auth" do
    command "mongo admin #{node[:basedir]}/scripts/auth.js"
end

execute "create user books" do
    command "mongo books #{node[:basedir]}/scripts/users.js"
end