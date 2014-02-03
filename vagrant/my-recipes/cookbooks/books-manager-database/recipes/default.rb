bash "Remove set locate" do
      code <<-EOF
    	 export LC_ALL="en_US.UTF-8"
      EOF
end
include_recipe "mongodb::default"