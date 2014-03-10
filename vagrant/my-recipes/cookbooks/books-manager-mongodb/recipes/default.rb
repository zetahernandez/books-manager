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

include_recipe "mongodb::default"