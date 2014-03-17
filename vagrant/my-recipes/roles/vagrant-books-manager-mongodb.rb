name "books-manager"
description "Books Manager Vagrant Server Role"

run_list(
	"recipe[apt]",
	"recipe[build-essential]",
	"recipe[books-manager-mongodb]"
)

default_attributes(
	:basedir => "/usr/local/mongodb_repo",
	:environment => "vagrant",
	"nodejs.apphost" => "localhost",
	"nodejs.ssl" => "false",
	"nodejs.port" => "9000"
)
override_attributes(
	:mongodb => { :enable_rest => true,
	:install_method => '10gen' }
)