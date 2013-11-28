name "books-manager"
description "Books Manager Vagrant Server Role"

run_list(
	"recipe[apt]",
	"recipe[build-essential]",
	"recipe[nodejs]"
)