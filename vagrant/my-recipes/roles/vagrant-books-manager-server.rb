name "books-manager"
description "Books Manager Vagrant Server Role"

run_list(
	"recipe[apt]",
	"recipe[build-essential]",
	"recipe[books-manager-server]"
)

default_attributes(
	:basedir => "/usr/local/books-manager",
	:environment => "vagrant",
	"nodejs.apphost" => "localhost",
	"nodejs.ssl" => "false",
	"nodejs.port" => "9000"
)
