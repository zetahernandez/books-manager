
directory "#{node[:basedir]}/" do
    recursive true
    owner "ubuntu"
    group "ubuntu"
    mode 0775
    only_if { node[:environment] == 'aws' }
end

execute "git clone books-manager.git" do
    cwd node[:basedir]
    command "git clone --verbose #{node[:repo]} #{node[:basedir]}"
    user "ubuntu"
    group "ubuntu"
    umask "0002"
    timeout 7200
    only_if { node[:environment] == 'aws' }
    not_if { ::File.exists?("#{node[:basedir]}/.git") }
end

