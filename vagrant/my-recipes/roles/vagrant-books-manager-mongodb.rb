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
	"nodejs.port" => "9000",
	
)
override_attributes(
	:mongodb => { 
		:config => { 
			:auth => true,
			:rest => true
		},
		:install_method => '10gen',
		:admin => {
		  'username' => 'admin',
		  'password' => 'admin',
		  'roles' => %w(userAdminAnyDatabase dbAdminAnyDatabase clusterAdmin),
		  'database' => 'admin'
		},
		:users => [{
		  'username' => 'zeta',
		  'password' => '123456',
		  'roles' => %w(readWrite),
		  'database' => 'books'
		}]
	}
)

