RUBY_VERSION=1.9.3
RUBYGEMS_VERSION=2.3.0

apt-get install -y ruby${RUBY_VERSION} build-essential wget
cd /tmp
wget http://production.cf.rubygems.org/rubygems/rubygems-${RUBYGEMS_VERSION}.tgz
tar zxf rubygems-${RUBYGEMS_VERSION}.tgz
cd rubygems-${RUBYGEMS_VERSION}
ruby setup.rb --no-format-executable
cd /tmp
rm -rf rubygems-${RUBYGEMS_VERSION}
rm rubygems-${RUBYGEMS_VERSION}.tgz