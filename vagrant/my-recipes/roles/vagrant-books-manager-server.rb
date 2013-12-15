name "books-manager"
description "Books Manager Vagrant Server Role"

run_list(
	"recipe[apt]",
	"recipe[build-essential]",
	"recipe[nodejs]",
	"recipe[books-manager]"
)

default_attributes(
	:basedir => "/usr/local/books-manager",
	:environment => "vagrant"
)
