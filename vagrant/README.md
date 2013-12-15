VAGRANT CONFIG 
==============
> Use vagrant to create your development environment with Virtual Box 

## Pre-reqs

* [virtual box](https://www.virtualbox.org/) -- Recommend version 4.2.18
* [vagrant](http://www.vagrantup.com/) -- Recommend version 1.3.5

## Usage

* create user.rb file on vagrant folder
* add this lines <code>
    <pre>$box = 'precise64'
  $box_url = 'http://files.vagrantup.com/precise64.box'
  $repo = 'path/to/books-manager'</pre></code>
* open terminal go to /vagrant and run <code>vagrant up</code> command 
* login on guest machine created with user vagrant pass vagrant
* go to /usr/local/books-manager
* run <code>grunt server</code>

 
