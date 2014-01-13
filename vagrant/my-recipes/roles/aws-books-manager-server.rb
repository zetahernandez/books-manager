name "books-manager"
description "Books Manager Vagrant Server Role"

run_list(
	"recipe[apt]",
	"recipe[build-essential]",
	"recipe[books-manager]"
)

default_attributes(
	:basedir => "/usr/local/books-manager",
	:environment => "aws",
	:repo => "https://github.com/zetahernandez/books-manager.git",
	"nodejs.apphost" => "books-manager.dnsalias.org",
	"nodejs.ssl" => "false",
	"nodejs.port" => "80",
)
