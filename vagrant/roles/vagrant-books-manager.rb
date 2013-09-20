name "books-manager"
description "Books Manager Server Role"

run_list(
	"recipe[books-manager]"
)

default_attributes(
	:basedir => "/usr/local",
)

override_attributes(

)
