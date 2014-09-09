chef_gem 'mongo'
chef_gem 'bson_ext'

include_recipe "mongodb::default"
include_recipe "mongodb::user_management"

